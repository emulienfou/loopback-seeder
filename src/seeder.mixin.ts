import {Application, Binding, MixinTarget} from '@loopback/core';
import {DefaultCrudRepository, Entity} from '@loopback/repository';
import {debug} from './seeder.component';
import {SeederInterface} from './types';

export function SeedMixin<T extends MixinTarget<Application>>(superClass: T) {
  return class extends superClass {
    public async load(): Promise<void> {
      /* eslint-disable @typescript-eslint/ban-ts-comment */
      // A workaround to access protected Application methods
      const self = this as unknown as Application
      debug('Loading seeds')

      /**
       * Application implements `SeedMixinInterface` and have `loadSeeds` method.
       */
      // @ts-ignore
      if (typeof self.loadSeeds === 'function') {
        debug('Loading seeds from "loadSeeds" function')
        // @ts-ignore
        await self.loadSeeds()
      }

      /**
       * Seeder as class created and bound to Application.
       */
        // Find all tagged bindings as `seeder`
      const seederBindings: Readonly<Binding<unknown>>[] = this.findByTag('seeder')
      for (const s of seederBindings) {
        debug(`Loading seeds from "${s.key}" class`)
        // Get instance of the seeder
        const instance = await this.get<SeederInterface>(s.key)
        // Run before seed
        await instance.beforeSeed()
        // Run seed
        await instance.seed()
      }
    }

    public async loadByModel<I extends Entity, ID>(items: I[], repository$: DefaultCrudRepository<I, ID>, type: { new(it: Partial<I>): I; }): Promise<void> {
      debug('Seeding data for model "%s"', type.name)
      /* eslint-disable-next-line @typescript-eslint/await-thenable */
      const repository = await repository$
      await repository.deleteAll()
      await Promise.all(items.map(async (item: I) => {
        try {
          return await repository.create((new type(item)))
        } catch (e) {
          debug('Error: %s', e.message)
        }
      }))
    }
  }
}
