import { test, expect } from '@playwright/test'; // Importa las librerías necesarias de Playwright
import dotenv from 'dotenv'; // Importa dotenv para manejar variables de entorno (archivo .env)
dotenv.config(); // Carga las variables de entorno desde el archivo .env

if (!process.env.BASE_URL || !process.env.USER || !process.env.PASSWORD) {
  throw new Error('Faltan variables de entorno: BASE_URL, USER o PASSWORD');
} // Verifica que las variables de entorno necesarias estén definidas
// Si no están definidas, lanza un error para evitar que el test se ejecute sin la configuración correcta

test.use({ storageState: 'storageState.json' });
// Utiliza el estado de almacenamiento guardado en 'storageState.json' para mantener la sesión iniciada

 
test.describe('Prueba 401K', () => {
test('Test de Creacion de Bloque de 401K', async ({ page }) => {
  const baseUrl = process.env.BASE_URL!; // Obtiene la URL base desde las variables de entorno
  const response = await page.goto(`${baseUrl}/CoreApp/Setup/Index/358`); // Navega a la página de inicio de sesión usando la URL base
  expect(response?.status()).toBe(200);
    test.setTimeout(120000); // Establece un tiempo de espera de 120 segundos para la prueba

  await page.waitForTimeout(2000);
// BLOQUE 1: PAY CATEGORY
// Creamos la “categoría de pago” que el sistema usará para registrar los aportes del 401k.
// Accedemos a la seccion de Payroll y Pay Categories para crear un nuevo Pay Category de 401K Employee
  await page.getByRole('treeitem', { name: ' Payroll', exact: true }).locator('span').click();
  await page.getByRole('link', { name: 'Pay Categories' }).click();
  await page.getByRole('link', { name: ' Add new Pay Category' }).click();
//Esperamos 2 segundos a que cargue el formulario
    await page.waitForTimeout(1000);

  await page.getByRole('link', { name: ' Add new Pay Category' }).click();

  await page.getByRole('textbox', { name: 'Name*' }).click();
  await page.getByRole('textbox', { name: 'Name*' }).fill('401K Employee');

  await page.getByRole('textbox', { name: 'Abbreviation*' }).click();
  await page.getByRole('textbox', { name: 'Abbreviation*' }).fill('401K_EE');

  await page.getByRole('listbox', { name: 'Type*' }).getByLabel('select').locator('span').click();
  await page.getByRole('option', { name: 'Deduction' }).click();

  await page.getByRole('listbox', { name: 'Format*' }).getByLabel('select').locator('span').click();
  await page.getByRole('option', { name: 'Money' }).click();

  await page.getByRole('listbox', { name: 'Subdivision*' }).getByLabel('select').locator('span').click();
  await page.getByRole('option', { name: 'Personal Deductions' }).click();

  await page.getByRole('listbox', { name: 'Tax Subdivision' }).getByLabel('select').locator('span').click();
  await page.getByRole('option', { name: 'WAGES' }).click();

// En el caso de necesitar Pay Codes desmarcar lo siguiente:
    // Seleccionamos el multiselect de Pay Codes por  primera vez y seleccionamos los siguientes:
  //await page.locator('.k-multiselect-wrap').click();
  //await page.getByRole('option', { name: 'Active Duty' }).click();--> Seleccionamos el pay code que queramos
// Despues para cada pay code aditivo hay que añadir la linea de abajo
  //await page.getByRole('listbox', { name: 'Pay Codes' }).click(); --> Añadir por cada pay code
  //await page.getByRole('option', { name: 'Car Allowance' }).click(); --> Seleccionamos el pay code que queramos

// La seleccion del checkbox de "Print On Stubs/Checks" no funciona con el siguiente comando al parecer hay un bug

//await page.locator('label[for="BooleanCat_print"]').click();
//
//await page.locator('#BooleanCat_print').check();
//
//  await page.getByRole('checkbox', { name: 'Print On Stubs/Checks' }).check();
//  await page.locator('.editor-field > .k-checkbox-label').first().click();
//  await page.locator('div:nth-child(19) > .k-checkbox-label').click();
//// esperamos 5 segundos para ver que todo este bien
//    await page.waitForTimeout(5000);

// Damos click en el boton de Create para crear el Pay Category
  await page.getByRole('button', { name: ' Update' }).click();

// BLOQUE 2: TOTALIZERS

// Creamos un nuevo Totalizer para el Pay Category de 401K Employee
  await page.getByRole('link', { name: 'Totalizers' }).click();
  await page.getByRole('link', { name: ' Add New Totalizer' }).click();
  await page.getByRole('textbox', { name: 'Name' }).click();
  await page.getByRole('textbox', { name: 'Name' }).fill('ACUMULADOR_401K_EE');
  await page.getByRole('textbox', { name: 'Abbreviation' }).click();
  await page.getByRole('textbox', { name: 'Abbreviation' }).fill('401K_YTD');
// Aqui vinculamos la categoria creada en el primera paso
  await page.locator('.k-multiselect-wrap').click();
  await page.getByRole('option', { name: '401K Employee' }).click();
  // esperamos 1 segundo a que se seleccione
  await page.getByRole('button', { name: ' Update' }).click();

// El sistema necesita saber cuánto se ha acumulado en el año para cortar cuando llegue al tope de 15,000 USD.

// BLOQUE 3: FORMULAS

  await page.getByRole('link', { name: 'Formulas' }).click();
  await page.getByRole('link', { name: ' Add New Formula' }).click();

    await page.getByRole('link', { name: ' Add New Formula' }).click();
  await page.getByRole('textbox', { name: 'Name' }).click();
  await page.getByRole('textbox', { name: 'Name' }).fill('401K_aporte_empleado');
  // Seleccionamos el Pay Category creado en el primer paso
  await page.getByRole('listbox', { name: 'Pay Category' }).getByLabel('select').locator('span').click();
  await page.getByRole('option', { name: '401K Employee' }).click();
  await page.getByRole('spinbutton').click();
  await page.getByRole('spinbutton', { name: 'Decimals Quantity' }).fill('2'); // Redondeo a 2 decimales
  // Hacemos click donde dice "Rounded" ya que el checkbox no funciona en playwright
  await page.locator('label').filter({ hasText: 'Rounded' }).click();

  await page.getByRole('textbox', { name: 'Formula', exact: true }).click();
  await page.getByRole('textbox', { name: 'Formula', exact: true }).fill('!I_REGULAR * 0.10\n');
  // Con la formula anterior le estamos diciendo que el aporte del empleado es el 10% del salario regular

    // Con esto indicamos que el valor que se va a devolver es un monto fijo y no un porcentaje
  await page.getByRole('textbox', { name: 'Formula Amount' }).click();
  await page.getByRole('textbox', { name: 'Formula Amount' }).fill('1'); // Fijo
  // Guardamos la formula
  await page.getByRole('button', { name: ' Update' }).click();

// BLOQUE 4: PAYROLL CLASSES
// Asigna la formula creada a una clase de nómina para que el sistema la aplique en cada pago.

  await page.getByRole('link', { name: 'Payroll Classes' }).click();
  await page.getByRole('link', { name: ' Add new Payroll Class' }).click();
  await page.getByRole('textbox', { name: 'Name' }).click();
  await page.getByRole('textbox', { name: 'Name' }).fill('Demo 401k Weekly');

  await page.getByRole('listbox', { name: 'Type *' }).getByLabel('select').locator('span').click();
  await page.getByRole('option', { name: 'Normal' }).click(); // Seleccionamos el tipo Normal

  await page.getByRole('listbox', { name: 'Frequency *' }).getByLabel('select').locator('span').click();
  await page.getByRole('option', { name: 'Bi-Weekly' }).click(); // Seleccionamos la frecuencia Bi-Weekly

  // La fecha viene predigfinada por el sistema al dia en el que se crea la clase
  // Desmarcar esto en el caso de querer cambiar la fecha
  //await page.getByRole('combobox', { name: 'Effective Date *' }).click();
  //await page.getByRole('combobox', { name: 'Effective Date *' }).fill('10/15/2025');

  // El valor 2 viene por defecto en el sistema: Show Reminder
  // Desmarcar y poner lo que se quiera en el caso de querer cambiar el valor
  await page.getByRole('spinbutton', { name: '2' }).click();
  await page.getByRole('spinbutton', { name: 'Show Reminder day(s) before.' }).fill('2');

// El valor 0 viene por defecto en el sistema: Period Hours
// Desmarcar y poner lo que se quiera en el caso de querer cambiar el valor
  await page.getByRole('spinbutton', { name: '0' }).first().click();
  await page.getByRole('spinbutton', { name: 'Period Hours*' }).fill('0');

// El valor 0 viene por defecto en el sistema: Show Warning After
// Desmarcar y poner lo que se quiera en el caso de querer cambiar el valor
  await page.getByRole('spinbutton', { name: '0', exact: true }).click();
  await page.getByRole('spinbutton', { name: 'Show Warning After' }).fill('0');

  await page.getByRole('spinbutton', { name: '$' }).click();
  await page.locator('#cla_max_amount').fill('0');

  // Seleccionamos el desplegable de Formulas para asignar la creada en el paso anterior
  await page.getByRole('link', { name: 'Formulas ' }).click();
  await page.locator('div').filter({ hasText: /^Select Formulas$/ }).click();
  await page.getByRole('option', { name: '401K_aporte_empleado' }).click();

  // En default pay code seleccionamos "None" para que no asigne ningun pay code por defecto
  await page.getByRole('listbox', { name: 'Default Pay Code' }).getByLabel('select').locator('span').click();
  await page.locator('#cla_cat_to_pay_id-list').getByText('None').click();
  // Guardamos la clase de nomina
  await page.getByRole('button', { name: ' Update' }).click();

  // BLOQUE 5: ATTRIBUTES
// Define el campo donde se guarda la aportación del empleado (por ejemplo, cuánto % quiere que se le descuente para el 401k).

  await page.getByRole('link', { name: 'Attributes' }).click();
  await page.getByRole('link', { name: ' Add new Attribute' }).click();

  await page.getByRole('textbox', { name: 'Name' }).click();
  await page.getByRole('textbox', { name: 'Name' }).fill('401K');

  await page.getByRole('textbox', { name: 'Abbreviation' }).click();
  await page.getByRole('textbox', { name: 'Abbreviation' }).fill('401K');

  await page.getByRole('listbox', { name: 'Attributes Type' }).getByLabel('select').locator('span').click();
  await page.getByRole('option', { name: 'Voluntary Deductions' }).click();// Seleccionamos Voluntary Deductions

  // En este caso no se necesita tabla de referencia, dejar en blanco
  // Si se necesitara tabla de referencia, descomentar las siguientes lineas y seleccionar la tabla que se necesite

  //await page.getByRole('listbox', { name: 'Table' }).getByLabel('select').locator('span').click();
  //await page.getByRole('option', { name: 'CFSE' }).click();

  await page.locator('.k-dropdown-wrap.k-state-default.k-state-hover > .k-select > .k-icon').click();
  await page.getByRole('option', { name: 'Numeric' }).click(); // Seleccionamos Numeric

  await page.getByRole('spinbutton').click();
  await page.locator('#txtNumAdtType').fill('0'); // Valor por defecto 0

  // Seleccionamos el checkbox de Obligatory
  await page.locator('label').filter({ hasText: 'Obligatory' }).click();
  // Actualizamos el atributo
  await page.getByRole('button', { name: ' Update' }).click();






  });
});