/* global Chart */

import Application from '@ember/application';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

import 'chartjs-plugin-datalabels';

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}

loadInitializers(App, config.modulePrefix);

Chart.scaleService.updateScaleDefaults('logarithmic', {
  ticks: {
    callback: function (...args) {
      // https://github.com/chartjs/Chart.js/issues/3121#issuecomment-390372093
      const value = Chart.Ticks.formatters.logarithmic.call(this, ...args);
      if (value.length) {
        return Number(value).toLocaleString();
      }
      return value;
    },
  },
});
