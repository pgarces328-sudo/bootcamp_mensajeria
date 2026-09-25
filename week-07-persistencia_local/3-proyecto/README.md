# Proyecto Semana 07 — Persistencia Local

## Mensajería Courier — Preferencias, caché offline y sesión segura

Semana 07 — Persistencia Local  
Fase 2 — Core React Native

---

## 🎯 Objetivo

Construir una aplicación móvil con **persistencia local aplicada al dominio**, utilizando los tres patrones de almacenamiento de React Native.

El objetivo de este proyecto es evolucionar la app de **Mensajería Courier** para que las preferencias de visualización, la lista de envíos y el dato de sesión sobrevivan al reinicio de la aplicación. La pestaña Ajustes permite configurar la vista de la lista, registrar un PIN de acceso y gestionar los datos guardados sin conexión. La lista muestra un banner visible cuando se presenta contenido desde caché.

Esta semana la app integra todo lo anterior: tarjetas de la semana 1, FlatList + búsqueda de la semana 2, Tabs + detalle de la semana 3, seguimiento con Zustand de la semana 4, networking con TanStack Query de la semana 5, formularios Create + Edit de la semana 6, más la capa nueva de persistencia.

---

## 📋 Dominio asignado

**Empresa de mensajería / Courier**

La app representa una operación básica de mensajería en la que se gestionan:

- Paquetes o envíos.
- Conductores.
- Rutas de entrega.
- Estados operativos de los paquetes.
- Preferencias de visualización de la lista.
- Sesión del coordinador mediante PIN.
- Caché offline de envíos.

> 📌 La implementación es coherente con el dominio. No se copiaron datos genéricos sin contexto. Las preferencias controlan la lista real de envíos, la caché guarda envíos Courier y el PIN representa el acceso del coordinador.

### 💡 Adaptación del enunciado al dominio

| Concepto del enunciado | Implementación Courier |
|---|---|
| MMKV para 2 preferencias sin `async/await` | Vista compacta + Orden de lista: Recientes / Por peso / Por nombre |
| AsyncStorage para caché offline | Lista de envíos guardada en `@courier_packages_cache_v1` con banner Sin conexión |
| SecureStore para dato sensible | PIN del coordinador guardado con `setItemAsync` y leído con `getItemAsync` |
| Custom hook `usePreferences()` | Hook tipado que expone `compact`, `sortOrder`, `setCompact`, `setSortOrder` |
| Tab de configuración | Ajustes con Vista de la lista, Acceso y Datos sin conexión |

---

## 📦 Descripción del proyecto

**Mensajería Courier** es una aplicación móvil que permite consultar envíos desde servidor, crear y editar envíos con validación, marcar seguimiento y ahora conservar preferencias, caché y sesión entre reinicios.

La app cuenta con una barra de navegación inferior con cinco secciones principales:

- **Envíos**
- **Seguimiento**
- **Conductores**
- **Rutas**
- **Ajustes**

En la sección **Envíos**, se mantiene la lista desde internet con buscador por guía, cliente, conductor o destino, filtros por estado, botón para crear envío y pull-to-refresh. Ahora la lista además respeta el modo compacto, respeta el orden seleccionado en Ajustes y muestra un banner naranja cuando el contenido proviene de caché sin conexión.

En la sección **Ajustes**, se concentran los tres patrones de storage:

- Vista de la lista con interruptor de vista compacta y selector de orden.
- Acceso con campo de PIN, botón Guardar PIN y botón Eliminar PIN.
- Datos sin conexión con contador de envíos en caché y botón Eliminar datos guardados.

En la sección **Seguimiento**, solo aparecen los envíos marcados con ★. El badge de esa pestaña muestra cuántos existen en tiempo real desde Zustand.

La app combina:

- `NavigationContainer`
- `Bottom Tab Navigator`
- `Native Stack Navigator`
- Navegación anidada
- Parámetros tipados con TypeScript
- Store global con Zustand solo para cliente
- `QueryClientProvider`, `useQuery`, `useMutation`
- Instancia Axios con `baseURL` e interceptors
- MMKV para preferencias sincrónicas
- AsyncStorage para caché offline
- SecureStore para PIN cifrado

---

## 🧭 Navegación implementada

La app usa un `Tab Navigator` como navegación principal.

```txt
Tab Navigator
├── Envíos
├── Seguimiento
├── Conductores
├── Rutas
└── Ajustes
```

Dentro del tab **Envíos** se implementa un `Stack Navigator` anidado:

```txt
Envíos Tab
└── Stack Navigator
    ├── ShipmentsList
    ├── ShipmentDetail
    ├── CreateShipment
    └── EditShipment
```

Esto permite navegar desde la lista hacia el detalle, crear y editar sin perder la barra inferior. Cada tab conserva su propio historial.

El estado se divide en tres capas:

```txt
TanStack Query (servidor)
├── ['packages'] -> fetchPackages()
├── createPackage() + invalidateQueries
└── updatePackageStatusApi() + deletePackageApi()

Zustand (cliente en memoria)
├── trackedIds[]
├── toggleTracked()
└── clearTracked()

Persistencia local (disco)
├── MMKV -> compact + sortOrder
├── AsyncStorage -> @courier_packages_cache_v1
└── SecureStore -> courier_access_token
```

