# libsbmljs Webpack example

If you are building modern web apps, chances are you are using [Webpack](https://webpack.js.org/). Webpack normally bundles all of your JavaScript code into one big *.js file that you publish along with your website.
Emscripten-compiled modules like [libsbmljs](https://libsbmljs.github.io/) are a little bit tricky to get working with Webpack because they contain a *.js file and a *.wasm (WebAssembly) file.

Webpack handles the *.js file just fine, but it needs some special instructions for handling the *.wasm file.
In addition, Emscripten is not designed to work with systems like Webpack. It assumes the *.js file and *.wasm file will always be in the same directory - which they generally won't because Webpack combines **all** JavaScript files into a single bundle.

## Walkthrough

To follow this example, begin by cloning the repository and running

```
git clone https://github.com/libsbmljs/webpack-example.git
cd webpack-example
npm install
```

This will install all of the `npm` dependencies for this example, including libsbmljs, Babel, and Webpack.

When creating a Webpack project, you need to create a file called webpack.config.js to tell Webpack what options to use. In this repository, one is already created for you.
