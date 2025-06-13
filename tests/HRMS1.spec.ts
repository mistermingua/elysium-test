import { test, expect } from '@playwright/test'; // Importa las librerías necesarias de Playwright
import dotenv from 'dotenv'; // Importa dotenv para manejar variables de entorno (archivo .env)
dotenv.config(); // Carga las variables de entorno desde el archivo .env

if (!process.env.BASE_URL || !process.env.USER || !process.env.PASSWORD) {
  throw new Error('Faltan variables de entorno: BASE_URL, USERNAME o PASSWORD');
} // Verifica que las variables de entorno necesarias estén definidas
// Si no están definidas, lanza un error para evitar que el test se ejecute sin la configuración correcta

test.use({ storageState: 'storageState.json' });
// Utiliza el estado de almacenamiento guardado en 'storageState.json' para mantener la sesión iniciada


test.describe('Prueba HRMS', () => {
test('Test HRMS', async ({ page }) => {
  const baseUrl = process.env.BASE_URL!; // Obtiene la URL base desde las variables de entorno
  const response = await page.goto(`${baseUrl}/CoreApp/Dashboard/Index/342`); // Navega a la página de inicio de sesión usando la URL base
  expect(response?.status()).toBe(200);

  await page.waitForTimeout(2000);

  await page.getByText('Miguel Torres').hover(); // Aqui se deberia poner otra cosa, no mi nombre
  
  await page.getByText('Employee Selection', { exact: true }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('row', { name: 'ID Last Name First Name' }).getByRole('checkbox').check();
  await page.getByRole('link', { name: ' SELECT' }).click();
  await page.waitForTimeout(1000);
  
  await page.getByText('HRMS').hover();
  
  await page.getByRole('link', { name: 'Resources Administration' }).click();
  
  await page.waitForTimeout(2000); // Espera 2 segundos para que se cargue la página
  
  //await page.locator('.k-link:has-text("HRMS")').hover({ force: true });

  //await page.getByText('HRMS', { exact: true }).hover();
  //await page.getByText('HRMS').hover();

  await page.goto(`${baseUrl}/CoreApp/Evaluations/Index/1254`);
  await page.waitForTimeout(2000); // Espera 2 segundos para que se cargue la página
  //await page.locator('span').filter({ hasText: /^HRMS$/ }).locator('span').hover();

  //await page.getByRole('link', { name: 'Evaluations' }).click();
  
  await page.waitForTimeout(4000);
});
});