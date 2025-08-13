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



// Carga de datos de usuarios desde un documetno externo .json
const rawData = fs.readFileSync(path.join(__dirname, '../data/datosuser.json'), 'utf8'); // Lee el archivo JSON que contiene los datos del usuario
const user = JSON.parse(rawData);  // la variable user contendrá los datos del usuario que se va a crear
// Este archivo contiene los datos del usuario que se va a crear, como nombre, apellido, dirección, etc.



test('test', async ({ page }) => {
    const baseUrl = process.env.BASE_URL!;

    const response = await page.goto(`${baseUrl}/CoreApp/Setup/Index/358`); 
    expect(response?.status()).toBe(200); 



//await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
//   await page.getByRole('textbox', { name: 'Username' }).click();
//   await page.getByRole('textbox', { name: 'Username' }).fill('migueltorres@demo.com');
//   await page.getByRole('textbox', { name: 'Password' }).click();
//   await page.getByRole('textbox', { name: 'Password' }).fill('Intechsol2025');
//   await page.getByRole('button', { name: 'SIGN IN' }).click();
// 
// await expect(page.getByText('ELYSIUM Enterprise')).toBeVisible();
// await page.waitForTimeout(1000);

  //await page.getByRole('link', { name: 'SETUP' }).click();
  await page.getByRole('treeitem', { name: ' Schedules', exact: true }).locator('span').first().click();
  await page.getByRole('link', { name: 'Schedule Groups' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('link', { name: ' Add New Schedule Group' }).click();
    await page.waitForTimeout(1000);
  await page.locator('#sg_name').fill('Auxiliar de Practicas');
  await page.getByRole('button', { name: '' }).click();
   await page.waitForTimeout(1000);
});