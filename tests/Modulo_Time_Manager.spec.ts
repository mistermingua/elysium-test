import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.BASE_URL || !process.env.USER || !process.env.PASSWORD) {
  throw new Error('Faltan variables de entorno: BASE_URL, USER o PASSWORD');
}

test.use({ storageState: 'storageState.json' });
// Utiliza el estado de almacenamiento guardado en 'storageState.json' para mantener la sesión iniciada


test('test', async ({ page }) => {
    test.setTimeout(120000); // Establece un tiempo de espera de 120 segundos para la prueba
  const baseUrl = process.env.BASE_URL!;
  const response = await page.goto(`${baseUrl}/CoreApp/Dashboard/Index/342`);
  expect(response?.status()).toBe(200);
  
  await page.waitForTimeout(2000);
  // Comentar o decomentar las dos siguientes lineas segun el entorno que se quiera usar (esto pasaba en pre)
      //await page.getByRole('gridcell', { name: '5385' }).click();
      //await page.getByRole('link', { name: ' SELECT' }).click();

    await page.waitForTimeout(3000);
  await page.getByText('Miguel Torres').hover(); // Se debe cambiar por el nombre del usuario que se esté probando

  await page.getByText('Employee Selection', { exact: true }).click();
    await page.waitForTimeout(2000);
  await page.getByRole('row', { name: 'ID Last Name First Name' }).getByRole('checkbox').check();
  await page.getByRole('link', { name: ' SELECT' }).click();
  
  
  await page.waitForTimeout(2000);

  const response2 = await page.goto(`${baseUrl}/CoreApp/TAndA/Scheduler/345`);
  expect(response2?.status()).toBe(200);

  await page.waitForTimeout(2000);
 await page.getByText('No Group').first().click();
  await page.getByRole('option', { name: '8am-4:30pm-B-COMPANY' }).click();
    await page.waitForTimeout(2000);
  await page.getByText('8am-4:30pm-B-COMPANY').first().click();
  await page.getByRole('option', { name: 'Mantenimiento' }).click();
  await page.waitForTimeout(2000);
  await page.getByText('Mantenimiento').first().click();
  await page.getByRole('option', { name: 'Part Time-B-Company' }).click();
  await page.waitForTimeout(2000);
  await page.getByText('Part Time-B-Company').first().click();
  await page.getByRole('option', { name: 'Serv.Prof B-COMPANY' }).click();
  //  await page.locator('#example').getByLabel('select').locator('span').click();
//  await page.getByRole('option', { name: '8am-4:30pm-B-COMPANY' }).click();
//   await page.waitForTimeout(2000);
//  await page.locator('#example').getByLabel('select').locator('span').click();
//  await page.getByRole('option', { name: 'Mantenimiento' }).click();
//   await page.waitForTimeout(2000);
//  await page.locator('#example').getByLabel('select').locator('span').click();
//
//  await page.getByRole('option', { name: 'Part Time-B-Company' }).click();
//   await page.waitForTimeout(2000);
//  await page.locator('#example').getByLabel('select').locator('span').click();
//  await page.getByRole('option', { name: 'Serv.Prof B-COMPANY' }).click();
   await page.waitForTimeout(2000);

  const response3 = await page.goto(`${baseUrl}/CoreApp/TAndA/Index/344`);
  expect(response3?.status()).toBe(200);

  //await page.locator('span').filter({ hasText: /^TIME MANAGER$/ }).locator('span').hover();
  
  await page.getByRole('link', { name: 'Timesheet' }).click();
   await page.waitForTimeout(2000);
});