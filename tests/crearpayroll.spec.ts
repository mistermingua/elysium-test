import { test, expect } from '@playwright/test'; // Importa las librerías necesarias de Playwright
import dotenv from 'dotenv'; // Importa dotenv para manejar variables de entorno (archivo .env)
dotenv.config(); // Carga las variables de entorno desde el archivo .env

if (!process.env.BASE_URL || !process.env.USER || !process.env.PASSWORD) {
  throw new Error('Faltan variables de entorno: BASE_URL, USERNAME o PASSWORD');
} // Verifica que las variables de entorno necesarias estén definidas
// Si no están definidas, lanza un error para evitar que el test se ejecute sin la configuración correcta

test.use({ storageState: 'storageState.json' });
// Utiliza el estado de almacenamiento guardado en 'storageState.json' para mantener la sesión iniciada


// Hacer la selccion de empleados antes o rellenar con el codigo la seleccion de empleados

test('Creacion de Payroll', async ({ page }) => {

    const baseUrl = process.env.BASE_URL!; // Obtiene la URL base desde las variables de entorno
  const response = await page.goto(`${baseUrl}/CoreApp/Payroll/Index/346`); // Navega a la página de inicio de sesión usando la URL base
  expect(response?.status()).toBe(200);

    await page.waitForSelector('text=ELYSIUM Enterprise', { 
        state: 'visible',
        timeout: 5000 
    });    


  await page.getByRole('link', { name: ' ADD NEW PAYROLL BATCH' }).click();
  await page.locator('#PayrollBatchModelDiv').getByText('Select').first().click();
  // esperar a que se visible el texto siguiente Extraordinary o Normal
  await page.waitForSelector('#PayrollBatchModelDiv >> text=Extraordinary', { // Cambiar el texto en función de lo que necesites
    state: 'visible',
    timeout: 5000 // Espera hasta 5 segundos para que el texto sea visible
  });

  await page.getByRole('option', { name: 'Extraordinary' }).click(); // Selecciona la opción "Extraordinary" o "Normal" según sea necesario
  

  await page.locator('#PayrollBatchModelDiv').getByText('Select', { exact: true }).click();
  await page.waitForSelector('#PayrollBatchModelDiv >> text=Christmas Bonus', { // Cambiar el texto en función de lo que necesites
    state: 'visible',
    timeout: 5000 // Espera hasta 5 segundos para que el texto sea visible
  });
  await page.getByRole('option', { name: 'Christmas Bonus' }).click(); //elegir la opción "Christmas Bonus" o la que necesites

  await page.getByRole('combobox', { name: 'Dates Payment Date' }).click();
  await page.getByRole('combobox', { name: 'Dates Payment Date' }).fill('6/24/2025'); // Rellena el campo de fecha de pago con la fecha deseada

    await page.getByRole('combobox', { name: 'Payroll Date' }).click();
  await page.getByRole('combobox', { name: 'Payroll Date' }).fill('6/17/25'); // Rellena el campo de fecha de nómina con la fecha deseada

  await page.getByRole('combobox', { name: 'Week End Date' }).click();
  await page.getByRole('combobox', { name: 'Week End Date' }).fill('6/17/2025'); // Rellena el campo de fecha de fin de semana con la fecha deseada
  
  await page.locator('#PayrollBatchModelDiv').getByText('Timesheet', { exact: true }).click();
  // Espera a que la opcion deseada aparezca en el selector
  await page.waitForSelector('#PayrollBatchModelDiv >> text=Timesheet', { // Cambiar el texto en función de lo que necesites
    state: 'visible',
    timeout: 5000 // Espera hasta 5 segundos para que el texto sea visible
  });

  await page.getByRole('option', { name: 'Timesheet' }).click(); //Sleccionar la opcion apropieda 'FILE', 'None', 'Timesheet', etc.

  await page.locator('#divTimecard').getByText('Employees with Class assigned').click();
  // Espera a que la opcion deseada aparezca en el selector
    await page.waitForSelector('#divTimecard >> text=Employees with Class assigned', { // Cambiar el texto en funcion de lo que necesites
        state: 'visible',
        timeout: 5000 // Espera hasta 5 segundos para que el texto sea visible
    });

  await page.getByRole('option', { name: 'Current Employee Selection' }).click(); // Selecciona la opción "Current Employee Selection" o la que necesites

  // Si se necesita alguno de los siguientes pasos, descomentar las siguientes líneas:
  // await page.getByText('Exclude employees without').click();
  // await page.getByText('Include Terminated Employees').click();
  // await page.getByText('Include Historical Adjustments').click();

  await page.getByRole('button', { name: ' Launch' }).click();
    await page.waitForTimeout(5000); // Espera 5 segundos para que la página cargue completamente después de hacer clic en "Launch"

    
});