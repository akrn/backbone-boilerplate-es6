import $ from 'jquery';
import Backbone from 'backbone';

import Counter from './models/counter.js';
import MainView from './views/main.js';
import Router from './router';

$(() => {
  const counter = new Counter();

  const view = new MainView({ model: counter });
  $('#app').append(view.render().$el);

  const router = new Router();
  
  Backbone.history.start();
});
