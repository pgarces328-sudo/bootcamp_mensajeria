# Proyecto Semana 02 — App de Listas con Búsqueda

Semana 02 — Listas, Inputs y Estilos  
Fase 1 — Fundamentos React Native

---

## 🎯 Objetivo

Construir una app móvil que combine `FlatList` con `TextInput` para listar y filtrar elementos del dominio asignado. Además, se aplican temas visuales consistentes usando constantes de estilo como `COLORS`, `TYPOGRAPHY`, `SPACING`, `RADIUS` y otras definiciones reutilizables.

En este proyecto, el dominio asignado es **Empresa de mensajería / Courier**. La app muestra una lista de paquetes registrados en una operación de mensajería y permite buscar en tiempo real por código, cliente, conductor, ruta, destino, estado o tipo de servicio.

El objetivo principal de esta semana es mejorar la app construida en la Semana 01. En lugar de renderizar tarjetas con una lista simple, ahora se usa `FlatList`, que es más adecuado para listas dinámicas o con mayor cantidad de elementos. También se agrega un campo de búsqueda con `TextInput` para mejorar la interacción del usuario.

---

## 📋 Dominio asignado

**Empresa de mensajería / Courier**

Este dominio representa una empresa encargada de gestionar envíos, paquetes, rutas de entrega, conductores y clientes destinatarios.

En la app, cada elemento de la lista representa un paquete o envío. Cada paquete contiene información operativa útil para consultar rápidamente su estado dentro del flujo logístico.

---

## 📦 Descripción del proyecto

**Mensajería Courier** es una aplicación móvil de pantalla única construida con React Native y Expo.

La pantalla principal permite consultar una lista de paquetes de una empresa de mensajería. Cada paquete se muestra mediante una tarjeta reutilizable que contiene datos como el código de seguimiento, cliente, destino, conductor, ruta, estado, tipo de servicio, ETA y peso.

La app incluye un campo de búsqueda en la parte superior. Mientras el usuario escribe, la lista se filtra automáticamente en tiempo real. Esto permite encontrar rápidamente un envío específico sin recorrer toda la lista manualmente.

La búsqueda funciona sobre varios campos del dominio:

- Código del paquete.
- Nombre del cliente.
- Dirección o destino.
- Nombre del conductor.
- Ruta asignada.
- Estado del envío.
- Tipo de servicio.

Si la búsqueda no encuentra coincidencias, la app muestra un estado vacío personalizado indicando que no se encontraron envíos. Esto mejora la experiencia de usuario y evita que la pantalla quede vacía sin explicación.

---

## 🧩 Entidad principal

La entidad principal del proyecto es:

**CourierPackage**

Esta interfaz representa un paquete o envío dentro del sistema de mensajería.

Campos usados:

- `id`: identificador único del paquete.
- `trackingCode`: código de seguimiento del envío.
- `customerName`: nombre del cliente o destinatario.
- `destination`: dirección o destino de entrega.
- `driverName`: conductor asignado.
- `routeName`: ruta de entrega.
- `status`: estado actual del paquete.
- `serviceType`: tipo de servicio contratado.
- `estimatedDelivery`: hora o fecha estimada de entrega.
- `weightKg`: peso del paquete en kilogramos.

---

## ✅ Requisitos cumplidos

- Lista principal usando `FlatList`.
- Mínimo 10 items del dominio.
- Búsqueda en tiempo real usando `TextInput`.
- Filtrado case-insensitive.
- Estado vacío personalizado cuando no hay resultados.
- Componente reutilizable `ItemCard`.
- Uso de `KeyboardAvoidingView`.
- Estilos basados en constantes desde `src/theme/index.ts`.
- `keyExtractor` usando el `id` del item.
- Filtrado con `useMemo`.
- `renderItem`, `keyExtractor`, separador y estado vacío con `useCallback`.
- Separador visual entre tarjetas con `ItemSeparatorComponent`.
- Código TypeScript sin uso de `any`.

---

## 🧱 Core Components usados

- `View`
- `Text`
- `TextInput`
- `FlatList`
- `Pressable`
- `SafeAreaView`
- `KeyboardAvoidingView`
- `StyleSheet.create`

Estos componentes permiten construir la interfaz usando únicamente herramientas nativas de React Native, sin librerías externas de UI.

---

## 🔎 Funcionalidad de búsqueda

La búsqueda se realiza en tiempo real. Cada vez que el usuario escribe en el `TextInput`, el estado `searchText` se actualiza y la lista filtrada se recalcula.

La lógica de filtrado se implementa con `useMemo`, lo que permite evitar cálculos innecesarios en cada renderizado.

La búsqueda no distingue entre mayúsculas y minúsculas, porque tanto el texto ingresado como los campos del paquete se normalizan con `toLowerCase()`.

Ejemplos de búsqueda:

```txt
ENV-5019
Carlos
Entregado
Ruta Norte
Express
```

