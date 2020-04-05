import { registerWaiter, unregisterWaiter } from '@ember/test';
import { checkPending } from 'covisual/utils/wait-for';

/**
 * start the mockserver before each scenario and cleans up after
 * @param hooks
 */
export default function setupWaitFor(hooks: NestedHooks): void {
  hooks.beforeEach(function (): void {
    registerWaiter(checkPending);
  });

  hooks.afterEach(function (): void {
    unregisterWaiter(checkPending);
  });
}
