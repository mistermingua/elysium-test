# Comando para usar los diferentes entornos que hay

$env:DOTENV_CONFIG_PATH = ".env.pre" npx playwright test "nombre_del_test"
Esto lo que hace es indicar en la consola desde el princpio que archivo .env queremos usar en los test
Cuando se ejecuta por primera vez indicando el entorno con el que queremos trabajar podemos ejecutar los test 
con total normalidad ya que se ejecutar en ese entorno
npx playwright test "nombre_del_test" -- Este test se realizara en el entorno que hayamos marcado al principio