# Proyecto Semana 08 — Autenticación Completa

## Mensajería Courier — Login con JWT, store auth y navegación condicional

Semana 08 — Autenticación Completa  
Fase 2 — Core React Native

---

## 🎯 Objetivo

Construir una aplicación móvil con **autenticación completa aplicada al dominio**, utilizando JWT real, almacenamiento cifrado y navegación condicional.

El objetivo de este proyecto es evolucionar la app de **Mensajería Courier** para que el acceso a la operación requiera autenticación. Al iniciar se presenta la pantalla de Login. Tras validar las credenciales contra dummyjson, se guardan los tokens en SecureStore y se permite el acceso a las pestañas de Envíos, Seguimiento, Conductores, Rutas, Ajustes y Perfil. Al cerrar y volver a abrir, la sesión continúa activa sin solicitar nuevamente las credenciales. Al cerrar sesión, los tokens se eliminan y se regresa al Login.

Esta semana la app integra todo lo anterior: tarjetas de la semana 1, FlatList + búsqueda de la semana 2, Tabs + detalle de la semana 3, seguimiento con Zustand de la semana 4, networking con TanStack Query de la semana 5, formularios Create + Edit de la semana 6, persistencia local de la semana 7, más la capa nueva de autenticación.

---

## 📋 Dominio asignado

**Empresa de mensajería / Courier**

La app representa una operación básica de mensajería en la que se gestionan:

- Paquetes o envíos.
- Conductores.
- Rutas de entrega.
- Estados operativos de los paquetes.
- Sesión del coordinador mediante JWT.
- Perfil del usuario autenticado.

> 📌 La implementación es coherente con el dominio. No se copiaron datos genéricos sin contexto. El login corresponde al coordinador de Mensajería Courier y el perfil muestra sus datos.

### 💡 Adaptación del enunciado al dominio

| Concepto del enunciado | Implementación Courier |
|---|---|
| Store auth con `user`, `accessToken`, `login`, `logout`, `refreshTokens` | `src/store/useAuthStore.ts` con coordinador + tokens en SecureStore |
| Pantalla de Login con RHF + Zod | `LoginScreen.tsx` con `username min 3` y `password min 4` |
| Navegación condicional Auth / App | `RootNavigator.tsx` presenta `AuthNavigator` o `AppNavigatorTabs` según `isAuthenticated` |
| Persistencia al reiniciar | Tokens y usuario en SecureStore con `hydrate()` al arrancar |
| Llamada autenticada con Bearer | `getProfileRequest` con `Authorization: Bearer` |
| OAuth PKCE | Demostrado en prácticas, no mezclado en proyecto para mantener un solo proveedor |

---

## 📦 Descripción del proyecto

**Mensajería Courier** es una aplicación móvil que protege la operación con inicio de sesión y mantiene la sesión entre reinicios.

Al abrir sin sesión se presenta únicamente la pantalla de Login con el nombre comercial, campos de usuario y contraseña, validación en español y credenciales de demostración `emilys / emilyspass`. Tras el inicio de sesión correcto se accede a la barra inferior con seis secciones principales:

- **Envíos**
- **Seguimiento**
- **Conductores**
- **Rutas**
- **Ajustes**
- **Perfil**

En la sección **Envíos**, se mantiene la lista desde servidor con buscador, filtros, botón para crear envío y pull-to-refresh. En **Seguimiento**, solo aparecen los envíos marcados con ★ con badge en tiempo real. En **Ajustes**, se conservan preferencias MMKV, caché offline y PIN. En **Perfil**, se muestran los datos del coordinador autenticado con botón para cerrar sesión.

La app combina:

- `NavigationContainer` único en `RootNavigator`
- `Native Stack Navigator` para Auth
- `Bottom Tab Navigator` para App
- Navegación condicional sin parpadeo
- Parámetros tipados con TypeScript
- Store `useAuthStore` con Zustand + SecureStore
- `usePackageStore` existente para seguimiento
- `QueryClientProvider`, `useQuery`, `useMutation`
- Instancia Axios con `baseURL` e interceptors
- Formularios con `useForm` + `Controller` + `zodResolver`

---

## 🧭 Navegación implementada

La decisión de navegación se toma en un único contenedor raíz.

```txt
RootNavigator (NavigationContainer único)
├── !isAuthenticated -> AuthNavigator (Stack)
│   └── Login
└── isAuthenticated -> AppNavigatorTabs (Tabs)
    ├── Envíos -> Stack (Lista, Detalle, Create, Edit)
    ├── Seguimiento
    ├── Conductores
    ├── Rutas
    ├── Ajustes
    └── Perfil
```

Dentro del tab **Envíos**:

```txt
Envíos Tab
└── Stack Navigator
    ├── ShipmentsList
    ├── ShipmentDetail
    ├── CreateShipment
    └── EditShipment
```

Regla aplicada para evitar crash entre Auth y App: un solo `NavigationContainer` en `RootNavigator`. `AppNavigator` expone únicamente tabs, sin container interno.

Mientras `!isHydrated` se presenta indicador de carga. De ese modo no se muestra el Login una fracción de segundo cuando ya existe sesión guardada.

