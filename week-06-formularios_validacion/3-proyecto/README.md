# Proyecto Semana 06 — Formularios con React Hook Form + Zod

## Mensajería Courier — Create + Edit con validación

Semana 06 — Formularios con React Hook Form + Zod
Fase 2 — Core React Native

---

## 🎯 Objetivo

Construir formularios Create y Edit con validación Zod aplicados a tu dominio asignado.

El objetivo de este proyecto es evolucionar la app de **Mensajería Courier** para que ya no solo consulte envíos, sino que también pueda crearlos y editarlos con formularios reales. Cada tarjeta ya venía de las semanas 1 a 5, ahora se suma la creación con validación en español y la edición con datos cargados desde la API, usando `FormField` reutilizable, `zodResolver` y `TanStack Query`.

Esta semana la app pasa de solo leer envíos a poder crearlos y modificarlos con errores visibles, botón deshabilitado con spinner y navegación de regreso al guardar.

---

## 📋 Dominio asignado

**Empresa de mensajería / Courier**

La app representa una operación básica de mensajería en la que se gestionan:

- Paquetes o envíos.
- Conductores.
- Rutas de entrega.
- Estados operativos de los paquetes.
- Creación y edición de envíos con validación.

> 📌 La implementación es coherente con el dominio. No se copiaron datos genéricos sin contexto, todos los campos y validaciones son de envíos Courier.

### 💡 Adaptación del enunciado al dominio

| Concepto del enunciado | Implementación Courier |
|---|---|
| Campos del formulario | Cliente, dirección, peso, servicio |
| Validaciones Zod | Cliente min 3, dirección min 10, peso > 0, servicio enum |
| FormField reutilizable | `FormField` para texto + `ServicePicker` para servicio |
| CreateScreen | `CreateShipmentScreen` con `useCreatePackage` |
| EditScreen | `EditShipmentScreen` con `defaultValues` + `reset()` |
| Tipo inferido | `PackageFormData` con `z.infer` |

---

## 📦 Descripción del proyecto

**Mensajería Courier** es una aplicación móvil que permite ver envíos y ahora también crearlos y editarlos con validación.

La app cuenta con Tabs de Envíos, Seguimiento, Drivers y Rutas. En Envíos hay botón **+ Nuevo** que abre Create. En Detalle hay botón **Editar envío** que abre Edit.

Cada tarjeta integra:

- Código ENV-500X, servicio, estado con color.
- Cliente, destino, conductor, ruta.
- ETA, peso, paradas.
- Estrella de seguimiento.

Lo nuevo de esta semana es:

- `packageSchema` con Zod y mensajes en español.
- `FormField` reutilizado en Create y Edit para cliente, dirección y peso.
- `ServicePicker` con chips Express / Estándar / Mismo día en vez de texto libre.
- Create guarda con mutation y vuelve solo con `goBack` en `onSuccess`.
- Edit viene lleno con `reset()` cuando llega `item` y guarda cambios.

La app combina:

- `useForm` + `Controller` de React Hook Form
- `z.object` + `zodResolver` + `z.infer`
- `FormField` reutilizable
- `QueryClientProvider`, `useQuery`, `useMutation`
- `NavigationContainer` + Tab + Stack anidado
- Store Zustand solo para seguimiento

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
    ├── ShipmentDetail
    ├── CreateShipment
    └── EditShipment
```

Create se abre con:

```tsx
navigation.navigate('CreateShipment')
```

Edit se abre con:

```tsx
navigation.navigate('EditShipment', { id: item.id })
```

Esto permite crear y editar sin perder la barra inferior. Cada tab conserva su propio historial.

---

## 🧩 Pantallas de la app

### Envíos

Lista desde API con buscador y filtros. Arriba botón **+ Nuevo** que abre Create.

Muestra buscador, filtros Todos / Pendiente / En tránsito / Entregado / Programado, contador y `FlatList`. Al tocar una tarjeta va al detalle. Al tocar la estrella marca seguimiento.

### CreateShipment

Formulario de creación.

Campos:

- Cliente min 3 caracteres.
- Dirección min 10 caracteres.
- Peso > 0 numérico.
- Servicio con chips Express / Estándar / Mismo día.

Si dejas vacío y das Crear salen 4 errores rojos en español. Si llenas bien crea con `useCreatePackage` y vuelve solo. Botón deshabilitado con spinner en `isSubmitting`.

### ShipmentDetail

Detalle con cliente, conductor, ruta y botón **Editar envío** que abre Edit con el `id`.

### EditShipment

Mismo formulario pero viene lleno.

Usa `usePackageById` + `reset()` dentro de `useEffect` cuando llega `item`. Cambias peso a -5 da error, corriges a 3 y Guarda actualiza y vuelve. Demuestra `defaultValues` cargados desde API.

### Seguimiento / Drivers / Rutas

Se mantienen de semanas anteriores con ★, badge, Tabs y lista. No se tocaron para esta entrega, solo se conserva la navegación.

---

## 🧱 Entidades del dominio

### CourierPackage

- `id`
- `trackingCode`
- `customerName`
- `destination`
- `status`
- `serviceType`
- `weightKg`
- `estimatedDelivery`
- `stops`
- `driverId`
- `routeId`

### PackageFormData - desde Zod

```ts
customerName: min 3
destination: min 10
weightKg: string que valida > 0
serviceType: Express | Estándar | Mismo día
```

Tipo generado con `z.infer`, no interfaz manual duplicada.

### Driver / DeliveryRoute

Se mantienen para dar contexto al envío en lista y detalle.

---

## ✅ Requisitos cumplidos

- FormField reutilizable en Create y Edit con `Controller` + `TextInput` + error.
- Create funcional con `zodResolver`, campos tipados, botón con `useMutation`, navega atrás en `onSuccess`.
- Edit con `defaultValues` + `reset()` cuando llega `item` desde `usePackageById`.
- Validación activa con errores inline en español al enviar vacío.
- Botón deshabilitado con spinner en `isSubmitting` / `isPending`.
- App adaptada a Courier.
- TypeScript sin `any`.
- App funcional en Expo Go.

---

## 🧠 Conceptos aplicados

### useForm + Controller

En RN no se usa `register`, se usa `Controller` porque `TextInput` usa `value / onChangeText`.

```tsx
<Controller
  control={control}
  name="customerName"
  render={({ field: { onChange, onBlur, value } }) => (
    <TextInput value={value} onChangeText={onChange} onBlur={onBlur} />
  )}
