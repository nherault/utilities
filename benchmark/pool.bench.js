/* eslint-disable */
const Benchmark = require('benchmark');
const pool = require('../lib/pool');

const suite = new Benchmark.Suite;

const poolManager = new pool.PoolManager();
poolManager.addPool('myPool', 10000, { name: 'entityName' });

// add tests
suite
.add('poolManager.createAndGenerateId', () => {
  poolManager.createAndGenerateId('myPool');
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
