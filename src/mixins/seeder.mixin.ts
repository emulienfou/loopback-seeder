import {Application, Binding, MixinTarget} from '@loopback/core';
import {DefaultCrudRepository, Entity} from '@loopback/repository';
import {debug, loadByModel, SEEDS_NAMESPACE} from '../index';
import {SeederInterface} from '../types';
import {SeederComponent} from '../components';

export function SeedMixin<T extends MixinTarget<Application>>(superClass: T) {
  return class extends superClass {

    constructor(...args: any[]) {
      super(...args);
      this.component(SeederComponent);
    }

    public async load(args: string[]): Promise<void> {
      // Get command arguments classes
      const filterClasses = args.slice(2)
      /* eslint-disable @typescript-eslint/ban-ts-comment */
      // A workaround to access protected Application methods
      const self = this as unknown as Application;
      debug('[INFO] Loading seeds');

      /**
       * Application implements `SeedMixinInterface` and have `loadSeeds` method.
       */
      // @ts-ignore
      if (typeof self.loadSeeds === 'function') {
        debug('[INFO] Loading seeds from "loadSeeds" function');
        // @ts-ignore
        await self.loadSeeds(filterClasses);
      }

      /**
       * Seeder as class created and bound to Application.
       */
        // Find all tagged bindings as `seeder`
      const seederBindings: Readonly<Binding<unknown>>[] = this.findByTag('seed');
      // Filter seeder bindings if filter classes parameter provided from argv
      const filteredSeederBindings = filterClasses.length ?
        seederBindings.filter(({ key }) => filterClasses.includes(key.replace(`${ SEEDS_NAMESPACE }.`, '').replace('Seeder', ''))) :
        seederBindings;
      // Loop over filtered/all bindings
      for (const s of filteredSeederBindings) {
        debug(`[INFO] Loading seeds from "${s.key}" class`);
        // Get instance of the seeder
        const instance = await this.get<SeederInterface>(s.key);
        // Run before seed
        await instance.beforeSeed();
        // Run seed
        await instance.seed();
      }
    }

    public async loadByModel<I extends Entity, ID>(items: I[], repository$: DefaultCrudRepository<I, ID>, type: { new(it: Partial<I>): I; }): Promise<void> {
      return loadByModel(items, repository$, type);
    }
  }
}
