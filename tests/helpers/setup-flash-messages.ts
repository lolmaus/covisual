import FlashObject from 'ember-cli-flash/flash/object';

let hasReopened = false;

export default function setupFlashMessages(hooks: NestedHooks): void {
  hooks.beforeEach(function () {
    if (!hasReopened) {
      FlashObject.reopen({
        init() {}, // eslint-disable-line @typescript-eslint/no-empty-function
      });
      hasReopened = true;
    }
  });
}
