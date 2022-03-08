import {Binding, BindingScope, extensionFor} from '@loopback/core';
import {SEEDS_NAMESPACE} from './keys';
import {DefaultCrudRepository, Entity} from '@loopback/repository';
import {debug} from './index';

/**
 * Name of the seed extension point
 */
export const SEEDER = 'seeder';

/**
 * A `BindingTemplate` function to configure the binding as a seed.
 *
 * @param binding - Binding object
 */
export function asSeed<T = unknown>(binding: Binding<T>) {
  return binding
    .apply(extensionFor(SEEDER))
    .tag({namespace: SEEDS_NAMESPACE})
    .inScope(BindingScope.SINGLETON);
}

/**
 * Interface used by Application
 */
export interface SeedMixinInterface {
  loadSeeds(): Promise<void>;
}

export interface SeederInterface {
  beforeSeed(): Promise<void>;

  seed(): Promise<void>;
}

export const loadByModel = async <T extends Entity, ID>(items: T[], repository$: DefaultCrudRepository<T,ID>, type:  { new(it: Partial<T>): T ;}) => {
  debug('Seeding data for model "%s"', type.name);
  let repository = await repository$;
  await repository.deleteAll();
  await Promise.all(items.map(async (item: T) => {
    try {
      return await repository.create((new type(item)));
    } catch (e) {
      debug('Error: %s', e.message);
    }
  }))
}

export abstract class Seeder implements SeederInterface {
  abstract seed(): Promise<void>

  public beforeSeed(): Promise<void> {
    return Promise.resolve(undefined);
  }

  public async loadByModel<I extends Entity, ID>(items: I[], repository$: DefaultCrudRepository<I, ID>, type: { new(it: Partial<I>): I; }): Promise<void> {
    return loadByModel(items, repository$, type);
  }
}
