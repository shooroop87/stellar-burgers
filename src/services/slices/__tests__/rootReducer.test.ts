// Импортирую store и rootReducer для тестирования инициализации
import store, { rootReducer } from '../../store';

describe('Правильная инициализация rootReducer', () => {
  it('возвращает начальное состояние, если действие неизвестно', () => {
    // Создаю неизвестный экшен, который не обрабатывается ни одним редьюсером
    const unknownAction = { type: 'UNKNOWN_ACTION' };
    
    // Вызываю rootReducer с undefined состоянием и неизвестным Action
    const initialState = rootReducer(undefined, unknownAction);
    
    // Получаю текущее состояние store для сравнения
    const currentStoreState = store.getState();

    // Проверяю что rootReducer возвращает корректное исходное состояние
    expect(initialState).toEqual(currentStoreState);
  });
});