import { jsonDeepCopy } from './jsonDeepCopy';

describe('jsonDeepCopy', () => {
  it('Should deep copy object', () => {
    const object = { a: 'a' };
    const copy = jsonDeepCopy(object);
    copy.a = 'b';

    expect(copy.a).toBe('b');
    expect(object.a).toBe('a');
  });

  it('Should deep copy string', () => {
    const string = 'string';
    const copy = jsonDeepCopy(string);
    expect(copy).toBe(string);
  });

  it('Should deep copy number', () => {
    const number = 1;
    const copy = jsonDeepCopy(number);
    expect(copy).toBe(number);
  });

  it('Should deep copy null', () => {
    const nullValue = null;
    const copy = jsonDeepCopy(nullValue);
    expect(copy).toBeNull();
  });

  it('Should not be able to deep copy undefined', () => {
    const nullValue = undefined;
    expect(() => jsonDeepCopy(nullValue)).toThrow();
  });
});
