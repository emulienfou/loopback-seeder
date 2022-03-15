import {Binding, Component, createBindingFromClass} from '@loopback/core';
import {SeederBooter} from '../booters';

export class SeederComponent implements Component {
  bindings: Binding[] = [
    createBindingFromClass(SeederBooter),
  ]
}
