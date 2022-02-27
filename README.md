# loopback4-seeder

This module contains a component to run seeders to populate tables.

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

### Register the SeederComponent

The component should be loaded in the constructor of your custom `Application`
class.

Start by importing the component class:

```ts
import {SeederComponent} from 'loopback4-seeder';
```

In the constructor, add the component to your application:

```ts
this.component(SeederComponent);
```

### Implement the SeedMixinInterface

Optionally you can implement the `SeedMixinInterface` in the constructor of
your custom `Application` class.

By doing that you can directly use the function `loadSeeds` without creating
any seeder classes to load the data from files.

### Register seeders

We can create an instance of `Seeder` and bind it to the application context.

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

// Bind the seed class to the application and tag it as a seeder
app.add(createBindingFromClass(DummySeeder).tag('seeder'));
```

## Tests

Run `npm test` from the root folder.


## License

MIT
