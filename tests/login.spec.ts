import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();


test.describe('Pruebas de Automatización', () => {

  test('Login', async ({ page }) => {

  const baseUrl = process.env.BASE_URL!; // Obtiene la URL base desde las variables de entorno
  const usuario = process.env.USER!; // Obtiene el nombre de usuario desde las variables de entorno
  const password = process.env.PASSWORD!; // Obtiene la contraseña desde las variables de entorno
    try {
const response=await page.goto(`${baseUrl}/Login/Index`);  
expect(response?.status()).toBe(200);
  // Espera a que aparezca el campo de usuario para permitir que se cargue la página
  await page.waitForSelector('#user');


  // Escribe el usuario en el campo de texto
  await page.fill('#user', usuario);

  // Escribe la contraseña en su campo (password)
  await page.fill('#passwordLogin', password);

  // Hace clic en el botón de submit
  await page.click('button[type="submit"]');

  // Espera a que la web cambie de pantalla 
  await page.waitForNavigation();

  // Toma una captura de pantalla de la página después de hacer login y la guarda
  await page.screenshot({ path: 'elysium_logged_in.png' });
        await page.waitForTimeout(2000);

    } catch (error) {
      console.error('La prueba falló:', error);
      throw error;
    }
  });
});
