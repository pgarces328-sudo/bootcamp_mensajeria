# Proyecto Semana 09 — Animaciones Básicas

## Mensajería Courier — Lista animada, interactiva y visual

Semana 09 — Animaciones Básicas
Fase 3 — Avanzado | Semana 9 de 18 | ⏱️ 8 horas

---

## 🎯 Objetivo

Construir animaciones de entrada, feedback de interacción y transiciones de layout aplicadas al dominio asignado, sin romper la estructura construida en las semanas 01 a 08.

El objetivo de este proyecto es evolucionar la app de **Mensajería Courier** para que deje de aparecer de golpe y se sienta viva. La lista entra una por una con fade + desplazamiento, las tarjetas responden al tacto con escala de resorte, los filtros se mueven suave al cambiar y las pantallas suman fotografía real por estado, logo, cabecera operativa y avatares.

Esta semana la app integra todo lo anterior: tarjetas de la semana 1, FlatList + búsqueda de la semana 2, Tabs + detalle de la semana 3, seguimiento con Zustand de la semana 4, networking con TanStack Query de la semana 5, formularios Create + Edit de la semana 6, persistencia local de la semana 7, autenticación con JWT de la semana 8, más la capa nueva de animaciones.

---

## 📋 Dominio asignado

**Empresa de mensajería / Courier**

La app representa una operación básica de mensajería en la que se gestionan:

- Paquetes o envíos.
- Conductores.
- Rutas de entrega.
- Estados operativos de los paquetes.
- Sesión del coordinador mediante JWT.
- Preferencias visuales y caché offline.

> 📌 La implementación es coherente con el dominio. No se copiaron animaciones genéricas sin contexto. Cada animación tiene sentido operativo: la entrada ordena la lectura de la lista, el feedback confirma el toque y la transición suaviza el filtrado.

### 💡 Adaptación del enunciado al dominio

| Concepto del enunciado | Implementación Courier |
|---|---|
| Entrada con `useEffect` + `Animated.timing` | `AnimatedListItem.tsx` con fade + slide por índice en Envíos |
| Feedback con `Animated.spring` | `ShipmentCard.tsx` con escala 0.96 al presionar |
| `LayoutAnimation` al filtrar | `ShipmentsScreen.tsx` con `easeInEaseOut` en filtros Todos / Pendiente |
| Rotación, color y barra del ejercicio | Demostrados en prácticas, en proyecto se usan fade, slide y escala |
| Coherencia visual | Foto por estado, logo Courier Mensajería, banner en detalle, avatar en conductor |

---

## 📦 Descripción del proyecto

**Mensajería Courier** es una aplicación móvil protegida con login que ahora se presenta como plataforma visual operativa.

Al iniciar se presenta Login con `emilys / emilyspass`. Tras ingresar se accede a la barra inferior con seis secciones:

- **Envíos**
- **Seguimiento**
- **Conductores**
- **Rutas**
- **Ajustes**
- **Perfil**

En la sección **Envíos** se presenta cabecera con logo blanco para contraste, título Courier Mensajería, subtítulo de control operativo, bloque Envíos activos con contador, botón + Nuevo, buscador por guía, cliente, conductor o destino, filtros Todos / Pendiente / En tránsito / Entregado / Programado y lista con fotografía.

Cada tarjeta integra:

- Foto superior de 130 según estado: bodega en Pendiente, camiones en En tránsito, repartidor en Entregado, almacén en Programado.
- Badge de estado sobre la foto.
- Código ENV-500X, servicio, cliente, destino con dirección real de Bogotá, conductor, ruta.
- Cuadritos ETA, Peso y Paradas. ETA corresponde a entrega estimada.
- Estrella de seguimiento ★ / ☆.
- Animación de entrada y escala al presionar.

En modo compacto la foto, la ruta y los cuadritos se ocultan a propósito para mostrar tarjetas cortas y más rápidas de recorrer.

En la sección **Detalle** se presenta banner de 180, código, servicio, estado, cliente, conductor con avatar, ruta con trayecto origen → destino, botón Volver y botón Editar, con tab bar visible.

En las secciones **Conductores y Rutas** se presentan tarjetas con foto, calificación, envíos activos, iconos de sistema y línea naranja lateral para distinguir cada sección sin apariencia pobre.

En la sección **Ajustes** se mantienen vista compacta, orden, PIN y caché con estilo de tarjeta igual a Rutas.

La app combina:

- `Animated.Value`, `Animated.timing`, `Animated.spring`, `Animated.parallel`
- `interpolate` en prácticas, `LayoutAnimation` + `UIManager` en proyecto
- `NavigationContainer` único, Tab + Stack anidado
- `QueryClientProvider`, `useQuery`, `useMutation`
- Zustand para seguimiento y sesión, MMKV + AsyncStorage + SecureStore
- `useForm` + `zodResolver` en Login, Create y Edit

---

## 🧭 Navegación implementada

```txt
RootNavigator (NavigationContainer único)
├── !isAuthenticated -> AuthNavigator
│   └── Login
└── isAuthenticated -> Tabs
    ├── Envíos -> Stack
    │   ├── ShipmentsList
    │   ├── ShipmentDetail
    │   ├── CreateShipment
    │   └── EditShipment
    ├── Seguimiento
    ├── Conductores
    ├── Rutas
    ├── Ajustes
    └── Perfil
```

La animación no cambia la navegación. Solo agrega movimiento sobre la estructura ya validada en la semana 08.

---

## 🧩 Pantallas de la app

### Envíos

Pantalla principal animada.

Muestra cabecera Courier Mensajería con logo, bloque Envíos activos animado, botón + Nuevo, buscador completo, filtros animados y lista que entra una por una.

