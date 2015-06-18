import Backbone from 'backbone';

export default class Router extends Backbone.Router {

  get routes() {
    return {
      '*path': 'default'
    };
  }

  initialize() {
    // TODO: not yet implemented
  }

  default(path = '') {
    // TODO: not yet implemented
  }

}
