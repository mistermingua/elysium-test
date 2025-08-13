
import { test, expect } from '@playwright/test'; // Importa las librerías necesarias de Playwright
import dotenv from 'dotenv'; // Importa dotenv para manejar variables de entorno (archivo .env)
dotenv.config(); // Carga las variables de entorno desde el archivo .env

if (!process.env.BASE_URL || !process.env.USER || !process.env.PASSWORD) {
  throw new Error('Faltan variables de entorno: BASE_URL, USERNAME o PASSWORD');
} // Verifica que las variables de entorno necesarias estén definidas
// Si no están definidas, lanza un error para evitar que el test se ejecute sin la configuración correcta

test.use({ storageState: 'storageState.json' });
// Utiliza el estado de almacenamiento guardado en 'storageState.json' para mantener la sesión iniciada


test('Creacion Blackout Dates', async ({ page }) => {

  const baseUrl = process.env.BASE_URL!; // Obtiene la URL base desde las variables de entorno
  const response = await page.goto(`${baseUrl}/MyEss/RequestsGraph/Index/1266`); // Navega a la página de inicio de sesión usando la URL base
  expect(response?.status()).toBe(200);
await page.waitForTimeout(2000); // Espera 2 segundos para que se cargue la página
  await page.getByRole('button', { name: 'Blackout Dates' }).click();
  await page.waitForTimeout(2000); // Espera 2 segundos para que se cargue la página

  await page.locator('#startDate').click();
  await page.locator('#startDate').fill('6/17/202521'); // Introduce la fecha de inicio del blackout date


  await page.locator('#RecurrenceRule').getByText('Never').click();
  // Esperar  a que aparezca el elemnto que vamos a seleccionar
  await page.waitForSelector('#RecurrenceRule >> text=Never', { // Cambiar el texto en función de lo que necesites
    state: 'visible',   
    timeout: 5000 // Espera hasta 5 segundos para que el texto sea visible
    });
  await page.getByRole('option', { name: 'Never' }).click(); // Selecciona la opción "Never" o la que necesites

  await page.locator('div').filter({ hasText: /^Customer ServiceHuman ResourcesSalesDefaultSelect$/ }).locator('div').click();
  await page.waitForTimeout(1500); // Espera 1.5 segundos para que se cargue la lista de grupos de licencia
    // Descomentar las opciones que necesites seleccionar
  // await page.getByRole('option', { name: 'Customer Service' }).click();
  await page.getByRole('option', { name: 'Human Resources' }).click();
  // await page.getByRole('option', { name: 'Sales' }).click();
  // await page.getByRole('option', { name: 'Default' }).click();

  await page.locator('.k-edit-field > div:nth-child(2)').click(); // Esto es para que el menu anterior se cierre
  await page.getByRole('link', { name: 'Save' }).click();
    await page.waitForTimeout(2000); // Espera 2 segundos para que se guarde el blackout date
});
