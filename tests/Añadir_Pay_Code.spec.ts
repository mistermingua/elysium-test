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
   await page.locator('#txtHyperfinCondition').click(); // Hacemos click en el campo de búsqueda de empleados
    await page.waitForTimeout(1000);
   await page.locator('#txtHyperfinCondition').fill('Swift'); // Cambiamos el nombre del empleado por el que se quiera buscar
  await page.waitForTimeout(1000);
  // Le damos al boton de buscar para encontrar al empleado
  await page.getByLabel('Change Employee Selection').getByRole('button', { name: ' Find' }).click();
    await page.waitForTimeout(1000);
  await page.getByRole('row', { name: 'ID Last Name First Name' }).getByRole('checkbox').check();
  await page.getByRole('link', { name: ' SELECT' }).click();

  await page.waitForTimeout(1000);

    const response1 = await page.goto(`${baseUrl}/CoreApp/TAndA/Index/344`);
    expect(response1?.status()).toBe(200);

  await page.waitForTimeout(1000);
  await page.getByRole('link', { name: '' }).click();


await page.locator('tr:nth-child(3) > td:nth-child(3)').click();
 await page.getByRole('option', { name: 'Vacation' }).click(); // Aqui se pone el paycode que se quiera añadir
 await page.getByRole('gridcell', { name: '0', exact: true }).click();
 await page.locator('#PaycodeAmount').fill('08'); // Aquí se pone la cantidad de horas que se quiera añadir al paycode
//
// await page.locator('tr:nth-child(4) > td:nth-child(3)').click();
//  await page.getByRole('option', { name: 'Vacation' }).click();
//  await page.getByRole('gridcell', { name: '0', exact: true }).click();
//  await page.locator('#PaycodeAmount').fill('08');
//
// await page.locator('tr:nth-child(5) > td:nth-child(3)').click();
//  await page.getByRole('option', { name: 'Vacation' }).click();
//  await page.getByRole('gridcell', { name: '0', exact: true }).click();
//  await page.locator('#PaycodeAmount').fill('08');
//
// await page.locator('tr:nth-child(6) > td:nth-child(3)').click();
//  await page.getByRole('option', { name: 'Vacation' }).click();
//  await page.getByRole('gridcell', { name: '0', exact: true }).click();
//  await page.locator('#PaycodeAmount').fill('08');
//  
// await page.locator('tr:nth-child(7) > td:nth-child(3)').click();
//  await page.getByRole('option', { name: 'Vacation' }).click();
//  await page.getByRole('gridcell', { name: '0', exact: true }).click();
//  await page.locator('#PaycodeAmount').fill('08');
//
// await page.locator('tr:nth-child(8) > td:nth-child(3)').click();
//  await page.getByRole('option', { name: 'Vacation' }).click();
//  await page.getByRole('gridcell', { name: '0', exact: true }).click();
//  await page.locator('#PaycodeAmount').fill('08');

//await page.getByText('SAVE', { exact: true }).click();



const [responseSave] = await Promise.all([
      page.waitForResponse(res =>
        res.url().includes('/UpdateTimecardDates') &&
        res.request().method() === 'POST'
      ),
      page.getByText('SAVE', { exact: true }).click()
    ]);

    // >>>> Ahora extraes el body y verificas que los datos del .json están en la respuesta
    const body = await responseSave.json();

console.log('Respuesta del backend:', JSON.stringify(body, null, 2));
console.log('Paycodes esperados:', JSON.stringify(user.paycodes, null, 2));


    for (const entrada of user.paycodes) {
      const encontrada = body?.Data?.some((dia: any) =>
        dia.Paycode === entrada.paycode &&
        dia.OriginalPaycodeAmount === entrada.amount
      );
      expect(encontrada).toBeTruthy();
    }

// esperar a que se guarden los cambios y se actualice la página
//await page.waitForTimeout(5000);
// Tomar una captura de los cambios produciodos
await page.screenshot({ path: 'screenshot.png', fullPage: true });

});
});
