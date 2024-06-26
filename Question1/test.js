const ArrayList = require('./ArrayList');

describe('ArrayList', () => {
  let list;

  beforeEach(() => {
    list = new ArrayList();
  });

  test('should add elements to the list', () => {
    list.add(1);
    list.add(2);
    expect(list.size()).toBe(2);
  });

  test('should get element by index', () => {
    list.add(1);
    list.add(2);
    expect(list.get(0)).toBe(1);
    expect(list.get(1)).toBe(2);
  });

  test('should throw error when accessing an index that does not exist', () => {
    list.add(1);
    expect(() => list.get(2)).toThrow('Index out of bounds');
    expect(() => list.get(-1)).toThrow('Index out of bounds');
  });

  test('should remove element by index', () => {
    list.add(1);
    list.add(2);
    expect(list.remove(0)).toBe(1);
    expect(list.size()).toBe(1);
    expect(list.get(0)).toBe(2);
  });

  test('should throw error when removing an index that does not exist', () => {
    list.add(1);
    expect(() => list.remove(1)).toThrow('Index out of bounds');
    expect(() => list.remove(-1)).toThrow('Index out of bounds');
  });

  test('should return the correct size of the list', () => {
    expect(list.size()).toBe(0);
    list.add(1);
    expect(list.size()).toBe(1);
  });

  test('should check if the list is empty', () => {
    expect(list.isEmpty()).toBe(true);
    list.add(1);
    expect(list.isEmpty()).toBe(false);
  });

  test('should handle edge cases', () => {
    // Accessing an empty list
    expect(() => list.get(0)).toThrow('Index out of bounds');
    expect(() => list.remove(0)).toThrow('Index out of bounds');
    
    // Removing all elements
    list.add(1);
    list.add(2);
    list.remove(0);
    list.remove(0);
    expect(list.isEmpty()).toBe(true);
    expect(list.size()).toBe(0);
  });
});
