# Proyecto Semana 03 — React Navigation

## Mensajería Courier — Navegación multipantalla

Semana 03 — React Navigation 7  
Fase 2 — Core React Native

---

## 🎯 Objetivo

Construir una aplicación móvil multipantalla usando React Navigation 7.

El objetivo de este proyecto es implementar una navegación real dentro de la app de **Mensajería Courier**, usando un `Tab Navigator` para separar las secciones principales y un `Stack Navigator` anidado para navegar desde una lista de envíos hacia una pantalla de detalle.

Esta semana la app evoluciona desde una pantalla única hacia una estructura con navegación entre pantallas, manteniendo el dominio asignado de empresa de mensajería / courier.

---

## 📋 Dominio asignado

**Empresa de mensajería / Courier**

La app representa una operación básica de mensajería en la que se gestionan:

- Paquetes o envíos.
- Conductores.
- Rutas de entrega.
- Estados operativos de los paquetes.

---

## 📦 Descripción del proyecto

**Mensajería Courier** es una aplicación móvil que permite navegar entre diferentes secciones de una empresa de mensajería.

La app cuenta con una barra de navegación inferior con tres secciones principales:

- **Envíos**
- **Drivers**
- **Rutas**

En la sección **Envíos**, el usuario puede ver una lista de paquetes activos. Al seleccionar un envío, la app navega hacia una pantalla de detalle donde se muestra información completa del paquete seleccionado.

La navegación de la app combina:

- `NavigationContainer`
- `Bottom Tab Navigator`
- `Native Stack Navigator`
- Navegación anidada
- Parámetros tipados con TypeScript

---

## 🧭 Navegación implementada

La app usa un `Tab Navigator` como navegación principal.

```txt
Tab Navigator
├── Envíos
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

Al tocar una tarjeta, se navega hacia la pantalla de detalle.

---

### Detalle del envío

Pantalla de detalle de un paquete seleccionado.

Recibe el parámetro `id` desde la pantalla de lista y busca la información correspondiente del envío.

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

## ✅ Requisitos cumplidos

- App multipantalla usando React Navigation.
- `NavigationContainer` configurado correctamente.
- `Tab Navigator` con 3 tabs adaptadas al dominio.
- `Stack Navigator` anidado dentro del tab de Envíos.
- Pantalla de lista de envíos.
- Pantalla de detalle de envío.
- Parámetro `id` enviado desde la lista hacia el detalle.
- Parámetros tipados con TypeScript.
- Headers con títulos descriptivos del dominio.
- Íconos en la tab bar usando `@expo/vector-icons`.
- App adaptada al dominio de mensajería / courier.
- TypeScript sin uso de `any`.
- App funcional en Expo.

---

## 🧠 Conceptos aplicados

### NavigationContainer

Se usa como contenedor principal de navegación.

```tsx
<NavigationContainer>
  ...
</NavigationContainer>
```

---

### Tab Navigator

Permite separar la app en secciones principales.

```txt
Envíos | Drivers | Rutas
```

---

### Stack Navigator

Permite navegar entre pantallas relacionadas.

```txt
Lista de envíos → Detalle del envío
```

---

### Navegación anidada

Se usa un Stack Navigator dentro de una tab.

Esto permite que el tab **Envíos** tenga su propio historial de navegación sin perder la barra inferior.

---

### Params tipados

El detalle del envío recibe un `id` tipado.

```ts
export type ShipmentsStackParamList = {
  ShipmentsList: undefined;
  ShipmentDetail: {
    id: string;
  };
};
```

La navegación se realiza así:

```tsx
navigation.navigate('ShipmentDetail', {
  id: item.id,
});
```

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

Punto de entrada visual de la app. Renderiza `AppNavigator`.

---

### `src/navigation/AppNavigator.tsx`

Configura el `NavigationContainer` y el `Bottom Tab Navigator`.

Define los tabs principales:

- Envíos
- Drivers
- Rutas

También configura los íconos de cada tab.

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

Cada tarjeta permite navegar al detalle del paquete.

---

### `src/screens/ShipmentDetailScreen.tsx`

Pantalla que recibe el parámetro `id` y muestra la información completa del envío seleccionado.

---

### `src/screens/DriversScreen.tsx`

Pantalla que muestra los conductores de la operación.

---

### `src/screens/RoutesScreen.tsx`

Pantalla que muestra las rutas de entrega.

---

### `src/components/ShipmentCard.tsx`

Componente reutilizable para mostrar una tarjeta resumida de un envío.

---

### `src/data/mockData.ts`

Contiene los datos simulados de:

- paquetes
- conductores
- rutas

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
   - Drivers
   - Rutas
4. En la tab Envíos se muestra una lista de paquetes.
5. Al tocar un paquete, se abre la pantalla **Detalle del envío**.
6. La pantalla de detalle muestra información del paquete seleccionado.
7. El botón **Volver a envíos** funciona.
8. La tab bar sigue visible al navegar al detalle.
9. Las pantallas Drivers y Rutas muestran información coherente al dominio.

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
app-tabs.png
```

### `app-envios.png`

Debe mostrar:

- Tab Envíos.
- Lista de paquetes.
- Tarjetas de envíos.
- Tab bar inferior visible.

---

### `app-detalle-envio.png`

Debe mostrar:

- Pantalla Detalle del envío.
- Código del paquete.
- Cliente.
- Estado.
- Conductor.
- Ruta.
- Botón para volver.
- Tab bar inferior visible.

---

### `app-tabs.png`

Debe mostrar:

- Tab Drivers o Rutas.
- Información del dominio.
- Tab bar inferior visible.

---

## 📌 Restricciones cumplidas

- No se usó `any`.
- Los parámetros de navegación están tipados.
- La app usa `NavigationContainer`.
- El Stack recibe parámetros entre pantallas.
- La app está adaptada al dominio asignado.
- No se copiaron datos genéricos sin contexto.
- La navegación es funcional en Expo.

---

## ✅ Resultado esperado

Al ejecutar la app se muestra una aplicación de mensajería organizada por navegación inferior.

El usuario puede:

- Ver la lista de envíos.
- Entrar al detalle de un envío.
- Consultar conductores.
- Consultar rutas.
- Navegar entre tabs.
- Mantener la barra inferior visible durante la navegación dentro del Stack.

Este proyecto demuestra el uso práctico de React Navigation 7 con:

- Tab Navigator.
- Stack Navigator.
- Navegación anidada.
- Parámetros tipados.
- Headers descriptivos.
- Dominio adaptado a Mensajería Courier.