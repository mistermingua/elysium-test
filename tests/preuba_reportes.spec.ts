import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
dotenv.config();

if (!process.env.BASE_URL || !process.env.USER || !process.env.PASSWORD) {
  throw new Error('Faltan variables de entorno: BASE_URL, USERNAME o PASSWORD');
}

test.use({ storageState: 'storageState.json' });
// Utiliza el estado de almacenamiento guardado en 'storageState.json' para mantener la sesión iniciada

test.describe('Editar datos del usuario', () => {
test('test', async ({ page }) => {
    test.setTimeout(120000); // Establece un tiempo de espera de 120 segundos para la prueba

    const baseUrl = process.env.BASE_URL!;
    const response = await page.goto(`${baseUrl}/CoreApp/Payroll/Index/346#`);
    expect(response?.status()).toBe(200);

    await page.getByRole('button', { name: '' }).first().click();
    // Primer reporte
  const page1Promise = page.waitForEvent('popup');
  await page.locator('#gridPayrollBatch_tt_active div').filter({ hasText: '» Payroll Register' }).nth(2).click();
  const page1 = await page1Promise;
  await expect(page1).toHaveURL(/\.pdf/i);
await page1.close();
    // Segundo reporte
  const page2Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: '» Payroll Summary' }).click();
  const page2 = await page2Promise;
  await expect(page2).toHaveURL(/\.pdf/i);
  // esperamos 4 segundos
  await page2.waitForTimeout(4000);
await page2.close();

    // Tercer reporte
  const page3Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: '» Pay Slip Print Cash' }).click();
  const page3 = await page3Promise;
    await expect(page3).toHaveURL(/\.pdf/i);
await page3.close();
});
});