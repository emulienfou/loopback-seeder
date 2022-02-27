// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/seeder
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {BindingKey} from '@loopback/core';
import {SeederComponent} from './seeder.component';

/**
 * Binding keys used by this component.
 */
export namespace SeederBindings {
  /**
   * Binding key for `SeederComponent`
   */
  export const COMPONENT = BindingKey.create<SeederComponent>(
    'components.SeederComponent',
  );

  /**
   * Namespace for seeds
   */
  export const SEEDS_NAMESPACE = 'seeder.seeds';
}
