import { test, expect } from '@playwright/test'; // Importa las librerías necesarias de Playwright
import dotenv from 'dotenv'; // Importa dotenv para manejar variables de entorno (archivo .env)
dotenv.config(); // Carga las variables de entorno desde el archivo .env

if (!process.env.BASE_URL || !process.env.USER || !process.env.PASSWORD) {
  throw new Error('Faltan variables de entorno: BASE_URL, USER o PASSWORD');
} // Verifica que las variables de entorno necesarias estén definidas
// Si no están definidas, lanza un error para evitar que el test se ejecute sin la configuración correcta

test.use({ storageState: 'storageState.json' });
// Utiliza el estado de almacenamiento guardado en 'storageState.json' para mantener la sesión iniciada

 
test.describe('Añadir Pay Category', () => {
test('Test Pay category', async ({ page }) => {
  const baseUrl = process.env.BASE_URL!; // Obtiene la URL base desde las variables de entorno
  const response = await page.goto(`${baseUrl}/CoreApp/Payroll/Index/346`); // Navega a la página de inicio de sesión usando la URL base
  expect(response?.status()).toBe(200);

  await page.waitForTimeout(1000);

  //await page.getByRole('gridcell', { name: '$30.00' }).click();

    // Lo primero es guardar el valor de Gross antes de hacer cambios
    // Esto captura el valor del gross en la primera fila de la tabla ya que si pusieramos .nth(1).click(); capturaria el segundo valor
    const grossAntesText = await page.getByRole('gridcell', { name: /\$\d+(\.\d{2})?/ }).first().innerText(); 
    const grossAntes = parseFloat(grossAntesText.replace(/[^0-9.-]/g, ''));
    console.log(`Gross antes: ${grossAntes}`);

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

});
});