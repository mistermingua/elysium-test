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

test.describe('Añadir pay code a usuario', () => {
test('test', async ({ page }) => {
    test.setTimeout(120000); // Establece un tiempo de espera de 120 segundos para la prueba

    const baseUrl = process.env.BASE_URL!;
    const response = await page.goto(`${baseUrl}/CoreApp/People/Index/917#`);
    expect(response?.status()).toBe(200);

    await page.waitForTimeout(1000);


  await page.getByText('Miguel Torres').hover(); // Aqui se deberia poner otra cosa, no mi nombre
  
  await page.getByText('Employee Selection', { exact: true }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('row', { name: 'ID Last Name First Name' }).getByRole('checkbox').check();
  await page.getByRole('link', { name: ' SELECT' }).click();

  await page.waitForTimeout(1000);

  await page.getByText('Rehire', { exact: true }).click();
  await page.waitForTimeout(1000);
  await page.locator('#txtRehireSearchSsn').click();
  await page.locator('#txtRehireSearchSsn').fill(user.ssn); // El SSN sera la base de busqueda del usuario que queramos darle el pay code
  await page.getByRole('button', { name: ' Search' }).click(); // Busca el usuario por SSN
    await page.waitForTimeout(2000);




    
  await page.getByRole('link', { name: 'Timesheet' }).click();
  await page.getByRole('row', { name: 'Fernando, Alvaro Fernando' }).getByRole('link').first().click(); // Reemplaza 'Fernando, Alvaro Fernando' por el nombre del usuario al que quieres añadir el pay code
  await page.locator('tr:nth-child(4) > .FirstOut').click();
await page.waitForTimeout(1000);    


    await page.locator('tr:nth-child(4) > td:nth-child(3)').first().click();
  await page.getByRole('option', { name: 'Vacation' }).click();
  await page.getByRole('gridcell', { name: '0', exact: true }).click();
  await page.locator('#PaycodeAmount').fill(user.FechaPayCode); // Rellena el campo con la fecha del pay code
  await page.getByText('SAVE', { exact: true }).click();



});
});
