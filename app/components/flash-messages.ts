import Component from '@glimmer/component';
import FlashMessageService from 'ember-cli-flash/services/flash-messages';
import { inject as service } from '@ember/service';

export default class FlashMessages extends Component {
  @service
  flashMessages!: FlashMessageService;
}
