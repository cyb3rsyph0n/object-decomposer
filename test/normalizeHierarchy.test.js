const { expect } = require('chai');
const normalizeHierarchy = require('../src/normalizeHierarchy').default;

describe('normalizeHierarchy', () => {
  const goodMockedData = {
    foo: [
      {
        name: '1',
        foo: [
          {
            name: '1-1',
            foo: [
              {
                name: '1-2',
                foo: [],
              },
            ],
          },
        ],
      },
      {
        name: '2',
        foo: [
          {
            name: '2-1',
            foo: [
              {
                name: '2-2',
              },
            ],
          },
        ],
      },
    ],
  };

  it('should flatten a hierarchy into a key value object', () => {
    const mappedData = normalizeHierarchy(goodMockedData, 'foo', 'name');

    expect(Object.keys(mappedData).length).to.equal(6);
    expect(mappedData['1']).to.equal(goodMockedData.foo[0]);
    expect(mappedData['2']).to.equal(goodMockedData.foo[1]);
  });

  it('should flatten a hierarchy into a flat array', () => {
    const mappedData = normalizeHierarchy(goodMockedData, 'foo');

    expect(mappedData.length).to.equal(6);
    expect(mappedData[0]).to.equal(goodMockedData.foo[0]);
    expect(mappedData[1]).to.equal(goodMockedData.foo[0].foo[0]);
  });

  it('should throw an error when object does not contain fieldName', () => {
    const badFunc = normalizeHierarchy.bind(null, {}, 'foo');

    expect(badFunc).to.throw(TypeError);
  });

  it('should throw an error when fieldName is not a string', () => {
    const badFunc = normalizeHierarchy.bind(null, goodMockedData, 1);

    expect(badFunc).to.throw(TypeError);
  });

  it('should throw an error when key is not a string', () => {
    const badFunc = normalizeHierarchy.bind(null, goodMockedData, 'foo', 1);

    expect(badFunc).to.throw(TypeError);
  });
});
