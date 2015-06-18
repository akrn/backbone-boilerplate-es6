import Backbone from 'backbone';

import CounterTemplate from '../templates/counter.hbs';

export default class CounterView extends Backbone.View {

  constructor(options) {
    super(options);

    this.listenTo(this.model, 'change', this.render);
  }

  render() {
    this.$el.html(CounterTemplate(this.model.toJSON()));
    return this;
  }

}