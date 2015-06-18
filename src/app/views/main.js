import Backbone from 'backbone';
import $ from 'jquery';

import CounterView from './counter.js'
import MainTemplate from '../templates/main.hbs';

export default class MainView extends Backbone.View {

  get id() { return 'main'; }
  get events() {
    return {
      'click #btn-main-clickme': 'clickMe'
    };
  }

  constructor(options) {
    super(options);
  }

  render() {
    this.$el.html(MainTemplate());

    this.counterView = new CounterView({
      el: this.$('#main-counter'),
      model: this.model
    }).render();

    return this;
  }

  clickMe() {
    this.model.increaseCounter();
  }

}