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


// Carga las URLs desde un archivo JSON
const rawData = fs.readFileSync(path.join(__dirname, '../data/urls.json'), 'utf8'); // Lee el archivo JSON que contiene las URLs
const {urls} = JSON.parse(rawData);  // la variable user contendrá las URLs que se van a visitar en el test
// Este archivo tiene todas las URLs que se van a visitar en el test

test('Verificacion de todas las URLs ', async ({ page }) => {
 test.setTimeout(120000); // Establece un tiempo de espera de 120 segundos para la prueba

  // Login

 const baseUrl = process.env.BASE_URL!; 

  const login = await page.goto(`${baseUrl}/Login/Index`);
  expect(login?.status()).toBe(200);

  await page.waitForTimeout(2000); // Deja tiempo a que cargue el sistema


  // Comentar o decomentar las dos siguientes lineas segun el entorno que se quiera usar (esto pasaba en pre)
      //await page.getByRole('gridcell', { name: '5385' }).click();
      //await page.getByRole('link', { name: ' SELECT' }).click();

    //await page.waitForTimeout(3000);

//const errores: string[] = []; // Array para almacenar errores de estado de las URLs

  for (const ruta of urls) { // Itera sobre cada ruta en el archivo JSON
    const url = ruta.startsWith('http') ? ruta : `${baseUrl}${ruta}`;
    const response = await page.goto(url);
    // Para que falle el test si alguna URL no responde con 200
    expect(response?.status()).toBe(200);
    //const status = response?.status();
    //console.log(`Visitando: ${url} → Estado: ${status}`);

    //if (status !== 200) {
    //  errores.push(` ${url} → Estado: ${status}`); // esto era para guardar los errores en un array
    //}
    await page.waitForTimeout(500); // Pausa entre pagina y pagina 
  }
});
