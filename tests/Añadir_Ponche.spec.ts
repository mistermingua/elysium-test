import { test, expect, request } from '@playwright/test';
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
  await page.locator('#txtHyperfinCondition').fill(user.lastName); // Cambiamos el nombre del empleado por el que se quiera buscar
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

  


  await page.locator('tr:nth-child(4) > .FirstIn').click();
  await page.locator('#FirstInTimePicker').fill('9:00 am');
  await page.locator('tr:nth-child(4) > .FirstOut').click();
  await page.locator('#FirstOutTimePicker').fill('14:00 pm');
  await page.locator('tr:nth-child(4) > .SecondIn').click();
  await page.locator('#SecondInTimePicker').fill('15:00 pm');
  await page.locator('tr:nth-child(4) > .SecondOut').click();
  await page.locator('#SecondOutTimePicker').fill('19:00 pm');

  
//
  //await page.locator('tr:nth-child(3) > .FirstIn').click();
  //await page.locator('#FirstInTimePicker').fill('9:00 am');
  //await page.locator('tr:nth-child(3) > .FirstOut').click();
  //await page.locator('#FirstOutTimePicker').fill('14:00 pm');
  //await page.locator('tr:nth-child(3) > .SecondIn').click();
  //await page.locator('#SecondInTimePicker').fill('15:00 pm');
  //await page.locator('tr:nth-child(3) > .SecondOut').click();
  //await page.locator('#SecondOutTimePicker').fill('19:00 pm');
//
//    await page.locator('tr:nth-child(5) > .FirstIn').click();
//  await page.locator('#FirstInTimePicker').fill('9:00 am');
//  await page.locator('tr:nth-child(5) > .FirstOut').click();
//  await page.locator('#FirstOutTimePicker').fill('14:00 pm');
//  await page.locator('tr:nth-child(5) > .SecondIn').click();
//  await page.locator('#SecondInTimePicker').fill('15:00 pm');
//  await page.locator('tr:nth-child(5) > .SecondOut').click();
//  await page.locator('#SecondOutTimePicker').fill('19:00 pm');
//
//    await page.locator('tr:nth-child(6) > .FirstIn').click();
//  await page.locator('#FirstInTimePicker').fill('9:00 am');
//  await page.locator('tr:nth-child(6) > .FirstOut').click();
//  await page.locator('#FirstOutTimePicker').fill('14:00 pm');
//  await page.locator('tr:nth-child(6) > .SecondIn').click();
//  await page.locator('#SecondInTimePicker').fill('15:00 pm');
//  await page.locator('tr:nth-child(6) > .SecondOut').click();
//  await page.locator('#SecondOutTimePicker').fill('19:00 pm');
//
//    await page.locator('tr:nth-child(7) > .FirstIn').click();
//  await page.locator('#FirstInTimePicker').fill('9:00 am');
//  await page.locator('tr:nth-child(7) > .FirstOut').click();
//  await page.locator('#FirstOutTimePicker').fill('14:00 pm');
//  await page.locator('tr:nth-child(7) > .SecondIn').click();
//  await page.locator('#SecondInTimePicker').fill('15:00 pm');
//  await page.locator('tr:nth-child(7) > .SecondOut').click();
//  await page.locator('#SecondOutTimePicker').fill('19:00 pm');
//
//    await page.locator('tr:nth-child(8) > .FirstIn').click();
//  await page.locator('#FirstInTimePicker').fill('9:00 am');
//  await page.locator('tr:nth-child(8) > .FirstOut').click();
//  await page.locator('#FirstOutTimePicker').fill('14:00 pm');
//  await page.locator('tr:nth-child(8) > .SecondIn').click();
//  await page.locator('#SecondInTimePicker').fill('15:00 pm');
//  await page.locator('tr:nth-child(8) > .SecondOut').click();
//  await page.locator('#SecondOutTimePicker').fill('19:00 pm');


//await page.getByText('SAVE', { exact: true }).click();


const [responseSave] = await Promise.all([
      page.waitForResponse(res =>
        res.url().includes('/UpdateTimecardDates') &&
        res.request().method() === 'POST'
      ),
      page.getByText('SAVE', { exact: true }).click()
    ]);


const body = await responseSave.json();

console.log('Respuesta del backend:', JSON.stringify(body, null, 2));
console.log('Horarios esperados:', JSON.stringify(user.ponches, null, 2));

for (const horarioEsperado of user.ponches) {
  const encontrado = body?.Data?.some((dia: any) => 
    dia.FirstIn === horarioEsperado.FirstIn &&
    dia.FirstOut === horarioEsperado.FirstOut &&
    dia.SecondIn === horarioEsperado.SecondIn &&
    dia.SecondOut === horarioEsperado.SecondOut
  );

  expect(encontrado).toBeTruthy();
}





// esperar a que se guarden los cambios y se actualice la página
//await page.waitForTimeout(5000);
// Tomar una captura de los cambios produciodos
await page.screenshot({ path: 'screenshot.png', fullPage: true });

});
});


//fetch("https://elysium.intechsol-pr.net/CoreApp/TAndA/ReadDailyTotals", {
//  "body": "sort=Id-asc&group=&aggregate=DailyAmount-sum~DailyHours-sum&filter=&emp_emplo=907&from=7%2F2%2F2025+12%3A00%3A00+AM&to=7%2F2%2F2025+12%3A00%3A00+AM&type=Daily",
//  "method": "POST"
//});
//sort: Id-asc
//group: 
//aggregate: DailyAmount-sum~DailyHours-sum
//filter: 
//emp_emplo: 907
//from: 6/30/2025 12:00:00 AM
//to: 6/30/2025 12:00:00 AM
//type: Daily
//


