---
title: "Funciones en TypeScript"
description: "Domina las funciones en TypeScript: funciones normales, arrow functions, tipado de parámetros y retornos, y cuándo usar cada tipo."
pubDate: "2025-01-11"
category: "typescript"
subcategory: "fundamentos"
tags: ["typescript", "funciones", "arrow-functions", "promesas", "fundamentos"]
heroImage: "./img/image6.jpg"
draft: false
---

# 06 - Funciones

![Funciones en TypeScript](./img/image6.jpg)

## Tipos de funciones en TypeScript

Hay dos maneras de generar funciones:

1. La típica con argumentos y retorno
2. Funciones anónimas o de flecha (arrow functions)

### ¿Cuándo usar cada una?

- **Funciones normales:** Para helpers, son más explícitas
- **Funciones de flecha:** Para callbacks, son más simples

## Funciones normales

### Función con argumentos y return

```typescript
function greetings(name: string): string{
    return `Hello, ${name}`;
}
console.log(greetings('ramon'))
```

En este caso, TypeScript primero pide el nombre del parámetro y luego se pide el tipo del argumento. Si pasamos como argumento otro dato que no sea el especificado en el parámetro, nos dará una alerta:

```typescript
// console.log(greetings(42)); // Error!
```

### Función con retorno tipado

```typescript
function obtainFavNumber(): number {
    return 42;
}
console.log(`la funcion obtainFavNumber() entrega ${obtainFavNumber()} como retorno`)
```

### Funciones asíncronas (Promesas)

Se debe utilizar la palabra reservada `Promise` y especificar el tipo de dato con `Promise<number>` o `Promise<string>`:

```typescript
async function obtainFavNumperProm(): Promise<number> {
    return 45;
}
console.log(`funcion de promesa, retorna ${obtainFavNumperProm()}`)
```

## Funciones de flecha (Arrow Functions)

### Función de flecha básica

```typescript
const greetingsArrow = (name: string): string => {
    return `hello ${name}`;
}
console.log(greetingsArrow('ramon'))
```

### Función que retorna un objeto

```typescript
function getUser(){
    return {
        uid: 'ABC-123',
        user: 'username'
    }
}
console.log(getUser())

// Versión con arrow function
const getUserArrow = () => {
    return {
        uid: 'ABC-123',
        user: 'username'
    }
}
console.log(getUserArrow)
```

## Funciones más concisas

### Función de una línea

```typescript
const greetinsShort = (name: string) => `hello ${name}`;
console.log(`funcion anonima mas corta ${greetinsShort('ramon')}`);
```

### Retorno implícito de objeto

Otra forma de hacer funciones más acotadas y menos verbosas:

```typescript
const greetinsAcotado = ()=> ({
    uid: 'ABC-123',
    user: 'username'
})
console.log(`una forma mas acotada aun de funcion anonima ${greetinsAcotado()}`)
```

## ¿Cuándo usar funciones normales? ¿De flecha o callbacks?

Esta es una pregunta importante a considerar según el contexto de tu aplicación y las necesidades específicas de cada situación.
