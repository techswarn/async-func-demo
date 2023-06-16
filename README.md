# functions-async-from-web-browser-example

CREDIT:: Matt Welke from DigitalOcean functions engineer has developed this example.

Shows how to securely invoke a function from a web browser asynchronously.

 ## Architecture

It uses two functions to do this, contained in the `functions` directory in this repo.

* **`main-function`**: Deployed as a non-web function and acts as the "main function" that does useful work. See [`index.js`](functions/packages/async-from-web-browser/main-function/index.js) for more details.
* **`main-function-invoker`**: Deployed as a web function. Its only purpose is to act as a proxy to the main function. Because it is a web function, unlike with non-web functions, it is appropriate to make HTTP calls to it from a web browser (e.g., no API key exposed to browser, automatic CORS support). See [`index.mjs`](functions/packages/async-from-web-browser/main-function-invoker/index.mjs) for more details.

See the comments in the `project.yml` file for more details about this overall architecture, including how to configure the functions.

## Running the example

The example also has a web page `index.html` and a configuration for the NPM package `http-server` at the top level of the repo, which can be used to run the example after the functions project has been deployed.

Prerequisites:

* `doctl` installed and connected to a Functions namespace.

To run:

1. Deploy the functions project.
2. Get the URL of the invoker function by running `doctl sls fn get async-from-web-browser/main-function-invoker --url`.
3. Run `npm ci && npm run serve` to serve the web page on localhost.
4. Open `http://localhost:8080` in your web browser.
5. Follow the instructions on the web page.

   After clicking "Invoke", the web function will be invoked and the activation ID will be displayed on the web page.

   ![image](https://github.internal.digitalocean.com/storage/user/1361/files/a78e0ed7-9668-47d3-bcdc-0451a7de7563)
