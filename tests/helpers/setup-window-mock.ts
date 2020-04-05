/* eslint-disable @typescript-eslint/unbound-method */

import sinon from 'sinon';
import window from 'ember-window-mock';

export default function mockWindow(hooks: NestedHooks): void {
  hooks.beforeEach(function (): void {
    window.print = sinon.spy();
    window.location.reload = sinon.spy();
  });
}
