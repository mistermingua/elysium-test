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


// Carga de datos de usuarios desde un documetno externo .json
const rawData = fs.readFileSync(path.join(__dirname, '../data/datosuser.json'), 'utf8'); // Lee el archivo JSON que contiene los datos del usuario
const user = JSON.parse(rawData);  // la variable user contendrá los datos del usuario que se va a crear
// Este archivo contiene los datos del usuario que se va a crear, como nombre, apellido, dirección, etc.

test.describe('Creación de usuario', () => {
test('test', async ({ page }) => {
test.setTimeout(120000); // Establece un tiempo de espera de 120 segundos para la prueba
// Esto es útil para pruebas que pueden tardar más tiempo en completarse, como la creación de un usuario.
    const baseUrl = process.env.BASE_URL!;


    // Comprobacion de que los request estan OK antes de continuar

// await Promise.all([
//   page.waitForResponse(res => res.url().includes('GetCountriesList') && res.status() === 200),
//   page.waitForResponse(res => res.url().includes('GetStatesList') && res.status() === 200),
//   page.waitForResponse(res => res.url().includes('GetProfilesAsElysiumListObject') && res.status() === 200)
// ]);

// Navega a la URL de creación de empleados y verifica que la respuesta sea 200 OK
    const response = await page.goto(`${baseUrl}/CoreApp/People/AddEmployee`); // ver los eventos que se disparan cuando termina de cargar la url?
    expect(response?.status()).toBe(200); 

// Esto asegura que se ha cargado correctamente el HTML, Imagenes, CSS, JS, etc. de la página antes de continuar con la prueba
    await page.waitForLoadState('load'); 
// Pero esto no asegura que peticiones AJAX hayan terminado de cargar, por lo que se debe esperar a que las respuestas de las peticiones AJAX sean 200 OK antes de continuar con la prueba

await Promise.all([
  page.waitForResponse(res => res.url().includes('GetCountriesList') && res.status() === 200),
  page.waitForResponse(res => res.url().includes('GetProfilesAsElysiumListObject') && res.status() === 200)
]);
// Con esto de arriba se asegura que las peticiones AJAX especificas han terminado de cargar antes de continuar con la prueba

    //await page.waitForTimeout(2000);

//await page.waitForResponse(response =>
//  response.url().includes('GetCountriesList') && response.status() === 200
//);

    await page.waitForTimeout(2000);

    await page.getByRole('textbox', { name: 'Last Name*' }).click();
  await page.getByRole('textbox', { name: 'Last Name*' }).fill(user.lastName); // Poner aqui el apellido del usuario que se va a crear
    //await page.waitForTimeout(1500); 
  await page.getByRole('textbox', { name: 'First Name*' }).click();
  await page.getByRole('textbox', { name: 'First Name*' }).fill(user.firstName); // Poner aqui el nombre del usuario que se va a crear

//await page.waitForTimeout(1500); 

  await page.locator('#EmpPostalAddress').click();
  await page.locator('#EmpPostalAddress').fill(user.postalAddress); // Poner aqui la direccion del usuario que se va a crear
  
  await page.waitForTimeout(1500);   
  
  await page.locator('#EmpPostalZipCode').click();
  await page.locator('#EmpPostalZipCode').fill(user.postalZipCode); // Poner aqui el codigo postal del usuario que se va a crear
  
  await page.waitForTimeout(1500); 
  
  await page.getByRole('textbox', { name: 'Home' }).click();
  await page.getByRole('textbox', { name: 'Home' }).fill(user.phone); // Poner aqui el telefono del usuario que se va a crear
  
  await page.waitForTimeout(1500); 
  
  await page.locator('div:nth-child(2) > span > .k-dropdown-wrap > .k-input').first().click();
  await page.waitForTimeout(1500); 
  await page.getByRole('option', { name: user.municipality }).click(); // Poner aqui el municipio del usuario que se va a crear

  await page.waitForTimeout(1500); 
  
  await page.locator('#EmpAddress').click();
  await page.locator('#EmpAddress').fill(user.address); // Poner aqui la direccion del usuario que se va a crear
  
  await page.waitForTimeout(1500); 
  
  await page.locator('#EmpZipCode').click();
  await page.locator('#EmpZipCode').fill(user.zipCode); // Poner aqui el codigo postal del usuario que se va a crear
  
  await page.waitForTimeout(1500); 
  
  await page.getByRole('textbox', { name: 'Email Address*' }).click();
  await page.getByRole('textbox', { name: 'Email Address*' }).fill(user.email); // Poner aqui el email del usuario que se va a crear
  
  await page.waitForTimeout(1500); 
  
  await page.locator('div:nth-child(5) > span > .k-dropdown-wrap > .k-input').first().click();
  await page.waitForTimeout(1500); 
  await page.getByRole('option', { name: user.municipality }).click(); // Poner aqui el municipio del usuario que se va a crear

  await page.waitForTimeout(1500); 

  await page.locator('div:nth-child(6) > div:nth-child(2) > span > .k-dropdown-wrap > .k-input').first().click();
  await page.waitForTimeout(1500); 
  // En el caso de que sea hombre poner:
  await page.getByRole('option', { name: 'Male', exact: true }).click();
  // En el caso de que sea mujer poner:
  //await page.getByRole('option', { name: 'Female' }).click();
  
  //await page.waitForTimeout(1500); 
    
  await page.getByRole('combobox', { name: 'Birth Date*' }).click();
  await page.getByRole('combobox', { name: 'Birth Date*' }).fill(user.birthDate); // Poner aqui la fecha de nacimiento del usuario que se va a crear
  
  //await page.waitForTimeout(2000); 
  
  await page.getByRole('textbox', { name: 'Social Security*' }).click();
  await page.getByRole('textbox', { name: 'Social Security*' }).fill(user.ssn); // Poner aqui el numero de seguro social del usuario que se va a crear
  // 
  
    
  await page.locator('.form-group > div:nth-child(3) > span > .k-dropdown-wrap > .k-input').first().click();
  await page.waitForSelector(`role=option[name="${user.civilStatus}"]`, { state: 'visible', timeout: 10000 });

  await page.getByRole('option', { name: user.civilStatus }).click(); // Poner el estado civil en name, entre: 'Single', 'Married', 'Widowed', 'Not Specific'
 // await page.waitForTimeout(1500); 
  await page.getByRole('link', { name: 'PERSONAL INFORMATION ' }).click();

await page.waitForTimeout(2000); // Esperar que el menu de arriba se cierre para abir el de abajo

  await page.getByRole('link', { name: 'SETTINGS ' }).click();
  //await page.waitForTimeout(1500); 
  await page.getByRole('combobox', { name: 'Hire Date*' }).click();
  await page.getByRole('combobox', { name: 'Hire Date*' }).fill(user.hireDate); // Poner aqui la fecha de contratacion del usuario que se va a crear
  
  //await page.waitForTimeout(1500); 
  
  await page.locator('div:nth-child(4) > div:nth-child(2) > span > .k-dropdown-wrap > .k-input').first().click();
  //await page.waitForTimeout(1500); 
  await page.waitForSelector(`role=option[name="${user.contractType}"]`, { state: 'visible' });

  await page.getByRole('option', { name: user.contractType }).click(); // Poner el tipo de contrato correspondiente.

  //await page.waitForTimeout(1500); 
  
  await page.locator('div:nth-child(6) > .col-md-8 > span > .k-dropdown-wrap > .k-input').first().click();
  //
  // await page.waitForTimeout(1500); 

  await page.waitForSelector(`role=option[name="${user.payrollGroup}"]`, { state: 'visible'});

  await page.getByRole('option', { name: user.payrollGroup }).click(); // Poner el grupo de nomina correspondiente.
  
  //await page.waitForTimeout(1500); 

  await page.getByRole('listbox', { name: 'Payment Type*' }).locator('span').nth(1).click();
  //
  // await page.waitForTimeout(1500); 
  await page.waitForSelector(`role=option[name="${user.paymentType}"]`, { state: 'visible', timeout: 10000 });

  await page.getByRole('option', { name: user.paymentType }).click(); // Poner el tipo de pago correspondiente.
  
  //await page.waitForTimeout(1500); 

  await page.getByRole('listbox', { name: 'Profile*' }).locator('span').nth(1).click();
  await page.waitForSelector(`role=option[name="${user.profile}"]`, { state: 'visible' });

  // await page.waitForTimeout(1500); 
  await page.getByRole('option', { name: user.profile }).click(); // Poner el perfil correspondiente.
  
  //await page.waitForTimeout(1500); 

    await page.getByRole('textbox', { name: 'Badge Number*' }).click();
  await page.getByRole('textbox', { name: 'Badge Number*' }).fill(user.badgeNumber); // Poner el numero de placa del usuario, en este caso sera repetido para provocar el error en la pagina
  // Poner el numero de placa del usuario, en este caso sera repetido para provocar el error en la pagina  


  await page.getByRole('textbox', { name: 'Identification No.*' }).click();
  await page.getByRole('textbox', { name: 'Identification No.*' }).fill(user.identificationNumber); // Poner el numero de identificacion del usuario, en este caso sera repetido para provocar el error en la pagina
// Poner el numero de identificacion del usuario, en este caso sera repetido para provocar el error en la pagina

  await page.getByRole('textbox', { name: 'Username*' }).click();
  await page.getByRole('textbox', { name: 'Username*' }).fill(user.userName); // Poner el nombre de usuario del usuario, en este caso sera repetido para provocar el error en la pagina
// Poner el nombre de usuario del usuario, en este caso sera repetido para provocar el error en la pagina
  
    
  await page.locator('div:nth-child(3) > div:nth-child(2) > .col-md-8 > span > .k-dropdown-wrap > .k-input').click();
//  await page.waitForTimeout(1500); 
  await page.waitForSelector(`role=option[name="${user.payRule}"]`, { state: 'visible'});
  await page.getByRole('option', { name: user.payRule }).click(); // Regla de pago correspondiente.

// await page.waitForTimeout(1500); 

  await page.getByRole('listbox', { name: 'Cost Center' }).locator('span').nth(1).click();
  //await page.waitForTimeout(1500);
await page.waitForSelector(`role=option[name="${user.costCenter}"]`, { state: 'visible'});

  await page.getByRole('option', { name: user.costCenter }).click(); //Selecciona el centro de costo correspondiente.
  
  await page.waitForTimeout(1000); 
  
  await page.getByRole('link', { name: 'SETTINGS ' }).click();
  //await page.getByRole('link', { name: 'CUSTOM FIELDS ' }).click();
  //await page.getByRole('link', { name: 'BANK INFORMATION ' }).click();
  await page.waitForTimeout(1000); 
  await page.getByText('Save', { exact: true }).click();
    await page.waitForTimeout(3000); // Espera 3 segundos para que se guarde el usuario y salga el mensaje de exito
  await page.getByRole('button', { name: ' Go to profile' }).click();




});
});


