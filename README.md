# Yet Another Backbone Boilerplate

My attempt to create a boilerplate for starting a [Backbone.js](http://backbonejs.org/) web application development using modern technologies (as of Jun 2015):

 * ECMAScript 6 - [Babel](https://babeljs.io/)
 * [Browserify](http://browserify.org)
 * [Gulp](http://gulpjs.com)
 * [Handlebars](http://handlebarsjs.com)
 * [less.js](http://lesscss.org)

### Usage
First, install Gulp globally:

```shell
$ npm install -g gulp
```

Second, install npm dependencies:

```shell
$ npm install
```

Run development server (port is set to 8080 by default):

```shell
$ gulp server
```

To build a minified version of the applicaiton simply run:

```shell
$ gulp build
```

### Things to do

 * Testing support
 * Support for multiple environments
 * Documentation support
 * Replace gulp-connect