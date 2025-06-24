import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
dotenv.config();

if (!process.env.BASE_URL || !process.env.USER || !process.env.PASSWORD) {
  throw new Error('Faltan variables de entorno: BASE_URL, USERNAME o PASSWORD');
}

test.use({ storageState: 'storageState.json' });

const rawData = fs.readFileSync(path.join(__dirname, '../data/datosuser.json'), 'utf8');
const user = JSON.parse(rawData);

test.describe('Creación de usuario', () => {
test('test', async ({ page }) => {

    const baseUrl = process.env.BASE_URL!;
    const response = await page.goto(`${baseUrl}/CoreApp/People/AddEmployee`);
    expect(response?.status()).toBe(200);

    // Last Name
    //await page.waitForSelector('input[name="Last Name*"]', { state: 'visible' });
    await page.getByRole('textbox', { name: 'Last Name*' }).click();
    await page.getByRole('textbox', { name: 'Last Name*' }).fill(user.lastName);

    // First Name
   // await page.waitForSelector('input[name="First Name*"]', { state: 'visible' });
    await page.getByRole('textbox', { name: 'First Name*' }).click();
    await page.getByRole('textbox', { name: 'First Name*' }).fill(user.firstName);

    // Postal Address
    //await page.waitForSelector('#EmpPostalAddress', { state: 'visible' });
    await page.locator('#EmpPostalAddress').click();
    await page.locator('#EmpPostalAddress').fill(user.postalAddress);

    // Postal Zip Code
    //await page.waitForSelector('#EmpPostalZipCode', { state: 'visible' });
    await page.locator('#EmpPostalZipCode').click();
    await page.locator('#EmpPostalZipCode').fill(user.postalZipCode);

    // Phone
    //await page.waitForSelector('input[name="Home"]', { state: 'visible' });
    await page.getByRole('textbox', { name: 'Home' }).click();
    await page.getByRole('textbox', { name: 'Home' }).fill(user.phone);

    // Municipality
    await page.waitForSelector('div:nth-child(2) > span > .k-dropdown-wrap > .k-input', { state: 'visible' });
    await page.locator('div:nth-child(2) > span > .k-dropdown-wrap > .k-input').first().click();
    await page.waitForSelector(`role=option[name="${user.municipality}"]`, { state: 'visible', timeout: 10000 });
    await page.getByRole('option', { name: user.municipality }).click();

    // Address
    //await page.waitForSelector('#EmpAddress', { state: 'visible' });
    await page.locator('#EmpAddress').click();
    await page.locator('#EmpAddress').fill(user.address);

    // Zip Code
    //await page.waitForSelector('#EmpZipCode', { state: 'visible' });
    await page.locator('#EmpZipCode').click();
    await page.locator('#EmpZipCode').fill(user.zipCode);

    // Email
    await page.waitForSelector('input[name="Email Address*"]', { state: 'visible' });
    await page.getByRole('textbox', { name: 'Email Address*' }).click();
    await page.getByRole('textbox', { name: 'Email Address*' }).fill(user.email);

    // Municipality (again)
    await page.waitForSelector('div:nth-child(5) > span > .k-dropdown-wrap > .k-input', { state: 'visible' });
    await page.locator('div:nth-child(5) > span > .k-dropdown-wrap > .k-input').first().click();
    await page.waitForSelector(`role=option[name="${user.municipality}"]`, { state: 'visible', timeout: 10000 });
    await page.getByRole('option', { name: user.municipality }).click();

    // Gender
    await page.waitForSelector('div:nth-child(6) > div:nth-child(2) > span > .k-dropdown-wrap > .k-input', { state: 'visible' });
    await page.locator('div:nth-child(6) > div:nth-child(2) > span > .k-dropdown-wrap > .k-input').first().click();
    await page.waitForSelector('role=option[name="Male"]', { state: 'visible', timeout: 10000 });
    await page.getByRole('option', { name: 'Male', exact: true }).click();
    // Si es mujer, usa: await page.getByRole('option', { name: 'Female' }).click();

    // Birth Date
   // await page.waitForSelector('input[role="combobox"][name="Birth Date*"]', { state: 'visible' });
    await page.getByRole('combobox', { name: 'Birth Date*' }).click();
    await page.getByRole('combobox', { name: 'Birth Date*' }).fill(user.birthDate);

    // Social Security
  //  await page.waitForSelector('input[name="Social Security*"]', { state: 'visible' });
    await page.getByRole('textbox', { name: 'Social Security*' }).click();
    await page.getByRole('textbox', { name: 'Social Security*' }).fill(user.ssn);

    // Civil Status
    //await page.waitForSelector('.form-group > div:nth-child(3) > span > .k-dropdown-wrap > .k-input', { state: 'visible' });
    await page.locator('.form-group > div:nth-child(3) > span > .k-dropdown-wrap > .k-input').first().click();
    await page.waitForSelector(`role=option[name="${user.civilStatus}"]`, { state: 'visible', timeout: 10000 });
    await page.getByRole('option', { name: user.civilStatus }).click();

  await page.waitForTimeout(1000);


    // PERSONAL INFORMATION
    await page.waitForSelector('a[role="link"][name="PERSONAL INFORMATION "]', { state: 'visible' });
    await page.getByRole('link', { name: 'PERSONAL INFORMATION ' }).click();

    // SETTINGS
    await page.waitForSelector('a[role="link"][name="SETTINGS "]', { state: 'visible' });
    await page.getByRole('link', { name: 'SETTINGS ' }).click();

    // Hire Date
    await page.waitForSelector('input[role="combobox"][name="Hire Date*"]', { state: 'visible' });
    await page.getByRole('combobox', { name: 'Hire Date*' }).click();
    await page.getByRole('combobox', { name: 'Hire Date*' }).fill(user.hireDate);

    // Contract Type
    await page.waitForSelector('div:nth-child(4) > div:nth-child(2) > span > .k-dropdown-wrap > .k-input', { state: 'visible' });
    await page.locator('div:nth-child(4) > div:nth-child(2) > span > .k-dropdown-wrap > .k-input').first().click();
    await page.waitForSelector(`role=option[name="${user.contractType}"]`, { state: 'visible', timeout: 10000 });
    await page.getByRole('option', { name: user.contractType }).click();

    // Payroll Group
    await page.waitForSelector('div:nth-child(6) > .col-md-8 > span > .k-dropdown-wrap > .k-input', { state: 'visible' });
    await page.locator('div:nth-child(6) > .col-md-8 > span > .k-dropdown-wrap > .k-input').first().click();
    await page.waitForSelector(`role=option[name="${user.payrollGroup}"]`, { state: 'visible', timeout: 10000 });
    await page.getByRole('option', { name: user.payrollGroup }).click();

    // Payment Type
    await page.waitForSelector('div[role="listbox"][name="Payment Type*"] span.k-input', { state: 'visible' });
    await page.getByRole('listbox', { name: 'Payment Type*' }).locator('span').nth(1).click();
    await page.waitForSelector(`role=option[name="${user.paymentType}"]`, { state: 'visible', timeout: 10000 });
    await page.getByRole('option', { name: user.paymentType }).click();

    // Profile
    await page.waitForSelector('div[role="listbox"][name="Profile*"] span.k-input', { state: 'visible' });
    await page.getByRole('listbox', { name: 'Profile*' }).locator('span').nth(1).click();
    await page.waitForSelector(`role=option[name="${user.profile}"]`, { state: 'visible', timeout: 10000 });
    await page.getByRole('option', { name: user.profile }).click();

    // Pay Rule
    await page.waitForSelector('div:nth-child(3) > div:nth-child(2) > .col-md-8 > span > .k-dropdown-wrap > .k-input', { state: 'visible' });
    await page.locator('div:nth-child(3) > div:nth-child(2) > .col-md-8 > span > .k-dropdown-wrap > .k-input').click();
    await page.waitForSelector(`role=option[name="${user.payRule}"]`, { state: 'visible', timeout: 10000 });
    await page.getByRole('option', { name: user.payRule }).click();

    // Cost Center
    await page.waitForSelector('div[role="listbox"][name="Cost Center"] span.k-input', { state: 'visible' });
    await page.getByRole('listbox', { name: 'Cost Center' }).locator('span').nth(1).click();
    await page.waitForSelector(`role=option[name="${user.costCenter}"]`, { state: 'visible', timeout: 10000 });
    await page.getByRole('option', { name: user.costCenter }).click();

    // SETTINGS 
    await page.waitForSelector('a[role="link"][name="SETTINGS "]', { state: 'visible' });
    await page.getByRole('link', { name: 'SETTINGS ' }).click();

    // Save
    await page.waitForSelector('text=Save', { state: 'visible' });
    await page.getByText('Save', { exact: true }).click();

    // Espera a que aparezca el botón de ir al perfil
    await page.waitForSelector('button:has-text(" Go to profile")', { state: 'visible', timeout: 10000 });
    await page.getByRole('button', { name: ' Go to profile' }).click();
});
});