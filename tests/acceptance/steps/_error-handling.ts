import Ember from 'ember';

let originalErrorHandler: (error: Error) => void | null | undefined;

// ToDo: fix error typing
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function throwUnlessMatches(error: any, code?: string | number): void {
  // eslint-disable-next-line eqeqeq
  if (code && error.errors && error.errors[0] && error.errors[0].status != code) {
    throw error;
  }
}

export function overrideTestAdapterException(code?: string | number): void {
  if (!originalErrorHandler) {
    originalErrorHandler = Ember.onerror;
  }

  Ember.onerror = (error: Error): void => {
    if (typeof originalErrorHandler === 'function') {
      originalErrorHandler(error);
    }

    throwUnlessMatches(error, code);
  };
}

export function restoreOriginalTestAdapterException(): void {
  Ember.onerror = originalErrorHandler;
}

export default {
  'Given errors do not cause this test to fail'(): void {
    overrideTestAdapterException();
  },

  'Given errors with HTTP code (.+?) do not cause this test to fail'(code: string): void {
    overrideTestAdapterException(code);
  },

  'Given errors are no longer ignored'(): void {
    restoreOriginalTestAdapterException();
  },
};
