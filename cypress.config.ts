// Импортирую функцию конфигурации Cypress
import { defineConfig } from "cypress";

// Экспортирую конфигурацию Cypress для E2E тестирования
export default defineConfig({
  e2e: {
    // URL приложения для тестирования
    baseUrl: "http://localhost:4000",
    
    // Паттерн поиска файлов с тестами
    specPattern: "cypress/e2e/**/*.cy.{ts,tsx}",
    
    // Файл поддержки с кастомными командами
    supportFile: "cypress/support/e2e.ts",
    
    // Ширина высота браузера для тестов
    viewportWidth: 1280,
    viewportHeight: 720
  }
});