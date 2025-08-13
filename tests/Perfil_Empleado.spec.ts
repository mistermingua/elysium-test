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
const rawData = fs.readFileSync(path.join(__dirname, '../data/Change_User.json'), 'utf8'); // Lee el archivo JSON que contiene los datos del usuario
const user = JSON.parse(rawData);  // la variable user contendrá los datos del usuario que se va a crear
// Este archivo contiene los datos del usuario que se va a crear, como nombre, apellido, dirección, etc.

test.describe('Editar datos del usuario', () => {
test('test', async ({ page }) => {
    test.setTimeout(120000); // Establece un tiempo de espera de 120 segundos para la prueba

    const baseUrl = process.env.BASE_URL!;
    const response = await page.goto(`${baseUrl}/CoreApp/People/Index/917`);
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

    const response1 = await page.goto(`${baseUrl}/CoreApp/People/Index/917`);
    expect(response1?.status()).toBe(200);

  await page.getByRole('link', { name: '' }).click();
  await page.waitForTimeout(1000);
// Cambios basicos en el perfil del empleado
  await page.getByRole('textbox', { name: 'Full Name* Last Name*' }).click();
  await page.getByRole('textbox', { name: 'Full Name* Last Name*' }).fill(user.lastName);

  await page.getByRole('textbox', { name: 'First Name*' }).click();
  await page.getByRole('textbox', { name: 'First Name*' }).fill(user.firstName);

  await page.getByRole('textbox', { name: 'Postal Address* Line 1* Line' }).click();
  await page.getByRole('textbox', { name: 'Postal Address* Line 1* Line' }).fill(user.postalAddress);

  await page.locator('#employeeBasicProfile_EmpPostalZipCode').click();
  await page.locator('#employeeBasicProfile_EmpPostalZipCode').fill(user.postalZipCode);


  await page.getByRole('listbox', { name: 'Country*' }).getByLabel('select').locator('span').click();
  await page.getByRole('option', { name: user.country }).click();

  await page.getByRole('textbox', { name: 'Physical Address* Line 1*' }).click();
  await page.getByRole('textbox', { name: 'Physical Address* Line 1*' }).fill(user.postalAddress);

  await page.locator('#employeeBasicProfile_emp_zip_code').click();
  await page.locator('#employeeBasicProfile_emp_zip_code').fill(user.postalZipCode);


  await page.locator('#txtSocSec').click();
  await page.locator('#txtSocSec').fill(user.ssn);

  //await page.locator('.k-dropdown-wrap.k-state-default.k-state-hover > .k-select > .k-icon').click();
  //await page.locator('.k-dropdown-wrap.k-state-default.k-state-hover > .k-select').click();
  await page.locator('.col-lg-8 > .k-widget > .k-dropdown-wrap > .k-select > .k-icon').first().click();
  await page.getByRole('option', { name: user.country }).click();

  await page.getByRole('listbox', { name: 'Gender*' }).getByLabel('select').locator('span').click();
  await page.getByRole('option', { name: 'Female' }).click();

  // En el caso de que sea hombre descomentar esto
  // await page.getByRole('listbox', { name: 'Gender*' }).getByLabel('select').locator('span').click();
  // await page.getByRole('option', { name: 'Male', exact: true }).click();


  await page.getByRole('combobox', { name: 'Birth* Date*' }).click();
  await page.getByRole('combobox', { name: 'Birth* Date*' }).fill(user.birthDate);

  await page.getByRole('listbox', { name: 'Civil Status*' }).getByLabel('select').locator('span').click();
  await page.getByRole('option', { name: user.civilStatus }).click();

  await page.getByRole('textbox', { name: 'Email Address*' }).click();
  await page.getByRole('textbox', { name: 'Email Address*' }).fill(user.email);

  await page.getByRole('textbox', { name: 'Employee ID No*' }).click();
  await page.getByRole('textbox', { name: 'Employee ID No*' }).fill(user.employeeId);

  await page.getByRole('textbox', { name: 'Username*' }).click();
  await page.getByRole('textbox', { name: 'Username*' }).fill(user.userName);

  await page.getByRole('listbox', { name: 'Profile*' }).getByLabel('select').locator('span').click();
  await page.getByRole('option', { name: user.profile }).click();

  await page.getByRole('combobox', { name: 'Hire Date* Date*' }).click();
  await page.getByRole('combobox', { name: 'Hire Date* Date*' }).fill(user.hireDate);

  //await page.getByRole('listbox', { name: 'Status*', exact: true }).getByLabel('select').locator('span').click();
  //await page.getByRole('option', { name: user.status }).click();

  await page.getByRole('listbox', { name: 'Contract*' }).getByLabel('select').locator('span').click();
  await page.getByRole('option', { name: user.contractType }).click();

  await page.getByRole('listbox', { name: 'Payroll Group*' }).getByLabel('select').locator('span').click();
  await page.getByRole('option', { name: user.payrollGroup }).click();

  await page.getByRole('listbox', { name: 'Payment Type*' }).getByLabel('select').locator('span').click();
  await page.getByRole('option', { name: user.paymentType }).click();

  await page.getByRole('listbox', { name: 'Legal Status*' }).getByLabel('select').locator('span').click();
  await page.getByRole('option', { name: user.LegalStatus }).click();


// Time and Attendance

  await page.getByRole('tab', { name: 'Time and Attendance' }).click();

  await page.getByRole('textbox', { name: 'Badge Number' }).click();
  await page.getByRole('textbox', { name: 'Badge Number' }).fill(user.badgeNumber);

  await page.getByRole('listbox', { name: 'Supervisor' }).getByLabel('select').locator('span').click();
  await page.getByRole('option', { name: user.supervisor }).click();

  await page.getByRole('listbox', { name: 'Schedule Group' }).getByLabel('select').locator('span').click();
  await page.getByRole('option', { name: user.scheduleGroup }).click();

  await page.getByRole('listbox', { name: 'Accrual Group' }).getByLabel('select').locator('span').click();
  await page.getByRole('option', { name: user.acrualGroup }).click();

  await page.getByRole('listbox', { name: 'License Group' }).getByLabel('select').locator('span').click();
  await page.getByRole('option', { name: user.licenseGroup }).click();

// Payroll / Add new salary
  await page.getByRole('tab', { name: 'Payroll' }).click();

  await page.locator('#SalaryFrom').click();
  await page.locator('#SalaryFrom').fill(user.dateSalary);

  await page.getByRole('spinbutton').first().click();
  await page.locator('#HourlyRate').fill(user.hourlyRate);
  
  // Guardar los cambios realizados en el perfil del empleado
  await page.locator('#btnAddNewSalary').click();
  await page.getByRole('menuitem', { name: 'imageSave' }).locator('span').click();

// esperar a que se guarden los cambios y se actualice la página
//await page.waitForTimeout(5000);
// Tomar una captura de los cambios produciodos
await page.screenshot({ path: 'screenshot.png', fullPage: true });

});
});
