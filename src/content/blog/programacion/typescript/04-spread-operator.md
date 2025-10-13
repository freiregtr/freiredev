---
title: "Operador Spread en TypeScript"
description: "Entiende en profundidad el operador spread, qué es un iterable, Symbol.iterator y cómo funciona con arrays y objetos en TypeScript."
pubDate: "2025-01-09"
category: "typescript"
subcategory: "fundamentos"
tags: ["typescript", "spread-operator", "iterables", "symbol-iterator", "fundamentos"]
heroImage: "./img/image4.jpg"
draft: false
---

# 04 - Operador Spread

![Operador Spread en TypeScript](./img/image4.jpg)

[Documentación oficial](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

## ¿Qué es el operador spread?

El operador spread (`...`) en estricto rigor es un operador que expande iterables como arrays, string, set, maps Y copia propiedades enumerables de objetos literales.

## ¿Qué es un iterable?

Un iterable o iterador es un objeto que puede ser capaz de recorrer los elementos de una colección, ya que implementa el protocolo `Symbol.iterator`. Esto permite que sus elementos puedan recorrerse uno a uno, debido a que funciona como puntero que se mueve a través de los datos.

**Importante:** No todos los elementos y objetos pueden ser iterables o recorridos.

### Elementos que SÍ son iterables

- Array
- String
- Set
- Map

### Elementos que NO son iterables

- Object literal (el operador spread sí funciona copiando propiedades, pero jamás itera sobre el objeto)
- Number

**Nota:** En el caso de string y number, en estricto rigor string es una colección de char, por ende, es una colección, por eso es iterable.

## Verificando si un objeto es iterable

### Array (iterable)

```typescript
const arrayIterable: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log('objeto array tiene Symbol.Iterator?');
console.log(typeof arrayIterable[Symbol.iterator] === 'function');
// Output: true
```

### Objeto literal (NO iterable)

```typescript
const literalObject = {
    firstName: 'Ramon',
    lastName: 'Freire',
    age: 35
}
console.log('objeto literal object tiene Symbol.Iterator?');
console.log(typeof literalObject[Symbol.iterator] === 'function');
// Output: false
```

## ¿Cómo funciona el operador spread?

El operador spread copia las referencias de dos maneras distintas:

1. **En un array:** Como tiene el protocolo `Symbol.Iterator`, expande el arreglo elemento por elemento
2. **En un objeto literal:** Copia las propiedades enumerables sin usar `Symbol.Iterator`

## ¿Por qué debemos saber esto?

Porque el operador spread puede incidir en este tipo de objetos, ya sea tanto iterable como no. Pero es importante además saber si un objeto es de tipo iterable, de esa forma sabremos la naturaleza de este mismo y su comportamiento.

Entre una colección y un objeto, ¿son el mismo resultado? Absolutamente, pero internamente hemos identificado que spread puede trabajar tanto con el protocolo `Symbol.Iterator` como también sin él.
