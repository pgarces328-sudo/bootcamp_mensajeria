# Proyecto Semana 04 — Estado Global con Zustand

## Mensajería Courier — Seguimiento de envíos

Semana 04 — Estado Global con Zustand  
Fase 2 — Core React Native

---

## 🎯 Objetivo

Construir una aplicación móvil con navegación Tab + Stack y estado global usando Zustand.

El objetivo de este proyecto es que el estado de los envíos deje de vivir solo en cada pantalla y pase a un store global compartido. Así, cualquier componente puede leer y modificar los envíos, el seguimiento y el badge de la tab bar **sin prop drilling**.

Esta semana la app evoluciona desde una navegación funcional hacia una app con estado compartido real, manteniendo el dominio asignado de empresa de mensajería / courier.

---

## 📋 Dominio asignado

**Empresa de mensajería / Courier**

La app representa una operación de mensajería en la que se gestionan:

- Paquetes o envíos.
- Conductores.
- Rutas de entrega.
- Estados operativos de los paquetes.
- Envíos marcados para seguimiento.

> 📌 La implementación es coherente con el dominio asignado. No se copió una lógica genérica de carrito de compras.

### 💡 Adaptación del dominio

| Dominio | Pestaña Items (Home) | Store Zustand | Pestaña Guardados |
|---|---|---|---|
| Mensajería / Courier | Lista de envíos | `usePackageStore` | Seguimiento de envíos |

En este dominio:

- **Items** = envíos / paquetes.
- **Guardar** = marcar un envío para seguimiento con ★.
- **Carrito / Favoritos** = tab **Seguimiento**.
- **Badge** = cantidad de envíos en seguimiento.

La idea de negocio es que un coordinador de operaciones pueda fijar envíos críticos para vigilarlos. Por ejemplo, un paquete con incidencia, un envío express o una entrega pendiente de alta prioridad.

---

## 📦 Descripción del proyecto

**Mensajería Courier** es una aplicación móvil que combina navegación y estado global.

La app cuenta con una barra de navegación inferior con cuatro secciones principales:

- **Envíos**
- **Seguimiento**
- **Drivers**
- **Rutas**

En **Envíos**, cada tarjeta muestra información del paquete y una estrella ★ para marcarlo en seguimiento.  
En **Seguimiento**, aparecen solo los envíos marcados. Si no hay ninguno, se muestra un estado vacío explicando cómo agregar uno.  
El badge de esa tab muestra el conteo en tiempo real.  
En **Detalle del envío** también se puede seguir o dejar de seguir un paquete, y cambiar su estado operativo. Ese cambio se refleja inmediatamente en el listado porque ambas pantallas leen el mismo store.

El estado vive en:

```txt
src/store/usePackageStore.ts
```

Y lo consumen:

- `ShipmentsScreen`
- `ShipmentDetailScreen`
- `TrackedScreen`
- `ShipmentCard`
- el badge de `AppNavigator`

Ninguno de esos componentes necesita recibir el estado por props.

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

Dentro del tab **Envíos** se mantiene un `Stack Navigator` anidado:

```txt
Envíos Tab
└── Stack Navigator
    ├── ShipmentsList
    └── ShipmentDetail
```

Esto permite navegar desde la lista de envíos hacia el detalle de un envío sin perder la barra inferior de tabs.

---

## 🧩 Pantallas de la app

### Envíos

Pantalla principal de paquetes.

Muestra una lista de envíos con información como:

- Código del paquete.
- Cliente.
- Destino.
- Conductor asignado.
- Ruta.
- Estado.
- ETA.
- Peso.

Cada tarjeta también tiene una estrella ★ para marcar el envío en seguimiento.  
Al tocar una tarjeta, se navega hacia la pantalla de detalle.

---

### Detalle del envío

Pantalla de detalle de un paquete seleccionado.

Recibe el parámetro `id` desde la pantalla de lista y busca la información correspondiente del envío dentro del store.

Muestra:

- Código del paquete.
- Tipo de servicio.
- Cliente.
- Dirección.
- Estado.
- ETA.
- Conductor.
- Vehículo.
- Ruta.
- Origen y destino.
- Peso.
- Número de paradas.

Además permite:

- seguir o dejar de seguir el envío,
- cambiar el estado a Pendiente, En tránsito o Entregado.

Ese cambio se refleja en el listado porque ambas pantallas usan el mismo store.

---

### Seguimiento

Segunda pestaña principal de esta semana.

Muestra únicamente los envíos marcados con ★. Incluye:

- lista de envíos en seguimiento,
- botón para vaciar el seguimiento,
- estado vacío cuando no hay paquetes marcados.

El badge de esta tab muestra cuántos envíos hay en seguimiento.

---

### Drivers

Pantalla que muestra los conductores registrados en la operación.

Cada conductor muestra:

- Nombre.
- Vehículo asignado.
- Calificación.
- Número de envíos activos.

---

### Rutas

Pantalla que muestra las rutas de entrega.

Cada ruta muestra:

- Nombre de la ruta.
- Origen.
- Destino.
- Número de paradas.
- Estado de la ruta.

