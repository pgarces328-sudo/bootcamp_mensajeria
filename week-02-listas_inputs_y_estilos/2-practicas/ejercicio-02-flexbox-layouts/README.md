# Ejercicio 02 — Búsqueda con TextInput

> Semana 02 — Listas, Inputs y Estilos | Tiempo estimado: 1.5h

Añadirás un campo de búsqueda que filtra una lista en tiempo real, gestionando
correctamente el teclado y el estado vacío.

## 🎯 Objetivos

- Capturar texto con `TextInput` y `onChangeText`.
- Filtrar una lista en tiempo real sin distinguir mayúsculas.
- Optimizar el filtrado con `useMemo`.
- Gestionar el teclado con `KeyboardAvoidingView` y `Keyboard.dismiss()`.

## 📋 Requisitos previos

- Haber leído `02-textinput-y-teclado.md`.
- Ejercicio 01 completado.

## 🚀 Cómo empezar

```bash
cd ejercicio-02-busqueda-con-input/starter
pnpm install
pnpm start
```

## Paso 1: TextInput controlado

Añade el campo de búsqueda conectado al estado.

```tsx
<TextInput
  value={query}
  onChangeText={setQuery}
  placeholder="Buscar por nombre o especialidad..."
  placeholderTextColor="#6e7681"
/>
```

**Verifica:** el texto que escribes se refleja en el estado.

## Paso 2: Filtrado en tiempo real

Filtra la lista sin distinguir mayúsculas usando `useMemo`.

```tsx
const filtered = useMemo(() => {
  const q = query.trim().toLowerCase();
  if (q === '') return items;
  return items.filter((item) => item.title.toLowerCase().includes(q));
}, [query]);
```

**Verifica:** la lista se reduce mientras escribes, sin importar mayúsculas.

> 💡 `useMemo` evita recalcular el filtrado en cada render. Solo se ejecuta
> cuando cambia `query`.

## Paso 3: Estado vacío con mensaje

Muestra "Sin resultados" cuando el filtro no encuentra coincidencias.

```tsx
ListEmptyComponent={renderEmpty}
```

**Verifica:** escribe algo que no exista y aparece el mensaje.

## Paso 4: Botón para limpiar la búsqueda

Añade una X dentro del input que borra el texto.

```tsx
{query.length > 0 ? (
  <Pressable onPress={handleClear}>
    <Text>✕</Text>
  </Pressable>
) : null}
```

**Verifica:** el botón solo aparece cuando hay texto y al pulsarlo se limpia.

## Paso 5: Gestión del teclado

Envuelve la pantalla en `KeyboardAvoidingView` y cierra el teclado al tocar fuera.

```tsx
<KeyboardAvoidingView
  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
>
```

**Verifica:** el teclado no tapa el input, y al tocar fuera se cierra.

## ✅ Resultado esperado

- Campo de búsqueda con placeholder descriptivo
- Filtrado en tiempo real, insensible a mayúsculas
- Contador de resultados
- Botón de limpiar funcional
- Mensaje de "Sin resultados"
- Teclado gestionado correctamente

## 🔍 Para explorar más

1. Quita `useMemo` y usa un filtrado directo — ¿notas diferencia?
2. Añade `autoCorrect={false}` y `autoCapitalize="none"` — ¿qué mejora?
3. Amplía el filtro para que también busque en el subtítulo.