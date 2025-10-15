import { test, expect } from '@playwright/test'; // Importa las librerías necesarias de Playwright
import dotenv from 'dotenv'; // Importa dotenv para manejar variables de entorno (archivo .env)
dotenv.config(); // Carga las variables de entorno desde el archivo .env

if (!process.env.BASE_URL || !process.env.USER || !process.env.PASSWORD) {
  throw new Error('Faltan variables de entorno: BASE_URL, USER o PASSWORD');
} // Verifica que las variables de entorno necesarias estén definidas
// Si no están definidas, lanza un error para evitar que el test se ejecute sin la configuración correcta

test.use({ storageState: 'storageState.json' });
// Utiliza el estado de almacenamiento guardado en 'storageState.json' para mantener la sesión iniciada

 
test.describe('Prueba 401K', () => {
test('Test de Creacion de Bloque de 401K', async ({ page }) => {
  const baseUrl = process.env.BASE_URL!; // Obtiene la URL base desde las variables de entorno
  const response = await page.goto(`${baseUrl}/CoreApp/Setup/Index/358`); // Navega a la página de inicio de sesión usando la URL base
  expect(response?.status()).toBe(200);

    await page.getByRole('treeitem', { name: ' Payroll', exact: true }).locator('span').click();

// BLOQUE 3: FORMULAS

  await page.getByRole('link', { name: 'Formulas' }).click();
  await page.getByRole('link', { name: ' Add New Formula' }).click();

  await page.getByRole('textbox', { name: 'Name' }).click();
  await page.getByRole('textbox', { name: 'Name' }).fill('401K_aporte_empleado1');
  // Seleccionamos el Pay Category creado en el primer paso
  await page.getByRole('listbox', { name: 'Pay Category' }).getByLabel('select').locator('span').click();
  await page.getByRole('option', { name: '401K Employee' }).click();
  await page.getByRole('spinbutton').click();
  await page.getByRole('spinbutton', { name: 'Decimals Quantity' }).fill('2'); // Redondeo a 2 decimales
  // Hacemos click donde dice "Rounded" ya que el checkbox no funciona en playwright
  await page.locator('label').filter({ hasText: 'Rounded' }).click();

  await page.getByRole('textbox', { name: 'Formula', exact: true }).click();
  await page.getByRole('textbox', { name: 'Formula', exact: true }).fill('!I_REGULAR * 0.10\n');
  // Con la formula anterior le estamos diciendo que el aporte del empleado es el 10% del salario regular

    // Con esto indicamos que el valor que se va a devolver es un monto fijo y no un porcentaje
  await page.getByRole('textbox', { name: 'Formula Amount' }).click();
  await page.getByRole('textbox', { name: 'Formula Amount' }).fill('1'); // Fijo
  // Guardamos la formula
  await page.getByRole('button', { name: ' Update' }).click();











    });
});