---

## 🧱 Entidades del dominio

### CourierPackage

Representa un paquete o envío.

Campos principales:

- `id`
- `trackingCode`
- `customerName`
- `destination`
- `driverId`
- `routeId`
- `status`
- `serviceType`
- `estimatedDelivery`
- `weightKg`
- `stops`

---

### Driver

Representa un conductor.

Campos principales:

- `id`
- `name`
- `vehicle`
- `rating`
- `activeShipments`

---

### DeliveryRoute

Representa una ruta de entrega.

Campos principales:

- `id`
- `name`
- `origin`
- `destination`
- `stops`
- `status`

---

## 🗂️ Estado global con Zustand

### ¿Por qué Zustand y no `useState`?

`useState` es local a un componente. Si la lista, el detalle, la tab de seguimiento y el badge necesitan el mismo estado, habría que subirlo a un ancestro común y pasarlo por props nivel a nivel. Eso es prop drilling.

Zustand vive fuera del árbol de React. Cualquier pantalla puede leer y modificar el estado directamente con un hook.

### Store: `usePackageStore`

```ts
interface PackageStore {
  packages: CourierPackage[];
  trackedIds: string[];
  toggleTracked: (id: string) => void;
  updateStatus: (id: string, status: PackageStatus) => void;
  clearTracked: () => void;
}
```

El store se crea con:

```ts
export const usePackageStore = create<PackageStore>((set) => ({
  packages: seedPackages,
  trackedIds: [],
  toggleTracked: (id) => set((state) => ({ ... })),
  updateStatus: (id, status) => set((state) => ({ ... })),
  clearTracked: () => set({ trackedIds: [] }),
}));
```

`mockData.ts` se usa solo como semilla inicial. A partir de ahí, el estado vive en el store.

### Acciones

- `toggleTracked(id)`: marca o desmarca un envío para seguimiento.
- `updateStatus(id, status)`: cambia el estado del envío desde el detalle.
- `clearTracked()`: vacía la lista de seguimiento.

### Selectores usados

Cada componente pide solo la parte del store que necesita:

```ts
const packages = usePackageStore((state) => state.packages);
const trackedIds = usePackageStore((state) => state.trackedIds);
const trackedCount = usePackageStore((state) => state.trackedIds.length);
const toggleTracked = usePackageStore((state) => state.toggleTracked);
const updateStatus = usePackageStore((state) => state.updateStatus);
```

Esto mejora el rendimiento porque el componente no se re-renderiza si cambia una parte del store que no está usando.

Por ejemplo:

- El badge solo se actualiza cuando cambia `trackedIds.length`.
- La lista de envíos se actualiza cuando cambian `packages`.
- La estrella de una tarjeta se actualiza cuando cambia si ese `id` está en `trackedIds`.

### Qué sigue en `useState` local

Solo estado de UI local, como:

- el texto de un input,
- el efecto visual de `pressed`.

El estado de envíos y seguimiento **no** usa `useState`.

---

## ✅ Requisitos cumplidos

- App con Tab Navigator y Stack Navigator.
- `NavigationContainer` configurado correctamente.
- Tab de Envíos y tab de Seguimiento.
- Stack anidado dentro de Envíos: lista → detalle.
- Store Zustand tipado con `create<PackageStore>()`.
- Acciones para agregar, quitar y limpiar seguimiento.
- Acción para actualizar el estado de un envío.
- Selectores específicos, sin `any`.
- Badge en tab bar actualizado en tiempo real.
- Detalle con botón para seguir / dejar de seguir.
- Sin prop drilling.
- App adaptada al dominio de mensajería / courier.
- TypeScript sin uso de `any`.
- App funcional en Expo.

---

## 🧠 Conceptos aplicados

### Zustand

Se usa como estado global compartido entre pantallas.

```ts
export const usePackageStore = create<PackageStore>((set) => ({
  ...
}));
```

---

### Selectores

Cada componente pide solo lo que necesita.

```ts
const trackedCount = usePackageStore((state) => state.trackedIds.length);
```

---

### Acciones con `set`

Las acciones actualizan el estado a partir del estado previo.

```ts
toggleTracked: (id) =>
  set((state) => ({
    trackedIds: state.trackedIds.includes(id)
      ? state.trackedIds.filter((trackedId) => trackedId !== id)
      : [...state.trackedIds, id],
  })),
```

---

### Badge dinámico

El badge de la tab Seguimiento lee el store directamente.

```ts
tabBarBadge: trackedCount > 0 ? trackedCount : undefined
```

---

### Estado compartido sin props

La tarjeta, el detalle, la tab de seguimiento y el badge leen el mismo store. No se pasa el estado por props entre pantallas.

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
    ├── pnpm-lock.yaml
    ├── tsconfig.json
    ├── assets/
    └── src/
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
        ├── store/
        │   └── usePackageStore.ts
        ├── theme/
        │   └── index.ts
        └── types/
            └── index.ts
