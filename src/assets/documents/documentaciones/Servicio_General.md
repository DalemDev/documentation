# Servicio General
Se creo un servicio para estandarizar los métodos que deben ser implementados en el servicio, esto con el fin de no repetir estos mismos métodos en cada servicio que creamos.
### Uso
El archivo se encuentra dentro en la raíz de los servicios (carpeta services) se llama ServicioGeneral

Para usarlo hacemos lo siguiente:

Como vemos en este ejemplo creamos una función para obtener información mediante condiciones esto se puede obviar creando la instancia del ServicioGeneral dentro del controlador y llamando al método correspondiente ya que este devuelve una respuesta de la clase Response.
```php
 public function obtenerNotificacionesByIdDevolucion($id_devolucion_valores = null)
    {
        $modelo = new ServicioGeneral(DevolucionValoresNotificacion::class);

        return $modelo->getByCondiciones([           
                'where' => [
                    ['id_usuario_auditor', 1],
                ],
                'with' => [
                    ['usuario']
                ]
        ]);
    }
```
Creamos una instancia del servicio y pasamos como primer parámetro el modelo que deberá usar, podemos pasar un segundo parámetro que es estados excluidos es decir estados que no queremos tomar en cuenta en consultas por defecto están E e I, con esto ya tendremos acceso a los siguientes servicios:

- index ⇒ devuelve toda la información del modelo aplica la excepción de estados
- paginate ⇒ devuelve toda la información del modelo aplica la excepción de estados y pagina la información
- getById ⇒ devuelve la información del id a buscar
- getByCondiciones ⇒ función creada con el fin de tener mas control en que necesitamos obtener en la imagen de arriba podemos ver un ejemplo
- store ⇒ crea un registro
- update ⇒ actualiza un registro
- destroy ⇒ elimina lógicamente un registro

### Mensajes de error
 Hay mensajes de error predefinidos
 
```php
const NO_ENCONTRADO = "El registro no fue encontrado";
const NO_CREADO = "El registro no se pudo crear";
const NO_ACTUALIZADO = "El registro no se pudo actualizar";
const NO_ELIMINADO = "El registro no se pudo eliminar";
```
### Auditoria
Ya que todas las tablas deben manejar campos de auditoria se ahorro este trabajo de estarlos pasando al momento de crear o actualizar un registro creando una función que me devuelve estos parámetros
```php
public static function campos($input = [], $update = true){
   $campos = [
      'ip' => getIp(),
      'terminal' => getTerminal(),
      'id_usuario_auditor' => JWTAuth::parseToken()->authenticate()->id ?? 1
   ];
    
    if($update){
      $campos['fecha_actualizacion'] = now();
    }else{
      $campos['fecha_creacion'] = now();
    }
    
    return array_merge($input, $campos);
}
```
Como vemos la función recibe dos parámetros:
1. input ⇒ campos a insertar, actualizar o eliminar
2. update ⇒ indica si se va a actualizar para aplicar fecha_actualizacion y no fecha_creacion (aplica para actualizar y eliminar)