# Ejercicio 01 — FlatList Básica

> Semana 02 — Listas, Inputs y Estilos | Tiempo estimado: 1.5h

Construirás una lista virtualizada con FlatList, implementando paso a paso todas
sus props principales y verificando el resultado en Expo Go.

## 🎯 Objetivos

- Usar `FlatList` con `data`, `renderItem` y `keyExtractor`.
- Entender la diferencia entre `FlatList` y `ScrollView`.
- Implementar separadores, estado vacío y encabezado de lista.
- Añadir pull-to-refresh con `refreshing` y `onRefresh`.

## 📋 Requisitos previos

- Haber leído `01-flatlist-sectionlist.md`.
- Proyecto Expo corriendo en simulador o Expo Go.

## 🚀 Cómo empezar

```bash
cd ejercicio-01-flatlist-basica/starter
pnpm install
pnpm start
```

## Paso 1: FlatList con data y renderItem

Renderiza la lista base a partir del array de datos.

```tsx
<FlatList
  data={items}
  renderItem={renderItem}
/>
```

**Verifica:** aparecen todos los elementos de la lista en pantalla.

## Paso 2: keyExtractor con IDs únicos

Añade la extracción de claves usando el `id` del item.

```tsx
keyExtractor={(item) => item.id}
```

**Verifica:** desaparece el warning de la consola sobre keys.

> ⚠️ Nunca uses el índice del array como key. React lo necesita para la
> reconciliación: con índices, al filtrar o reordenar se asocia el estado y las
> animaciones al item equivocado.

## Paso 3: ItemSeparatorComponent

Añade una línea divisoria entre elementos.

```tsx
ItemSeparatorComponent={renderSeparator}
```

**Verifica:** hay un separador visible entre cada par de items, pero no antes
del primero ni después del último.

## Paso 4: ListHeaderComponent

Añade un encabezado con el título de la lista y el contador.

```tsx
ListHeaderComponent={renderHeader}
```

**Verifica:** el encabezado se desplaza junto con la lista.

## Paso 5: ListEmptyComponent

Muestra un mensaje cuando la lista está vacía.

```tsx
ListEmptyComponent={renderEmpty}
```

**Verifica:** pulsa el botón "Vaciar lista" y aparece el mensaje.

## Paso 6: Pull-to-refresh

Implementa el gesto de deslizar hacia abajo para recargar.

```tsx
refreshing={refreshing}
onRefresh={handleRefresh}
```

**Verifica:** al deslizar hacia abajo aparece el indicador de carga y la lista
se restaura tras un segundo.

## ✅ Resultado esperado

- Lista virtualizada con todos los elementos
- Separador entre items
- Encabezado con título y contador
- Estado vacío funcional
- Pull-to-refresh operativo
- Sin warnings en consola

## 🔍 Para explorar más

1. Cambia `FlatList` por `ScrollView` — ¿notas diferencia con 12 items?
   ¿Y si fueran 5000?
2. Quita el `keyExtractor` — ¿qué warning aparece en consola?
3. Añade `initialNumToRender={5}` — ¿qué hace esa prop?
