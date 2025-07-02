import { test, expect } from '@playwright/test'; // Importa las librerías necesarias de Playwright

//import 'dotenv/config'; 

import dotenv from 'dotenv'; // Importa dotenv para manejar variables de entorno (archivo .env)
dotenv.config(); // Carga las variables de entorno desde el archivo .env


import fs from 'fs'; // Importa el módulo fs para manejar archivos del sistema
import path from 'path'; // Importa el módulo path para manejar rutas de archivos

if (!process.env.BASE_URL || !process.env.USER || !process.env.PASSWORD) {
  throw new Error('Faltan variables de entorno: BASE_URL, USER o PASSWORD');
} // Verifica que las variables de entorno necesarias estén definidas
// Si no están definidas, lanza un error para evitar que el test se ejecute sin la configuración correcta

test.use({ storageState: 'storageState.json' });
// Utiliza el estado de almacenamiento guardado en 'storageState.json' para mantener la sesión iniciada




test.describe('Prueba de Modulos', () => {
test('Test Modulos y errores en javascript', async ({ page }) => {

    const errores: string[] = []; // Array para almacenar los errores de JavaScript
// Inicializa un array para almacenar los errores de JavaScript
    page.on('console', msg => {
      if (msg.type() === 'error') { // Escucha los mensajes de consola del navegador que son de tipo error
        errores.push(`⚠️ [JS Error] ${msg.text()}`);
      }
    });

  const baseUrl = process.env.BASE_URL!; // Obtiene la URL base desde las variables de entorno
  const response = await page.goto(`${baseUrl}/CoreApp/Dashboard/Index/342`); // Navega a la página de inicio de sesión usando la URL base
  expect(response?.status()).toBe(200);

  await page.waitForTimeout(1000);

    const response1 = await page.goto(`${baseUrl}/CoreApp/People/Index/917`); // Navega a la página de inicio de sesión usando la URL base
  expect(response1?.status()).toBe(200);

    await page.waitForTimeout(1000);

    

 const response2 = await page.goto(`${baseUrl}/CoreApp/TAndA/Scheduler/345#`); // Navega a la página de inicio de sesión usando la URL base
  expect(response2?.status()).toBe(200);

    await page.waitForTimeout(1000);

    
     const response3 = await page.goto(`${baseUrl}/CoreApp/TAndA/Index/344`); // Navega a la página de inicio de sesión usando la URL base
  expect(response3?.status()).toBe(200);

    await page.waitForTimeout(1000);


    const response4 = await page.goto(`${baseUrl}/CoreApp/Payroll/Index/346`); // Navega a la página de inicio de sesión usando la URL base
  expect(response4?.status()).toBe(200)

    await page.waitForTimeout(1000);
    
    const response5 = await page.goto(`${baseUrl}/MyEss/Home/Index/955`); // Navega a la página de inicio de sesión usando la URL base
    expect(response5?.status()).toBe(200);

    await page.waitForTimeout(2000);

    const response6 = await page.goto(`${baseUrl}/CoreApp/Reports/Index/356`); // Navega a la página de inicio de sesión usando la URL base
    expect(response6?.status()).toBe(200);  

    await page.waitForTimeout(2000);

    const response7 = await page.goto(`${baseUrl}/CoreApp/Setup/Index/358`); // Navega a la página de inicio de sesión usando la URL base
    expect(response7?.status()).toBe(200);

    // const rutaArchivo = 'errores_js.txt';
    const rutaArchivo = path.join(__dirname, '../errores_js.txt');

    if (fs.existsSync(rutaArchivo)) {
      fs.unlinkSync(rutaArchivo);
    }
    if (errores.length > 0) {
      fs.writeFileSync(rutaArchivo, errores.join('\n'));
      console.error('Se detectaron errores de JavaScript. Ver "errores_js.txt"');
    } else {
      console.log('Todo ok. Sin errores de JavaScript detectados.');
    }

    // Esto obliga a fallar el test si hay errores
    expect(errores, 'Errores JavaScript detectados (ver errores_js.txt)').toEqual([]);
});;});