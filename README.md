# loopback4-seeder

This module contains a mixin to run seeders to populate tables.

## Stability: ⚠️Experimental⚠️

> Experimental packages provide early access to advanced or experimental
> functionality to get community feedback. Such modules are published to npm
> using `0.x.y` versions. Their APIs and functionality may be subject to
> breaking changes in future releases.

## Installation

```sh
npm install --save loopback4-seeder
```

## Basic use

### Use the mixin

This module provides a mixin for your Application that enables convenience methods.

```ts
import {SeedMixin} from 'loopback4-seeder';

class MyApplication extends SeedMixin(Application) {}
```

### Implement the SeedMixinInterface

Optionally you can implement the `SeedMixinInterface` in the constructor of
your custom `Application` class.

By doing that you can directly use the function `loadSeeds` without creating
any seeder classes to load the data from files.

```ts
import {SeedMixin, SeedMixinInterface} from 'loopback4-seeder';
import json from './dummy.json';

export class MyApplication extends SeedMixin(Application) implements SeedMixinInterface {
  async loadSeeds(filterClasses?: string[]): Promise<void> {
    if (!filterClasses?.includes('Dummy'))
      await this.loadByModel(json, await this.getRepository(DummyRepository), Dummy);
  }
}
```

### Create seeder

We can create an instance of `Seeder`.

```ts
import {Seeder, seeder} from 'loopback-seeder';

// Create a seed
@seeder()
export class DummySeeder extends Seeder {
  async beforeSeed(): Promise<void> {
    // Optionnally, run before seed to delete all data by example
  }

  async seed(): Promise<void> {
    // Run you seed code
  }
}
```

### Add seed script

To be able to run the seeds, you will need to create a `src/seed.ts` file
containing the next script:

```ts
import {Application} from './application';

export const seed = async (args: string[]) => {
  const app = new Application();
  await app.boot();
  await app.load(args);

  // Connectors usually keep a pool of opened connections,
  // this keeps the process running even after all work is done.
  // We need to exit explicitly.
  process.exit(0);
}

seed(process.argv).catch(err => {
  console.error('Cannot seed database schema', err);
  process.exit(1);
})
```

Then you will need to add a new script inside your `package.json` file, like:
```json
{
  "scripts": {
    "seed": "node ./dist/seed"
  }
}
```

### Run seed command

Seed database (populate database):

```shell
npm run seed
```

Seed database, only for a specific class (Dummy seeder):

```shell
npm run seed Dummy
```

### Debug

To display debug messages from this package, you can use the next command:

```shell
DEBUG=loopback:seeder npm run seed
```

## Tests

Run `npm test` from the root folder.


## License

MIT
