# Ejercicio 02 — Flexbox: Layouts Clásicos

> Semana 01 — Fundamentos RN | Tiempo estimado: 1.5h

Replicarás 4 layouts clásicos de apps móviles usando únicamente Flexbox,
descomentando código y verificando el resultado después de cada paso.

## 🎯 Objetivos

- Dominar `flexDirection`, `justifyContent`, `alignItems` y `flex`.
- Entender la diferencia entre eje principal y eje cruzado.
- Construir layouts sin `position: 'absolute'`.

## 📋 Requisitos previos

- Haber leído `03-flexbox-layout.md`.
- Proyecto Expo corriendo en simulador o Expo Go.

## 🚀 Cómo empezar

```bash
cd ejercicio-02-flexbox-layouts/starter
pnpm install
pnpm start
```

## Layout 1: Header / Body / Footer

Estructura vertical con cabecera y pie de alto fijo y cuerpo flexible.

- Contenedor: `flexDirection: 'column'` (default)
- Header y footer: `height` fijo
- Body: `flex: 1`

**Verifica:** el body ocupa todo el espacio sobrante entre header y footer.

## Layout 2: Columnas iguales

Tres columnas del mismo ancho repartidas horizontalmente.

- Contenedor: `flexDirection: 'row'`
- Cada hijo: `flex: 1`

**Verifica:** las tres columnas tienen exactamente el mismo ancho.

## Layout 3: Sidebar + contenido

Barra lateral de ancho fijo y contenido que ocupa el resto.

- Contenedor: `flexDirection: 'row'`
- Sidebar: `width: 80`
- Contenido: `flex: 1`

**Verifica:** el sidebar mantiene su ancho y el contenido se adapta.

## Layout 4: Grid 2×2

Cuadrícula de cuatro elementos usando salto de línea.

- Contenedor: `flexDirection: 'row'` + `flexWrap: 'wrap'`
- Cada item: `width: '48%'`

**Verifica:** los elementos se organizan en dos filas de dos.

## ✅ Resultado esperado

Los 4 layouts renderizados correctamente, uno debajo del otro, dentro de un
`ScrollView`.

## 🔍 Para explorar más

1. En el Layout 2 cambia `justifyContent` a `'space-between'`, `'space-around'`
   y `'space-evenly'` — ¿qué diferencia hay?
2. En el Layout 3 quita el `flex: 1` del contenido — ¿qué ocurre?
3. Añade `borderWidth: 1` con colores distintos a cada contenedor para depurar
   visualmente las cajas.

## 📌 Restricción

No usar `position: 'absolute'`. Todo debe resolverse con Flexbox.