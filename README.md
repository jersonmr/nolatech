# Test de Nolatech

Este test fue hecho como prueba técnica para la empresa Nolatech. Está realizado con node.js y su framework Express

## Dependencias necesarias para instalar el proyecto:

1. Nodejs >= 18
2. MySQL para manejar la base de datos

## Instalación

Abrir una terminal en tu equipo y ubicarte en un directorio donde quieras instalar el proyecto

-   Clonar el repositorio
-   Ejecutar el comando `cp .env.example .env`
-   Reemplazar las variables de entorno con los valores reales de conexión a la base de datos así como de cliente de email

> En este caso para revisar los emails utilice [Mailtrap](https://mailtrap.io)

Por defecto el proyecto corre en el puerto 3000 pero puedes configurar tu propio puerto en el archivo `.env`

## Ejecutar el proyecto

Ubícate en una terminal en el directorio donde instalaste el proyecto y ejecuta el comando `npm run dev`

## Ejecutar el seeder

Para fines prácticos cree un seeder que inserta varios registros de usuarios

Para agregar estos usuarios, en otra terminal y teniendo el servidor corriendo ejecuta el comando `npm run db:import`

Si deseas eliminar los usuarios registrados ejecuta el comando `npm run db:delete`

---

## Sección API

Para revisar los endpoints puede utilizarse un cliente como Postman o cualquier otro parecido

Todos los endpoints tienen por defecto la url base `http://localhost:3000/api/v1`

### Endpoints

-   GET - http://localhost:3000/api/v1/users?page=1&count=10
-   GET - http://localhost:3000/api/v1/users/{id}
-   POST - http://localhost:3000/api/v1/users
-   PUT - http://localhost:3000/api/v1/users/{id}
-   DELETE - http://localhost:3000/api/v1/users/{id}
