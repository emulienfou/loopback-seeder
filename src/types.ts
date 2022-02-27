// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/seeder
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {Binding, BindingScope, extensionFor} from '@loopback/core';
import {SeederBindings} from './keys';

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
    .tag({namespace: SeederBindings.SEEDS_NAMESPACE})
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

export abstract class Seeder implements SeederInterface {
  abstract seed(): Promise<void>

  beforeSeed(): Promise<void> {
    return Promise.resolve(undefined)
  }
}