### Detalle del envío

Con foto banner según tracking, avatar de conductor, estrella y navegación a edición.

### Conductores

Con foto `pravatar`, iconos `people`, `bus`, `star` de sistema, calificación y envíos activos. Sin emojis de camión.

### Rutas

Con icono `map`, origen → destino, paradas y estado Activa, con borde lateral naranja.

### Ajustes

Con iconos `options`, `lock`, `cloud-offline` de sistema. Sin títulos técnicos pegados.

### Seguimiento

Con mismo formato de tarjeta que Rutas, contador y vaciar.

### Perfil

Con foto redonda, nombre del coordinador y cerrar sesión.

### Login

Se mantiene con `emilys / emilyspass` y validación Zod.

---

## 🧱 Entidades del dominio

### CourierPackage

- `id`
- `trackingCode` ENV-500X
- `customerName`
- `destination` con dirección real de Bogotá coherente con su zona Norte / Centro / Sur
- `driverId`
- `routeId`
- `status` Pendiente / En tránsito / Entregado / Programado / Incidencia
- `serviceType` Express / Estándar / Mismo día
- `estimatedDelivery` ETA
- `weightKg`
- `stops`

### Driver / DeliveryRoute

Con foto, vehículo, calificación y estado para dar contexto visual.

### Animaciones

- `AnimatedListItem` entrada por índice
- `scale` 0.96 en `ShipmentCard`
- `LayoutAnimation.easeInEaseOut` en filtros

---

## ✅ Requisitos cumplidos

- Entrada con `useEffect` + `Animated.timing` en lista principal.
- Feedback con `Animated.spring` en cards del dominio.
- `LayoutAnimation` con `UIManager.setLayoutAnimationEnabledExperimental` en Android.
- `useNativeDriver: true` en opacity y transform, `false` solo en width y color.
- Todo con `Animated.Value`, nada hardcodeado.
- App funcional con `pnpm start` + Expo Go sin crash.
- Animaciones coherentes con mensajería.
- TypeScript sin `any`.

---

## 🧠 Conceptos aplicados

### Animated.Value en hilo UI

Con `useNativeDriver: true` corre en nativo a 60 fps sin bloquear JS. Solo sirve para `opacity` y `transform`.

### timing vs spring vs decay

`timing` con `duration` para fade, `spring` con `tension / friction` para rebote, `decay` para frenado. En proyecto se usan los dos primeros.

### interpolate

Convierte rangos: `inputRange: [0,1]` a `outputRange: ['0deg','360deg']` o colores o `0% a 100%`. Con `clamp` no se pasa. Demostrado en práctica 02.

### LayoutAnimation

Anima cambios de layout de forma declarativa. En Android exige activar experimental. Se usa al cambiar de filtro.

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
        ├── components/
        │   ├── AnimatedListItem.tsx
        │   └── ShipmentCard.tsx
        ├── screens/
        ├── navigation/
        ├── services/
        ├── store/
        ├── storage/
        └── types/
```

`package.json` es largo porque acumula de la 1 a la 9, es lo correcto. Los de prácticas son cortos. `index.ts` es corto porque solo registra `App`, es lo correcto en Expo.

---

## 📄 Descripción de archivos principales

### `src/components/AnimatedListItem.tsx`

NUEVO 09. Fade + slide con `delay` por índice.

### `src/components/ShipmentCard.tsx`

Con foto por estado, badge sobre foto, spring 0.96 y modo compacto.

### `src/screens/ShipmentsScreen.tsx`

Con hero animado, logo blanco, buscador completo, filtros con `LayoutAnimation` y lista animada.

### `src/screens/ShipmentDetailScreen.tsx`

Con banner, avatar y tab visible.

---

## 🚀 Cómo ejecutar

Desde `3-proyecto`:

```bash
cd starter
pnpm install
pnpm start
```

También vale `pnpm dev` y `npm run dev`, ambos inician Expo. No corresponde `npm run dev` de Vite, este proyecto es Expo mobile.

Abrir con Expo Go con internet para fotos. No usar web para demo principal.

Scripts: `start` y `dev` hacen lo mismo.

---

## 🧪 Pruebas sugeridas

1. Entrar y observar lista que sube una por una.
2. Mantener presionada una tarjeta y observar que se hunde y rebota.
3. Cambiar filtro Todos / Pendiente y observar movimiento suave.
4. Verificar fotos distintas por estado y logo visible.
5. Verificar Vista compacta ON oculta foto y OFF la muestra.
6. Buscar por guía, cliente, conductor o destino.

---

## 📸 Evidencia

```txt
app-lista-animada.png
app-detalle.png
app-ajustes.png
```

### `app-lista-animada.png`

Lista con 2 tarjetas CON FOTO, logo visible, filtros.

### `app-detalle.png`

Detalle con banner + ★ y tab visible.

### `app-ajustes.png`

Ajustes limpio sin títulos pegados.

---

## 📌 Restricciones cumplidas

- Sin `any`.
- `useNativeDriver: true` donde corresponde.
- Con `UIManager` en Android.
- Sin crash en animación.
- Dominio Courier, no genérico.
- `pnpm`, no `npm run dev` de web.
- TypeScript sin errores.
- Lenguaje formal, sin tuteo.

---

## ✅ Resultado esperado

App de mensajería protegida, completa de la 1 a la 8, ahora visual e interactiva con fotografía por estado, entrada animada, feedback spring y transiciones suaves, funcional con `pnpm start` + Expo Go y lista para revisión automática por clonado.

Limitación: fotos requieren internet, sin red se ve gris pero no se cae. MMKV requiere build nativo, en Expo Go usa espejo.