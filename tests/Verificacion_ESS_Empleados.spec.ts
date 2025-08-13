import { test, expect } from '@playwright/test'; // Importa las librerías necesarias de Playwright
import dotenv from 'dotenv'; // Importa dotenv para manejar variables de entorno (archivo .env)
dotenv.config(); // Carga las variables de entorno desde el archivo .env

if (!process.env.BASE_URL || !process.env.USER || !process.env.PASSWORD) {
  throw new Error('Faltan variables de entorno: BASE_URL, USER o PASSWORD');
} // Verifica que las variables de entorno necesarias estén definidas
// Si no están definidas, lanza un error para evitar que el test se ejecute sin la configuración correcta

test.use({ storageState: 'storageState.json' });
// Utiliza el estado de almacenamiento guardado en 'storageState.json' para mantener la sesión iniciada

 
test.describe('Añadir Pay Category', () => {
test('Test Pay category', async ({ page }) => {
  const baseUrl = process.env.BASE_URL!; // Obtiene la URL base desde las variables de entorno
  const response = await page.goto(`${baseUrl}/MyEss/Home/Index/955`); // Navega a la página de inicio de sesión usando la URL base
  expect(response?.status()).toBe(200);

  await page.waitForTimeout(1000);

  // Modulos que no deberian aparecer en la pagina principal de ESS
const blacklistMain = [
    'PAYROLL MANAGER',
    'HRMS',
    'TIME MANAGER',
    'SETUP',
    'ICS',
    'GLOBAL EDITION',
    'CENTRAL',
    'IMPORT/EXPORT'
  ];

  // Lista bloques de ESS que no deberían aparecer
  const blacklistESS = [
    'Administrator',
    'Approvals',
    'Request Graph',
    'E-Files Cabinet',
    'Delegate'
  ];

  // Comprobar que los módulos prohibidos no están visibles en la página principal
  for (const text of blacklistMain) {
    const isVisible = await page.locator(`text=${text}`).isVisible();
    expect(isVisible, `El módulo prohibido "${text}" está visible`).toBeFalsy();
  }

  // Comprobar que los bloques prohibidos no están visibles en la página de ESS
  for (const text of blacklistESS) {
    const isVisible = await page.locator(`text=${text}`).isVisible();
    expect(isVisible, `El elemento prohibido en ESS "${text}" está visible`).toBeFalsy();
  }
  



  
});
});