```

---

## 📄 Descripción de archivos principales

### `App.tsx`

Punto de entrada visual de la app. Renderiza `AppNavigator`.

---

### `src/store/usePackageStore.ts`

Store global de envíos. Contiene la lista de paquetes, los IDs en seguimiento y las acciones para modificarlos. Es el archivo más importante de esta semana.

---

### `src/navigation/AppNavigator.tsx`

Configura el `NavigationContainer` y el `Bottom Tab Navigator`.

Define los tabs principales:

- Envíos
- Seguimiento
- Drivers
- Rutas

También configura los íconos de cada tab y el badge de Seguimiento.

---

### `src/navigation/ShipmentsStackNavigator.tsx`

Configura el Stack Navigator anidado para el tab de Envíos.

Incluye:

- `ShipmentsList`
- `ShipmentDetail`

---

### `src/navigation/types.ts`

Contiene los tipos de navegación:

- `RootTabParamList`
- `ShipmentsStackParamList`

---

### `src/screens/ShipmentsScreen.tsx`

Pantalla que muestra la lista de envíos.

Lee `packages` del store. Cada tarjeta permite navegar al detalle o marcar seguimiento.

---

### `src/screens/ShipmentDetailScreen.tsx`

Pantalla que recibe el parámetro `id` y muestra la información completa del envío seleccionado.

También permite seguir el envío y cambiar su estado.

---

### `src/screens/TrackedScreen.tsx`

Pantalla de seguimiento. Muestra solo los envíos marcados con ★.

Incluye estado vacío y botón para vaciar la lista.

---

### `src/screens/DriversScreen.tsx`

Pantalla que muestra los conductores de la operación.

---

### `src/screens/RoutesScreen.tsx`

Pantalla que muestra las rutas de entrega.

---

### `src/components/ShipmentCard.tsx`

Componente reutilizable para mostrar una tarjeta resumida de un envío.

Lee el store directamente para saber si un envío está marcado con ★.

---

### `src/data/mockData.ts`

Contiene los datos simulados de:

- paquetes
- conductores
- rutas

Se usan como semilla inicial del store.

---

### `src/theme/index.ts`

Contiene constantes visuales reutilizables:

- colores
- tipografía
- espaciados
- bordes
- sombras

---

## 🚀 Cómo ejecutar

Desde la carpeta `3-proyecto`:

```bash
cd starter
pnpm install
pnpm start
```

También se puede ejecutar con:

```bash
npx expo start
```

---

## 🧪 Pruebas sugeridas

Al ejecutar la app, verificar:

1. La app abre sin errores.
2. Se muestra la tab bar inferior.
3. Existen las tabs:
   - Envíos
   - Seguimiento
   - Drivers
   - Rutas
4. En la tab Envíos se muestra una lista de paquetes.
5. Al tocar la ★ de un paquete, la estrella se rellena.
6. El badge de Seguimiento se actualiza en tiempo real.
7. Al entrar a Seguimiento, solo aparecen los envíos marcados.
8. Al abrir un detalle, se puede cambiar el estado del envío.
9. Al volver al listado, el nuevo estado ya se ve en la tarjeta.
10. Las pantallas Drivers y Rutas muestran información coherente al dominio.

---

## 📸 Evidencia

Las capturas deben guardarse en:

```txt
3-proyecto/screenshots/
```

Capturas sugeridas:

```txt
app-envios.png
app-detalle-envio.png
app-seguimiento.png
app-badge.png
```

### `app-envios.png`

Debe mostrar:

- Tab Envíos.
- Lista de paquetes.
- Estrellas de seguimiento.
- Tab bar inferior visible.

---

### `app-detalle-envio.png`

Debe mostrar:

- Pantalla Detalle del envío.
- Botón de seguimiento ★.
- Botones para cambiar el estado.
- Información del cliente, conductor y ruta.
- Tab bar inferior visible.

---

### `app-seguimiento.png`

Debe mostrar:

- Tab Seguimiento.
- Envíos marcados.
- Badge en la tab bar.

---

### `app-badge.png`

Debe mostrar el badge actualizado en la tab **Seguimiento**.

---

## 📌 Restricciones cumplidas

- No se usó `any`.
- No se usó `useState` para el estado de envíos ni de seguimiento.
- Los selectores son específicos.
- El store está tipado con `create<PackageStore>()`.
- La app está adaptada al dominio asignado.
- No se copiaron datos genéricos sin contexto.
- El badge se actualiza desde el store, no desde props.
- La navegación es funcional en Expo.

---

## ✅ Resultado esperado

Al ejecutar la app se muestra una aplicación de mensajería con estado global.

El usuario puede:

- Ver la lista de envíos.
- Marcar envíos para seguimiento.
- Ver esos envíos en la tab Seguimiento.
- Ver el badge actualizado en tiempo real.
- Cambiar el estado de un envío desde el detalle.
- Navegar entre Envíos, Seguimiento, Drivers y Rutas.

Este proyecto demuestra el uso práctico de Zustand con:

- Store tipado.
- Acciones compartidas.
- Selectores.
- Badge dinámico.
- Estado compartido entre pantallas.
- Dominio adaptado a Mensajería Courier.
````