Regla aplicada: paquetes en TanStack, seguimiento en Zustand, preferencias en MMKV, caché en AsyncStorage, PIN en SecureStore. Ningún token permanece en AsyncStorage sin cifrar.

---

## 🧩 Pantallas de la app

### Envíos

Pantalla principal de paquetes.

Muestra:

- `ActivityIndicator` mientras `isLoading`.
- Banner naranja `Sin conexión — mostrando lista guardada` cuando no existe red y se presenta caché.
- Buscador por guía, cliente, conductor o destino.
- Filtros por estado.
- Botón `+ Nuevo` que abre Create.
- Contador de envíos filtrados, con indicador de modo compacto.
- `FlatList` con `keyExtractor={(item) => item.id}`.
- Tarjetas en modo completo o compacto según la preferencia.
- Lista ordenada según Recientes, Por peso o Por nombre.
- `ListEmptyComponent` con 📦 cuando no existen resultados.
- Pull-to-refresh con `refreshing={isFetching && !isLoading}` y `onRefresh={refetch}`.

Al tocar una tarjeta, se navega al detalle. Al tocar la estrella, se marca seguimiento sin salir de la lista.

### Ajustes

Pantalla nueva de la semana 07.

Sección Vista de la lista:

- Interruptor Vista compacta. En modo compacto las tarjetas ocultan ruta y fila de ETA / Peso / Paradas.
- Selector Ordenar por con Recientes, Por peso y Por nombre.

Sección Acceso:

- Estado Sin PIN registrado o PIN activo en este dispositivo.
- Campo PIN de acceso.
- Botón Guardar PIN.
- Botón Eliminar PIN.

Sección Datos sin conexión:

- Contador de envíos disponibles sin conexión.
- Botón Eliminar datos guardados.

Todo el texto se presenta en lenguaje formal, sin tuteo.

### Detalle del envío

Pantalla de detalle que lee de `useQuery(['packages'])`.

Muestra código, servicio, estado, cliente, conductor, ruta, estrella y botón Volver. En envíos de prueba incluye cambio de estado y eliminación. Mantiene la tab bar visible.

### Seguimiento

Segunda pestaña. Muestra solo envíos con `trackedIds`. Incluye vaciar y estado vacío. El badge muestra `trackedIds.length` en tiempo real.

### Conductores

Pantalla que muestra los conductores registrados con nombre y vehículo.

### Rutas

Pantalla que muestra las rutas con origen → destino.

### Create / Edit

Se mantienen de la semana 06 con `FormField`, `ServicePicker`, `zodResolver` y navegación de regreso al guardar.

---

## 🧱 Entidades del dominio

### CourierPackage

```ts
id
trackingCode // ENV-5001
customerName
destination
driverId
routeId
status // Pendiente | En tránsito | Entregado | Programado | Incidencia
serviceType // Express | Estándar | Mismo día
estimatedDelivery
weightKg
stops
phone
email
```

### Preferences

```ts
compact: boolean
sortOrder: 'recientes' | 'peso' | 'az'
```

Persistidas en MMKV con espejo en AsyncStorage para funcionamiento en Expo Go. Lectura sincrónica sin `await`.

### Session

```ts
courier_access_token: string
```

Guardado únicamente con SecureStore. Nunca en AsyncStorage.

### PackageCache

```ts
'@courier_packages_cache_v1': CourierPackage[]
```

Guardado con `JSON.stringify` y leído con `JSON.parse`.

---

## ✅ Requisitos cumplidos

- MMKV guarda mínimo 2 preferencias que persisten entre reinicios sin `async/await`.
- AsyncStorage cachea los ítems del dominio y los presenta sin red con banner visible.
- SecureStore almacena el PIN con `setItemAsync` y lo lee con `getItemAsync`.
- Custom hook `usePreferences()` encapsula la lógica y exporta helpers tipados.
- Sin token en AsyncStorage ni MMKV sin cifrar.
- Sin `useState` como sustituto de persistencia.
- TypeScript sin errores ni `any`.
- App adaptada a Courier y funcional en Expo Go.

---

## 🧠 Conceptos aplicados

### MMKV sincrónico

```ts
storage.set('compact', true);
const compact = storage.getBoolean('compact');
```

Sin `await`. En Expo Go se utiliza espejo en AsyncStorage porque MMKV requiere JSI / Nitro con build nativo. La API consumida por las pantallas continúa siendo sincrónica.

### AsyncStorage con JSON

```ts
await AsyncStorage.setItem(KEY, JSON.stringify(packages));
const raw = await AsyncStorage.getItem(KEY);
const cached = raw ? JSON.parse(raw) as CourierPackage[] : null;
```

Solo almacena strings. Los objetos se serializan. Incluye `removeItem` para vaciar caché.

### SecureStore cifrado

```ts
await SecureStore.setItemAsync(KEY, token);
const token = await SecureStore.getItemAsync(KEY);
await SecureStore.deleteItemAsync(KEY);
```

