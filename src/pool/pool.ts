const initialPool: Pool = {
    id: '',
    freeList: [],
    freeIndexes: [],
    currentObjects: [],
    expandMinUnits: 32,
    expandFactor: 0.2,
    reference: {}
}

export interface PooledObject {
    id: number;
    [props: string]: any;
}

export interface Pool {
    id: string;
    freeList: any[];
    freeIndexes: number[];
    currentObjects: (PooledObject|undefined)[];
    expandMinUnits: number;
    expandFactor: number;
    reference: any;
}

export interface Pools {
    [key: string]: Pool;
}

export class PoolManager {

    private pools: Pools;

    constructor() {
        this.pools = {};
    }

    addPool(poolId: string, initialSize: number, reference: any, expandMinUnits = 32, expandFactor = 0.2): Pool {
        this.pools[poolId] = JSON.parse(JSON.stringify(initialPool));
        this.pools[poolId].expandMinUnits = expandMinUnits;
        this.pools[poolId].expandFactor = expandFactor;
        this.pools[poolId].reference = reference;
        this.pools[poolId].id = poolId;
        this.expandPool(poolId, initialSize);
        return this.pools[poolId];
    }

    expandPool(poolId: string, nbToExpand: number): PoolManager {
        const pool = this.pools[poolId];
        for (let i = 0; i < nbToExpand; i++) {
            pool.freeList.push(JSON.parse(JSON.stringify(pool.reference)));
        }
        return this;
    }

    createAndGenerateId(type: string): any {

        // Create more if the free list is empty
        const currentPool = this.pools[type];
        if (currentPool.freeList.length <= 0) {

            let growth = Math.ceil(currentPool.freeList.length * currentPool.expandFactor);

            if (growth < currentPool.expandMinUnits) {
                growth = currentPool.expandMinUnits;
            }

            this.expandPool(type, growth);
        }

        // Get a new object.
        let newObject = currentPool.freeList.pop();

        // Get a free id
        let objectId = currentPool.freeIndexes.pop();
        if (objectId === undefined) {
            objectId = currentPool.currentObjects.length;
        }

        // Set the id and the object to the pool
        newObject.id = objectId;
        currentPool.currentObjects[objectId] = newObject;

        return newObject;
    }

    getCurrents(type: string): any[] {
        return this.pools[type].currentObjects;
    }

    release(type: string, pooledObject: PooledObject): PoolManager {
        return this.releaseById(type, pooledObject.id);
    }

    releaseById(type: string, id: number): PoolManager {
        const currentPool = this.pools[type];
        const obj = currentPool.currentObjects[id];
        if (obj && obj.id !== undefined) {
            // Add the object to the free list
            currentPool.freeList.push(obj);

            // Add the id to the freeIndexes
            currentPool.freeIndexes.push(obj.id);

            // Delete in the object list
            currentPool.currentObjects[obj.id] = undefined;
        }
        return this;
    }

    releaseAll(type: string): PoolManager {
        this.pools[type].currentObjects.forEach((obj, index) => {
            if (obj !== undefined) {
                this.releaseById(type, index);
            }
        });
        return this;
    }

    releaseAllPools(): PoolManager {
        Object.keys(this.pools).forEach(poolType => {
            this.releaseAll(poolType);
        });
        return this;
    }

    getById(type: string, id: number): any {
        return this.pools[type].currentObjects[id];
    }

    isPoolExist(type: string): boolean {
        return this.pools[type] !== undefined;
    }

    getPool(type: string): Pool {
        return this.pools[type];
    }

    currentSize(type: string): number {
        const currentPool = this.pools[type];
        return currentPool.currentObjects.length - currentPool.freeIndexes.length;
    }

    freeIdSize(type: string): number {
        return this.pools[type].freeIndexes.length;
    }

    freeObjectSize(type: string): number {
        return this.pools[type].freeList.length;
    }

    getSafeCurrents(type: string): any[] {
        return this.pools[type].currentObjects.filter((obj) => obj !== undefined);
    }
}
