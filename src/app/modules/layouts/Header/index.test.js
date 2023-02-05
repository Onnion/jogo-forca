const header = require('./index');

describe('Header Testing', () => {

  test('Header test example', () => {
    expect(header).toHaveProperty('init');
  });

});
