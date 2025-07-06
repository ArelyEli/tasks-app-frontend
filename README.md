# Frontend – Aplicación de Gestión de Tareas

Este repositorio contiene el frontend de una aplicación de gestión de tareas desarrollada con **Angular 20**.  
Proporciona una interfaz amigable para que los usuarios puedan crear, consultar, actualizar y eliminar tareas. Está integrada con servicios de AWS para autenticación y consumo de la API.

---

## Ejecución
Actualmente la aplicación se encuentra desplegada en AWS S3 y CloudFront.
Puede ser visitada y testeada en la siguiente URL:

https://d2q23mc6g7ehph.cloudfront.net/

---

## Funcionalidades

- **Autenticación de usuarios** (Registro, inicio de sesión, cierre de sesión y verificación de correo con AWS Cognito)
- **Gestión de tareas** (Operaciones CRUD con API REST)
- Interfaz amigable con componentes modulares en Angular
- Integración con el backend de la aplicación desplegada en AWS

---

## Estructura del proyecto

```bash
src/app/components/
├── auth/          # Formularios de login y registro
│   ├── login/
│   └── signup/
│   └── verify-account/
├── core/          # Vistas principales
│   ├── home/
│   └── tasks/
│   └── create-task/
│   └── navbar/
├── guards/          # Guardas de rutas
└── services/        # Servicios de autenticación y consumo de la API
```
## Componentes implementados

- `HomeComponent`: Página de bienvenida
- `NavbarComponent`: Barra de navegación
- `LoginComponent` / `SignupComponent`: Formulario de autenticación
- `TasksComponent`: Lista y acciones sobre tareas
- `CreateTaskComponent`: Formulario de creación de tareas

---
## Autenticación

El registro e inicio de sesión se realiza mediante AWS Cognito.
Los tokens JWT obtenidos tras iniciar sesión se almacenan y se envían automáticamente en cada solicitud a la API, de esta forma se puede autenticar y autorizar el acceso a las rutas protegidas.

### Flujo de autenticación

1. El usuario ingresa sus credenciales en el formulario.
2. Se autentica mediante AWS Cognito.
3. Se obtiene un token JWT que se guarda localmente.
4. El token se adjunta a cada petición a la API.
5. Las rutas protegidas solo son accesibles si el token está presente.

## Protección de rutas
La aplicación implementa guardas de rutas (Route Guards) para restringir el acceso a las vistas protegidas.
Solo los usuarios autenticados mediante AWS Cognito pueden acceder a rutas.
En caso de no estar autenticado, el usuario es redirigido automáticamente a la vista de login. Y de estar autenticado, en el navbar aparece el nombre del usuario. 


| Ruta               | Tipo de ruta       |
|--------------------|--------------------|
| `/`                | Público            |
| `/login`           | Público            |
| `/signup`          | Público            |
| `/tasks`           | Privado            |
| `/create-task`     | Privado            |
| `/edit-task/:id`   | Privado            |
| `/verify-account`  | Público            |


## Integración con la API
La aplicación consume una API REST desplegada en AWS API Gateway.
Todas las peticiones HTTPS se gestionan con servicios de Angular, incluyendo encabezados con el token JWT para autenticación.

---
## TODO

* Añadir mensajes de validación en formularios
* Mejorar el manejo de errores al consumir la API
* Agregar indicadores de carga y notificaciones (toasts)
* Implementar pruebas unitarias
* Implementar pruebas de integración
* Reenvío de correo de verificación

___

## Despliegue

La aplicación está diseñada para desplegarse como sitio estático en AWS S3,
con acceso protegido mediante CloudFront para agregar cifrado SSL (HTTPS) y autenticación de Cognito en producción.

___

## Cómo ejecutar localmente

1. Clona el repositorio.

2. Instala las dependencias:

```bash
npm install
```

3. Ejecuta el servidor de desarrollo:

```bash
ng serve
```
4. Abre tu navegador en http://localhost:4200

---
## Cómo desplegar
Gracias a la alta integración con AWS, el despliegue es muy sencillo.

### Requisitos
* Tener una cuenta en AWS
* Tener instalado el CLI de AWS

### Despliegue
1. Generar el bundle de la aplicación:
```bash
ng build --configuration production
```
2. Subir los archivos al bucket de S3:
```bash
aws s3 sync dist/tasks-app-frontend s3://<bucket-name>
```
3. Configurar CloudFront para que apunte al bucket de S3.
4. Configurar el certificado SSL en CloudFront.
