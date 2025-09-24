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

test('Creacion de Payroll de clase Normal de tipo MENSUAL', async ({ page }) => {

    const baseUrl = process.env.BASE_URL!; // Obtiene la URL base desde las variables de entorno
  const response = await page.goto(`${baseUrl}/CoreApp/Payroll/Index/346`); // Navega a la página de inicio de sesión usando la URL base
  expect(response?.status()).toBe(200);


    // En el caso de que queramos seleccionar todos los empleados tenemos que descomentar esto

  //await page.getByText('Miguel Torres').hover(); // Aqui se deberia poner otra cosa, no mi nombre
  //
  //await page.getByText('Employee Selection', { exact: true }).click();
  //await page.waitForTimeout(1000);
  //await page.getByRole('row', { name: 'ID Last Name First Name' }).getByRole('checkbox').check();
  //await page.getByRole('link', { name: ' SELECT' }).click();


await page.waitForTimeout(2000);
  // Comentar o decomentar las dos siguientes lineas segun el entorno que se quiera usar  (esto pasaba en pre)
      //await page.getByRole('gridcell', { name: '5385' }).click();
      //await page.getByRole('link', { name: ' SELECT' }).click();

    //await page.waitForTimeout(3000);

  await page.getByRole('link', { name: ' ADD NEW PAYROLL BATCH' }).click();
  await page.getByRole('listitem').filter({ hasText: 'Class Type * Select' }).getByLabel('select').locator('span').click();
  await page.getByRole('option', { name: 'Normal' }).click(); // Seleccionar el tipo de clase que se quiera, en este caso Normal
  await page.waitForTimeout(2000);
  await page.getByRole('listbox', { name: 'Class' }).getByLabel('select').locator('span').click();
  await page.getByRole('option', { name: 'Monthly' }).click(); // Seleccionar la clase que se quiera, en este caso BIWEEKLY
  
  // Guardamos la fecha actual copiada de la fecha del sistema
    const fechaActual = await page.getByRole('combobox', { name: 'Payroll Date' }).inputValue();

  await page.getByRole('combobox', { name: 'Dates Payment Date' }).click();
  await page.getByRole('combobox', { name: 'Dates Payment Date' }).fill(fechaActual); // Cambiar con la fecha de pago que corresponda
  
  await page.getByRole('combobox', { name: 'Week End Date' }).click();
  await page.getByRole('combobox', { name: 'Week End Date' }).fill(fechaActual); // Cambiar con la fecha de cierre que corresponda
  
  //await page.getByRole('gridcell', { name: 'Cost Center 1' }).click(); // Cambiar esto en funcion del centro de coste que se quiera seleccionar
  //await page.getByRole('gridcell', { name: 'Cost Center 2' }).click();
  //await page.getByRole('gridcell', { name: 'Cost Center 3' }).click();

  await page.locator('#divTimecard').getByLabel('select').locator('span').click();
  await page.getByRole('option', { name: 'Current Employee Selection' }).click(); // Seleccionar la opción de selección de empleados actual
  
  await page.getByRole('button', { name: ' Change Employee Selection' }).click(); // Seleccionamos el empleado que queremos
  // Esperamos a que se abra la ventana de selección de empleados
  await page.waitForTimeout(2000);
  await page.locator('#txtHyperfinCondition').click(); // Hacemos click en el campo de búsqueda de empleados
  await page.locator('#txtHyperfinCondition').fill('Swift'); // Cambiamos el nombre del empleado por el que se quiera buscar

// Le damos al boton de buscar para encontrar al empleado
  await page.getByLabel('Change Employee Selection').getByRole('button', { name: ' Find' }).click();
  // Y como la busqueda sera especifica selccionamos todos, siempre sera un empleado
  await page.waitForTimeout(2000); // Esperamos a que se cargue la lista de empleados
  await page.getByRole('row', { name: 'ID Last Name First Name' }).getByRole('checkbox').check();
  await page.getByRole('link', { name: ' SELECT' }).click();
  // Hacemos la selección del empleado que se quiera
  await page.getByRole('button', { name: ' Launch' }).click(); // Lanzamos el proceso de creación de la nómina

  await page.waitForTimeout(2000); // Esperamos a que se cargue la página de creación de la nómina
  // Fin
    
});
