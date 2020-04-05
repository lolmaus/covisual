import { assert } from '@ember/debug';
import { getOwner } from '@ember/application';
import FlashMessageService from 'ember-cli-flash/services/flash-messages';
import Intl from 'ember-intl/services/intl';
import translateError from '../t-error';
import { run } from '@ember/runloop';

function translateIfAvailable(intl: Intl, key: string): string | false {
  try {
    return intl.lookup(key);
  } catch (e) {
    return false;
  }
}

export default function flashMessage(
  messageSuccess: string,
  messageError?: string
): MethodDecorator {
  return function (_target: unknown, _propertyKey: string, desc: PropertyDescriptor): void {
    assert(
      'flashMessage decorator can only be applied to methods.',
      typeof desc.value === 'function'
    );

    const orig = desc.value;

    desc.value = async function (...args: unknown[]): Promise<void> {
      const owner = getOwner(this);
      assert('Target for flashMessage decorator must have an owner', !!owner);
      const flashMessages: FlashMessageService = owner.lookup('service:flash-messages');
      assert('No flashMessage service found.', !!flashMessages);
      const intl: Intl = owner.lookup('service:intl');
      assert('No intl service found.', !!intl);

      try {
        const result = await orig.apply(this, args);
        flashMessages.success(translateIfAvailable(intl, messageSuccess) || messageSuccess);
        return result;
      } catch (e) {
        const m =
          (messageError && translateIfAvailable(intl, messageError)) || translateError(intl, e);
        if (m) {
          flashMessages.danger(m);
        }
        throw e;
      }
    };
  };
}

export function errorMessage(messageError?: string): MethodDecorator {
  return function (_target: unknown, _propertyKey: string, desc: PropertyDescriptor): void {
    assert(
      'flashMessage decorator can only be applied to methods.',
      typeof desc.value === 'function'
    );

    const orig = desc.value;

    desc.value = async function (...args: unknown[]): Promise<void> {
      const owner = getOwner(this);
      assert('Target for flashMessage decorator must have an owner', !!owner);
      const flashMessages: FlashMessageService = owner.lookup('service:flash-messages');
      assert('No flashMessage service found.', !!flashMessages);
      const intl: Intl = owner.lookup('service:intl');
      assert('No intl service found.', !!intl);

      try {
        return await orig.apply(this, args);
      } catch (e) {
        const m =
          (messageError && translateIfAvailable(intl, messageError)) ||
          translateError(intl, e) ||
          intl.t('errors.generic');

        flashMessages.danger(m);

        run(() => {
          throw e;
        });
      }
    };
  };
}
