# object-decomposer

> install: npm install --save object-decomposer

## Normalizing an Array into a key value pair

```
const { normalizeArray } = require('object-decomposer');

const myArray = [
  {
    id: 'foo',
    name: 'foo user',
  },
  {
    id: 'bar',
    name: 'bar user',
  },
];
const mappedData = normalizeArray(myArray, 'id');

console.log(mappedData.foo);
console.log(mappedData.bar);
```

## Normalizing Hierarchical Data into a key value pair

```
const { normalizeHierarchy } = require('object-decomposer');

const myHierarchy = {
  foo: [
    {
      id: 'foo1',
      foo: [
        {
          id: 'foo11',
          foo: [],
        }
      ]
    },
    {
      id: 'foo2',
      foo: [
        {
          id: 'foo21',
        }
      ]
    },
  ]
}

const mappedData = normalizeHierarchy(myHierarchy, 'foo', 'id');
console.log(mappedData.foo1);
console.log(mappedData.foo11);
console.log(mappedData.foo2);
console.log(mappedData.foo21);
```

## Normalizing Hierarchical Data into a flat array

```
const { normalizeHierarchy } = require('object-decomposer');

const myHierarchy = {
  foo: [
    {
      id: 'foo1',
      foo: [
        {
          id: 'foo11',
          foo: [],
        }
      ]
    },
    {
      id: 'foo2',
      foo: [
        {
          id: 'foo21',
        }
      ]
    },
  ]
}

const mappedData = normalizeHierarchy(myHierarchy, 'foo');
console.log(mappedData[0]);
console.log(mappedData[1]);
console.log(mappedData[2]);
console.log(mappedData[3]);
```