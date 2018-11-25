/* eslint-disable */
const Benchmark = require('benchmark');
const { initializer, deepCopy, applyMixins, reset } = require('../lib/class-utility');

const suite = new Benchmark.Suite;

// add tests
suite
.add('initializer', () => {
  initializer(
    { label: 'oldName', ownProps1: 'ownProps1', ownProps2: 'ownProps2', deepProperties: { otherProps: 'otherProps' } }, 
    { id: 10, label: 'name', deepProperties: { props1: 'props1', array: ['a', 'b', 'c'] }});
})
.add('destructuring', () => {
  const result = { label: 'oldName', ownProps1: 'ownProps1', ownProps2: 'ownProps2', deepProperties: { otherProps: 'otherProps' }, 
    ...{ id: 10, label: 'name', deepProperties: { props1: 'props1', array: ['a', 'b', 'c'] } }};
})
.add('deepCopy', () => {
  deepCopy(
    { label: 'oldName', ownProps1: 'ownProps1', ownProps2: 'ownProps2', deepProperties: { otherProps: 'otherProps' } }, 
    [{ id: 10, label: 'name' }, { deepProperties: { props1: 'props1', array: ['a', 'b', 'c'] } }]);
})
.add('reset', () => {
  reset(
    { label: 'oldName', ownProps1: 'ownProps1', ownProps2: 'ownProps2', deepProperties: { otherProps: 'otherProps', array: ['a', 'd', 'e', { a: 1, b: 2 }] } }, 
    { id: 10, label: 'name', deepProperties: { props1: 'props1', array: ['a', 'b', 'c', , { a: 3, b: 2, c: 4 }] }});
})
.add('reset - without reset unknown properties', () => {
  reset(
    { label: 'oldName', ownProps1: 'ownProps1', ownProps2: 'ownProps2', deepProperties: { otherProps: 'otherProps', array: ['a', 'd', 'e', { a: 1, b: 2 }] } }, 
    { id: 10, label: 'name', deepProperties: { props1: 'props1', array: ['a', 'b', 'c', , { a: 3, b: 2, c: 4 }] }}, false);
})
.add('applyMixins', () => {
  applyMixins({}, [{ id: 10, label: 'name' }, { deepProperties: { props1: 'props1', array: ['a', 'b', 'c'] } }]);
})
// add listeners
.on('cycle', (event) => {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
  console.log('Slowest is ' + this.filter('slowest').map('name'));
})
// run async
.run({ 'async': true });
