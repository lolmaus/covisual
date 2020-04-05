// @ts-ignore
import yadda from 'yadda';

import {
  composeSteps,
  labelMap,
  opinionatedSteps,
  setupDictionary,
  // @ts-ignore
} from 'ember-cli-yadda-opinionated/test-support';
// @ts-ignore
import powerSelectSteps from 'ember-cli-yadda-opinionated/test-support/steps/power-select';
// import powerDatePickerSteps from 'ember-cli-yadda-opinionated/test-support/steps/power-date-picker';
import errorHandlingSteps from './_error-handling';
import windowSteps from './_window';

type YaddaEvent = { data: { step: string }; name: string };

labelMap.set('Bootstrap-Field-Error', '.help-block');

export const dictionary = new yadda.Dictionary().define(
  'number',
  /(\d+)/,
  yadda.converters.integer
);

setupDictionary(dictionary);

// if (config.settings.debug) {
yadda.EventBus.instance().on(yadda.EventBus.ON_EXECUTE, function (event: YaddaEvent) {
  console.debug(`Step: ${event.data.step}`, event.data);
});
// }

export const allSteps = [];

export default composeSteps(
  () => yadda.localisation.default.library(dictionary),
  opinionatedSteps,
  powerSelectSteps,
  // powerDatePickerSteps,
  errorHandlingSteps,
  windowSteps
);
