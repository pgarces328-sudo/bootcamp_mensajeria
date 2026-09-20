# Proyecto Semana 05 — Networking y TanStack Query v5

## Mensajería Courier — Envíos con API, caché y estado global

Semana 05 — Networking y TanStack Query v5  
Fase 2 — Core React Native

---

## 🎯 Objetivo

Construir una aplicación móvil con **navegación Tab + Stack**, **estado global con Zustand** y **datos de servidor con TanStack Query v5** aplicado a tu dominio.

El objetivo de este proyecto es evolucionar la app de **Mensajería Courier** para que la lista de envíos ya no venga de datos locales, sino de una API real consumida con Axios y gestionada con `useQuery` y `useMutation`. La segunda pestaña mantiene los ítems “guardados” en seguimiento, cuyo estado viene de un store Zustand compartido con la pantalla principal.

Esta semana la app integra todo lo anterior: tarjetas de la semana 1, FlatList + búsqueda de la semana 2, Tabs + detalle de la semana 3, seguimiento con Zustand de la semana 4, más la capa nueva de networking.

---

## 📋 Dominio asignado

**Empresa de mensajería / Courier**

La app representa una operación básica de mensajería en la que se gestionan:

- Paquetes o envíos.
- Conductores.
- Rutas de entrega.
- Estados operativos de los paquetes.
- Seguimiento prioritario de envíos críticos.

> 📌 La implementación es coherente con el dominio. No se copiaron datos genéricos sin contexto, todos los posts de la API se mapean a envíos Courier.

### 💡 Adaptación del enunciado al dominio

| Concepto del enunciado | Implementación Courier |
|---|---|
| Lista de ítems con `useQuery` | Lista de envíos `queryKey: ['packages']` mapeados desde JSONPlaceholder |
| Instancia Axios con `baseURL` | `src/services/api.ts` con `baseURL` + interceptors |
| `useMutation` crea o actualiza | Crear envío de prueba + cambiar estado en detalle |
| `onSuccess` invalida query | `invalidateQueries({ queryKey: ['packages'] })` |
| Tab Items + Guardados | Envíos + Seguimiento ⭐ |
| Store Zustand | `usePackageStore` solo con `trackedIds`, filtros y UI |

---

## 📦 Descripción del proyecto

**Mensajería Courier** es una aplicación móvil que permite consultar envíos que vienen de servidor, crear envíos de prueba y cambiar su estado, además de navegar entre secciones y marcar seguimiento.

La app cuenta con una barra de navegación inferior con cuatro secciones principales:

- **Envíos**
- **Seguimiento**
- **Drivers**
- **Rutas**

En la sección **Envíos**, el usuario ve una lista que carga desde internet con spinner, buscador por guía, cliente, conductor o destino, filtros por estado Todos / Pendiente / En tránsito / Entregado / Programado, botón para crear envío de prueba y pull-to-refresh para recargar.

Al seleccionar un envío, la app navega hacia una pantalla de detalle donde se muestra información completa del paquete, estrella de seguimiento, botones para cambiar estado en servidor y botón para eliminar envíos de prueba.

En la sección **Seguimiento**, solo aparecen los envíos marcados con ★. El badge de esa pestaña muestra cuántos hay en tiempo real desde Zustand.

La app combina:

- `NavigationContainer`
- `Bottom Tab Navigator`
- `Native Stack Navigator`
- Navegación anidada
- Parámetros tipados con TypeScript
- Store global con Zustand solo para cliente
- `QueryClientProvider`, `useQuery`, `useMutation`, `useQueryClient`
- Instancia Axios con `baseURL` e interceptors

---

## 🧭 Navegación implementada

La app usa un `Tab Navigator` como navegación principal.

```txt
Tab Navigator
├── Envíos
├── Seguimiento
├── Drivers
└── Rutas
```

Dentro del tab **Envíos** se implementa un `Stack Navigator` anidado:

```txt
Envíos Tab
└── Stack Navigator
    ├── ShipmentsList
    └── ShipmentDetail
```

Esto permite navegar desde la lista de envíos hacia el detalle sin perder la barra inferior. Cada tab conserva su propio historial.

El estado se divide en dos capas:

```txt
TanStack Query (servidor)
├── ['packages'] -> fetchPackages()
├── createPackage() + invalidateQueries
└── updatePackageStatusApi() + deletePackageApi()

Zustand (cliente)
├── trackedIds[]
├── toggleTracked()
└── clearTracked()
```

