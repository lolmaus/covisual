import ENV from '../../config/environment';
import { skip } from 'qunit';
import setupResetState from './setup-reset-app';
import setupFlashMessages from './setup-flash-messages';
import { setupApplicationTest, setupRenderingTest, setupTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import setupWaitFor from './setup-wait-for';
import setupWindowMock from './setup-window-mock';
import { setupYaddaOpinionated } from 'ember-cli-yadda-opinionated/test-support';

// call back functions
function ignoreIt(testElement) {
  skip(`${testElement.title}`, function (/* assert */) {}); // eslint-disable-line @typescript-eslint/no-empty-function
}

function logIt(testElement) {
  console.info(`Not running or skipping: "${testElement.title}"`); // eslint-disable-line no-console
}

// this logic could be anything, but in this case...
// if @ignore, then return skip (for backwards compatibility)
// if have annotations in config, then only run those that have a matching annotation
function checkAnnotations(annotations) {
  // if ignore is set then we want to skip for backwards compatibility
  if (annotations.ignore) {
    return ignoreIt;
  }

  // if have annotations set in config, the only run those that have a matching annotation
  if (ENV.annotations && ENV.annotations.length >= 0) {
    for (const annotation in annotations) {
      if (ENV.annotations.indexOf(annotation) >= 0) {
        // have match, so test it
        return 'testIt'; // return something other than a function
      }
    }

    // no match, so don't run it
    return logIt;
  }
}

// exported functions
function runFeature(annotations) {
  return checkAnnotations(annotations);
}

function runScenario(featureAnnotations, scenarioAnnotations) {
  return checkAnnotations(scenarioAnnotations);
}

function setupYaddaTest(annotations) {
  if (annotations.setupapplicationtest) {
    return function setupApplicationTestCustom(hooks) {
      setupApplicationTest(hooks);
      setupResetState(hooks);
      setupFlashMessages(hooks);
      setupWaitFor(hooks);
      setupMirage(hooks);
      setupYaddaOpinionated(hooks);
      setupWindowMock(hooks);
    };
  }
  if (annotations.setuprenderingtest) {
    return setupRenderingTest;
  }
  if (annotations.setuptest) {
    return setupTest;
  }
}

function setupFeature(featureAnnotations) {
  return setupYaddaTest(featureAnnotations);
}

function setupScenario(featureAnnotations, scenarioAnnotations) {
  const setupFn = setupYaddaTest(scenarioAnnotations);
  if (
    setupFn &&
    (featureAnnotations.setupapplicationtest ||
      featureAnnotations.setuprenderingtest ||
      featureAnnotations.setuptest)
  ) {
    throw new Error(
      'You must not assign any @setupapplicationtest, @setuprenderingtest or @setuptest annotations to a scenario as well as its feature!'
    );
  }
  return setupFn;
}

export { runFeature, runScenario, setupFeature, setupScenario };