Si no hay coincidencias, se muestra el mensaje:

```txt
No se encontraron envíos
```

---

## 📋 Uso de FlatList

La lista principal del proyecto usa `FlatList`, no `ScrollView`.

`FlatList` es más adecuado para listas con varios elementos porque está optimizado para renderizar listas de datos. Además, permite usar propiedades específicas como:

- `data`
- `renderItem`
- `keyExtractor`
- `ItemSeparatorComponent`
- `ListEmptyComponent`
- `contentContainerStyle`

En este proyecto, `keyExtractor` usa el campo `id` del paquete:

```tsx
const keyExtractor = useCallback((item: CourierPackage) => item.id, []);
```

No se usa el índice del array como key.

---

## 🎨 Theming

Los estilos usan constantes definidas en:

```txt
src/theme/index.ts
```

Constantes usadas:

- `COLORS`
- `TYPOGRAPHY`
- `SPACING`
- `RADIUS`
- `BORDER_WIDTH`
- `INTERACTION`
- `SHADOWS`

El uso de constantes permite mantener una identidad visual consistente en toda la app. También facilita modificar colores, tamaños o espaciados desde un solo lugar sin tener que cambiar cada componente manualmente.

---

## 🎨 Decisiones de diseño

Se mantuvo una paleta sobria en tonos azules, grises y blancos para representar un entorno logístico y operativo.

Las tarjetas tienen fondo blanco para destacar sobre el fondo general de la pantalla. Los estados del paquete usan colores diferentes para facilitar la lectura rápida:

- Verde para entregado.
- Azul para en tránsito.
- Amarillo para pendiente.
- Morado para programado.
- Rojo para incidencia.

El campo de búsqueda se ubicó antes de la lista para que el usuario pueda filtrar inmediatamente los envíos. También se incluye un botón **Limpiar** cuando hay texto escrito, permitiendo reiniciar la búsqueda fácilmente.

---

## 📁 Estructura del proyecto

```txt
starter/
├── App.tsx
├── app.json
├── package.json
├── tsconfig.json
└── src/
    ├── types/
    │   └── index.ts
    ├── data/
    │   └── mockData.ts
    ├── components/
    │   └── ItemCard.tsx
    ├── screens/
    │   └── HomeScreen.tsx
    └── theme/
        └── index.ts
```

---

## 📄 Descripción de archivos principales

### `App.tsx`

Punto de entrada de la app. Renderiza la pantalla principal `HomeScreen`.

### `src/screens/HomeScreen.tsx`

Contiene la pantalla principal. Aquí se implementa:

- Header.
- `TextInput` de búsqueda.
- Lógica de filtrado.
- `FlatList`.
- Estado vacío.
- Manejo del teclado.

### `src/components/ItemCard.tsx`

Componente reutilizable que muestra la información de cada paquete.

Cada tarjeta muestra varios campos del dominio:

- Código.
- Cliente.
- Destino.
- Conductor.
- Ruta.
- Estado.
- ETA.
- Peso.

### `src/data/mockData.ts`

Contiene los datos simulados del dominio. Incluye más de 10 paquetes para cumplir el requisito de la semana.

### `src/types/index.ts`

Contiene los tipos e interfaces TypeScript del dominio.

### `src/theme/index.ts`

Contiene constantes visuales reutilizables para estilos.

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

Luego se puede abrir la app en:

- Expo Go.
- Emulador Android.
- Simulador iOS.
- Navegador web si Expo lo permite.

---

## 🧪 Pruebas sugeridas

Buscar por código:

```txt
ENV-5019
```

Buscar por cliente:

```txt
Laura
```

Buscar por conductor:

```txt
Carlos
```

Buscar por estado:

```txt
Entregado
```

Buscar por tipo de servicio:

```txt
Express
```

Buscar un texto inexistente:

```txt
xxxxx
```

Debe mostrarse el estado vacío:

```txt
No se encontraron envíos
```

---

## 📸 Evidencia

Agregar captura o grabación de la app funcionando en Expo Go, emulador o navegador.

La evidencia debe mostrar:

- Lista de paquetes.
- Input de búsqueda.
- Resultados filtrados.
- Estado vacío cuando no hay coincidencias.

---

## 📌 Restricciones cumplidas

- No se usó `ScrollView` para la lista principal.
- No se usó el índice del array como key.
- No se usó `any`.
- No se usaron librerías externas de UI.
- Los estilos están definidos con `StyleSheet.create`.
- El layout está construido con Flexbox.
- El proyecto está adaptado al dominio asignado.

---

## ✅ Resultado esperado

Al ejecutar la app se muestra una pantalla de consulta de envíos para una empresa de mensajería.

El usuario puede revisar la lista de paquetes, buscar en tiempo real, consultar los datos principales de cada envío y recibir un mensaje claro cuando no hay resultados para la búsqueda realizada.