Sí, claro. Este sería el **README de Semana 01** con el mismo estilo más completo que te gustó del de Semana 02, pero adaptado correctamente a lo que pedía la **Semana 01: Core Components y Flexbox**.

Pégalo en:

```txt
week-01-core_components_y_flexbox/3-proyecto/README.md
```

````md
# Proyecto Semana 01 — App de Tarjetas

Semana 01 — Core Components y Flexbox  
Fase 1 — Fundamentos React Native

---

## 🎯 Objetivo

Construir una app móvil de pantalla única que muestre una lista de tarjetas usando los Core Components de React Native y Flexbox.

En este proyecto, el dominio asignado es **Empresa de mensajería / Courier**. La app muestra tarjetas de paquetes o envíos activos dentro de una operación de mensajería. Cada tarjeta presenta información relacionada con el paquete, el cliente, la ruta y el conductor asignado.

El objetivo principal de esta semana es practicar la construcción de interfaces móviles usando componentes básicos de React Native, estilos con `StyleSheet.create` y distribución visual con Flexbox.

---

## 📋 Dominio asignado

**Empresa de mensajería / Courier**

Este dominio representa una empresa encargada de gestionar envíos, paquetes, clientes, conductores y rutas de entrega.

En la app, cada tarjeta representa un paquete o envío. La información mostrada permite consultar rápidamente el estado de la operación logística y los datos principales de cada entrega.

---

## 📦 Descripción del proyecto

**Mensajería Courier** es una aplicación móvil de pantalla única construida con React Native y Expo.

La pantalla principal muestra una lista de tarjetas de envíos. Cada tarjeta contiene información operativa sobre un paquete, como el código del envío, el tipo de servicio, estado actual, cliente destinatario, dirección, conductor asignado, vehículo, ruta, trayecto, ETA, peso y número de paradas.

La app también incluye filtros por estado del envío usando botones interactivos. Estos filtros permiten visualizar paquetes según su estado operativo:

- Todos
- Pendiente
- En tránsito
- Entregado
- Programado

Además, cada tarjeta incluye una acción usando `Pressable`. Al presionar el botón **Ver detalle del envío**, se despliega un panel con información adicional del paquete. El botón también tiene feedback visual al presionarse, cumpliendo con los requisitos de interacción de la semana.

---

## 🧩 Entidades del dominio

La app utiliza cuatro entidades principales relacionadas con una empresa courier.

### Package / Envío

Representa el paquete gestionado por la empresa de mensajería.

Datos usados:

- Código del paquete.
- Tipo de servicio.
- Estado del envío.
- ETA.
- Peso.
- Imagen.

### Customer / Cliente

Representa el cliente o destinatario del paquete.

Datos usados:

- Nombre.
- Dirección.
- Teléfono.

### Driver / Conductor

Representa el conductor asignado al envío.

Datos usados:

- Nombre.
- Vehículo.
- Calificación.

### Route / Ruta

Representa la ruta de entrega asignada al paquete.

Datos usados:

- Nombre de la ruta.
- Origen.
- Destino.
- Número de paradas.

---

## 🖼️ Datos mostrados en cada tarjeta

Cada tarjeta de envío muestra información operativa como:

- Código del paquete.
- Tipo de servicio.
- Estado del envío.
- Nombre del cliente.
- Dirección de entrega.
- Conductor asignado.
- Vehículo.
- Ruta.
- Trayecto.
- ETA.
- Peso.
- Número de paradas.
- Imagen relacionada con logística o mensajería.

---

## ✅ Requisitos cumplidos

- Pantalla principal de una sola vista.
- Lista de tarjetas usando `ScrollView`.
- Mínimo 3 tarjetas con datos coherentes al dominio asignado.
- Cada tarjeta muestra una imagen.
- Cada tarjeta tiene textos con estilos distintos.
- Cada tarjeta incluye una acción usando `Pressable`.
- El botón tiene feedback visual al presionarse.
- El botón permite mostrar u ocultar el detalle operativo del envío.
- Header de la app con el nombre del dominio.
- Estilos definidos con `StyleSheet.create`.
- Layout construido con Flexbox.
- Código escrito en TypeScript.
- Interfaces definidas para los datos del dominio.
- Proyecto organizado en carpetas `src`.

---

## 🧱 Core Components usados

En el proyecto se utilizaron los Core Components solicitados para la Semana 01:

- `View`
- `Text`
- `Image`
- `ScrollView`
- `Pressable`
- `TouchableOpacity`
- `SafeAreaView`
- `StyleSheet.create`

Estos componentes permiten construir la interfaz usando únicamente herramientas nativas de React Native, sin librerías externas de UI.

---

