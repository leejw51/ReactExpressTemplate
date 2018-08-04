require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const pino = __webpack_require__(14);
const l = pino({
    name: process.env.APP_ID,
    level: process.env.LOG_LEVEL,
});
exports.default = l;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {
Object.defineProperty(exports, "__esModule", { value: true });
const middleware = __webpack_require__(13);
const path = __webpack_require__(1);
function default_1(app, routes) {
    middleware(path.join(__dirname, 'Api.yaml'), app, function (err, middleware) {
        // Enable Express' case-sensitive and strict options
        // (so "/entities", "/Entities", and "/Entities/" are all different)
        app.enable('case sensitive routing');
        app.enable('strict routing');
        app.use(middleware.metadata());
        app.use(middleware.files(app, {
            apiPath: process.env.SWAGGER_API_SPEC,
        }));
        app.use(middleware.parseRequest({
            // Configure the cookie parser to use secure cookies
            cookie: {
                secret: process.env.SESSION_SECRET
            },
            // Don't allow JSON content over 100kb (default is 1mb)
            json: {
                limit: process.env.REQUEST_LIMIT
            }
        }));
        // These two middleware don't have any options (yet)
        app.use(middleware.CORS(), middleware.validateRequest());
        // Error handler to display the validation error as HTML
        app.use(function (err, req, res, next) {
            res.status(err.status);
            res.send('<h1>' + err.status + ' Error</h1>' +
                '<pre>' + err.message + '</pre>');
        });
        routes(app);
    });
}
exports.default = default_1;

/* WEBPACK VAR INJECTION */}.call(exports, "server/common/swagger"))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(9);


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(10);
const server_1 = __webpack_require__(12);
const client_1 = __webpack_require__(15);
const routes_1 = __webpack_require__(16);
const port = parseInt(process.env.PORT);
new server_1.default()
    .router(routes_1.default)
    .listen(port);
new client_1.default()
    .router(routes_1.default)
    .listen(8080);


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __webpack_require__(11);
dotenv.config();


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {
Object.defineProperty(exports, "__esModule", { value: true });
const express = __webpack_require__(0);
const path = __webpack_require__(1);
const bodyParser = __webpack_require__(3);
const http = __webpack_require__(4);
const os = __webpack_require__(5);
const cookieParser = __webpack_require__(6);
const swagger_1 = __webpack_require__(7);
const logger_1 = __webpack_require__(2);
const app = express();
class ExpressServer {
    constructor() {
        const root = path.normalize(__dirname + '/../..');
        app.set('appPath', root + 'client');
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(cookieParser(process.env.SESSION_SECRET));
        app.use(express.static(`${root}/public`));
    }
    router(routes) {
        swagger_1.default(app, routes);
        return this;
    }
    listen(port = parseInt(process.env.PORT)) {
        const welcome = port => () => logger_1.default.info(`up and running in ${"development" || 'development'} @: ${os.hostname()} on port: ${port}}`);
        http.createServer(app).listen(port, welcome(port));
        return app;
    }
}
exports.default = ExpressServer;

/* WEBPACK VAR INJECTION */}.call(exports, "server/common"))

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("swagger-express-middleware");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("pino");

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {
Object.defineProperty(exports, "__esModule", { value: true });
const express = __webpack_require__(0);
const path = __webpack_require__(1);
const bodyParser = __webpack_require__(3);
const http = __webpack_require__(4);
const os = __webpack_require__(5);
const cookieParser = __webpack_require__(6);
const swagger_1 = __webpack_require__(7);
const logger_1 = __webpack_require__(2);
const app = express();
class ClientExpressServer {
    constructor() {
        const root = path.normalize(__dirname + '/../..');
        app.set('appPath', root + 'client');
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(cookieParser(process.env.SESSION_SECRET));
        app.use(express.static(`${root}/public_client`));
    }
    router(routes) {
        swagger_1.default(app, routes);
        return this;
    }
    listen(port = parseInt(process.env.PORT)) {
        const welcome = port => () => logger_1.default.info(`up and running in ${"development" || 'development'} @: ${os.hostname()} on port: ${port}}`);
        http.createServer(app).listen(port, welcome(port));
        return app;
    }
}
exports.default = ClientExpressServer;

/* WEBPACK VAR INJECTION */}.call(exports, "server/common"))

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __webpack_require__(17);
function routes(app) {
    app.use('/api/v1/examples', router_1.default);
}
exports.default = routes;
;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const express = __webpack_require__(0);
const controller_1 = __webpack_require__(18);
exports.default = express.Router()
    .post('/', controller_1.default.create)
    .get('/', controller_1.default.all)
    .get('/:id', controller_1.default.byId);


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const examples_service_1 = __webpack_require__(19);
class Controller {
    all(req, res) {
        examples_service_1.default.all().then(r => res.json(r));
    }
    byId(req, res) {
        examples_service_1.default.byId(req.params.id).then(r => {
            if (r)
                res.json(r);
            else
                res.status(404).end();
        });
    }
    create(req, res) {
        examples_service_1.default.create(req.body.name).then(r => res
            .status(201)
            .location(`/api/v1/examples/${r.id}`)
            .json(r));
    }
}
exports.Controller = Controller;
exports.default = new Controller();


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Promise = __webpack_require__(20);
const logger_1 = __webpack_require__(2);
let id = 0;
;
const examples = [
    { id: id++, name: 'example 0' },
    { id: id++, name: 'example 1' }
];
class ExamplesService {
    all() {
        logger_1.default.info(examples, 'fetch all examples');
        return Promise.resolve(examples);
    }
    byId(id) {
        logger_1.default.info(`fetch example with id ${id}`);
        return this.all().then(r => r[id]);
    }
    create(name) {
        logger_1.default.info(`create example with name ${name}`);
        const example = {
            id: id++,
            name
        };
        examples.push(example);
        return Promise.resolve(example);
    }
}
exports.ExamplesService = ExamplesService;
exports.default = new ExamplesService();


/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("bluebird");

/***/ })
/******/ ]);
//# sourceMappingURL=main.map