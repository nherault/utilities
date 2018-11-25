import { initializer, deepCopy, applyMixins, reset } from './class-utility';

describe('class-utility', () => {
  describe('initializer', () => {

    it('initializer - destination empty', () => {
      expect(initializer(
        {}, 
        { id: 10, label: 'name', deepProperties: { props1: 'props1', array: ['a', 'b', 'c'] } }))
        .toEqual({ id: 10, label: 'name', deepProperties: { props1: 'props1', array: ['a', 'b', 'c'] }});
    });

    it('initializer - destination with own data', () => {
      expect(initializer(
        { ownProps1: 'ownProps1', ownProps2: 'ownProps2' },
        { id: 10, label: 'name', deepProperties: { props1: 'props1', array: ['a', 'b', 'c'] }}))
        .toEqual({ id: 10, label: 'name', deepProperties: { props1: 'props1', array: ['a', 'b', 'c'] }, ownProps1: 'ownProps1', ownProps2: 'ownProps2'});
    });

    it('initializer - destination with mix own data / same data', () => {
      expect(initializer(
        { label: 'oldName', ownProps1: 'ownProps1', ownProps2: 'ownProps2', deepProperties: { otherProps: 'otherProps' } }, 
        { id: 10, label: 'name', deepProperties: { props1: 'props1', array: ['a', 'b', 'c'] }}))
        .toEqual({ id: 10, label: 'name', deepProperties: { props1: 'props1', array: ['a', 'b', 'c'] }, ownProps1: 'ownProps1', ownProps2: 'ownProps2'});
    });

    it('Destructuring - destination with mix own data / same data', () => {
      expect(
        { label: 'oldName', ownProps1: 'ownProps1', ownProps2: 'ownProps2', deepProperties: { otherProps: 'otherProps' },
        ...{ id: 10, label: 'name', deepProperties: { props1: 'props1', array: ['a', 'b', 'c'] } }, 
        })
        .toEqual({ id: 10, label: 'name', deepProperties: { props1: 'props1', array: ['a', 'b', 'c'] }, ownProps1: 'ownProps1', ownProps2: 'ownProps2'});
    });
  });

  describe('deepCopy', () => {
    it('deepCopy - destination empty', () => {
      expect(deepCopy(
        {},
        { id: 10, label: 'name', deepProperties: { props1: 'props1', array: ['a', 'b', 'c'] }}))
        .toEqual({ id: 10, label: 'name', deepProperties: { props1: 'props1', array: ['a', 'b', 'c'] }});
    });

    it('deepCopy - destination with own data', () => {
      expect(deepCopy(
        { ownProps1: 'ownProps1', ownProps2: 'ownProps2' },
        { id: 10, label: 'name', deepProperties: { props1: 'props1', array: ['a', 'b', 'c'] }}))
        .toEqual({ id: 10, label: 'name', deepProperties: { props1: 'props1', array: ['a', 'b', 'c'] }, ownProps1: 'ownProps1', ownProps2: 'ownProps2'});
    });

    it('deepCopy - destination with mix own data / same data', () => {
      expect(deepCopy(
        { label: 'oldName', ownProps1: 'ownProps1', ownProps2: 'ownProps2', deepProperties: { otherProps: 'otherProps', array: ['a', 'd', 'e'] } }, 
        { id: 10, label: 'name', deepProperties: { props1: 'props1', array: ['a', 'b', 'c'] }}))
        .toEqual({ id: 10, label: 'name', deepProperties: { props1: 'props1', otherProps: 'otherProps', array: ['a', 'd', 'e', 'a', 'b', 'c'] }, ownProps1: 'ownProps1', ownProps2: 'ownProps2'});
    });

    it('deepCopy - destination with source array', () => {
      expect(deepCopy(
        { label: 'oldName', ownProps1: 'ownProps1', ownProps2: 'ownProps2', deepProperties: { otherProps: 'otherProps' } }, 
        [{ id: 10, label: 'name' }, { deepProperties: { props1: 'props1', array: ['a', 'b', 'c'] } }]))
        .toEqual({ id: 10, label: 'name', deepProperties: { props1: 'props1', otherProps: 'otherProps', array: ['a', 'b', 'c'] }, ownProps1: 'ownProps1', ownProps2: 'ownProps2'});
    });
  });

  describe('reset', () => {
    it('reset', () => {
      expect(reset(
        { label: 'oldName', ownProps1: 'ownProps1', ownProps2: 'ownProps2', deepProperties: { otherProps: 'otherProps', array: ['a', 'd', 'e', { a: 1, b: 2 }] } }, 
        { id: 10, label: 'name', deepProperties: { props1: 'props1', array: ['a', 'b', 'c', , { a: 3, b: 2, c: 4 }] }}))
        .toEqual({ id: undefined, label: 'oldName', ownProps1: 'ownProps1', ownProps2: 'ownProps2', deepProperties: { props1: undefined, otherProps: 'otherProps', array: ['a', 'd', 'e', { a: 1, b: 2 }] } });
    });

    it('reset - without reseting unknown properties', () => {
      expect(reset(
        { label: 'oldName', ownProps1: 'ownProps1', ownProps2: 'ownProps2', deepProperties: { otherProps: 'otherProps', array: ['a', 'd', 'e', { a: 1, b: 2 }] } }, 
        { id: 10, label: 'name', deepProperties: { props1: 'props1', array: ['a', 'b', 'c', , { a: 3, b: 2, c: 4 }] }}, false))
        .toEqual({ id: 10, label: 'oldName', ownProps1: 'ownProps1', ownProps2: 'ownProps2', deepProperties: { props1: 'props1', otherProps: 'otherProps', array: ['a', 'd', 'e', { a: 1, b: 2 }] } });
    });
  });

  describe('applyMixins', () => {
    it('applyMixins', () => {
      expect(applyMixins(
        {},
        { id: 10, label: 'name', deepProperties: { props1: 'props1', array: ['a', 'b', 'c'] }}))
        .toEqual({ id: 10, label: 'name', deepProperties: { props1: 'props1', array: ['a', 'b', 'c'] }});
    });
  });
});
