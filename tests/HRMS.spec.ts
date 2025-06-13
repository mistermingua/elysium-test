import { test, expect } from '@playwright/test'; // Importa las librerías necesarias de Playwright
import dotenv from 'dotenv'; // Importa dotenv para manejar variables de entorno (archivo .env)
dotenv.config(); // Carga las variables de entorno desde el archivo .env

if (!process.env.BASE_URL || !process.env.USER || !process.env.PASSWORD) {
  throw new Error('Faltan variables de entorno: BASE_URL, USERNAME o PASSWORD');
} // Verifica que las variables de entorno necesarias estén definidas
// Si no están definidas, lanza un error para evitar que el test se ejecute sin la configuración correcta


test.describe('Prueba HRMS', () => {
test('Test HRMS', async ({ page }) => {
  //await page.goto('https://elysium.intechsol-pr.net/Login/Index');
  const baseUrl = process.env.BASE_URL!; // Obtiene la URL base desde las variables de entorno
  const usuario = process.env.USER!; // Obtiene el nombre de usuario desde las variables de entorno
  const password = process.env.PASSWORD!; // Obtiene la contraseña desde las variables de entorno

  const response = await page.goto(`${baseUrl}/Login/Index`); // Navega a la página de inicio de sesión usando la URL base
  expect(response?.status()).toBe(200); // Verifica que la respuesta sea exitosa (código 200)

  // Si la pagina no reponde de manera correcta (status 200), lanza un error

  //await page.getByRole('textbox', { name: 'Username' }).click();
  //await page.getByRole('textbox', { name: 'Username' }).fill(username); // Rellena el campo de usuario con el nombre de usuario desde las variables del archivo .env
  //await page.getByRole('textbox', { name: 'Password' }).click();
  //await page.getByRole('textbox', { name: 'Password' }).fill(password); // Rellena el campo de contraseña con la contraseña desde las variables del archivo .env
  //await page.getByRole('button', { name: 'SIGN IN' }).click();
await page.locator('input[name="user"]').click();
// console.log(`Username: ${usuario}`); // Imprime el nombre de usuario en la consola para depuración
// expect(username=="migueltorres@demo.com").toBeTruthy(); // Verifica que el nombre de usuario sea correcto

await page.locator('input[name="user"]').fill(usuario);

await page.locator('input[name="passwordLogin"]').click();
await page.locator('input[name="passwordLogin"]').fill(password);
await page.getByRole('button', { name: 'SIGN IN' }).click();



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