import { test, chromium } from '@playwright/test';


test.describe('Test de Carga', () => {
test('Test',async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  const start = Date.now();
  const response = await page.goto('https://elysium.intechsol-pr.net', { timeout: 20000 });
  const time = Date.now() - start;

  console.log(`⏱️ Tiempo de carga: ${time} ms`);
  console.log(`📶 Status: ${response?.status()}`);

  await page.waitForTimeout(3000);
  await browser.close();
});
});

