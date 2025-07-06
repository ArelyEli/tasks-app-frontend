# Frontend – Aplicación de Gestión de Tareas

Este repositorio contiene el frontend de una aplicación de gestión de tareas desarrollada con **Angular**.  
Proporciona una interfaz amigable para que los usuarios puedan crear, consultar, actualizar y eliminar tareas. Está integrada con servicios de AWS para autenticación y consumo de la API.

---

## Funcionalidades

- **Autenticación de usuarios** (Registro e inicio de sesión con AWS Cognito)
- **Gestión de tareas** (Operaciones CRUD con API REST)
- Interfaz responsiva con componentes modulares en Angular
- Integración con AWS API Gateway y despliegue en S3

---

## Estructura del proyecto

```bash
src/app/components/
├── auth/          # Formularios de login y registro
│   ├── login/
│   └── signup/
├── core/          # Vistas principales
│   ├── home/
│   └── tasks/
├── hero/          # Sección de bienvenida
└── navbar/        # Barra de navegación superior
```
## Componentes implementados

- `HeroComponent`: Página de bienvenida
- `NavbarComponent`: Barra de navegación
- `LoginComponent` / `SignupComponent`: Formulario de autenticación
- `TasksComponent`: Lista y acciones sobre tareas
- `HomeComponent`: Vista principal post-login

---
## Autenticación

El registro e inicio de sesión se realiza mediante AWS Cognito.
Los tokens JWT obtenidos tras iniciar sesión se almacenan y se envían automáticamente en cada solicitud a la API

### Flujo de autenticación

1. El usuario ingresa sus credenciales en el formulario.
2. Se autentica mediante AWS Cognito.
3. Se obtiene un token JWT que se guarda localmente.
4. El token se adjunta a cada petición a la API.
5. Las rutas protegidas solo son accesibles si el token está presente.

## Protección de rutas
La aplicación implementa guardas de rutas (Route Guards) para restringir el acceso a las vistas protegidas.
Solo los usuarios autenticados mediante AWS Cognito pueden acceder a rutas.
En caso de no estar autenticado, el usuario es redirigido automáticamente a la vista de login. Y de estar autenticado, en el navbar el nombre del usuario. 


| Ruta           | Requiere login |
|----------------|----------------|
| `/`            | No             |
| `/login`       | No             |
| `/home`        | No             |
| `/signup`      | Sí             |
| `/create-task` | Sí             |
| `/tasks`       | Sí             |



## Integración con la API
La aplicación consume una API REST desplegada en AWS API Gateway.
Todas las peticiones HTTPS se gestionan con servicios de Angular, incluyendo encabezados con el token JWT para autenticación.

---
## Tareas pendientes

Añadir mensajes de validación en formularios

Mejorar el manejo de errores al consumir la API

Agregar indicadores de carga y notificaciones (toasts)
___

## Despliegue

La aplicación está diseñada para desplegarse como sitio estático en AWS S3,
con acceso restringido mediante CloudFront y autenticación de Cognito en producción.

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


