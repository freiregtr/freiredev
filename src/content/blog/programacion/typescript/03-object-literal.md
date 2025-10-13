---
title: "Objetos Literales en TypeScript"
description: "Aprende sobre objetos literales, operador spread, structuredClone e interfaces en TypeScript para manejar objetos de forma efectiva."
pubDate: "2025-01-08"
category: "typescript"
subcategory: "fundamentos"
tags: ["typescript", "objetos", "interfaces", "spread-operator", "fundamentos"]
heroImage: "/images/blog/typescript/image3.jpg"
draft: false
---

# 03 - Objetos Literales

## Conceptos clave

- Operador spread (`...`)
- Operador `structuredClone`
- Transpilación de TS a JS
- Interfaces en TypeScript (siempre con la primera mayúscula)
- Los objetos literales y arreglos se deben crear siempre como constantes

## Creación de objetos literales

Podemos crear referencias a objetos literales:

```typescript
const profesor = {
    firstName: 'Ramon',
    lastName: 'Freire',
    age: 37,
    address: {
        city: 'San Bernardo',
        postalCode: '8320000'
    }
};
```

## Referencias en memoria

Cuando creamos un objeto, hacemos referencias en la memoria a todos los properties dentro de él. Lo que se puede hacer es cambiar las properties que tiene el objeto:

```typescript
profesor.firstName = 'Pepito';
profesor.lastName = 'Perez';

console.log(profesor);
```

## Error común: copiar por referencia

```typescript
const funcionario = profesor;

funcionario.firstName = 'Juanito';
funcionario.lastName = 'Silva';

console.log(profesor, funcionario);
// Ambos objetos tendrán los mismos valores!
```

Si se dan cuenta, no hay dos objetos literales diferentes, son idénticos. No podemos copiar referencias acorde a igualar el objeto, ya que en vez de copiar, solo apuntamos al mismo espacio en memoria.

## Operador Spread (`...`)

Para esto, usamos el operador spread para 'esparcir' las properties del objeto literal:

```typescript
const asistente = { ...profesor };
asistente.firstName = 'Esteban';
asistente.lastName = 'Pizarro';

console.log(profesor, asistente);
// Ahora sí son objetos independientes!
```

### Limitación del operador spread

El operador spread solo rompe las referencias a un primer nivel. Si cambias propiedades anidadas (como `address`), afectará a ambos objetos:

```typescript
asistente.address.city = 'Santiago'; // Esto afecta a ambos objetos!
```

## structuredClone

Una forma de hacer un clon profundo de un objeto literal es el método `structuredClone`:

```typescript
const gerencia = structuredClone(profesor);
gerencia.firstName = 'miguel';
gerencia.lastName = 'Altamirano';
gerencia.address.city = 'santiago';
gerencia.address.postalCode = '1111000';

console.log(profesor, gerencia);
// Ahora sí, completamente independientes en todos los niveles!
```

## Interfaces

Para hacer esto más limpio podemos usar interfaces. Las interfaces siempre se escriben con la primera letra mayúscula:

```typescript
interface Address {
    postalCode: string;
    city: string;
}

interface Person {
    firstName: string;
    lastName: string;
    age: number;
    address?: Address; // El ? indica que es opcional
}
```

La interfaz es simplemente un contrato, es una forma de definir qué se puede hacer o no, más no agregar funcionalidad, solo definiciones.

### Uso de interfaces

```typescript
const fiscalizador1: Person = {
    firstName: 'Samuel',
    lastName: 'garcia',
    age: 50,
    address: {
        city: 'estacion Central',
        postalCode: '83251212'
    }
}

const fiscalizador2: Person = {
    firstName: 'Alejandro',
    lastName: 'Correa',
    age: 35,
    address: {
        city: 'San Miguel',
        postalCode: '1151152'
    }
}

console.log(fiscalizador1, fiscalizador2);
```

De esta forma con contratos podemos hacer implementaciones mucho más limpias.