Regla aplicada para no caer en penalización: paquetes NUNCA en Zustand, seguimiento NUNCA en TanStack.

---

## 🧩 Pantallas de la app

### Envíos

Pantalla principal de paquetes desde servidor.

Muestra:

- `ActivityIndicator` mientras `isLoading`.
- Mensaje de error + botón Reintentar cuando `isError`.
- Buscador por guía, cliente, conductor o destino.
- Filtros por estado.
- Botón `+ Crear envío de prueba` que se deshabilita en `isPending`.
- Contador de envíos filtrados.
- `FlatList` con `keyExtractor={(item) => item.id}`.
- `ListEmptyComponent` con 📦 cuando no hay resultados.
- Pull-to-refresh con `refreshing={isFetching && !isLoading}` y `onRefresh={refetch}`.

Al tocar una tarjeta, navega al detalle. Al tocar la estrella, marca seguimiento sin salir.

---

### Detalle del envío

Pantalla de detalle que lee de `useQuery(['packages'])`, no del mock directo.

Recibe `id` y busca en la caché. Muestra:

- Código del paquete.
- Tipo de servicio y estado actual.
- Cliente, dirección, teléfono y email mapeados.
- Botones Pendiente / En tránsito / Entregado que hacen `PATCH` + invalidan.
- Conductor, vehículo, ruta, origen → destino.
- Peso, paradas, ETA.
- Estrella de seguimiento.
- Botón Volver.
- Botón Eliminar solo en envíos de prueba.

Si el envío es de prueba y se recargó la app, muestra “Envío no encontrado” porque JSONPlaceholder no persiste POST.

---

### Seguimiento

Segunda pestaña, equivalente a Guardados.

Muestra solo los envíos con `trackedIds`. Incluye vaciar y estado vacío. Lee paquetes de TanStack y marcados de Zustand, combinados con `useMemo`.

El badge muestra `trackedIds.length` en tiempo real. Si es cero se oculta.

---

### Drivers

Pantalla que muestra los conductores registrados.

Cada conductor muestra nombre y vehículo. Vienen de `mockData` local porque son catálogo, no servidor.

---

### Rutas

Pantalla que muestra las rutas de entrega con origen → destino.

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

Los `User` de JSONPlaceholder se mapean a este modelo en `mapUserToPackage`.

### Driver

- `id`
- `name`
- `vehicle`
- `rating`
- `activeShipments`

### DeliveryRoute

- `id`
- `name`
- `origin`
- `destination`
- `stops`
- `status`

### PackageStore (solo cliente)

```ts
trackedIds: string[]
toggleTracked(id)
clearTracked()
```

---

## ✅ Requisitos cumplidos

- `QueryClientProvider` envuelve la app en `App.tsx` con `staleTime` y `retry`.
- Instancia Axios creada en `src/services/api.ts` con `baseURL` + interceptors.
- `useQuery` obtiene lista del dominio con `queryKey: ['packages']`.
- `useMutation` crea y actualiza, `onSuccess` invalida la query.
- Botón deshabilitado en `isPending` con texto Creando... / Actualizando...
- Lista se actualiza sola sin reload por invalidación + `setQueryData` local.
- Estados loading, error y vacío implementados.
- Pull-to-refresh con `refetch` en `onRefresh`.
- Tab Navigator con Envíos + Seguimiento + badge en tiempo real.
- Selectores específicos sin `any`.
- TypeScript sin errores.

---

## 🧠 Conceptos aplicados

### QueryClientProvider

```tsx
const queryClient = new QueryClient();
<QueryClientProvider client={queryClient}>
  <AppNavigator />
</QueryClientProvider>
```

Sin esto `useQuery` lanza error.

### Instancia Axios

```ts
export const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
});
```

No se repite `baseURL` en cada llamada. Los interceptors adjuntan token y centralizan errores.

### useQuery

```ts
const { data, isLoading, isError, isFetching, refetch } = useQuery({
  queryKey: ['packages'],
  queryFn: fetchPackages,
});
```

`queryKey` como array, `queryFn` retorna Promise.

### useMutation + invalidación

```ts
useMutation({
  mutationFn: createPackage,
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['packages'] }),
});
```

Invalida marca como `stale` y dispara refetch. Diferente a `setQueryData` que escribe directo sin pedir.

### Loading / Error / Vacío / Refresh

