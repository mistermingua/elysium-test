import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.BASE_URL || !process.env.USER || !process.env.PASSWORD) {
  throw new Error('Faltan variables de entorno: BASE_URL, USER o PASSWORD');
} 
test.use({ storageState: 'storageState.json' });
// Utiliza el estado de almacenamiento guardado en 'storageState.json' para mantener la sesión iniciada

test('test', async ({ page }) => {
  const baseUrl = process.env.BASE_URL!;
  const response = await page.goto(`${baseUrl}/CoreApp/Reports/Index/356`);
  expect(response?.status()).toBe(200);
  await page.waitForTimeout(2000);

  await page.locator('div').filter({ hasText: /^Accruals$/ }).locator('span').click();
  await page.getByText('» Taken Licenses').click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('link', { name: 'image Build Your Own Report' }).click();
  await page.getByRole('link', { name: 'REPORTS' }).click();
  await page.locator('div').filter({ hasText: /^Custom Reports$/ }).locator('span').click();
  await page.getByText('General Ledger').click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByText('Hours by Labor Account (ITS)').click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByText('Payroll Liabilities').click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.locator('div').filter({ hasText: /^Custom Reports$/ }).locator('span').click();
  await page.getByRole('link', { name: 'image Employee Self-Service (' }).click();
  await page.getByRole('link', { name: 'image Frequently Used' }).click();
  await page.locator('div').filter({ hasText: /^Human Resources$/ }).locator('span').click();
  await page.getByText('» Anniversaries').click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByText('» Birthdays').click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByText('» Emails').click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByText('» Employee Record').click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByText('» Headcount').click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByText('» Postal Addresses').click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByText('» Salary History').click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByText('» Terminated Employees').click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.locator('div').filter({ hasText: /^Payroll$/ }).locator('span').click();
  await page.getByText('» CFSE (Corp. Fondo del').click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('treeitem', { name: '» Christmas Bonus', exact: true }).locator('span').click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByText('» Department of Labor').click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('treeitem', { name: '» Disbursements', exact: true }).locator('span').click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('treeitem', { name: '» Payroll Register', exact: true }).locator('span').click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByText('» Payroll Summary').click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByText('Paycheck Protection Program').click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByText('Paycheck Protection Report').click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('link', { name: 'image Recommended' }).click();
  await page.getByRole('treeitem', { name: '» Christmas Bonus', exact: true }).locator('span').click();
  await page.getByRole('button', { name: 'Close' }).click();
  //await page.locator('.k-overlay').click();
  //await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('treeitem', { name: '» Punch Details', exact: true }).locator('span').click();
  await page.getByRole('button', { name: 'Close' }).click();
  // await page.getByRole('treeitem', { name: ' image Recruitment', exact: true }).locator('span').click();
  // await page.getByRole('link', { name: 'Hired Applicants' }).click();
  // await page.getByRole('cell', { name: '<!-- Web.Config Configuration File --> <configuration> <system.web> <customErrors mode="Off"/> </system.web> </configuration>', exact: true }).locator('pre').click();
  await page.getByRole('link', { name: 'image Reports Tray' }).click();
  await page.getByRole('link', { name: 'image Taxes (ICS)' }).click();
  await page.locator('div').filter({ hasText: /^Time & Attendance$/ }).locator('span').click();
  await page.getByText('» Hours By Labor Account').click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByText('» Manual Editions').click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByText('» Overtimes').click();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('treeitem', { name: '» Punch Details', exact: true }).locator('span').click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByText('» Punch Sources').click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByText('» Sign Off + Payroll Lock').click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByText('» Weekly Schedule').click();
  await page.getByRole('button', { name: 'Close' }).click();
  
});