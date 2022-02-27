// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/seeder
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {BindingSpec, injectable} from '@loopback/core';
import {asSeed} from '../types';

/**
 * `@seeder` decorates a seed class
 *
 * @example
 * ```ts
 * @seeder()
 * class ExampleSeeder extends Seeder {
 *   async seed(): Promise<void> {
 *     // ...
 *   }
 * }
 * ```
 * @param specs - Extra binding specs
 */
export function seeder(...specs: BindingSpec[]) {
  return injectable(asSeed, ...specs);
}