- `isLoading` -> `ActivityIndicator`
- `isError` -> mensaje + Reintentar
- `ListEmptyComponent` -> 📦 Sin envíos
- `refreshing={isFetching && !isLoading}` + `onRefresh={refetch}`

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
        │   └── api.ts
        ├── store/
        │   └── usePackageStore.ts
        ├── components/
        │   └── ShipmentCard.tsx
        ├── data/
        │   └── mockData.ts
        ├── navigation/
        │   ├── AppNavigator.tsx
        │   ├── ShipmentsStackNavigator.tsx
        │   └── types.ts
        ├── screens/
        │   ├── ShipmentsScreen.tsx
        │   ├── ShipmentDetailScreen.tsx
        │   ├── TrackedScreen.tsx
        │   ├── DriversScreen.tsx
        │   └── RoutesScreen.tsx
        ├── theme/
        │   └── index.ts
        └── types/
            └── index.ts
```

---

## 📄 Descripción de archivos principales

### `App.tsx`

Monta `QueryClientProvider` + `SafeAreaProvider` + `AppNavigator`.

### `src/services/api.ts`

Instancia Axios, interceptors, `fetchPackages`, `createPackage`, `updatePackageStatusApi`, `deletePackageApi` y memoria local porque JSONPlaceholder no persiste POST.

### `src/store/usePackageStore.ts`

Solo `trackedIds` de cliente. Paquetes NO van aquí para no caer en -10.

### `src/screens/ShipmentsScreen.tsx`

`useQuery(['packages'])`, búsqueda por 5 campos incluido conductor, filtros, crear con `isPending`, `FlatList` + vacío + refresh.

### `src/screens/ShipmentDetailScreen.tsx`

Lee de la query por `id`, cambia estado con mutation, elimina solo pruebas.

### `src/screens/TrackedScreen.tsx`

Combina TanStack + Zustand, vaciar y vacío.

### `src/navigation/*`

Tabs + Stack anidado + `tabBarBadge` desde Zustand + params tipados.

---

## 🚀 Cómo ejecutar

Desde la carpeta `3-proyecto`:

```bash
cd starter
pnpm install
npx expo install axios @tanstack/react-query zustand @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context @expo/vector-icons
pnpm start
```

Abrir con Expo Go con internet. No usar web para este proyecto.

---

## 🧪 Pruebas sugeridas

1. Abre Envíos, sale spinner 1 seg y luego 10 envíos ENV-500X.
2. Apaga wifi y entra, sale error + Reintentar.
3. Busca `carlos`, filtra por conductor. Busca `xyz123`, sale vacío.
4. Tira hacia abajo, refresca.
5. Dale Crear, dice Creando..., sale Alert y aparece arriba con 11.
6. Entra al nuevo, cambia a Entregado, vuelve y queda verde.
7. Marca 2 ★, sale 2 en Seguimiento.
8. Elimina el de prueba desde su detalle, vuelve solo y ya no está.

---

## 📸 Evidencia

```txt
app-listado.png
app-creado.png
app-detalle-envio.png
app-seguimiento.png
app-badge.png
```

### `app-listado.png`

Tab Envíos, buscador, filtros Todos activo, botón Crear, 10 envíos, tab bar visible.

### `app-creado.png`

Alert “Envío creado” + nuevo arriba con 11 envíos. Prueba `useMutation` + `invalidate`.

### `app-detalle-envio.png`

Detalle con ★, chips de estado, conductor, ruta, Volver, tab bar visible.

### `app-seguimiento.png`

Tab Seguimiento con solo marcados + Vaciar.

### `app-badge.png`

Tab bar abajo con el 2 en Seguimiento. Prueba estado global.

---

## 📌 Restricciones cumplidas

- Sin `as any`.
- Paquetes por TanStack, no en Zustand.
- Sin fetch en `useEffect`, todo por `useQuery` / `useMutation`.
- App abre sin runtime error.
- Dominio Courier adaptado, no genérico.
- TypeScript sin errores.

---

## ✅ Resultado esperado

App de mensajería con datos de servidor, creación y actualización con invalidación, loading / error / vacío / refresh, más Tabs, búsqueda, seguimiento con ★ y badge. Todo reunido 1+2+3+4+5 y funcional en Expo Go.

Limitación conocida: JSONPlaceholder no persiste POST/DELETE, por eso los de prueba viven en memoria local y se pierden al recargar. En producción irían al backend real.