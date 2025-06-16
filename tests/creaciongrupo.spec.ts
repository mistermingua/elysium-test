import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
await page.goto('https://elyp.intechsol-pr.net/Login/Index');

//await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();

//   await page.getByRole('textbox', { name: 'Username' }).click();
//   await page.getByRole('textbox', { name: 'Username' }).fill('migueltorres@demo.com');
//   await page.getByRole('textbox', { name: 'Password' }).click();
//   await page.getByRole('textbox', { name: 'Password' }).fill('Intechsol2025');
//   await page.getByRole('button', { name: 'SIGN IN' }).click();
// 
// await expect(page.getByText('ELYSIUM Enterprise')).toBeVisible();
// await page.waitForTimeout(1000);


  await page.getByRole('link', { name: 'SETUP' }).click();
  await page.getByRole('treeitem', { name: ' Schedules', exact: true }).locator('span').first().click();
  await page.getByRole('link', { name: 'Schedule Groups' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('link', { name: ' Add New Schedule Group' }).click();
    await page.waitForTimeout(1000);
  await page.locator('#sg_name').fill('Auxiliar de Practicas');
  await page.getByRole('button', { name: '' }).click();
   await page.waitForTimeout(1000);
});