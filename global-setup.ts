import fs from 'fs';
import { chromium, expect } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const STORAGE_PATH = path.join(__dirname, 'storageState.json');
const MAX_RETRIES = 3;

if (!process.env.BASE_URL || !process.env.USER || !process.env.PASSWORD) {
  throw new Error('Faltan variables de entorno: BASE_URL, USER o PASSWORD');
} // Verifica que las variables de entorno necesarias estén definidas

const baseUrl = process.env.BASE_URL!;
const username = process.env.USER!;
const password = process.env.PASSWORD!;

export default async () => {
  let sessionValida = false;
  let retryCount = 0;

  while (!sessionValida && retryCount < MAX_RETRIES) {
    try {
      if (fs.existsSync(STORAGE_PATH)) {
        const browser = await chromium.launch();
        const context = await browser.newContext({ 
          storageState: STORAGE_PATH,
          viewport: { width: 1920, height: 1080 }
        });
        const page = await context.newPage();

        // Verificar sesión
        await page.goto(`${baseUrl}/CoreApp/Dashboard/Index/342`, { 
          waitUntil: 'networkidle',
          timeout: 30000 
        });

        // Verificacion de que estamos logueados
        const isLoggedIn = await page.getByText('ELYSIUM Enterprise').isVisible()
          .catch(() => false);

        if (isLoggedIn) {
          console.log('✅ Sesión válida y activa');
          sessionValida = true;
          await browser.close();
          return;
        }

        await browser.close();
      }

      // Si llegamos aquí, necesitamos una nueva sesión
      console.log('🔄 Iniciando nueva sesión...');
      await createNewSession();
      retryCount++;
      
    } catch (error) {
      console.error(`⚠️ Intento ${retryCount + 1} fallido:`, error);
      retryCount++;
    }
  }

  if (!sessionValida) {
    throw new Error('❌ No se pudo establecer una sesión válida después de varios intentos');
  }
};

async function createNewSession() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(`${baseUrl}/Login/Index`);
    await page.waitForSelector('input[name="user"]');
    await page.fill('input[name="user"]', username);
    await page.fill('input[name="passwordLogin"]', password);
    await page.click('button[type="submit"]');

    // Esperar a que el login sea exitoso
    await page.waitForSelector('text=ELYSIUM Enterprise', { timeout: 10000 });
    
    // Guardar el estado
    await context.storageState({ path: STORAGE_PATH });
    console.log('✅ Nueva sesión creada y guardada');
    
  } catch (error) {
    console.error('❌ Error creando nueva sesión:', error);
    throw error;
  } finally {
    await browser.close();
  }
}