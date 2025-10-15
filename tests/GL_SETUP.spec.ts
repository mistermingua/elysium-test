import { test, expect } from '@playwright/test'; // Importa las librerías necesarias de Playwright
import dotenv from 'dotenv'; // Importa dotenv para manejar variables de entorno (archivo .env)
dotenv.config(); // Carga las variables de entorno desde el archivo .env
import path from 'path'; // Importa path para manejar rutas de archivos

if (!process.env.BASE_URL || !process.env.USER || !process.env.PASSWORD) {
  throw new Error('Faltan variables de entorno: BASE_URL, USER o PASSWORD');
} // Verifica que las variables de entorno necesarias estén definidas
// Si no están definidas, lanza un error para evitar que el test se ejecute sin la configuración correcta

test.use({ storageState: 'storageState.json' });
// Utiliza el estado de almacenamiento guardado en 'storageState.json' para mantener la sesión iniciada

 
test.describe('Automatizacion GL', () => {
test('GENERAL LEDGER', async ({ page }) => {
  test.setTimeout(120000);
  //await page.setViewportSize({ width: 1200, height: 700 });
  const baseUrl = process.env.BASE_URL!; // Obtiene la URL base desde las variables de entorno
  const response = await page.goto(`${baseUrl}/CoreApp/Setup/Index/358`); // Navega a la página de inicio de sesión usando la URL base
  expect(response?.status()).toBe(200);
  
  await page.waitForTimeout(2000);

  await page.getByRole('treeitem', { name: ' Payroll', exact: true }).locator('span').click();
  await page.getByRole('link', { name: '09. GL' }).click();

  //await page.getByRole('link', { name: ' Add GL for EDP University' }).click();
    //await page.getByRole('link', { name: ' Add GL for ICPR Junior' }).click();
  await page.getByRole('link', { name: ' Add GL for Palmas Athletic' }).click();
 
  await page.getByRole('button', { name: ' Update' }).click();

  await page.getByRole('link', { name: ' Edit' }).click();

// Settings 
// Esperamos a que el boton de save este visible
  await page.waitForSelector('button:has-text("Save")');

  // Aplicar zoom justo aquí
  await page.evaluate(() => {
    document.body.style.zoom = "0.67";
  });


// Name
  await page.getByRole('textbox', { name: 'Name' }).click();
  await page.getByRole('textbox', { name: 'Name' }).fill('1gl.csv');
//Labor Account 

  // Tendremos que comentar la segunda linea en el caso de que no se requiera mas de una seleccion
  // Segun el entorno esto cambia
  // Universidad EDP 
  //await page.locator('#panelbar-1 div').filter({ hasText: /^DEPARTMENTSJOB TITLELOCATIONPROPUESTASSUPERVISOR$/ }).locator('div').click();
  // Palma Athletic
  //await page.locator('#panelbar-1 div').filter({ hasText: /^DepartmentLOCATIONSupervisor$/ }).locator('div').click();
  
  // Pero esta siempre se repite genericamente
  await page.getByRole('group', { name: 'Labor Accounts' }).locator('input').click();

  // Segun el perfil aparecen mas o menos opciones
  
  // Universidad EDP
  //await page.getByRole('option', { name: 'DEPARTMENTS' }).click();
  // Palma Athletic
   await page.getByRole('option', { name: 'Department' }).click();

   // TODAS ESTAS OPCIONES SON DE UNIVERSIDAD EDP
  //Esperamos medio segundo para que cargue el siguiente desplegable
  //await page.waitForTimeout(500);
  //await page.getByRole('group', { name: 'Labor Accounts' }).locator('input').click();
  //await page.getByRole('option', { name: 'JOB TITLE' }).click();
  //await page.getByRole('group', { name: 'Labor Accounts' }).locator('input').click();
  //await page.getByRole('option', { name: 'LOCATION' }).click();
  //await page.getByRole('group', { name: 'Labor Accounts' }).locator('input').click();
  //await page.getByRole('option', { name: 'PROPUESTAS' }).click();
  //await page.getByRole('group', { name: 'Labor Accounts' }).locator('input').click();
  //await page.getByRole('option', { name: 'SUPERVISOR' }).click();




// Unidentified Account
  await page.locator('#GLSetting_UnidentifiedAccount').click();
  await page.locator('#GLSetting_UnidentifiedAccount').fill('9999');
  // Rounding
  await page.getByRole('spinbutton', { name: '2.00' }).click();
  await page.locator('#GLSetting_Rounding').fill('3');
  // General Separator
  await page.locator('#GLSetting_GeneralSeparator').click();
  await page.locator('#GLSetting_GeneralSeparator').fill(','); // Elegir el separador que se quiera
  // Negative Totals
  await page.getByRole('group', { name: 'Negative Totals' }).getByLabel('select').locator('span').click();
  await page.getByRole('option', { name: 'None' }).click(); // Elegir la opcion que se quiera
// Category Groups
  await page.locator('#NewCategoryGroupName').click();
  await page.locator('#NewCategoryGroupName').fill('hola');
  
  //await page.locator('.k-widget.k-multiselect.k-header.k-multiselect-clearable.k-state-hover > .k-multiselect-wrap').click();
   await page.getByRole('group', { name: 'Category Group' }).getByRole('listbox').nth(1).click();
  await page.getByRole('option', { name: 'I - Sick' }).click();
  
  await page.locator('label').filter({ hasText: 'AutoComplete' }).click(); // Comentar esta linea si no se quiere que autocomplete
  await page.locator('#addCategoryGroup').click(); // Añadir el grupo de categorias


// Custom Column Format

await page.locator('#NewColumnFormatName').click();
  await page.locator('#NewColumnFormatName').fill('hola');
// Informacion Adicional
  await page.locator('#NewColumnFormatPrefix').click();
  await page.locator('#NewColumnFormatPrefix').fill('Hello1');



  
// Seleccion del mes, dia y año

// Selección de formato de mes
await page.getByRole('listbox').filter({ hasText: 'Month' }).getByLabel('select').locator('span').click();
await page.getByRole('option').nth(1).click(); // primera opción real (salta el placeholder)

// Selección de formato de día
await page.getByRole('listbox').filter({ hasText: 'Day' }).getByLabel('select').locator('span').click();
await page.getByRole('option').nth(2).click(); // segunda opción real

// Selección de formato de año
await page.getByRole('listbox').filter({ hasText: 'Year' }).getByLabel('select').locator('span').click();
await page.getByRole('option').nth(1).click(); // primera opción real


// Las tres lineas de abajo es lo que se ve en la pagina pero no funcionan para hacer click (a veces funciona y a veces no)
//await page.locator('#sortable-container').getByText('Month').click();
//await page.locator('#sortable-container').getByText('Day').click();
//await page.locator('#sortable-container').getByText('Year').click();

  // Otros ejemplos de formato
  //await page.getByRole('option', { name: 'MM (09)' }).click();
  //await page.getByRole('option', { name: 'dddd (Thursday)' }).click();
  //await page.getByRole('option', { name: 'yy (25)' }).click();


  // Separador
  await page.getByRole('cell').filter({ hasText: 'None' }).getByLabel('select').locator('span').click(); // Sabiebdo que none es la opcion predefinida, si no el name habria que cambiarlo
  await page.getByRole('option', { name: '/' }).click(); // Nombre del separador que deseemos

  //Otro ejemplo de separador, en este caso seleccionamos con la barra baja ya que estara ese nombre
//  await page.getByRole('listbox').filter({ hasText: '_' }).getByLabel('select').locator('span').click();
  //await page.getByRole('option', { name: 'None' }).click();

// Texto Adicional
  await page.locator('#NewColumnFormatSuffix').click();
  await page.locator('#NewColumnFormatSuffix').fill('hola2');

// Date type = Seleccion del tipo de fecha que se quiera
  await page.getByRole('listbox').filter({ hasText: 'Select...' }).getByLabel('select').locator('span').click();
  // Dos opciones disponibles, descomentar la que se quiera usar
  await page.getByRole('option', { name: 'CurrentDate' }).click();
  //await page.getByRole('option', { name: 'PaymentDate' }).click();

// Añadir el formato de columna
  await page.locator('#addColumnFormat').click();




// Añadir Custom Column
  await page.locator('#addCustomColumnButton').click();
  await page.getByRole('textbox', { name: 'Custom Column Name' }).click();
  await page.getByRole('textbox', { name: 'Custom Column Name' }).fill('hola1');
  await page.getByRole('group', { name: 'Add Custom Column' }).getByLabel('select').locator('span').click();
  await page.getByRole('option', { name: 'Colums (1)' }).click();
  await page.getByRole('textbox', { name: '...' }).click();
  await page.getByRole('textbox', { name: '...' }).fill('hola');
  // Añadimos otra columna personalizada
  await page.locator('#addCustomColumnButton').click();
  await page.locator('input[name="GLSetting.CustomColumns[1].CustomName"]').click();
  await page.locator('input[name="GLSetting.CustomColumns[1].CustomName"]').fill('hola4');
  // En este caso seleccionamos 2 columnas
  await page.getByRole('listbox').filter({ hasText: 'Select Format...' }).getByLabel('select').locator('span').click();
  await page.getByRole('option', { name: 'Colums (2)' }).click();
  // Elegimos la opcion que queramos en este caso yo selecciono Total
  await page.getByRole('listbox').filter({ hasText: 'Select Column...' }).getByLabel('select').locator('span').click();
  await page.getByRole('option', { name: 'Total', exact: true }).click();




  // PRIMER SAVE
    page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: ' Save' }).click();


// Cerramos SETTINGS
  await page.getByRole('link', { name: 'SETTINGS ' }).click();



// COLUMN EDITOR NO SERA FUNCIONAL DE MOMENTO

//// Abrimos column editor
//// COLUMN EDITOR  
await page.getByRole('link', { name: 'COLUMN EDITOR ' }).click();
//
//// Drag and Drop de las columnas que queramos
//const src = page.locator('#availableReportColumnsList li:has-text("Total Debit")').first();
//const dst = page.locator('#ReportSettingsGrid .k-grid-content tbody').first();
//
//await src.waitFor({ state: 'visible' });
//await dst.waitFor({ state: 'visible' });
//
//const sBox = await src.boundingBox();
//const dBox = await dst.boundingBox();
//
//if (!sBox || !dBox) throw new Error('No bounding boxes');
//
//await page.mouse.move(sBox.x + sBox.width/2, sBox.y + sBox.height/2);
//await page.mouse.down();
//// pasa “por dentro” del grid para disparar dragover
//await page.mouse.move(dBox.x + 10, dBox.y + 10, { steps: 15 });
//await page.mouse.move(dBox.x + dBox.width/2, dBox.y + 5, { steps: 10 });
//await page.mouse.up();
//
//await expect(page.locator('#ReportSettingsGrid')).toContainText('Total Debit');
//
//
//
//// Origen = el item a arrastrar
////const source = page.locator('#availableReportColumnsList').getByText('Credit Description');
//
//// Destino = la caja/lista donde se deben soltara las columnas
////const target = page.locator('#ReportSettingsGrid');
//// Usar este elemtno prara hacer drop en la posicion correcta
////<div class="k-widget k-grid k-display-block k-editable" id="ReportSettingsGrid" data-role="grid"><table role="grid"><colgroup><col style="width:200px"><col style="width:100px"><col style="width:80px"><col style="width:120px"><col style="width:80px"><col style="width:100px"><col style="width:100px"></colgroup><thead class="k-grid-header" role="rowgroup"><tr role="row"><th class="k-header" data-field="ColumnNameForDisplay" data-index="0" data-title="Name" scope="col" data-role="columnsorter"><a class="k-link" href="/CoreApp/Gl/ReportSettings_Read/1416?glId=16&amp;ReportSettingsGrid-sort=ColumnNameForDisplay-asc">Name</a></th><th class="k-header" data-field="Length" data-index="1" data-title="Maximum Characters" scope="col" data-role="columnsorter"><a class="k-link" href="/CoreApp/Gl/ReportSettings_Read/1416?glId=16&amp;ReportSettingsGrid-sort=Length-asc">Maximum Characters</a></th><th class="k-header" data-field="FillChar" data-index="2" data-title="Fill Char" scope="col" data-role="columnsorter"><a class="k-link" href="/CoreApp/Gl/ReportSettings_Read/1416?glId=16&amp;ReportSettingsGrid-sort=FillChar-asc">Fill Char</a></th><th class="k-header" data-field="Position" data-index="3" data-title="Position" scope="col" data-role="columnsorter"><a class="k-link" href="/CoreApp/Gl/ReportSettings_Read/1416?glId=16&amp;ReportSettingsGrid-sort=Position-asc">Position</a></th><th class="k-header" data-field="GroupBy" data-index="4" data-title="Agrupar" scope="col" data-role="columnsorter"><a class="k-link" href="/CoreApp/Gl/ReportSettings_Read/1416?glId=16&amp;ReportSettingsGrid-sort=GroupBy-asc">Agrupar</a></th><th class="k-header" data-field="" data-index="5" data-title="Orden" scope="col"><a class="k-link" href="/CoreApp/Gl/ReportSettings_Read/1416?glId=16&amp;ReportSettingsGrid-sort=-asc">Orden</a></th><th class="k-header" data-field="Order" data-index="6" data-title="Orden" scope="col" style="display:none" data-role="columnsorter"><a class="k-link" href="/CoreApp/Gl/ReportSettings_Read/1416?glId=16&amp;ReportSettingsGrid-sort=Order-asc">Orden</a></th><th class="k-header" data-index="7" scope="col"><span class="k-link">&nbsp;</span></th></tr></thead><tbody role="rowgroup"><tr data-uid="f6e71e86-0f5d-4257-a4ea-456fa8a82a53" role="row"><td class="" role="gridcell">CurrentDate</td><td class="" role="gridcell">50</td><td class="" role="gridcell"> </td><td class="" role="gridcell">Select</td><td class="" role="gridcell"><input type="checkbox" class="chkbx-is-group-by"></td><td role="gridcell"><a href="#" class="k-button k-button-icon k-grid-move-up k-state-disabled" title="Move Up" style="pointer-events: none;"><span class="fa fa-arrow-circle-up"></span></a><a href="#" class="k-button k-button-icon k-grid-move-down" title="Move Down"><span class="fa fa-arrow-circle-down"></span></a></td><td style="display:none" class="" role="gridcell">1</td><td class="k-command-cell" role="gridcell"><a role="button" class="k-button k-button-icontext k-grid-delete" href="#"><span class="k-icon k-i-close"></span>Delete</a></td></tr><tr class="k-alt" data-uid="df33b3c8-b4b6-445a-97e0-86822ae9fa7d" role="row"><td class="" role="gridcell">PaymentDate</td><td class="" role="gridcell">50</td><td class="" role="gridcell"> </td><td class="" role="gridcell">Select</td><td class="" role="gridcell"><input type="checkbox" class="chkbx-is-group-by"></td><td role="gridcell"><a href="#" class="k-button k-button-icon k-grid-move-up" title="Move Up"><span class="fa fa-arrow-circle-up"></span></a><a href="#" class="k-button k-button-icon k-grid-move-down" title="Move Down"><span class="fa fa-arrow-circle-down"></span></a></td><td style="display:none" class="" role="gridcell">2</td><td class="k-command-cell" role="gridcell"><a role="button" class="k-button k-button-icontext k-grid-delete" href="#"><span class="k-icon k-i-close"></span>Delete</a></td></tr><tr data-uid="4f6201da-2737-4e54-aa4a-26965c05f3f5" role="row"><td class="" role="gridcell">Total</td><td class="" role="gridcell">50</td><td class="" role="gridcell"> </td><td class="" role="gridcell">Select</td><td class="" role="gridcell"><input type="checkbox" class="chkbx-is-group-by"></td><td role="gridcell"><a href="#" class="k-button k-button-icon k-grid-move-up" title="Move Up"><span class="fa fa-arrow-circle-up"></span></a><a href="#" class="k-button k-button-icon k-grid-move-down k-state-disabled" title="Move Down" style="pointer-events: none;"><span class="fa fa-arrow-circle-down"></span></a></td><td style="display:none" class="" role="gridcell">3</td><td class="k-command-cell" role="gridcell"><a role="button" class="k-button k-button-icontext k-grid-delete" href="#"><span class="k-icon k-i-close"></span>Delete</a></td></tr></tbody></table></div>
//
//// Arrastrar y soltar (drag and drop)
////await source.dragTo(target);
//
//
//
//
//
//// Guardar el grupo y aceptar el popup de que ha salido exitosamente
//
//  await page.getByRole('textbox', { name: 'Guardar como nuevo grupo' }).click();
//  await page.getByRole('textbox', { name: 'Guardar como nuevo grupo' }).fill('hola');
//  page.once('dialog', dialog => {
//    console.log(`Dialog message: ${dialog.message()}`);
//    dialog.dismiss().catch(() => {});
//  });
//  await page.getByRole('button', { name: ' Guardar Como Nuevo Grupo' }).click();
//
//
////-----------------------------------------------------------------------------------------------

// Desmarcar si se quiere cabecera fija
  await page.getByRole('checkbox', { name: 'Header' }).check();
// Rellenar el numero de filas que se quieran fijar
  await page.locator('#headerColumns').click();
  await page.locator('#headerColumns').fill('1');
  await page.locator('#headerRows').click();
  await page.locator('#headerRows').fill('1');
  await page.getByRole('button', { name: ' Aplicar' }).click();
  await page.getByRole('cell', { name: '+' }).getByRole('textbox').click();
  await page.getByRole('cell', { name: '+' }).getByRole('textbox').fill('@CUSTOMCOLUMNAME');

// Cerrar column editor
  await page.getByRole('link', { name: 'COLUMN EDITOR ' }).click();



// Chart of Account

// Abrimos Chart of Account
  await page.getByRole('link', { name: 'CHART OF ACCOUNT ' }).click();
// Importar desde excel todos los datos que tendra el chart of account
// Esto de abajo hace que se abra el explorador de archivos pero no funciona en Playwright
 //await page.getByRole('button', { name: 'Importar desde Excel:' }).click();
// Usamos path.join para tener la ruta correcta del archivo que queremos subir
const filePath = path.join(__dirname, '../Chart of account.xlsx');
await page.getByRole('button', { name: 'Importar desde Excel:' }).setInputFiles(filePath);

// Aceptar el popup de que se ha subido correctamente
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  // Hacemos click en importar
  await page.getByRole('button', { name: 'Importar', exact: true }).click();
// Esperamos un poco a que cargue
  await page.waitForTimeout(500);  

  // Cerrar chart of account
  await page.getByRole('link', { name: 'CHART OF ACCOUNT ' }).click();


// Preview y generacion del reporte

  await page.getByRole('link', { name: 'Preview ' }).click();
  await page.getByRole('menuitem', { name: 'PREVIEW  Preview  Generate' }).getByLabel('select').locator('span').click();
  // Elegir el periodo que se quiera
  await page.getByRole('option', { name: '/ Bi-Weekly / 38' }).click();
  // Generar reporte
await page.getByRole('button', { name: ' Generate Report' }).click();
// Tomamos un pantallazo del reporte generado
  await page.screenshot({ path: 'gl_report.png', fullPage: true });
  // Descargar el reporte
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: ' Download' }).click();
  const download = await downloadPromise;






});
});