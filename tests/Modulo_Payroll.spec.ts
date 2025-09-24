import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.BASE_URL || !process.env.USER || !process.env.PASSWORD) {
  throw new Error('Faltan variables de entorno: BASE_URL, USER o PASSWORD');
}

test.use({ storageState: 'storageState.json' });
// Utiliza el estado de almacenamiento guardado en 'storageState.json' para mantener la sesión iniciada


test('Payroll', async ({ page }) => {
  const baseUrl = process.env.BASE_URL!;
  const response = await page.goto(`${baseUrl}/CoreApp/Payroll/Index/346`);
  expect(response?.status()).toBe(200);
  await page.waitForTimeout(2000); // Espera 2 segundos para que se cargue la página

  // Comentar o decomentar las dos siguientes lineas segun el entorno que se quiera usar (esto pasaba en pre)
      //await page.getByRole('gridcell', { name: '5385' }).click();
      //await page.getByRole('link', { name: ' SELECT' }).click();

    //await page.waitForTimeout(3000);

  await page.getByText('Calendar').click();
  await page.waitForTimeout(2000);
});
