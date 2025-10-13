---
title: "Arrays en TypeScript"
description: "Aprende sobre arrays tipados, inferencia de tipos, Union Types y cómo copiar arrays correctamente con el operador spread."
pubDate: "2025-01-10"
category: "typescript"
subcategory: "fundamentos"
tags: ["typescript", "arrays", "union-types", "spread-operator", "fundamentos"]
heroImage: "/images/blog/typescript/image5.jpg"
draft: false
---

# 05 - Arrays

## Inferencia de tipos en arrays

TypeScript puede inferir y definir un array según el tipo de dato según lo que ve:

```typescript
const myArrayMultipleData = [1, 2, 3, 4, 5, '6', false, {}];
console.log({myArrayMultipleData});
```

Si pasamos el mouse sobre el arreglo, nos daremos cuenta que está definido como **Union Type**.

## La forma correcta: definir el tipo de dato

Para evitar errores en tiempo de compilación, debemos definir el tipo de dato:

```typescript
const myArrayOnlyNumber: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log({myArrayOnlyNumber})
```

## Union Types en arrays

Si por alguna razón necesito tener más de algún tipo de dato, puedo usar arrays con Union Types:

```typescript
const myArrayUnionType: (string | number)[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, '10'];
console.log({myArrayUnionType});
```

## Copiar arrays con el operador spread

Tal cual como en `03-object-literal` y en `04-spread-operator`, si queremos copiar un array y duplicar la referencia del contenido a una nueva colección, usamos el operador spread:

```typescript
const myArrayOnlyNumber: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const myArraySpread = [ ...myArrayOnlyNumber ];

// Ahora agregamos algo al nuevo array
myArraySpread.push(10)

// Al ver la consola entre ambos:
console.log(`el array de numeros es ${myArrayOnlyNumber}`)
console.log(`y el array duplicado con spread es ${myArraySpread}`);
```

### Resultado en consola

```
el array de numeros es 1,2,3,4,5,6,7,8,9
y el array duplicado con spread es 1,2,3,4,5,6,7,8,9,10
```

Aquí vemos nuevamente que al usar spread, no estamos copiando literal la referencia al contenido, más sí estamos haciendo nuevas referencias pero con la misma estructura para el nuevo array.