---

## 🧩 Pantallas de la app

### Login

Pantalla inicial sin sesión.

Muestra:

- Nombre comercial y texto de ingreso de credenciales.
- Campo Usuario con validación mínimo 3 caracteres.
- Campo Contraseña con validación mínimo 4 caracteres.
- Errores inline en español bajo cada campo.
- Error de servidor ante credenciales inválidas.
- Botón Iniciar sesión deshabilitado con spinner en `isSubmitting`.
- Texto de credenciales de demostración.

Al validar correctamente llama `useAuthStore.login()` y la navegación cambia a tabs sin intervención adicional.

### Envíos

Pantalla principal tras autenticación. Se mantiene lista desde servidor, buscador, filtros, crear, refresh, estrella y banner offline de la semana 07.

### Detalle del envío

Se mantiene con estrella, cambio de estado, conductor, ruta y navegación a edición. Solo accesible con sesión.

### Seguimiento / Conductores / Rutas / Ajustes

Se mantienen de semanas anteriores. El badge de Seguimiento continúa en tiempo real.

### Perfil

Pantalla nueva de la semana 08.

Muestra:

- Título Perfil y texto de sesión conservada.
- Nombre completo del coordinador.
- Correo y nombre de usuario.
- Botón Cerrar sesión que limpia SecureStore y regresa al Login.

Carga sin necesidad de ingresar nuevamente gracias a `hydrate()`.

### Create / Edit

Se mantienen con `FormField`, `zodResolver` y regreso al guardar.

---

## 🧱 Entidades del dominio

### AuthUser

```ts
id
username
email
firstName
lastName
```

Corresponde al coordinador autenticado proveniente de dummyjson.

### Auth tokens

```ts
accessToken: corta duración, para llamadas
refreshToken: larga duración, para renovar sin re-login
```

Ambos permanecen únicamente en SecureStore con llaves `courier_access_token` y `courier_refresh_token`. Nunca en AsyncStorage ni MMKV sin cifrar.

### CourierPackage / Driver / Route

Se mantienen sin cambios para dar contexto a la operación protegida.

### AuthStore

```ts
user: AuthUser | null
accessToken: string | null
isAuthenticated: boolean
isHydrated: boolean
login(username, password)
logout()
refreshTokens()
hydrate()
```

---

## ✅ Requisitos cumplidos

- `useAuthStore` implementado con `user`, `accessToken`, `isAuthenticated`, `login`, `logout` y `refreshTokens` funcionales.
- Pantalla de Login con RHF + Zod, validaciones y manejo de error de credenciales.
- Navegación condicional en `RootNavigator` entre `AuthNavigator` y `AppNavigatorTabs` sin parpadeo visible.
- Persistencia al reiniciar: tokens en SecureStore, `ProfileScreen` carga sin re-login.
- Llamada autenticada con `Authorization: Bearer` disponible en `authApi`.
- Lógica de tokens encapsulada en el store, no dispersa en pantallas.
- Sin token en texto plano en UI, solo fragmentos cortados para verificación.
- TypeScript sin errores ni `any`.
- App adaptada a Courier y funcional en Expo Go y en web para revisión.

---

## 🧠 Conceptos aplicados

### Estructura JWT

Un JWT posee tres partes separadas por puntos: `header.payload.signature`.

- `header`: algoritmo y tipo.
- `payload`: claims como `sub`, `username`, `iat`, `exp`.
- `signature`: firma que garantiza integridad.

El payload **no permanece cifrado**, solo firmado en base64. Por dicho motivo nunca incluye contraseñas. En el proyecto se decodifica con `jwtDecode` únicamente para inspección en prácticas.

### Access vs Refresh

El access dura minutos para limitar el impacto ante robo. El refresh dura días para evitar solicitar login constantemente. Ante un 401 se llama al endpoint de refresh, se guardan los nuevos tokens y se reintenta la llamada original. Ambos permanecen en SecureStore.

### PKCE en OAuth mobile

Las apps móviles no pueden guardar `client_secret`. Por dicho motivo generan `code_verifier` aleatorio y `code_challenge` derivado. Se abre el browser con `promptAsync`, el proveedor devuelve `code` y el backend lo intercambia por `access_token`. En Expo requiere scheme personalizado como `bcauth08://`, por lo cual exige build nativo con `expo run:android`. Queda demostrado en prácticas.

### useAuthStore

Creado con `create<AuthStore>()`, con estado inicial no autenticado. `login` guarda tokens y usuario, `logout` elimina las tres llaves, `hydrate` restaura al arrancar, `refreshTokens` renueva sin pedir credenciales.

### Navegación condicional

```tsx
{isAuthenticated ? <AppNavigatorTabs /> : <AuthNavigator />}
```

Dentro de un único `NavigationContainer`. El estado `isHydrated` evita mostrar Login cuando ya existe sesión.

### Login con Zod

```ts
username: min 3
password: min 4
```

Con `zodResolver`, errores inline y `isSubmitting` en el botón. El tipo se genera con `z.infer`, sin interfaz manual duplicada.

