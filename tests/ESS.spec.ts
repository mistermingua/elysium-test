import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config(); // Carga las variables de entorno desde el archivo .env

if (!process.env.BASE_URL || !process.env.USER || !process.env.PASSWORD) {
  throw new Error('Faltan variables de entorno: BASE_URL, USERNAME o PASSWORD');
} // Verifica que las variables de entorno necesarias estén definidas


test.use({ storageState: 'storageState.json' });

test.describe('Pruebas ESS', () => {
test('Modulo ESS', async ({ page }) => {
  const baseUrl = process.env.BASE_URL!;
  const response = await page.goto(`${baseUrl}/MyEss/Home/Index/955`);
  expect(response?.status()).toBe(200); // Verifica que la respuesta sea 200 OK
  
  await page.waitForTimeout(2000);

  await page.getByRole('link', { name: 'imageAdministrator' }).click();
    await page.waitForTimeout(1000);
  await page.getByRole('link', { name: 'imageApprovals' }).click();
    await page.waitForTimeout(1000);
  await page.getByRole('link', { name: 'imageRequests Graph' }).click();
    await page.waitForTimeout(1000);
  await page.getByRole('link', { name: 'imageSchedule' }).click();
    await page.waitForTimeout(1000);
  await page.getByRole('link', { name: 'imageTimesheet' }).click();
    await page.waitForTimeout(1000);
  await page.getByText('Timestamp').click();
    await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Close' }).click();
    await page.waitForTimeout(1000);
  await page.getByRole('link', { name: 'imagePayrolls' }).click();
    await page.waitForTimeout(1000);
  await page.getByRole('link', { name: 'imageE-Files Cabinet' }).click();
    await page.waitForTimeout(1000);
  await page.getByRole('treeitem', { name: ' Main Folder' }).locator('span').first().click();
    await page.waitForTimeout(1000);
  await page.getByRole('link', { name: 'imageE-Files', exact: true }).click();
    await page.waitForTimeout(1000);
  await page.getByRole('treeitem', { name: ' Main Folder' }).locator('span').first().click();
  await page.waitForTimeout(1000);
  await page.getByText('Delegate', { exact: true }).click();
    await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Close' }).click();
    await page.waitForTimeout(1000);
  const page1Promise = page.waitForEvent('popup');
    await page.waitForTimeout(1000);
  await page.getByRole('link', { name: 'imageHelp' }).click();
  // Espera a que se abra la nueva pestaña
  await page.waitForTimeout(1000);
  const page1 = await page1Promise;
    await page.waitForTimeout(2000); // 2 segundos para que se vea bien
});
});