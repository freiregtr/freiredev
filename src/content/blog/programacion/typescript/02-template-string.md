---
title: "Template Strings en TypeScript"
description: "Descubre cómo usar template strings para crear cadenas de texto más eficientes y legibles en TypeScript."
pubDate: "2025-01-07"
category: "typescript"
subcategory: "fundamentos"
tags: ["typescript", "template-strings", "strings", "fundamentos"]
heroImage: "/images/blog/typescript/image2.jpg"
draft: false
---

# 02 - Template Strings

## Template Strings en TypeScript

El uso de templates nos permite ser más eficientes al trabajar con cadenas de texto.

### Método tradicional (concatenación)

Aquí tenemos que concatenar incluso el espacio, no es eficiente:

```typescript
const firstName = 'Ramon';
const lastName = 'Freire';

const fullName1 = firstName + ' ' + lastName;
console.log({fullName1});
```

### Template Strings (método moderno)

Con expresiones de JavaScript, podemos adjuntar variables, incluso operaciones. Para eso no debemos usar comilla simple, sino backticks (``):

```typescript
const fullName2 = `${firstName} ${lastName}`;
const mathOperation = `${2 + 2}`;

console.log({fullName2});
console.log({mathOperation});
```

## Ventajas

- Más legible
- Permite interpolación de variables con `${}`
- Permite ejecutar operaciones dentro de las llaves
- No requiere concatenación manual
