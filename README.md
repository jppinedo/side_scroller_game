![side_scroller](https://user-images.githubusercontent.com/15115125/192167594-87bcd0b8-64fb-4045-9342-62473e3a7337.JPG)

# Side scroller Runner/Jumper
A test game made with phaser HTML5 engine: https://phaser.io/

## Features

✔ Heavily commented, flexible Gulpfile (that means it uses [Gulp](http://gulpjs.com/)).

✔ [Browserify](https://github.com/substack/node-browserify) + [Babelify](https://github.com/babel/babelify) (Yes, it uses [Babel](https://babeljs.io/)).

✔ [Browsersync](http://www.browsersync.io/) = Livereload + Mobile debugging with [Weinre](http://people.apache.org/~pmuellr/weinre-docs/latest/).

✔ Example: Extending Phaser & modular development.

✔ Production ([UglifyJS](https://github.com/mishoo/UglifyJS2)) and Development ([Sourcemaps](https://developer.chrome.com/devtools/docs/javascript-debugging#source-maps)) builds.

## Usage

You need [Node.js and npm](https://nodejs.org/). You should also have git installed, but it's not mandatory.

Clone the repository (or download the ZIP file)

`git clone https://github.com/jppinedo/side_scroller_game.git`

Install dependencies

`npm install`

Run a development build...

`npm start`

...or a production build.

`npm run production`

Development builds will copy `phaser.min.js` together with `phaser.map` and `phaser.js`
Your ES6 code will be transpiled into ES5 and concatenated into a single file.
A sourcemap for your code will also be included (by default `game.map.js`).

Production builds will only copy `phaser.min.js`. Your ES6 code will be transpiled and
minified using UglifyJS.

Any modification to the files inside the `./src` and `./static` folder will trigger a full page reload.

If you modify the contents of other files, please manually restart the server.

### Modifying `gulpfile.js`

See [gulpfile.md](https://github.com/jppinedo/side_scroller_game/blob/master/gulpfile.md)
