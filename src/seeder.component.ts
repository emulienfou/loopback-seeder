// Copyright IBM Corp. 2022. All Rights Reserved.
// Node module: @loopback/seeder
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {
  Application,
  BindingScope,
  Component,
  ContextTags,
  CoreBindings,
  extensionPoint,
  inject,
} from '@loopback/core'
import debugFactory from 'debug';
import {SeederBindings} from './keys';
import {SEEDER} from './types';

export const debug = debugFactory('loopback:seeder');

/**
 * The SeederComponent manages seeder seeds.
 * It serves as an extension point for seeder seeds.
 */
@extensionPoint(SEEDER, {
  tags: {[ContextTags.KEY]: SeederBindings.COMPONENT},
  scope: BindingScope.SINGLETON,
})
export class SeederComponent implements Component {
  constructor(@inject(CoreBindings.APPLICATION_INSTANCE) app: Application) {
    debug('constructor')
  }
}
