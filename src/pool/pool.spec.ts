import { PoolManager } from './pool';

describe('pool', () => {
  describe('PoolManager', () => {

    it('addPool', () => {
      const poolManager = new PoolManager();
      const pool = poolManager.addPool('myPool', 50, { name: 'entityName' });
      expect(pool.id).toBe('myPool');
    });

    it('expandPool', () => {
      const poolManager = new PoolManager();
      poolManager.addPool('myPool', 50, { name: 'entityName' });
      expect(poolManager.freeObjectSize('myPool')).toBe(50);
      poolManager.expandPool('myPool', 50);
      expect(poolManager.freeObjectSize('myPool')).toBe(100);
    });

    it('createAndGenerateId', () => {
      const poolManager = new PoolManager();
      poolManager.addPool('myPool', 1, { name: 'entityName' }, 3, 1);
      const entity1 = poolManager.createAndGenerateId('myPool');
      const entity2 = poolManager.createAndGenerateId('myPool');
      const entity3 = poolManager.createAndGenerateId('myPool');
      const entity4 = poolManager.createAndGenerateId('myPool');
      const entity5 = poolManager.createAndGenerateId('myPool');
      expect(poolManager.currentSize('myPool')).toBe(5);
      expect(poolManager.freeIdSize('myPool')).toBe(0);
      expect(poolManager.freeObjectSize('myPool')).toBe(2);
      const currentEntities = poolManager.getCurrents('myPool');
      expect(currentEntities[0]).toBe(entity1);
      expect(currentEntities[1]).toBe(entity2);
      expect(currentEntities[2]).toBe(entity3);
      expect(currentEntities[3]).toBe(entity4);
      expect(currentEntities[4]).toBe(entity5);
    });

    it('getCurrents', () => {
      const poolManager = new PoolManager();
      poolManager.addPool('myPool', 50, { name: 'entityName' });
      const entity1 = poolManager.createAndGenerateId('myPool');
      const entity2 = poolManager.createAndGenerateId('myPool');
      const entity3 = poolManager.createAndGenerateId('myPool');
      expect(poolManager.currentSize('myPool')).toBe(3);
      const currentEntities = poolManager.getCurrents('myPool');
      expect(currentEntities.length).toBe(3);
      expect(currentEntities[0]).toBe(entity1);
      expect(currentEntities[1]).toBe(entity2);
      expect(currentEntities[2]).toBe(entity3);
    });

    it('release', () => {
      const poolManager = new PoolManager();
      poolManager.addPool('myPool', 50, { name: 'entityName' });
      const entity1 = poolManager.createAndGenerateId('myPool');
      poolManager.createAndGenerateId('myPool');
      poolManager.createAndGenerateId('myPool');
      expect(poolManager.currentSize('myPool')).toBe(3);
      poolManager.release('myPool', entity1);
      expect(poolManager.currentSize('myPool')).toBe(2);
    });

    it('releaseById', () => {
      const poolManager = new PoolManager();
      poolManager.addPool('myPool', 50, { name: 'entityName' });
      const entity1 = poolManager.createAndGenerateId('myPool');
      poolManager.createAndGenerateId('myPool');
      poolManager.createAndGenerateId('myPool');
      expect(poolManager.currentSize('myPool')).toBe(3);
      poolManager.releaseById('myPool', entity1.id);
      expect(poolManager.currentSize('myPool')).toBe(2);
    });

    it('releaseAll', () => {
      const poolManager = new PoolManager();
      poolManager.addPool('myPool', 50, { name: 'entityName' });
      poolManager.createAndGenerateId('myPool');
      poolManager.createAndGenerateId('myPool');
      poolManager.createAndGenerateId('myPool');
      expect(poolManager.currentSize('myPool')).toBe(3);
      poolManager.releaseAll('myPool');
      expect(poolManager.currentSize('myPool')).toBe(0);
    });

    it('releaseAllPools', () => {
      const poolManager = new PoolManager();
      poolManager.addPool('myPool', 50, { name: 'entityName' });
      poolManager.createAndGenerateId('myPool');
      poolManager.createAndGenerateId('myPool');
      poolManager.createAndGenerateId('myPool');
      expect(poolManager.currentSize('myPool')).toBe(3);
      poolManager.addPool('myPool2', 50, { name: 'entityName' });
      poolManager.createAndGenerateId('myPool2');
      poolManager.createAndGenerateId('myPool2');
      expect(poolManager.currentSize('myPool2')).toBe(2);
      poolManager.releaseAllPools();
      expect(poolManager.currentSize('myPool')).toBe(0);
      expect(poolManager.currentSize('myPool2')).toBe(0);
    });    

    it('getById', () => {
      const poolManager = new PoolManager();
      poolManager.addPool('myPool', 50, { name: 'entityName' });
      const myEntity = poolManager.createAndGenerateId('myPool');
      expect(poolManager.getById('myPool', myEntity.id)).toBe(myEntity);
    });

    it('getPool', () => {
      const poolManager = new PoolManager();
      const pool = poolManager.addPool('myPool', 50, { name: 'entityName' });
      expect(poolManager.getPool('myPool')).toBe(pool);
    });

    it('isPoolExist', () => {
      const poolManager = new PoolManager();
      poolManager.addPool('myPool', 50, { name: 'entityName' });
      expect(poolManager.isPoolExist('myPool')).toBe(true);
      expect(poolManager.isPoolExist('myPool2')).toBe(false);
    });

    it('currentSize', () => {
      const poolManager = new PoolManager();
      poolManager.addPool('myPool', 50, { name: 'entityName' });
      expect(poolManager.currentSize('myPool')).toBe(0);
      poolManager.createAndGenerateId('myPool');
      expect(poolManager.currentSize('myPool')).toBe(1);
    });

    it('freeIdSize', () => {
      const poolManager = new PoolManager();
      poolManager.addPool('myPool', 50, { name: 'entityName' });
      expect(poolManager.freeIdSize('myPool')).toBe(0);
      const entity1 = poolManager.createAndGenerateId('myPool');
      poolManager.createAndGenerateId('myPool');
      poolManager.createAndGenerateId('myPool');
      poolManager.releaseById('myPool', entity1.id);
      expect(poolManager.freeIdSize('myPool')).toBe(1);
    });

    it('freeObjectSize', () => {
      const poolManager = new PoolManager();
      poolManager.addPool('myPool', 50, { name: 'entityName' });
      expect(poolManager.freeObjectSize('myPool')).toBe(50);
      poolManager.createAndGenerateId('myPool');
      expect(poolManager.freeObjectSize('myPool')).toBe(49);
    });

    it('getSafeCurrents', () => {
      const poolManager = new PoolManager();
      poolManager.addPool('myPool', 50, { name: 'entityName' });
      const entity1 = poolManager.createAndGenerateId('myPool');
      poolManager.createAndGenerateId('myPool');
      poolManager.createAndGenerateId('myPool');
      expect(poolManager.currentSize('myPool')).toBe(3);
      poolManager.releaseById('myPool', entity1.id);
      expect(poolManager.getSafeCurrents('myPool').length).toBe(2);
    });
  });
});
