/* eslint-disable @typescript-eslint/unbound-method */

import window from 'ember-window-mock';
import { expect } from 'chai';

export default {
  'Then I should be redirected to host "(.+?)"'(hostname: string): void {
    expect(window.location.hostname).to.equal(hostname);
  },

  'Then the application should (not|NOT)? ?have reloaded'(not?: string): void {
    if (not) {
      expect(window.location.reload).to.have.not.been.called;
    } else {
      expect(window.location.reload).to.have.been.called;
    }
  },

  'Then printing should have (NOT |not )?been initiated'(not?: string): void {
    if (not) {
      expect(window.print).to.have.not.been.called;
    } else {
      expect(window.print).to.have.been.called;
    }
  },
};