## 📐 Uso de Flexbox

La interfaz fue construida usando Flexbox para organizar los elementos en pantalla.

Propiedades utilizadas:

- `flex`
- `flexDirection`
- `justifyContent`
- `alignItems`
- `gap`

Ejemplos de uso dentro de la app:

- `flex: 1` para que la pantalla ocupe todo el espacio disponible.
- `flexDirection: 'row'` para organizar filtros, tarjetas resumen y cajas de información.
- `justifyContent: 'space-between'` para separar el código del paquete y el estado.
- `alignItems: 'center'` para alinear elementos dentro de filas.
- `gap` para separar elementos dentro de contenedores.

---

## 🎨 Decisiones de diseño

Se utilizó una paleta visual basada en tonos azules, grises y blancos para representar un entorno logístico y operativo.

Las tarjetas tienen fondo blanco para destacar sobre el fondo general de la app. Los estados del paquete usan colores diferenciados para facilitar la lectura rápida:

- Verde para entregado.
- Azul para en tránsito.
- Amarillo para pendiente.
- Morado para programado.

El diseño busca que la información de cada envío sea clara y fácil de consultar. Por eso, cada tarjeta agrupa los datos principales en secciones visuales:

- Encabezado con código y estado.
- Información del cliente, conductor y ruta.
- Datos resumidos de ETA, peso y paradas.
- Botón para mostrar el detalle operativo.

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
        ├── types/
        │   └── index.ts
        ├── data/
        │   └── mockData.ts
        ├── components/
        │   └── ItemCard.tsx
        └── screens/
            └── HomeScreen.tsx
```

---

## 📄 Descripción de archivos principales

### `App.tsx`

Punto de entrada visual de la aplicación. Renderiza la pantalla principal `HomeScreen`.

### `src/screens/HomeScreen.tsx`

Contiene la pantalla principal de la app. En este archivo se renderizan:

- Header de la app.
- Tarjetas resumen.
- Filtros por estado.
- Lista de tarjetas de paquetes.

### `src/components/ItemCard.tsx`

Componente reutilizable que muestra la información de cada paquete o envío.

Cada tarjeta muestra varios campos del dominio:

- Código.
- Tipo de servicio.
- Estado.
- Cliente.
- Dirección.
- Conductor.
- Vehículo.
- Ruta.
- Trayecto.
- ETA.
- Peso.
- Paradas.

También incluye el botón `Pressable` para mostrar u ocultar el detalle operativo del envío.

### `src/data/mockData.ts`

Contiene los datos simulados del dominio. Incluye paquetes, clientes, conductores y rutas.

### `src/types/index.ts`

Contiene los tipos e interfaces TypeScript usados para representar los datos del dominio.

---

## ⚙️ Configuración en Expo

El archivo `app.json` contiene el nombre relacionado con el dominio asignado:

```json
{
  "expo": {
    "name": "Mensajeria Courier",
    "slug": "mensajeria-courier"
  }
}
```

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

Al ejecutar la app se recomienda verificar:

- Que el header muestre **Mensajería Courier**.
- Que se visualicen las tarjetas de envíos.
- Que cada tarjeta tenga una imagen.
- Que los filtros por estado funcionen.
- Que el botón **Ver detalle del envío** despliegue el panel de detalle.
- Que el botón cambie visualmente al presionarse.
- Que no existan errores en Metro o en la consola.

---

## 📸 Evidencia

Agregar captura o grabación de la app funcionando en Expo Go, emulador o navegador.

La evidencia debe mostrar:

- Header con el nombre **Mensajería Courier**.
- Lista de tarjetas de envíos.
- Imágenes visibles.
- Filtros por estado.
- Botón **Ver detalle del envío**.
- Panel de detalle operativo desplegado.

---

## 📌 Restricciones cumplidas

- No se usó `position: 'absolute'`.
- No se usaron librerías externas de UI.
- No se usaron estilos inline.
- Todo el layout fue construido con Flexbox.
- Todo el código fue escrito en TypeScript.
- Los estilos fueron creados con `StyleSheet.create`.
- La app fue adaptada al dominio asignado.

---

## ✅ Resultado esperado

Al ejecutar la app se muestra una pantalla de control operativo para una empresa de mensajería.

El usuario puede visualizar paquetes activos, identificar su estado, conocer el cliente destinatario, revisar el conductor asignado, consultar la ruta y desplegar más información del envío mediante una acción interactiva.

Este proyecto demuestra el uso práctico de los fundamentos de React Native trabajados durante la Semana 01:

- Core Components.
- Flexbox.
- Estilos con `StyleSheet.create`.
- Componentes reutilizables.
- TypeScript.
- Adaptación a un dominio real.
````