Utiliza Keychain en iOS y Keystore en Android. Límite aproximado de 2KB. Solo para PIN o token.

### Hook usePreferences

```ts
const { compact, sortOrder, setCompact, setSortOrder } = usePreferences();
```

Centraliza lectura, escritura e hidratación. Ninguna pantalla accede directo a MMKV.

### Offline-first

```ts
TanStack intenta red -> si falla, se presenta AsyncStorage
+ banner Sin conexión
```

La lista nunca queda vacía si existe caché previa.

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
        ├── storage/
        │   ├── preferencesStorage.ts
        │   ├── packagesCache.ts
        │   └── courierSession.ts
        ├── hooks/
        │   ├── usePreferences.ts
        │   └── usePackages.ts
        ├── screens/
        │   ├── ShipmentsScreen.tsx
        │   ├── SettingsScreen.tsx
        │   ├── ShipmentDetailScreen.tsx
        │   ├── TrackedScreen.tsx
        │   ├── DriversScreen.tsx
        │   ├── RoutesScreen.tsx
        │   ├── CreateShipmentScreen.tsx
        │   └── EditShipmentScreen.tsx
        ├── components/
        │   ├── ShipmentCard.tsx
        │   ├── FormField.tsx
        │   └── ServicePicker.tsx
        ├── navigation/
        │   ├── AppNavigator.tsx
        │   ├── ShipmentsStackNavigator.tsx
        │   └── types.ts
        ├── services/
        │   └── api.ts
        ├── store/
        │   └── usePackageStore.ts
        ├── theme/
        │   └── index.ts
        └── types/
            └── index.ts
```

---

## 📄 Descripción de archivos principales

### `src/storage/preferencesStorage.ts`

MMKV para `compact` y `sortOrder` con lectura sincrónica, memoria de respaldo y espejo en AsyncStorage. Expone `hydratePrefsFromAsync` al arrancar.

### `src/storage/packagesCache.ts`

`savePackagesCache`, `loadPackagesCache` y `clearPackagesCache` para la lista de envíos.

### `src/storage/courierSession.ts`

`saveCourierToken`, `getCourierToken` y `deleteCourierToken` con SecureStore.

### `src/hooks/usePreferences.ts`

Expone el estado reactivo de preferencias a las pantallas.

### `src/screens/SettingsScreen.tsx`

Vista de la lista, Acceso y Datos sin conexión. Lenguaje formal en toda la interfaz.

### `src/screens/ShipmentsScreen.tsx`

Guarda caché al cargar, presenta banner sin conexión, aplica orden y modo compacto, mantiene buscador, filtros, crear y refresh.

---

## 🚀 Cómo ejecutar

Desde la carpeta `3-proyecto`:

```bash
cd starter
pnpm install
npx expo install @react-native-async-storage/async-storage react-native-mmkv expo-secure-store
pnpm start
```

Para MMKV nativo real:

```bash
pnpm expo run:android
```

Abrir con Expo Go con internet para la primera carga. No usar web para este proyecto.

---

## 🧪 Pruebas sugeridas

1. En Ajustes activar Vista compacta y Orden Por peso. Ir a Envíos y verificar tarjetas cortas y orden por peso.
2. Cerrar por completo la app y volver a abrir. Verificar que compacto, orden y PIN continúan guardados.
3. Con wifi entrar a Envíos y esperar lista. Activar modo avión y refrescar. Verificar lista completa más banner naranja.
4. En Ajustes guardar PIN `courier-123`. Cerrar y abrir. Verificar que continúa activo. Eliminarlo y verificar que vuelve a Sin PIN registrado.
5. En Ajustes verificar contador de caché y botón Eliminar datos guardados.

---

## 📸 Evidencia

```txt
app-lista-offline.png
app-ajustes.png
app-seguimiento.png
app-detalle.png
```

### `app-lista-offline.png`

Tab Envíos en modo avión, con lista completa y banner naranja Sin conexión en la parte superior.

### `app-ajustes.png`

Tab Ajustes con Vista compacta activada, orden seleccionado, PIN activo y contador de caché.

### `app-seguimiento.png`

Tab Seguimiento con solo marcados y badge con conteo.

### `app-detalle.png`

Detalle con ★, datos completos y tab bar visible.

---

## 📌 Restricciones cumplidas

- Sin `as any`.
- Ningún token en AsyncStorage.
- Sin `useState` como persistencia entre sesiones.
- MMKV encapsulado en hook, no disperso en pantallas.
- App abre sin crash.
- Dominio Courier adaptado, no genérico.
- TypeScript sin errores.
- Lenguaje formal en la interfaz, sin tuteo.

---

## ✅ Resultado esperado

App de mensajería con preferencias persistentes, caché offline visible y sesión cifrada, más Tabs, búsqueda, seguimiento con ★, formularios Create + Edit y badge en tiempo real. Todo reunido 1+2+3+4+5+6+7 y funcional en Expo Go.

Limitación conocida: MMKV requiere build nativo por JSI / Nitro. En Expo Go funciona mediante espejo en AsyncStorage manteniendo la API sincrónica. Los envíos de prueba de JSONPlaceholder viven en memoria local y caché, no en backend real.