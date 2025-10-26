---
title: "Variables const y let en TypeScript"
description: "Aprende las diferencias entre const y let en TypeScript, cuándo usar cada una y las mejores prácticas para declarar variables."
pubDate: "2025-01-06"
category: "typescript"
subcategory: "fundamentos"
tags: ["typescript", "variables", "const", "let", "fundamentos"]
heroImage: "./hero.jpg"
draft: false
---

# 01 - Variables const y let

## Variables y nombres

En TypeScript, tenemos dos formas principales de declarar variables: `const` y `let`.

### Const

El uso de constantes define el tipo de dato como el mismo nombre, porque no cambia:

```typescript
const firstName = 'Ramon';
```

### Let

Como `let` sí puede cambiar, entonces ahí se puede definir el tipo de dato con `:string`. La anotación `:string` es una propiedad de TypeScript:

```typescript
let lastName:string = 'Freire';
```

## Regla general

- Si las variables jamás cambian, se debe usar `const`
- Si la variable puede cambiar, se usa `let`

## Ejemplo práctico

```typescript
const firstName = 'Ramon';
let lastName:string = 'Freire';

const containLetterI = firstName.includes('i');
const containLetterF = lastName.includes('F');

console.log({containLetterI});
console.log({containLetterF});
```
