// Константы для тестовых данных пользователя
const TEST_USER = {
  email: 'mytest@test.com',
  password: '12345678',
  name: 'Test User'
};

// API эндпоинты
const API_ENDPOINTS = {
  login: 'https://norma.nomoreparties.space/api/auth/login',
  user: '**/api/auth/user'
};

// Добавляю кастомную команду для авторизации через API
Cypress.Commands.add('loginByApi', () => {
  // Выполняю POST запрос на эндпоинт авторизации с тестовыми данными
  cy.request('POST', API_ENDPOINTS.login, {
    email: TEST_USER.email,
    password: TEST_USER.password
  }).then((res) => {
    // Проверяю успешность ответа
    expect(res.status).to.eq(200);
    expect(res.body).to.have.property('accessToken');
    expect(res.body).to.have.property('refreshToken');
    
    // Извлекаю токен из ответа (убираю префикс 'Bearer ')
    const accessToken = res.body.accessToken.split('Bearer ')[1];
    const refreshToken = res.body.refreshToken;

    // Сохраняю access токен в cookies
    cy.setCookie('accessToken', accessToken);
    
    // Сохраняю refresh токен в localStorage
    cy.window().then((win) => {
      win.localStorage.setItem('refreshToken', refreshToken);
    });

    // Мокаю ответ /auth/user для последующих запросов
    cy.intercept('GET', API_ENDPOINTS.user, {
      statusCode: 200,
      body: {
        success: true,
        user: {
          email: TEST_USER.email,
          name: TEST_USER.name
        }
      }
    }).as('getUser');
  });
});

// Добавляю команду для очистки данных авторизации
Cypress.Commands.add('logout', () => {
  // Очищаю cookies и localStorage
  cy.clearCookies();
  cy.window().then((win) => {
    win.localStorage.clear();
  });
});

// Настраиваю слежение за fetch запросами для отладки
Cypress.on('window:before:load', (win) => {
  cy.spy(win, 'fetch').as('fetchSpy');
});

// Типизация для TypeScript
declare global {
  namespace Cypress {
    interface Chainable {
      loginByApi(): Chainable<void>;
      logout(): Chainable<void>;
    }
  }
}