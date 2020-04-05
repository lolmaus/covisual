import Route from '@ember/routing/route';
import NotFoundError from 'covisual/utils/errors/not-found';

export default Route.extend({
  beforeModel() {
    throw new NotFoundError();
  },
});
