# Proyecto Semana 01 — App de Tarjetas

Semana 01 — Fundamentos RN | Tiempo estimado: 3h

---

## 🎯 Objetivo

Construir una app de pantalla única que muestre una lista de tarjetas usando los Core Components y Flexbox. La app debe adaptarse al dominio asignado por el instructor.

En este proyecto, el dominio asignado es **Empresa de mensajería / Courier**.  
Cada tarjeta representa un paquete o envío dentro de una operación de mensajería. La app permite visualizar datos relacionados con paquetes, rutas, conductores y clientes.

El objetivo principal es aplicar los fundamentos de React Native trabajados durante la Semana 01:

- Core Components.
- Estilos con `StyleSheet.create`.
- Layouts con Flexbox.
- TypeScript con tipos explícitos.
- Organización básica de una app en carpetas.

---

## 📋 Tu Dominio Asignado

**Dominio:** Empresa de mensajería / Courier.

Cada aprendiz trabaja sobre un dominio único para evitar copias y fomentar implementaciones originales.

En este caso, la app está enfocada en una empresa courier que administra envíos activos, rutas de entrega, conductores asignados y clientes destinatarios.

---

## 💡 Adaptación por Dominio

| Dominio | Elemento | Datos en la tarjeta |
|---|---|---|
| 🚚 Empresa de mensajería / Courier | Paquete / Envío | Código, tipo de servicio, estado, cliente, dirección, conductor, vehículo, ruta, trayecto, ETA, peso, paradas e imagen |

---

## ✅ Requisitos Funcionales

- Pantalla principal con `ScrollView`.
- Mínimo 3 tarjetas con datos coherentes al dominio.
- Cada tarjeta muestra:
  - Una imagen local o URL.
  - Al menos 2 textos con estilos distintos.
  - Una acción usando `Pressable` con feedback visual.
- Header de la app con el nombre del dominio.
- Estilos con `StyleSheet.create`, sin estilos inline.
- TypeScript con interfaces definidas para los datos del dominio.
- Datos organizados en archivos separados.
- Componente de tarjeta reutilizable.
- Pantalla principal separada en una carpeta `screens`.

---

## ✅ Requisitos implementados

La app implementa los requisitos de la siguiente manera:

- Usa `ScrollView` para mostrar la lista de tarjetas.
- Muestra más de 3 tarjetas de paquetes.
- Cada tarjeta tiene una imagen por URL.
- Cada tarjeta muestra información de paquete, cliente, conductor y ruta.
- Cada tarjeta incluye un botón `Pressable`.
- El botón tiene feedback visual al presionarse.
- El botón permite mostrar u ocultar el detalle operativo del envío.
- El header muestra el nombre **Mensajería Courier**.
- Los estilos están definidos con `StyleSheet.create`.
- Los datos del dominio están tipados con TypeScript.
- La estructura del código está separada en `types`, `data`, `components` y `screens`.

---

## 📁 Estructura del starter

```txt
starter/
├── App.tsx               # Punto de entrada
├── package.json          # Dependencias del proyecto
├── tsconfig.json         # Configuración TypeScript
├── app.json              # Configuración Expo
├── index.ts              # Registro del componente principal
├── assets/               # Recursos estáticos
└── src/
    ├── types/
    │   └── index.ts      # Interfaces del dominio Courier
    ├── data/
    │   └── mockData.ts   # Datos de ejemplo de paquetes
    ├── components/
    │   └── ItemCard.tsx  # Componente tarjeta reutilizable
    └── screens/
        └── HomeScreen.tsx # Pantalla principal con la lista
```

---

## 🧩 Entidades del dominio

La app utiliza cuatro entidades principales relacionadas con una empresa de mensajería:

### Package / Envío

Representa el paquete gestionado por la empresa.

Datos usados:

- Código del paquete.
- Tipo de servicio.
- Estado.
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

---

## 📐 Uso de Flexbox

La interfaz utiliza Flexbox para organizar los elementos en pantalla.

Propiedades utilizadas:

- `flex`
- `flexDirection`
- `justifyContent`
- `alignItems`
- `gap`

Ejemplos de uso dentro de la app:

- `flex: 1` para que la pantalla ocupe todo el espacio disponible.
- `flexDirection: 'row'` para organizar filtros, tarjetas resumen y cajas de información.
- `justifyContent: 'space-between'` para separar código del paquete y estado.
- `alignItems: 'center'` para alinear elementos en filas.
- `gap` para separar elementos dentro de contenedores.

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

Luego se puede abrir la app usando:

- Expo Go en dispositivo físico.
- Emulador Android.
- Simulador iOS.
- Navegador web si Expo lo permite.

---

## 🛠️ Entregables

- App funcional en simulador, Expo Go o navegador.
- Mínimo 3 tarjetas con datos del dominio **Empresa de mensajería / Courier**.
- Código subido al repositorio.
- Nombre del dominio configurado en `app.json`.
- Screenshot o grabación de la app funcionando.
- README del proyecto adaptado al dominio asignado.

---

## ⚙️ Configuración del dominio en app.json

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

## 📊 Criterios de Evaluación

Ver:

```txt
../rubrica-evaluacion.md
```

---

## 📌 Restricciones

- ❌ No usar `position: 'absolute'`.
- ❌ No usar ninguna librería de UI externa.
- ❌ No usar estilos inline como `style={{ ... }}` directo en JSX.
- ✅ Usar solo Flexbox para construir el layout.
- ✅ Todo el código en TypeScript con tipos explícitos.
- ✅ Usar `StyleSheet.create` para los estilos.

---

## 📸 Evidencia

La entrega debe incluir una captura o grabación de la app funcionando.

La evidencia debe mostrar:

- Header con el nombre **Mensajería Courier**.
- Lista de tarjetas de envíos.
- Imagen visible en las tarjetas.
- Datos del paquete, cliente, conductor y ruta.
- Filtros por estado.
- Botón **Ver detalle del envío**.
- Panel de detalle operativo desplegado al presionar el botón.

---

## ✅ Resultado esperado

Al ejecutar la app se muestra una pantalla de control operativo para una empresa de mensajería.

El usuario puede:

- Visualizar paquetes activos.
- Identificar el estado de cada envío.
- Ver el cliente destinatario.
- Consultar el conductor asignado.
- Revisar la ruta y el trayecto.
- Filtrar envíos por estado.
- Mostrar u ocultar el detalle operativo de cada paquete.

La app demuestra el uso de Core Components, estilos con `StyleSheet.create`, TypeScript y Flexbox en React Native.
```