/>
```

### Zod + zodResolver

Schema es única fuente. `z.infer` genera el tipo solo.

```ts
export const packageSchema = z.object({
  customerName: z.string().min(3, 'Mínimo 3 caracteres'),
  destination: z.string().min(10, 'Mínimo 10 caracteres'),
  weightKg: z.string().refine((v) => Number(v) > 0, 'Debe ser mayor a 0'),
  serviceType: z.enum(['Express', 'Estándar', 'Mismo día']),
});
```

### FormField

Encapsula `Controller + TextInput + error`. Se usa en ambas pantallas para no copiar código.

### defaultValues + reset

Edit carga con `reset()` dentro de `useEffect` cuando llega `item` de la API.

```tsx
useEffect(() => {
  if (item) reset({ ...item });
}, [item, reset]);
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
    ├── tsconfig.json
    ├── assets/
    └── src/
        ├── schemas/
        │   └── packageSchema.ts
        ├── components/
        │   ├── ShipmentCard.tsx
        │   ├── FormField.tsx
        │   └── ServicePicker.tsx
        ├── hooks/
        │   └── usePackages.ts
        ├── screens/
        │   ├── ShipmentsScreen.tsx
        │   ├── ShipmentDetailScreen.tsx
        │   ├── CreateShipmentScreen.tsx
        │   ├── EditShipmentScreen.tsx
        │   ├── TrackedScreen.tsx
        │   ├── DriversScreen.tsx
        │   └── RoutesScreen.tsx
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

### `src/schemas/packageSchema.ts`

Schema Zod con 4 campos y mensajes en español. Exporta `PackageFormData` con `z.infer`.

### `src/components/FormField.tsx`

Reutilizable para cliente, dirección y peso. Muestra borde rojo + mensaje si hay error.

### `src/components/ServicePicker.tsx`

Chips para elegir servicio en vez de texto libre. Usa `Controller` por dentro.

### `src/hooks/usePackages.ts`

`usePackages`, `usePackageById`, `useCreatePackage`, `useUpdatePackage` con invalidación.

### `src/screens/CreateShipmentScreen.tsx`

Se abre con + Nuevo. Guarda y hace `goBack` en `onSuccess`.

### `src/screens/EditShipmentScreen.tsx`

Se abre con Editar. Viene lleno con `reset()` y guarda cambios.

### `src/screens/ShipmentsScreen.tsx`

Lista + botón + Nuevo.

### `src/screens/ShipmentDetailScreen.tsx`

Detalle + botón Editar.

---

## 🚀 Cómo ejecutar

Desde `3-proyecto`:

```bash
cd starter
pnpm install
npx expo install react-hook-form zod @hookform/resolvers axios @tanstack/react-query
pnpm start
```

Abrir con Expo Go. No usar web.

---

## 🧪 Pruebas sugeridas

1. Envíos muestra + Nuevo.
2. + Nuevo deja vacío Crear muestra 4 rojos en español.
3. Toca chips de servicio cambian naranja.
4. Llena bien crea y vuelve solo aparece arriba.
5. Detalle muestra Editar.
6. Edit viene lleno cambia peso -5 error corrige a 3 Guarda actualiza.

---

## 📸 Evidencia

```txt
app-lista-nuevo.png
app-create-errores.png
app-create-ok.png
app-edit-lleno.png
app-detalle-editar.png
```

### `app-lista-nuevo.png`
Lista con botón + Nuevo visible.

### `app-create-errores.png`
Create vacío con errores rojos en español.

### `app-create-ok.png`
Lista con nuevo arriba después de crear.

### `app-edit-lleno.png`
Edit con datos cargados y chips.

### `app-detalle-editar.png`
Detalle con botón Editar envío.

---

## 📌 Restricciones cumplidas

- Sin `any`.
- Sin `register`, solo `Controller`.
- Con `zodResolver`, no manual.
- Sin interfaz duplicando schema, con `z.infer`.
- FormField reutilizable, no copiado.
- App funcional en Expo Go.

---

## ✅ Resultado esperado

App de mensajería donde se puede crear y editar envíos con validación, errores visibles, chips de servicio, navegación completa y estado global mantenido. Todo reunido 1+2+3+4+5+6 y funcional en Expo Go.