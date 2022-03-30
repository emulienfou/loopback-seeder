import {ArtifactOptions, BaseArtifactBooter, BootBindings, booter} from '@loopback/boot';
import {Application, config, CoreBindings, createBindingFromClass, inject} from '@loopback/core';
import {debug} from '../index';

@booter('seederBooter')
export class SeederBooter extends BaseArtifactBooter {
  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE) public app: Application,
    @inject(BootBindings.PROJECT_ROOT) projectRoot: string,
    @config() options: ArtifactOptions = {}
  ) {
    super(
      projectRoot,
      // Set Seeder Booter Options if passed in via bootConfig
      Object.assign({}, SeederDefaults, options),
    );
  }


  async load(): Promise<void> {
    await super.load();

    for (const cls of this.classes) {
      debug('[INFO] Bind class: %s', cls.name);
      this.app.add(createBindingFromClass(cls).tag('seed'))
    }
  }
}

/**
 * Default ArtifactOptions for SeederBooter.
 */
export const SeederDefaults: ArtifactOptions = {
  dirs: ['seeders'],
  extensions: ['.seeder.js'],
  nested: true,
};
