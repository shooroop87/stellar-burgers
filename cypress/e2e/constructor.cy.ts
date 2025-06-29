// Константы для повторно используемых селекторов и данных
const SELECTORS = {
  userApi: '/api/auth/user',
  ingredientsApi: '/api/ingredients',
  orderApi: '/api/orders',
  userNameInput: 'input[name="name"]',
  testUserName: 'Test User',
  profileUrlPart: '/profile',
  homeUrl: 'http://localhost:4000/',
  bunName: 'Флюоресцентная булка R2-D3',
  fillingName: 'Биокотлета из марсианской Магнолии',
  bunOption: 'Краторная булка',
  bunPlaceholder: 'Выберите булки',
  fillingPlaceholder: 'Выберите начинку',
  orderButton: 'Оформить заказ',
  orderConfirmationText: 'идентификатор заказа',
  constructorTitle: 'Соберите бургер',
  personalCabinet: 'Личный кабинет',
};

describe('Авторизация и профиль', () => {
  it('Переход в профиль после входа', () => {
    // Мокаю ответ API для получения данных пользователя
    cy.intercept('GET', SELECTORS.userApi, {
      statusCode: 200,
      body: {
        success: true,
        user: {
          email: 'test_user@example.com',
          name: SELECTORS.testUserName,
        }
      }
    }).as('getUser');

    // Выполняю авторизацию через API
    cy.loginByApi();
    cy.visit('/');
    
    // Перехожу в личный кабинет
    cy.contains(SELECTORS.personalCabinet).click();
    cy.wait('@getUser');

    // Проверяю успешный переход в профиль
    cy.contains(SELECTORS.testUserName).click();
    cy.url().should('include', SELECTORS.profileUrlPart);
    cy.get('form', { timeout: 10000 }).should('exist');
    cy.get(SELECTORS.userNameInput).should('have.value', SELECTORS.testUserName);
  });
});

describe('Функциональность конструктора бургеров', () => {
  beforeEach(() => {
    // Загружаю тестовые данные из фикстур
    cy.fixture('ingredients.json').as('ingredientsData');
    cy.fixture('user.json').as('userData');

    // Настраиваю перехват запросов к API
    cy.intercept('GET', SELECTORS.ingredientsApi, {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.intercept('GET', SELECTORS.userApi, {
      fixture: 'user.json'
    }).as('getUser');

    // Устанавливаю фейковые токены авторизации
    cy.setCookie('accessToken', 'mockToken');
    cy.window().then(win => {
      win.localStorage.setItem('refreshToken', 'mockToken');
    });

    // Перехожу на главную страницу и жду загрузки
    cy.visit('/');
    cy.contains(SELECTORS.constructorTitle, { timeout: 10000 }).should('exist');
  });

  it('Нет булки при старте', () => {
    // Проверяю начальное состояние конструктора без ингредиентов
    cy.contains(SELECTORS.bunPlaceholder).should('exist');
    cy.contains(SELECTORS.fillingPlaceholder).should('exist');
  });

  it('Добавление булки в конструктор', () => {
    // Добавляю булку и проверяю её появление в конструкторе
    cy.contains(SELECTORS.bunName).next().click();
    cy.contains(SELECTORS.bunName, { timeout: 10000 }).should('exist');
  });

  it('Добавление начинки в конструктор', () => {
    // Перехожу к разделу начинок и добавляю ингредиент
    cy.contains('Начинки').scrollIntoView().click({ force: true });
    cy.contains(SELECTORS.fillingName).next().click();
    cy.contains(SELECTORS.fillingName).should('exist');
  });

  it('Добавление ингредиентов в заказ и очистка конструктора', () => {
    // Мокаю ответ на создание заказа
    cy.intercept('POST', SELECTORS.orderApi, {
      fixture: 'makeOrder.json',
      statusCode: 200
    }).as('newOrder');

    // Собираю бургер: добавляю булку и начинку
    cy.contains(SELECTORS.bunName).next().click();
    cy.contains('Начинки').scrollIntoView();
    cy.contains(SELECTORS.fillingName).next().click();

    // Оформляю заказ и жду успешного ответа
    cy.contains(SELECTORS.orderButton).should('not.be.disabled').click();
    cy.wait('@newOrder', { timeout: 30000 })
      .its('response.statusCode')
      .should('eq', 200);

    // Проверяю появление модального окна с подтверждением заказа
    cy.contains(SELECTORS.orderConfirmationText).should('be.visible');
    
    // Закрываю модальное окно и проверяю очистку конструктора
    cy.get('body').type('{esc}');
    cy.contains(SELECTORS.bunPlaceholder).should('exist');
  });

  it('Открытие и закрытие модального окна ингредиента', () => {
    // Открываю модальное окно с деталями ингредиента
    cy.contains(SELECTORS.bunOption).click();
    cy.url().should('include', '/ingredients/');
    
    // Закрываю модальное окно через ESC
    cy.get('body').type('{esc}');
    cy.url().should('eq', SELECTORS.homeUrl);
  });

  it('Закрытие модального окна через клик на оверлей', () => {
    // Открываю модальное окно с деталями ингредиента
    cy.contains(SELECTORS.bunOption).click();
    
    // Закрываю модальное окно кликом на оверлей
    cy.get('body').click(10, 10);
    cy.url().should('eq', SELECTORS.homeUrl);
  });
});