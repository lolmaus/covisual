import Controller from '@ember/controller';
import { readOnly } from '@ember/object/computed';

export default class Error_Controller extends Controller {
  @readOnly('model')
  error!: Error;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    error: Error_Controller;
  }
}