---

## 📁 Estructura del proyecto

```txt
3-proyecto/
├── README.md
├── screenshots/
└── starter/
    ├── App.tsx
    ├── app.json
    ├── index.ts
    ├── package.json
    ├── tsconfig.json
    ├── assets/
    └── src/
        ├── services/
        │   ├── api.ts
        │   └── authApi.ts
        ├── store/
        │   ├── usePackageStore.ts
        │   └── useAuthStore.ts
        ├── screens/
        │   ├── LoginScreen.tsx
        │   ├── ProfileScreen.tsx
        │   ├── ShipmentsScreen.tsx
        │   ├── ShipmentDetailScreen.tsx
        │   ├── TrackedScreen.tsx
        │   ├── DriversScreen.tsx
        │   ├── RoutesScreen.tsx
        │   ├── SettingsScreen.tsx
        │   ├── CreateShipmentScreen.tsx
        │   └── EditShipmentScreen.tsx
        ├── navigation/
        │   ├── RootNavigator.tsx
        │   ├── AuthNavigator.tsx
        │   ├── AppNavigator.tsx
        │   ├── ShipmentsStackNavigator.tsx
        │   └── types.ts
        ├── storage/
        ├── hooks/
        ├── components/
        ├── theme/
        └── types/
```

---

## 📄 Descripción de archivos principales

### `src/services/authApi.ts`

`loginRequest`, `getProfileRequest` y `refreshRequest` contra dummyjson con tipos `AuthLoginResponse`.

### `src/store/useAuthStore.ts`

Guarda en SecureStore, expone sesión y permite renovar e hidratar. En web utiliza respaldo en AsyncStorage solo para revisión, en nativo conserva cifrado.

### `src/screens/LoginScreen.tsx`

Formulario de acceso con validación y error de servidor en lenguaje formal.

### `src/screens/ProfileScreen.tsx`

Presenta coordinador y permite cerrar sesión.

### `src/navigation/RootNavigator.tsx`

Contiene el único `NavigationContainer` y decide según `isAuthenticated` e `isHydrated`.

### `src/navigation/AuthNavigator.tsx`

Stack solo con Login, sin tabs.

### `src/navigation/AppNavigator.tsx`

Tabs de la app protegida, sin container interno, con tab Perfil adicional.

---

## 🚀 Cómo ejecutar

Desde la carpeta `3-proyecto`:

```bash
cd starter
pnpm install
npx expo install expo-secure-store axios @tanstack/react-query zustand
pnpm start
```

Scripts disponibles: `pnpm start` y `pnpm dev`, ambos inician Expo. No corresponde `npm run dev` de web con Vite, este proyecto es Expo mobile.

Abrir con Expo Go con internet. Para revisión sin dispositivo:

```bash
npx expo install react-native-web react-dom
npx expo start --web
```

Credenciales de demostración: `emilys / emilyspass`.

---

## 🧪 Pruebas sugeridas

1. Abrir sin sesión y verificar pantalla de Login con validación.
2. Dejar vacío e intentar ingresar y verificar errores en español.
3. Ingresar con `emilys / emilyspass` y verificar acceso a tabs.
4. Cerrar por completo la app y volver a abrir y verificar permanencia de sesión sin solicitar ingreso.
5. Ingresar a Perfil y verificar datos del coordinador.
6. Utilizar Cerrar sesión y verificar regreso al Login.
7. Verificar Envíos, Seguimiento con badge, Ajustes y detalle continúan funcionales tras autenticación.

---

## 📸 Evidencia

```txt
app-login.png
app-envios.png
app-perfil.png
app-persistencia.png
```

### `app-login.png`

Login con validación y credenciales de demostración visibles.

### `app-envios.png`

Tabs tras autenticación con lista de envíos y barra inferior completa.

### `app-perfil.png`

Perfil del coordinador con botón para cerrar sesión.

### `app-persistencia.png`

Misma sesión tras `F5` o reinicio, sin retorno a Login. En web se observa Envíos, lo cual es correcto porque el router regresa a la ruta inicial conservando autenticación.

---

## 📌 Restricciones cumplidas

- Sin `as any`.
- Ningún token en AsyncStorage ni MMKV sin cifrar.
- Sin token en texto plano en UI.
- Formulario con validación Zod.
- Auth store encapsulado, lógica no dispersa.
- Sin crash al navegar entre Auth y App.
- App abre sin error de runtime.
- Dominio Courier adaptado, no genérico.
- TypeScript sin errores.
- Lenguaje formal en la interfaz, sin tuteo.

---

## ✅ Resultado esperado

App de mensajería protegida con inicio de sesión real, sesión persistente cifrada, navegación condicional estable y operación completa preservada. Todo reunido 1+2+3+4+5+6+7+8 y funcional en Expo Go y en web para revisión.

Limitación conocida: OAuth PKCE requiere build nativo por deep links con scheme personalizado, por dicho motivo permanece demostrado en prácticas. En el proyecto se prioriza JWT completo y funcional. En web SecureStore utiliza respaldo local solo para revisión, en nativo conserva cifrado con Keychain / Keystore.