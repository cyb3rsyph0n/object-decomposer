const { expect } = require('chai');
const normalizeArray = require('../src/normalizeArray').default;

describe('normalizeArray', () => {
  const goodMockedData = [
    {
      id: 'foo',
      name: 'bar',
    },
    {
      id: 'foo1',
      name: 'bar1',
    },
    {
      id: 'foo2',
      name: 'bar2',
    },
  ];

  const badMockedData = [
    {
      id: 'foo',
      name: 'bar',
    },
    {
      name: 'bar1',
    },
    {
      id: 'foo2',
      name: 'bar2',
    },
  ];

  it('should return an object with 3 keys', () => {
    const mappedData = normalizeArray(goodMockedData, 'id');

    expect(Object.keys(mappedData).length).to.equal(3);
    expect(mappedData.foo).to.equal(goodMockedData[0]);
    expect(mappedData.foo1).to.equal(goodMockedData[1]);
    expect(mappedData.foo2).to.equal(goodMockedData[2]);
  });

  it('should throw an error when first parameter is not an array', () => {
    const badFunc = normalizeArray.bind(null, {}, 'id');

    expect(badFunc).to.throw(TypeError);
  });

  it('should throw an error with data missing properties', () => {
    const badFunc = normalizeArray.bind(null, badMockedData, 'id');

    expect(badFunc).to.throw(Error);
  });

  it('should throw an error when key is not specified', () => {
    const badFunc = normalizeArray.bind(null, badMockedData);

    expect(badFunc).to.throw(TypeError);
  });

  it('should throw an error when key is not a string', () => {
    const badFunc = normalizeArray.bind(null, badMockedData, 1);

    expect(badFunc).to.throw(TypeError);
  });
});
