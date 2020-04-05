import { Server } from 'ember-cli-mirage';
import { TestContext as TextContextOriginal } from 'ember-test-helpers';

export interface TestContext extends TextContextOriginal {
  server: Server;
}
