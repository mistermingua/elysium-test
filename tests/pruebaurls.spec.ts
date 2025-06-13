import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.BASE_URL || !process.env.USERNAME || !process.env.PASSWORD) {
  throw new Error('Faltan variables de entorno: BASE_URL, USERNAME o PASSWORD');
}

test.use({ storageState: 'storageState.json' });
// Utiliza el estado de almacenamiento guardado en 'storageState.json' para mantener la sesión iniciada

test('Verificacion de todas las URLs ', async ({ page }) => {
  // Login

 const baseUrl = process.env.BASE_URL!; 

  const login = await page.goto(`${baseUrl}/Login/Index`);
  expect(login?.status()).toBe(200);

  await page.waitForTimeout(2000); // Deja tiempo a que cargue el sistema

  // Y ahora uno por uno
  const urls = [
    'https://elysium.intechsol-pr.net/CentralApp/DashboardItems/Index/972',
    'https://elysium.intechsol-pr.net/CoreApp/Dashboard/Index/342',
    'https://elysium.intechsol-pr.net/CentralApp/Dashboard/Index/971',
    'https://elysium.intechsol-pr.net/MyEss/Home/Index/955',
    'https://elysium.intechsol-pr.net/CoreApp/Evaluations/Index/1254',
    'https://elysium.intechsol-pr.net/CoreApp/ExtPositions/Index/964',
    'https://elysium.intechsol-pr.net/CoreApp/GlobalEditions/Index/973',
    'http://www.intechsol-pr.com/help',
    'https://elysium.intechsol-pr.net/ICS/TaxesForms/Index/914',
    'https://elysium.intechsol-pr.net/CoreApp/GlobalEditions/ImportExport/1127',
    'https://elysium.intechsol-pr.net/CentralApp/Menus/Index/916',
    'https://elysium.intechsol-pr.net/CentralApp/News/Index/360',
    'https://elysium.intechsol-pr.net/CentralApp/Notifications/Index/1245',
    'https://elysium.intechsol-pr.net/CoreApp/Payroll/Index/346',
    'https://elysium.intechsol-pr.net/CentralApp/UserProfile/Index/930',
    'https://elysium.intechsol-pr.net/CentralApp/Purge/Index/1363',
    'https://elysium.intechsol-pr.net/CoreApp/Positions/Index/354',
    'https://elysium.intechsol-pr.net/CoreApp/Reports/Index/356',
    'https://elysium.intechsol-pr.net/CoreApp/People/Index/917',
    'https://elysium.intechsol-pr.net/CoreApp/SalaryDifferentials/Setup/1087',
    'https://elysium.intechsol-pr.net/CoreApp/TAndA/Scheduler/345',
    'https://elysium.intechsol-pr.net/CentralApp/ServicesManager/Index/1364',
    'https://elysium.intechsol-pr.net/CoreApp/Setup/Index/358',
    'https://elysium.intechsol-pr.net/ICS/TaxesForms/Index/1346',
    'https://elysium.intechsol-pr.net/CoreApp/TAndA/Index/344',
    'https://elysium.intechsol-pr.net/CentralApp/Users/Index/932',
    'https://elysium.intechsol-pr.net/CentralApp/Integrations/index/1408'
  ];

  for (const url of urls) {
    const response = await page.goto(url);
    console.log(`Visitando: ${url}`);
    expect(response?.status()).toBe(200);
    await page.waitForTimeout(500); // Pequeña pausa opcional entre páginas
  }
});
