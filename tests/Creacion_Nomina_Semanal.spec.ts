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

test('Creacion de Payroll de clase Normal y semanal', async ({ page }) => {
// Hacemos que el timeout de la prueba sea de 120 segundos
  test.setTimeout(120000); // Establece un tiempo de espera de 120 segundos para la prueba
    const baseUrl = process.env.BASE_URL!; // Obtiene la URL base desde las variables de entorno
  const response = await page.goto(`${baseUrl}/CoreApp/Payroll/Index/346`); // Navega a la página de inicio de sesión usando la URL base
  expect(response?.status()).toBe(200);

    await page.waitForSelector('text=ELYSIUM Enterprise', { 
        state: 'visible',
        timeout: 5000 
    });    


    // En el caso de que queramos seleccionar todos los empleados tenemos que descomentar esto

  //await page.getByText('Miguel Torres').hover(); // Aqui se deberia poner otra cosa, no mi nombre
  //
  //await page.getByText('Employee Selection', { exact: true }).click();
  //await page.waitForTimeout(1000);
  //await page.getByRole('row', { name: 'ID Last Name First Name' }).getByRole('checkbox').check();
  //await page.getByRole('link', { name: ' SELECT' }).click();


await page.waitForTimeout(2000);


  await page.getByRole('link', { name: ' ADD NEW PAYROLL BATCH' }).click();
  await page.getByRole('listitem').filter({ hasText: 'Class Type * Select' }).getByLabel('select').locator('span').click();
  await page.getByRole('option', { name: 'Normal' }).click(); // Seleccionar el tipo de clase que se quiera, en este caso Normal
  await page.waitForTimeout(2000);
  await page.getByRole('listbox', { name: 'Class' }).getByLabel('select').locator('span').click();
  await page.getByRole('option', { name: 'BIWEEKLY' }).click(); // Seleccionar la clase que se quiera, en este caso BIWEEKLY
  
    // Guardamos la fecha actual copiada de la fecha del sistema
    const fechaActual = await page.getByRole('combobox', { name: 'Payroll Date' }).inputValue();

  await page.getByRole('combobox', { name: 'Dates Payment Date' }).click();
  await page.getByRole('combobox', { name: 'Dates Payment Date' }).fill(fechaActual); // Cambiar con la fecha de pago que corresponda
  
  await page.getByRole('combobox', { name: 'Week End Date' }).click();
  await page.getByRole('combobox', { name: 'Week End Date' }).fill(fechaActual); // Cambiar con la fecha de cierre que corresponda
  

  // Elegir el centro de coste correspondiente
  await page.getByRole('gridcell', { name: 'Cost Center 1' }).click(); // Cambiar esto en funcion del centro de coste que se quiera seleccionar
  //await page.getByRole('gridcell', { name: 'Cost Center 2' }).click();
  //await page.getByRole('gridcell', { name: 'TEST' }).click();

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
  

  const grossAntesText = await page.getByRole('gridcell', { name: /\$\d+(\.\d{2})?/ }).first().innerText(); 
    const grossAntes = parseFloat(grossAntesText.replace(/[^0-9.-]/g, ''));
    console.log(`Gross antes: ${grossAntes}`);

    // Esperamos un par de segundos para que se cargue la página
  await page.waitForTimeout(2000);

  // Segun el batch que queramos editar cambiara o no el boton que hay que pulsar
  // Se tendria que descomentar el boton que se quiera pulsar
  await page.getByRole('button', { name: '' }).first().click(); // Este seria el primer boton de editar
  //await page.getByRole('button', { name: '' }).nth(1).click(); // Este seria el segundo boton de editar
  //await page.getByRole('button', { name: '' }).nth(2).click(); // Este seria el tercer boton de editar

// Añadimos el pay Category al batch seleccionado
  await page.getByRole('button', { name: ' Add Pay Category' }).click();
  // Desplegamos el menu
  await page.locator('#divPayCat').getByLabel('select').locator('span').click();
  // Seleccionamos la categoria de pago que queremos añadir, Sera siempre vacation
  //await page.getByRole('listbox').filter({ hasText: /^$/ }).fill('Vacation');
  await page.getByRole('option', { name: 'Vacation', exact: true }).click();
  // Selccionamos OK para añadir la categoria de pago
  await page.getByRole('button', { name: ' Ok' }).click();
    await page.waitForTimeout(1000);
    // En la ventana que sale avisandonos tambien pulsamos OK
  await page.getByRole('link', { name: ' OK' }).click();
  // Ahora añadimos el valor que le queremos dar en este caso a la vaciones / el 3 es de ejemplo, se podria poner cualquier valor
  await page.getByRole('gridcell', { name: '0.00', exact: true }).click();
  await page.locator('#HoursAmount1').fill('3');
  // Pulsamos el boton de guardar y calcular
  await page.getByRole('button', { name: ' Save and Calculate' }).click();
  await page.waitForTimeout(1000);
  // En la ventana que sale avisandonos tambien pulsamos OK
  await page.getByRole('link', { name: ' OK' }).click();

await page.waitForTimeout(2000);

// Usamos expect.poll para esperar a que el valor de Gross se actualice
// Esto es necesario porque el valor de Gross se recalcula después de guardar y calcular
await expect.poll(async () => { // Función que se ejecuta periódicamente para comprobar el valor de Gross
  const text = await page.getByRole('gridcell', { name: /\$\d+(\.\d{2})?/ }).first().innerText(); 
  console.log('Gross recalculado:', text);
  return parseFloat(text.replace(/[^0-9.-]/g, ''));
},).not.toBe(grossAntes);

// Si el valor de Gross no se actualiza, el test fallará
// Si todo funciona correctamente se captura el nuevo valor de Gross
const grossDespuesText = await page.getByRole('gridcell', { name: /\$\d+(\.\d{2})?/ }).first().innerText();
const grossDespues = parseFloat(grossDespuesText.replace(/[^0-9.-]/g, ''));
console.log(`Gross después: ${grossDespues}`);

    // Finalmente comparamos el valor de Gross antes y después de los cambios
    expect(grossDespues).toBeGreaterThan(grossAntes);
  
    // Cerramos la nomina
  await page.getByRole('button', { name: '' }).first().click();
  await page.getByRole('button', { name: ' Ok' }).click();

  //Clicamos el boton de dolar para ver el registro de la nomina
  await page.getByRole('button', { name: '' }).first().click();
  await page.waitForTimeout(2000); // Esperamos a que se cargue la página de registro de nómina
  await page.getByRole('button', { name: ' Close' }).click();


  // Continuamos con la generacion de reportes

await page.getByRole('button', { name: '' }).first().click();
    // Primer reporte
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: '» Payroll Register' }).click();
  const page1 = await page1Promise;
  await expect(page1).toHaveURL(/\.pdf/i);
await page1.close();

    // Segundo reporte
  const page2Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: '» Payroll Summary' }).click();
  const page2 = await page2Promise;
  await expect(page2).toHaveURL(/\.pdf/i);
  // esperamos 4 segundos
  await page2.waitForTimeout(4000);
await page2.close();

    // Tercer reporte
  const page3Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: '» Pay Slip Print Cash' }).click();
  const page3 = await page3Promise;
    await expect(page3).toHaveURL(/\.pdf/i);
await page3.close();
});
