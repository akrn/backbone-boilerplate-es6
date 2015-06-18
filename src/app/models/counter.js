import Backbone from 'backbone';

export default class MainView extends Backbone.Model {

  get defaults() {
    return {
      counter: 0
    };
  }

  increaseCounter() {
    this.set('counter', this.get('counter') + 1);
  }

}