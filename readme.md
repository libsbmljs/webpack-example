# libsbmljs Webpack example

If you are building modern web apps, chances are you are using [Webpack](https://webpack.js.org/). Webpack normally bundles all of your JavaScript code into one big *.js file that you publish along with your website.
Emscripten-compiled modules like [libsbmljs](https://libsbmljs.github.io/) are a little bit tricky to get working with Webpack because they contain a *.js file and a *.wasm (WebAssembly) file.

Webpack handles the *.js file just fine, but it needs some special instructions for handling the *.wasm file.
In addition, Emscripten is not designed to work with systems like Webpack. It assumes the *.js file and *.wasm file will always be in the same directory - which they generally won't because Webpack combines **all** JavaScript files into a single bundle.

## Using this repository

This repository is a working Webpack example. You can generate the output site in the `dist` directory by running:

```
npx webpack --mode production
```

See the "Using Webpack" section below for more usage information.

## Walkthrough

To follow this example, begin by cloning the repository and running

```
git clone https://github.com/libsbmljs/webpack-example.git
cd webpack-example
npm install
```

This will install all of the `npm` dependencies for this example, including libsbmljs, Babel, and Webpack.

When creating a Webpack project, you need to create a file called webpack.config.js to tell Webpack what options to use. In this repository, one is already created for you. Refer to the official [Webpack tutorial](https://webpack.js.org/guides/getting-started/) for an explanation of the fields in this file. We will cover only the parts that are required for using libsbmljs.

There are four requirements to using Emscripten-generated modules in Webpack, and they are listed below.

### 1. Ignore Plugin

By default, Emscripten will try to to use the Node.js `fs` module (which doesn't exist in the browser). Tell Webpack to disable this by using the Webpack Ignore Plugin in your `webpack.config.js` file.

```javascript
plugins: [
  new webpack.IgnorePlugin(/^fs$/),
]
```

### 2.Public Path

Webpack needs to know where you want to host your *.wasm files. In this example, we will host them at the root of the site by setting Webpack's public path to '`/`' in your `webpack.config.js` file.

```javascript
output: {
  ...
  publicPath: '/'
},
```

### 3. Webpack Dev Server

Webpack contains a development server that allows you to test your code before deploying it. The dev server will host the *.wasm file so it needs to know where it is. We need to point Webpack to the `node_modules/libsbmljs_stable` directory where the *.wasm file resides.

```javascript
devServer: {
  contentBase: [
    path.join(__dirname,'src'),
    path.join(__dirname,'node_modules','libsbmljs_stable')
  ]
},
```

### 4. Copying *.wasm Files with the Copy Plugin

When you are ready to deploy your site, you will need Webpack to copy your *.wasm files to the output directory for you. You can do this with the Webpack [Copy Plugin](https://github.com/webpack-contrib/copy-webpack-plugin).

```javascript
const CopyPlugin = require('copy-webpack-plugin');
...
new CopyPlugin([
  {from: '**/*.wasm', to: './', flatten: true}
]),
```

## Using Webpack

Webpack can be used as either a development serer (which allows you to make incremental changes and test the result), or for deployment, which writes out JavaScript bundles for you site that can then be uploaded to a hosting service.

* To run the Webpack dev server:

```
npx webpack-dev-server --mode development
```

Then connect to `http://localhost:8080/` in your browser.

![Screenshot](/img/screenshot.png?raw=true "Screenshot")

* To run Webpack in production mode to produce *.js bundles for your site:

```
npx webpack --mode production
```

In the `dist` directory, you should see three files:

```
index.html  libsbml.wasm  main.js
```

You can try hosting this page with Python. Navigate to the `dist` directory and run:

```
python3 -m http.server 8090
```

Then go to `http://0.0.0.0:8090/` in your browser. You should see the following output in your browser:

![Screenshot](/img/screenshot.png?raw=true "Screenshot")
