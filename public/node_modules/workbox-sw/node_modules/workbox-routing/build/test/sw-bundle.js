importScripts('/node_modules/mocha/mocha.js');
importScripts('/node_modules/chai/chai.js');
importScripts('/node_modules/sw-testing-helpers/build/browser/mocha-utils.js');
importScripts('/node_modules/sinon/pkg/sinon-no-sourcemaps.js');

/* globals mocha */
/* eslint-disable no-unused-vars */

self.expect = self.chai.expect;
self.chai.should();
mocha.setup({
  ui: 'bdd',
  reporter: null,
});

// This is a bit of a hack, but means workbox-runtime-caching can
// stub out fetch without triggering a mocha global leak.
// This thread inspired this "solution":
// https://github.com/sinonjs/sinon/issues/143
self.fetch = fetch;

/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

/**
 * A simple class to make errors and to help with testing.
 */
class ErrorFactory$1 {
  /**
   * @param {Object} errors A object containing key value pairs where the key
   * is the error name / ID and the value is the error message.
   */
  constructor(errors) {
    this._errors = errors;
  }
  /**
   * @param {string} name The error name to be generated.
   * @param {Error} [thrownError] The thrown error that resulted in this
   * message.
   * @return {Error} The generated error.
   */
  createError(name, thrownError) {
    if (!(name in this._errors)) {
      throw new Error(`Unable to generate error '${name}'.`);
    }

    let message = this._errors[name].replace(/\s+/g, ' ');
    let stack = null;
    if (thrownError) {
      message += ` [${thrownError.message}]`;
      stack = thrownError.stack;
    }

    const generatedError = new Error();
    generatedError.name = name;
    generatedError.message = message;
    generatedError.stack = stack;
    return generatedError;
  }
}

/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

const errors = {
  'express-route-invalid-path': `When using ExpressRoute, you must
    provide a path that starts with a '/' character (to match same-origin
    requests) or that starts with 'http' (to match cross-origin requests)`,
};

var ErrorFactory = new ErrorFactory$1(errors);

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var stackframe = createCommonjsModule(function (module, exports) {
(function(root, factory) {
    'use strict';
    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.

    /* istanbul ignore next */
    if (typeof undefined === 'function' && undefined.amd) {
        undefined('stackframe', [], factory);
    } else {
        module.exports = factory();
    }
}(commonjsGlobal, function() {
    'use strict';
    function _isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function _capitalize(str) {
        return str[0].toUpperCase() + str.substring(1);
    }

    function _getter(p) {
        return function() {
            return this[p];
        };
    }

    var booleanProps = ['isConstructor', 'isEval', 'isNative', 'isToplevel'];
    var numericProps = ['columnNumber', 'lineNumber'];
    var stringProps = ['fileName', 'functionName', 'source'];
    var arrayProps = ['args'];

    var props = booleanProps.concat(numericProps, stringProps, arrayProps);

    function StackFrame(obj) {
        if (obj instanceof Object) {
            for (var i = 0; i < props.length; i++) {
                if (obj.hasOwnProperty(props[i]) && obj[props[i]] !== undefined) {
                    this['set' + _capitalize(props[i])](obj[props[i]]);
                }
            }
        }
    }

    StackFrame.prototype = {
        getArgs: function() {
            return this.args;
        },
        setArgs: function(v) {
            if (Object.prototype.toString.call(v) !== '[object Array]') {
                throw new TypeError('Args must be an Array');
            }
            this.args = v;
        },

        getEvalOrigin: function() {
            return this.evalOrigin;
        },
        setEvalOrigin: function(v) {
            if (v instanceof StackFrame) {
                this.evalOrigin = v;
            } else if (v instanceof Object) {
                this.evalOrigin = new StackFrame(v);
            } else {
                throw new TypeError('Eval Origin must be an Object or StackFrame');
            }
        },

        toString: function() {
            var functionName = this.getFunctionName() || '{anonymous}';
            var args = '(' + (this.getArgs() || []).join(',') + ')';
            var fileName = this.getFileName() ? ('@' + this.getFileName()) : '';
            var lineNumber = _isNumber(this.getLineNumber()) ? (':' + this.getLineNumber()) : '';
            var columnNumber = _isNumber(this.getColumnNumber()) ? (':' + this.getColumnNumber()) : '';
            return functionName + args + fileName + lineNumber + columnNumber;
        }
    };

    for (var i = 0; i < booleanProps.length; i++) {
        StackFrame.prototype['get' + _capitalize(booleanProps[i])] = _getter(booleanProps[i]);
        StackFrame.prototype['set' + _capitalize(booleanProps[i])] = (function(p) {
            return function(v) {
                this[p] = Boolean(v);
            };
        })(booleanProps[i]);
    }

    for (var j = 0; j < numericProps.length; j++) {
        StackFrame.prototype['get' + _capitalize(numericProps[j])] = _getter(numericProps[j]);
        StackFrame.prototype['set' + _capitalize(numericProps[j])] = (function(p) {
            return function(v) {
                if (!_isNumber(v)) {
                    throw new TypeError(p + ' must be a Number');
                }
                this[p] = Number(v);
            };
        })(numericProps[j]);
    }

    for (var k = 0; k < stringProps.length; k++) {
        StackFrame.prototype['get' + _capitalize(stringProps[k])] = _getter(stringProps[k]);
        StackFrame.prototype['set' + _capitalize(stringProps[k])] = (function(p) {
            return function(v) {
                this[p] = String(v);
            };
        })(stringProps[k]);
    }

    return StackFrame;
}));
});

var errorStackParser = createCommonjsModule(function (module, exports) {
(function(root, factory) {
    'use strict';
    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.

    /* istanbul ignore next */
    if (typeof undefined === 'function' && undefined.amd) {
        undefined('error-stack-parser', ['stackframe'], factory);
    } else {
        module.exports = factory(stackframe);
    }
}(commonjsGlobal, function ErrorStackParser(StackFrame) {
    'use strict';

    var FIREFOX_SAFARI_STACK_REGEXP = /(^|@)\S+\:\d+/;
    var CHROME_IE_STACK_REGEXP = /^\s*at .*(\S+\:\d+|\(native\))/m;
    var SAFARI_NATIVE_CODE_REGEXP = /^(eval@)?(\[native code\])?$/;

    return {
        /**
         * Given an Error object, extract the most information from it.
         *
         * @param {Error} error object
         * @return {Array} of StackFrames
         */
        parse: function ErrorStackParser$$parse(error) {
            if (typeof error.stacktrace !== 'undefined' || typeof error['opera#sourceloc'] !== 'undefined') {
                return this.parseOpera(error);
            } else if (error.stack && error.stack.match(CHROME_IE_STACK_REGEXP)) {
                return this.parseV8OrIE(error);
            } else if (error.stack) {
                return this.parseFFOrSafari(error);
            } else {
                throw new Error('Cannot parse given Error object');
            }
        },

        // Separate line and column numbers from a string of the form: (URI:Line:Column)
        extractLocation: function ErrorStackParser$$extractLocation(urlLike) {
            // Fail-fast but return locations like "(native)"
            if (urlLike.indexOf(':') === -1) {
                return [urlLike];
            }

            var regExp = /(.+?)(?:\:(\d+))?(?:\:(\d+))?$/;
            var parts = regExp.exec(urlLike.replace(/[\(\)]/g, ''));
            return [parts[1], parts[2] || undefined, parts[3] || undefined];
        },

        parseV8OrIE: function ErrorStackParser$$parseV8OrIE(error) {
            var filtered = error.stack.split('\n').filter(function(line) {
                return !!line.match(CHROME_IE_STACK_REGEXP);
            }, this);

            return filtered.map(function(line) {
                if (line.indexOf('(eval ') > -1) {
                    // Throw away eval information until we implement stacktrace.js/stackframe#8
                    line = line.replace(/eval code/g, 'eval').replace(/(\(eval at [^\()]*)|(\)\,.*$)/g, '');
                }
                var tokens = line.replace(/^\s+/, '').replace(/\(eval code/g, '(').split(/\s+/).slice(1);
                var locationParts = this.extractLocation(tokens.pop());
                var functionName = tokens.join(' ') || undefined;
                var fileName = ['eval', '<anonymous>'].indexOf(locationParts[0]) > -1 ? undefined : locationParts[0];

                return new StackFrame({
                    functionName: functionName,
                    fileName: fileName,
                    lineNumber: locationParts[1],
                    columnNumber: locationParts[2],
                    source: line
                });
            }, this);
        },

        parseFFOrSafari: function ErrorStackParser$$parseFFOrSafari(error) {
            var filtered = error.stack.split('\n').filter(function(line) {
                return !line.match(SAFARI_NATIVE_CODE_REGEXP);
            }, this);

            return filtered.map(function(line) {
                // Throw away eval information until we implement stacktrace.js/stackframe#8
                if (line.indexOf(' > eval') > -1) {
                    line = line.replace(/ line (\d+)(?: > eval line \d+)* > eval\:\d+\:\d+/g, ':$1');
                }

                if (line.indexOf('@') === -1 && line.indexOf(':') === -1) {
                    // Safari eval frames only have function names and nothing else
                    return new StackFrame({
                        functionName: line
                    });
                } else {
                    var tokens = line.split('@');
                    var locationParts = this.extractLocation(tokens.pop());
                    var functionName = tokens.join('@') || undefined;

                    return new StackFrame({
                        functionName: functionName,
                        fileName: locationParts[0],
                        lineNumber: locationParts[1],
                        columnNumber: locationParts[2],
                        source: line
                    });
                }
            }, this);
        },

        parseOpera: function ErrorStackParser$$parseOpera(e) {
            if (!e.stacktrace || (e.message.indexOf('\n') > -1 &&
                e.message.split('\n').length > e.stacktrace.split('\n').length)) {
                return this.parseOpera9(e);
            } else if (!e.stack) {
                return this.parseOpera10(e);
            } else {
                return this.parseOpera11(e);
            }
        },

        parseOpera9: function ErrorStackParser$$parseOpera9(e) {
            var lineRE = /Line (\d+).*script (?:in )?(\S+)/i;
            var lines = e.message.split('\n');
            var result = [];

            for (var i = 2, len = lines.length; i < len; i += 2) {
                var match = lineRE.exec(lines[i]);
                if (match) {
                    result.push(new StackFrame({
                        fileName: match[2],
                        lineNumber: match[1],
                        source: lines[i]
                    }));
                }
            }

            return result;
        },

        parseOpera10: function ErrorStackParser$$parseOpera10(e) {
            var lineRE = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i;
            var lines = e.stacktrace.split('\n');
            var result = [];

            for (var i = 0, len = lines.length; i < len; i += 2) {
                var match = lineRE.exec(lines[i]);
                if (match) {
                    result.push(
                        new StackFrame({
                            functionName: match[3] || undefined,
                            fileName: match[2],
                            lineNumber: match[1],
                            source: lines[i]
                        })
                    );
                }
            }

            return result;
        },

        // Opera 10.65+ Error.stack very similar to FF/Safari
        parseOpera11: function ErrorStackParser$$parseOpera11(error) {
            var filtered = error.stack.split('\n').filter(function(line) {
                return !!line.match(FIREFOX_SAFARI_STACK_REGEXP) && !line.match(/^Error created at/);
            }, this);

            return filtered.map(function(line) {
                var tokens = line.split('@');
                var locationParts = this.extractLocation(tokens.pop());
                var functionCall = (tokens.shift() || '');
                var functionName = functionCall
                        .replace(/<anonymous function(: (\w+))?>/, '$2')
                        .replace(/\([^\)]*\)/g, '') || undefined;
                var argsRaw;
                if (functionCall.match(/\(([^\)]*)\)/)) {
                    argsRaw = functionCall.replace(/^[^\(]+\(([^\)]*)\)$/, '$1');
                }
                var args = (argsRaw === undefined || argsRaw === '[arguments not available]') ?
                    undefined : argsRaw.split(',');

                return new StackFrame({
                    functionName: functionName,
                    args: args,
                    fileName: locationParts[0],
                    lineNumber: locationParts[1],
                    columnNumber: locationParts[2],
                    source: line
                });
            }, this);
        }
    };
}));
});

/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

/* eslint-disable require-jsdoc */



function hasMethod(object, expectedMethod) {
  const parameter = Object.keys(object).pop();
  const type = typeof object[parameter][expectedMethod];
  if (type !== 'function') {
    throwError(`The '${parameter}' parameter must be an object that exposes a
      '${expectedMethod}' method.`);
  }
}

function isInstance(object, expectedClass) {
  const parameter = Object.keys(object).pop();
  if (!(object[parameter] instanceof expectedClass)) {
    throwError(`The '${parameter}' parameter must be an instance of
      '${expectedClass.name}'`);
  }
}

function isOneOf(object, values) {
  const parameter = Object.keys(object).pop();
  if (!values.includes(object[parameter])) {
    throwError(`The '${parameter}' parameter must be set to one of the
      following: ${values}`);
  }
}

function isType(object, expectedType) {
  const parameter = Object.keys(object).pop();
  const actualType = typeof object[parameter];
  if (actualType !== expectedType) {
    throwError(`The '${parameter}' parameter has the wrong type. (Expected:
      ${expectedType}, actual: ${actualType})`);
  }
}



function isArrayOfClass(object, expectedClass) {
  const parameter = Object.keys(object).pop();
  const message = `The '${parameter}' parameter should be an array containing
    one or more '${expectedClass.name}' instances.`;

  if (!Array.isArray(object[parameter])) {
    throwError(message);
  }

  for (let item of object[parameter]) {
    if (!(item instanceof expectedClass)) {
      throwError(message);
    }
  }
}



function throwError(message) {
  // Collapse any newlines or whitespace into a single space.
  message = message.replace(/\s+/g, ' ');

  const error = new Error(message);
  error.name = 'assertion-failed';

  const stackFrames = errorStackParser.parse(error);

  // If, for some reason, we don't have all the stack information we need,
  // we'll just end up throwing a basic Error.
  if (stackFrames.length >= 3) {
    // Assuming we have the stack frames, set the message to include info
    // about what the underlying method was, and set the name to reflect
    // the assertion type that failed.
    error.message = `Invalid call to ${stackFrames[2].functionName}() — ` +
      message;
  }

  throw error;
}

/**
 * @param {function|module:workbox-runtime-caching.Handler} handler The
 * handler to normalize.
 * @return {Object} An object with a `handle` property representing the handler
 * function.
 *
 * @private
 */
function normalizeHandler(handler) {
  if (typeof handler === 'object') {
    hasMethod({handler}, 'handle');
    return handler;
  } else {
    isType({handler}, 'function');
    return {handle: handler};
  }
}

/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

/**
 * The default HTTP method, 'GET', used when there's no specific method
 * configured for a route.
 *
 * @private
 * @type {string}
 * @memberof module:workbox-routing
 */
const defaultMethod = 'GET';

/**
 * The list of valid HTTP methods associated with requests that could be routed.
 *
 * @private
 * @type {Array.<string>}
 * @memberof module:workbox-routing
 */
const validMethods = [
  'DELETE',
  'GET',
  'HEAD',
  'POST',
  'PUT',
];

/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

/**
 * This is the definition of the `match` callback passed into the
 * `Route` constructor.
 *
 * This callback is used to determine if a new `fetch` event can be served
 * by this `Route`. Returning a truthy value indicates that this `Route` can
 * handle this `fetch` event. Return `null` if this shouldn't match against
 * the `fetch` event.
 *
 * If you do return a truthy value, the object will be passed to the
 * Route's `handler` (see the
 * [Route Constructor]{@link module:workbox-routing.Route}).
 *
 * @callback Route~matchCallback
 * @param {Object} input
 * @param {URL} input.url The request's URL.
 * @param {FetchEvent} input.event The event that triggered the `fetch` handler.
 * @return {Object|null} To signify a match, return a truthy value, otherwise
 * return null if the route shouldn't match. If you return an Object with
 * contents it will be passed to the `handler` in the `Route` constructor.
 * @memberof module:workbox-routing
 */

/**
 * This is the definition of the `handler` callback that can be passed into the
 * `Route` constructor.
 *
 * The `handler` callback is called when a request has been matched by
 * a `Route` and should return a Promise that resolves with a `Response`.
 *
 * @callback Route~handlerCallback
 * @param {Object} input
 * @param {URL} input.url The request's URL.
 * @param {FetchEvent} input.event The event that triggered the `fetch` handler.
 * @param {Object} [input.params] Parameters returned
 * the Route's [match callback]{@link
 *   module:workbox-routing.Route~matchCallback} function. This will be
 * undefined if nothing was returned.
 * @return {Promise<Response>} The response that will fulfill the request.
 * @memberof module:workbox-routing
 */

/**
 * A `Route` allows you to tell a service worker that it should handle
 * certain network requests using a specific response strategy.
 *
 * A consists or a matcher and a handler. A matcher needs to determine if a
 * route should be used for a request. A handler should handle the request
 * if it does match a Router.
 *
 * Instead of implementing your own handlers, you can use one of the
 * pre-defined runtime caching strategies from the
 * {@link module:workbox-runtime-caching|workbox-runtime-caching} module.
 *
 * There are also pre-defined Route's provided by this library:
 * {@link module:workbox-routing.RegExpRoute|RegExpRoute}
 * and {@link module:workbox-routing.ExpressRoute|ExpressRoute} subclasses
 * which provide a convenient wrapper with a nicer interface for using regular
 * expressions or Express-style routes as the `match` criteria.
 *
 * @example
 * // Any navigate requests for URLs that start with /path/to/ will match.
 * const route = new workbox.routing.Route({
 *   match: ({url, event}) => {
 *     return event.request.mode === 'navigate' &&
 *            url.pathname.startsWith('/path/to/');
 *   },
 *   handler: ({event}) => {
 *     // Do something that returns a Promise.<Response>, like:
 *     return caches.match(event.request);
 *   },
 * });
 *
 * const router = new workbox.routing.Router();
 * router.registerRoute({route});
 *
 * @memberof module:workbox-routing
 */
class Route {
  /**
   * Constructor for Route class.
   * @param {Object} input
   * @param {function} input.match The function that determines whether the
   * route matches a given `fetch` event.
   *
   * See [matchCallback]{@link module:workbox-routing.Route~matchCallback} for
   * full details on this function.
   * @param {function|module:workbox-runtime-caching.Handler} input.handler
   * This parameter can be either a function or an object which is a subclass
   * of `Handler`.
   *
   * Either option should result in a `Response` that the `Route` can use to
   * handle the `fetch` event.
   *
   * See [handlerCallback]{@link module:workbox-routing.Route~handlerCallback}
   * for full details on using a callback function as the `handler`.
   * @param {string} [input.method] Only match requests that use this
   * HTTP method.
   *
   * Defaults to `'GET'`.
   */
  constructor({match, handler, method} = {}) {
    this.handler = normalizeHandler(handler);

    isType({match}, 'function');
    this.match = match;

    if (method) {
      isOneOf({method}, validMethods);
      this.method = method;
    } else {
      this.method = defaultMethod;
    }
  }
}

var index$1 = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

/**
 * Expose `pathToRegexp`.
 */
var index = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g');

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || '/';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1];
      continue
    }

    var next = str[index];
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7];

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path);
      path = '';
    }

    var partial = prefix != null && next != null && next !== prefix;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
    });
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index);
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path);
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options))
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty (str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk (str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length);

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
    }
  }

  return function (obj, opts) {
    var path = '';
    var data = obj || {};
    var options = opts || {};
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;

        continue
      }

      var value = data[token.name];
      var segment;

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix;
          }

          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (index$1(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment;
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys;
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      });
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  if (!index$1(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  var strict = options.strict;
  var end = options.end !== false;
  var route = '';

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = '(?:' + token.pattern + ')';

      keys.push(token);

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*';
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?';
        } else {
          capture = prefix + '(' + capture + ')?';
        }
      } else {
        capture = prefix + '(' + capture + ')';
      }

      route += capture;
    }
  }

  var delimiter = escapeString(options.delimiter || '/');
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys)
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (!index$1(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */ (keys))
  }

  if (index$1(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
  }

  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
}

index.parse = parse_1;
index.compile = compile_1;
index.tokensToFunction = tokensToFunction_1;
index.tokensToRegExp = tokensToRegExp_1;

/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

/**
 * `ExpressRoute` is a helper class to make defining Express-style
 * [Routes]{@link module:workbox-routing.Route} easy.
 *
 * Under the hood, it uses the [`path-to-regexp`](https://www.npmjs.com/package/path-to-regexp)
 * library to transform the `path` parameter into a regular expression, which is
 * then matched against the URL's path.
 *
 * Please note that `ExpressRoute` can match either same-origin or cross-origin
 * requests.
 *
 * To match same-origin requests, use a `path` value that begins with
 * `'/'`, e.g. `'/path/to/:file'`.
 *
 * To match cross-origin requests, use a `path` value that includes the origin,
 * e.g. `'https://example.com/path/to/:file'`.
 *
 * @example
 * // Any same-origin requests that start with /path/to and end with one
 * // additional path segment will match this route, with the last path
 * // segment passed along to the handler via params.file.
 * const route = new workbox.routing.ExpressRoute({
 *   path: '/path/to/:file',
 *   handler: ({event, params}) => {
 *     // params.file will be set based on the request URL that matched.
 *     return caches.match(params.file);
 *   },
 * });
 *
 * const router = new workbox.routing.Router();
 * router.registerRoute({route});
 *
 * @example
 * // Any cross-origin requests for https://example.com will match this route.
 * const route = new workbox.routing.ExpressRoute({
 *   path: 'https://example.com/path/to/:file',
 *   handler: ({event}) => return caches.match(event.request),
 * });
 *
 * const router = new workbox.routing.Router();
 * router.registerRoute({route});
 *
 * @memberof module:workbox-routing
 * @extends Route
 */
class ExpressRoute extends Route {
  /**
   * Constructor for ExpressRoute.
   *
   * @param {Object} input
   * @param {String} input.path The path to use for routing.
   * If the path contains [named parameters](https://github.com/pillarjs/path-to-regexp#named-parameters),
   * then an Object that maps parameter names to their corresponding value
   * will be passed to the handler via `params`.
   * @param {function|module:workbox-runtime-caching.Handler} input.handler The
   * handler to use to provide a response if the route matches.
   *
   * If you wish to use a callback function [see handlerCallback]{@link
   *   module:workbox-routing.Route~handlerCallback} for the callback
   * definition.
   * @param {string} [input.method] Only match requests that use this
   * HTTP method.
   *
   * Defaults to `'GET'`.
   */
  constructor({path, handler, method}) {
    if (!(path.startsWith('/') || path.startsWith('http'))) {
      throw ErrorFactory.createError('express-route-invalid-path');
    }

    let keys = [];
    // keys is populated as a side effect of pathToRegExp. This isn't the nicest
    // API, but so it goes.
    // https://github.com/pillarjs/path-to-regexp#usage
    const regExp = index(path, keys);
    const match = ({url}) => {
      // A path starting with '/' is a signal that we only want to match
      // same-origin. Bail out early if needed.
      if (path.startsWith('/') && url.origin !== location.origin) {
        return null;
      }

      // We need to match on either just the pathname or the full URL, depending
      // on whether the path parameter starts with '/' or 'http'.
      const pathNameOrHref = path.startsWith('/') ? url.pathname : url.href;
      const regexpMatches = pathNameOrHref.match(regExp);
      // Return null immediately if this route doesn't match.
      if (!regexpMatches) {
        return null;
      }

      // If the route does match, then collect values for all the named
      // parameters that were returned in keys.
      // If there are no named parameters then this will end up returning {},
      // which is truthy, and therefore a sufficient return value.
      const namedParamsToValues = {};
      keys.forEach((key, index$$1) => {
        namedParamsToValues[key.name] = regexpMatches[index$$1 + 1];
      });

      return namedParamsToValues;
    };

    super({match, handler, method});
  }
}

/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

/* eslint-env mocha, browser */

describe(`Test of the ExpressRoute class`, function() {
  const path = '/test/path';
  const handler = () => {};
  const invalidHandler = {};
  const invalidPath = 'invalid';
  const crossOrigin = 'https://cross-origin.example.com';

  it(`should throw when ExpressRoute() is called without any parameters`, function() {
    expect(() => new ExpressRoute()).to.throw();
  });

  it(`should throw when ExpressRoute() is called without a valid handler`, function() {
    expect(() => new ExpressRoute({path})).to.throw();
    expect(() => new ExpressRoute({path, handler: invalidHandler})).to.throw();
  });

  it(`should throw when ExpressRoute() is called without a valid path`, function() {
    expect(() => {
      new ExpressRoute({handler, path: invalidPath});
    }).to.throw().with.property('name', 'express-route-invalid-path');
  });

  it(`should not throw when ExpressRoute() is called with valid handler and path parameters`, function() {
    expect(() => new ExpressRoute({handler, path})).not.to.throw();
  });

  it(`should properly match URLs`, function() {
    const matchingUrl = new URL(path, location);
    const nonMatchingUrl = new URL('/does/not/match', location);

    const route = new ExpressRoute({handler, path});
    expect(route.match({url: matchingUrl})).to.be.ok;
    expect(route.match({url: nonMatchingUrl})).not.to.be.ok;
  });

  it(`should properly match URLs with named parameters`, function() {
    const value1 = 'value1';
    const value2 = 'value2';

    const namedParameterPath = '/:param1/dummy/:param2';
    const namedParameterMatchingUrl = new URL(`/${value1}/dummy/${value2}`, location);
    const namedParameterNonMatchingUrl = new URL(`/${value1}/${value2}`, location);

    const route = new ExpressRoute({
      handler, path: namedParameterPath,
    });

    const match = route.match({url: namedParameterMatchingUrl});
    expect(Object.keys(match).length).to.equal(2);
    expect(match.param1).to.equal(value1);
    expect(match.param2).to.equal(value2);

    expect(route.match({url: namedParameterNonMatchingUrl})).not.to.be.ok;
  });

  it(`should not match cross-origin requests when using a path starting with '/'`, function() {
    const crossOriginUrl = new URL(path, crossOrigin);
    const route = new ExpressRoute({handler, path});

    expect(route.match({url: crossOriginUrl})).not.to.be.ok;
  });

  it(`should match cross-origin requests when using a path starting with 'https://'`, function() {
    const crossOriginUrl = new URL(path, crossOrigin);
    const route = new ExpressRoute({handler, path: crossOriginUrl.href});

    expect(route.match({url: crossOriginUrl})).to.be.ok;
  });

  it(`should only match same-origin requests when using the wildcard path '/(.*)'`, function() {
    const crossOriginUrl = new URL(path, crossOrigin);
    const sameOriginUrl = new URL(path, location);
    const route = new ExpressRoute({handler, path: '/(.*)'});

    expect(route.match({url: sameOriginUrl})).to.be.ok;
    expect(route.match({url: crossOriginUrl})).not.to.be.ok;
  });

  it(`should only match cross-origin requests when using a path starting with 'https://' and the wildcard path '/(.*)'`, function() {
    const crossOriginUrl = new URL(path, crossOrigin);
    const sameOriginUrl = new URL(path, location);
    const route = new ExpressRoute({handler, path: `${crossOrigin}/(.*)`});

    expect(route.match({url: sameOriginUrl})).not.to.be.ok;
    expect(route.match({url: crossOriginUrl})).to.be.ok;
  });
});

/* eslint-disable no-console */

/**
 * A simple helper to manage the print of a set of logs
 */
class LogGroup {
  /**
   * @param {object} input
   */
  constructor() {
    this._logs = [];
    this._childGroups = [];

    this._isFallbackMode = false;
    const ffRegex = /Firefox\/(\d*)\.\d*/.exec(navigator.userAgent);
    if (ffRegex) {
      try {
        const ffVersion = parseInt(ffRegex[1], 10);
        if (ffVersion < 55) {
          this._isFallbackMode = true;
        }
      } catch (err) {
        this._isFallbackMode = true;
      }
    }

    if (/Edge\/\d*\.\d*/.exec(navigator.userAgent)) {
      this._isFallbackMode = true;
    }
  }

  /**
   *@param {object} logDetails
   */
  addPrimaryLog(logDetails) {
    this._primaryLog = logDetails;
  }

  /**
   *@param {object} logDetails
   */
  addLog(logDetails) {
    this._logs.push(logDetails);
  }

  /**
   * @param {object} group
   */
  addChildGroup(group) {
    if (group._logs.length === 0) {
      return;
    }

    this._childGroups.push(group);
  }

  /**
   * prints out this log group to the console.
   */
  print() {
    if (this._logs.length === 0 && this._childGroups.length === 0) {
      this._printLogDetails(this._primaryLog);
      return;
    }

    if (this._primaryLog) {
      if (!this._isFallbackMode) {
        console.groupCollapsed(...this._getLogContent(this._primaryLog));
      } else {
        this._printLogDetails(this._primaryLog);
      }
    }

    this._logs.forEach((logDetails) => {
      this._printLogDetails(logDetails);
    });

    this._childGroups.forEach((group) => {
      group.print();
    });

    if (this._primaryLog && !this._isFallbackMode) {
      console.groupEnd();
    }
  }

  /**
   * Prints the specific logDetails object.
   * @param {object} logDetails
   */
  _printLogDetails(logDetails) {
    const logFunc = logDetails.logFunc ? logDetails.logFunc : console.log;
    logFunc(...this._getLogContent(logDetails));
  }

  /**
   * Returns a flattened array of message with colors and args.
   * @param {object} logDetails
   * @return {Array} Returns an array of arguments to pass to a console
   * function.
   */
  _getLogContent(logDetails) {
    let message = logDetails.message;
    if (this._isFallbackMode && typeof message === 'string') {
      // Replace the %c value with an empty string.
      message = message.replace(/%c/g, '');
    }

    let allArguments = [message];

    if (!this._isFallbackMode && logDetails.colors) {
      allArguments = allArguments.concat(logDetails.colors);
    }

    if (logDetails.args) {
      allArguments = allArguments.concat(logDetails.args);
    }
    return allArguments;
  }
}

/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

/**
 * @private
 * @return {boolean} True, if we're running in the service worker global scope.
 * False otherwise.
 */


/**
 * @private
 * @return {boolean} True, if we're running a development bundle.
 * False otherwise.
 */
function isDevBuild() {
  // `BUILD_PROCESS_REPLACE::BUILD_TARGET` is replaced during the build process.
  return `BUILD_PROCESS_REPLACE::BUILD_TARGET` === `dev`;
}

/**
 * @private
 * @return {boolean} True, if we're running on localhost or the equivalent IP
 * address. False otherwise.
 */

/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

/* eslint-disable no-console */

self.workbox = self.workbox || {};
self.workbox.LOG_LEVEL = self.workbox.LOG_LEVEL || {
  none: -1,
  verbose: 0,
  debug: 1,
  warn: 2,
  error: 3,
};

const LIGHT_GREY = `#bdc3c7`;
const DARK_GREY = `#7f8c8d`;
const LIGHT_GREEN = `#2ecc71`;
const LIGHT_YELLOW = `#f1c40f`;
const LIGHT_RED = `#e74c3c`;
const LIGHT_BLUE = `#3498db`;

/**
 * A class that will only log given the current log level
 * defined by the developer.
 *
 * Define custom log level by setting `self.workbox.logLevel`.
 *
 * @example
 *
 * self.workbox.logLevel = self.workbox.LOG_LEVEL.verbose;
 *
 * @private
 */
class LogHelper {
  /**
   * LogHelper constructor.
   */
  constructor() {
    this._defaultLogLevel = isDevBuild() ?
      self.workbox.LOG_LEVEL.debug :
      self.workbox.LOG_LEVEL.warn;
  }

  /**
   * The most verbose log level.
   *
   * @param {Object} options The options of the log.
   */
  log(options) {
    this._printMessage(self.workbox.LOG_LEVEL.verbose, options);
  }

  /**
   * Useful for logs that are more exceptional that log()
   * but not severe.
   *
   * @param {Object} options The options of the log.
   */
  debug(options) {
    this._printMessage(self.workbox.LOG_LEVEL.debug, options);
  }

  /**
   * Warning messages.
   *
   * @param {Object} options The options of the log.
   */
  warn(options) {
    this._printMessage(self.workbox.LOG_LEVEL.warn, options);
  }

  /**
   * Error logs.
   *
   * @param {Object} options The options of the log.
   */
  error(options) {
    this._printMessage(self.workbox.LOG_LEVEL.error, options);
  }

  /**
   * Method to print to the console.
   * @param {number} logLevel
   * @param {Object} logOptions
   */
  _printMessage(logLevel, logOptions) {
    if (!this._shouldLogMessage(logLevel, logOptions)) {
      return;
    }

    const logGroups = this._getAllLogGroups(logLevel, logOptions);
    logGroups.print();
  }

  /**
   * Print a user friendly log to the console.
   * @param  {numer} logLevel A number from self.workbox.LOG_LEVEL
   * @param  {Object} logOptions Arguments to print to the console
   * @return {LogGroup} Returns a log group to print to the console.
   */
  _getAllLogGroups(logLevel, logOptions) {
    const topLogGroup = new LogGroup();

    const primaryMessage = this._getPrimaryMessageDetails(logLevel, logOptions);
    topLogGroup.addPrimaryLog(primaryMessage);

    if (logOptions.error) {
      const errorMessage = {
        message: logOptions.error,
        logFunc: console.error,
      };
      topLogGroup.addLog(errorMessage);
    }

    const extraInfoGroup = new LogGroup();
    if (logOptions.that && logOptions.that.constructor &&
      logOptions.that.constructor.name) {
      const className = logOptions.that.constructor.name;
      extraInfoGroup.addLog(
        this._getKeyValueDetails('class', className)
      );
    }

    if (logOptions.data) {
      if (typeof logOptions.data === 'object' &&
        !(logOptions.data instanceof Array)) {
        Object.keys(logOptions.data).forEach((keyName) => {
          extraInfoGroup.addLog(
            this._getKeyValueDetails(keyName, logOptions.data[keyName])
          );
        });
      } else {
        extraInfoGroup.addLog(
          this._getKeyValueDetails('additionalData', logOptions.data)
        );
      }
    }

    topLogGroup.addChildGroup(extraInfoGroup);

    return topLogGroup;
  }

  /**
   * This is a helper function to wrap key value pairss to a colored key
   * value string.
   * @param  {string} key
   * @param  {string} value
   * @return {Object} The object containing a message, color and Arguments
   * for the console.
   */
  _getKeyValueDetails(key, value) {
    return {
      message: `%c${key}: `,
      colors: [`color: ${LIGHT_BLUE}`],
      args: value,
    };
  }

  /**
   * Helper method to color the primary message for the log
   * @param  {number} logLevel   One of self.workbox.LOG_LEVEL
   * @param  {Object} logOptions Arguments to print to the console
   * @return {Object} Object containing the message and color info to print.
   */
  _getPrimaryMessageDetails(logLevel, logOptions) {
    let logLevelName;
    let logLevelColor;
    switch (logLevel) {
      case self.workbox.LOG_LEVEL.verbose:
        logLevelName = 'Info';
        logLevelColor = LIGHT_GREY;
        break;
      case self.workbox.LOG_LEVEL.debug:
        logLevelName = 'Debug';
        logLevelColor = LIGHT_GREEN;
        break;
      case self.workbox.LOG_LEVEL.warn:
        logLevelName = 'Warn';
        logLevelColor = LIGHT_YELLOW;
        break;
      case self.workbox.LOG_LEVEL.error:
        logLevelName = 'Error';
        logLevelColor = LIGHT_RED;
        break;
    }

    let primaryLogMessage = `%c🔧 %c[${logLevelName}]`;
    const primaryLogColors = [
      `color: ${LIGHT_GREY}`,
      `color: ${logLevelColor}`,
    ];

    let message;
    if (typeof logOptions === 'string') {
      message = logOptions;
    } else if (logOptions.message) {
      message = logOptions.message;
    }

    if (message) {
      message = message.replace(/\s+/g, ' ');
      primaryLogMessage += `%c ${message}`;
      primaryLogColors.push(`color: ${DARK_GREY}; font-weight: normal`);
    }

    return {
      message: primaryLogMessage,
      colors: primaryLogColors,
    };
  }

  /**
   * Test if the message should actually be logged.
   * @param {number} logLevel The level of the current log to be printed.
   * @param {Object|String} logOptions The options to log.
   * @return {boolean} Returns true of the message should be printed.
   */
  _shouldLogMessage(logLevel, logOptions) {
    if (!logOptions) {
      return false;
    }

    let minValidLogLevel = this._defaultLogLevel;
    if (self && self.workbox && typeof self.workbox.logLevel === 'number') {
      minValidLogLevel = self.workbox.logLevel;
    }

    if (minValidLogLevel === self.workbox.LOG_LEVEL.none ||
      logLevel < minValidLogLevel) {
      return false;
    }

    return true;
  }
}

var logHelper = new LogHelper();

/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

/**
 * NavigationRoute is a helper class to create a [Route]{@link
 * module:workbox-routing.Route} that matches for browser navigation requests,
 * i.e. requests for HTML pages.
 *
 * It will only match incoming requests whose [`mode`](https://fetch.spec.whatwg.org/#concept-request-mode)
 * is set to `navigate`.
 *
 * You can optionally only apply this route to a subset of navigation requests
 * by using one or both of the `blacklist` and `whitelist` parameters. If
 * both lists are provided, and there's a navigation to a URL which matches
 * both, then the blacklist will take precedence and the request will not be
 * matched by this route. The regular expressions in `whitelist` and `blacklist`
 * are matched against the concatenated
 * [`pathname`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils/pathname)
 * and [`search`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils/search)
 * portions of the requested URL.
 *
 * To match all navigations, use a `whitelist` array containing a RegExp that
 * matches everything, i.e. `[/./]`.
 *
 * @memberof module:workbox-routing
 * @extends Route
 *
 * @example
 * // Any navigation requests that match the whitelist (i.e. URLs whose path
 * // starts with /article/) will be handled with the cache entry for
 * // app-shell.html.
 * const route = new workbox.routing.NavigationRoute({
 *   whitelist: [new RegExp('^/article/')],
 *   handler: {handle: () => caches.match('app-shell.html')},
 * });
 *
 * const router = new workbox.routing.Router();
 * router.registerRoute({route});
 */
class NavigationRoute extends Route {
  /**
   * Constructor for NavigationRoute.
   *
   * @param {Object} input
   * @param {Array<RegExp>} input.whitelist If any of these patterns match,
   * the route will handle the request (assuming the blacklist doesn't match).
   * @param {Array<RegExp>} [input.blacklist] If any of these patterns match,
   * the route will not handle the request (even if a whitelist entry matches).
   * @param {function|module:workbox-runtime-caching.Handler} input.handler The
   * handler to use to provide a response if the route matches.
   *
   * If you wish to use a callback function [see handlerCallback]{@link
   *   module:workbox-routing.Route~handlerCallback} for the callback
   * definition.
   */
  constructor({whitelist, blacklist, handler} = {}) {
    isArrayOfClass({whitelist}, RegExp);
    if (blacklist) {
      isArrayOfClass({blacklist}, RegExp);
    } else {
      blacklist = [];
    }

    const match = ({event, url}) => {
      let matched = false;
      let message;

      if (event.request.mode === 'navigate') {
        const pathnameAndSearch = url.pathname + url.search;
        if (whitelist.some((regExp) => regExp.test(pathnameAndSearch))) {
          if (blacklist.some((regExp) => regExp.test(pathnameAndSearch))) {
            message = `The navigation route is not being used, since the ` +
              `request URL matches both the whitelist and blacklist.`;
          } else {
            message = `The navigation route is being used.`;
            matched = true;
          }
        } else {
          message = `The navigation route is not being used, since the ` +
            `URL being navigated to doesn't match the whitelist.`;
        }

        logHelper.debug({
          that: this,
          message,
          data: {'request-url': url.href, whitelist, blacklist, handler},
        });
      }

      return matched;
    };

    super({match, handler, method: 'GET'});
  }
}

/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

/**
 * RegExpRoute is a helper class to make defining regular expression based
 * [Routes]{@link module:workbox-routing.Route} easy.
 *
 * The matching for regular expressioned are slightly different between
 * same-origin requests and cross-origin requests.
 *
 * A common pattern is to use a regex pattern similar to `/styles/.*` to capture
 * all stylesheets on your site.
 *
 * If we used this on `https://workboxjs.org`,
 * this regular expression would match for the end of
 * <code>https://workboxjs.org<strong>/styles/main.css</strong></code>.
 *
 * However, it's unlikely that we'd intend for this to match against:
 * <code>https://third-party-origin.com<strong>/styles/example.css</strong></code>.
 *
 * To overcome this common issue, regular expressions will only match against
 * cross-origin requests if the regular expression matches from the start.
 *
 * For example, matching the cross-origin example, we could change the
 * regular expression to: `https://third-party-origin.com/styles/.*`, meaning
 * we would now match <code><strong>https://third-party-origin.com/styles/example.css</strong></code>.
 *
 * If you wish your regular expression to match both, you just need to ensure
 * you account for the full URL.
 *
 * @memberof module:workbox-routing
 * @extends Route
 *
 * @example
 * // Any requests that match the regular expression will match this route, with
 * // the capture groups passed along to the handler as an array via params.
 * const route = new workbox.routing.RegExpRoute({
 *   regExp: new RegExp('^https://example.com/path/to/(\\w+)'),
 *   handler: {
 *     handle: ({event, params}) => {
 *       // params[0], etc. will be set based on the regexp capture groups.
 *       // Do something that returns a Promise.<Response>, like:
 *       return caches.match(event.request);
 *     },
 *   },
 * });
 *
 * const router = new workbox.routing.Router();
 * router.registerRoute({route});
 */
class RegExpRoute extends Route {
  /**
   * Constructor for RegExpRoute.
   *
   * @param {Object} input
   * @param {RegExp} input.regExp The regular expression to match against URLs.
   * If the `RegExp` contains [capture groups](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp#grouping-back-references),
   * then the array of captured values will be passed to the `handler` as
   * `params`.
   * @param {function|module:workbox-runtime-caching.Handler} input.handler The
   * handler to use to provide a response if the route matches.
   *
   * If you wish to use a callback function [see handlerCallback]{@link
   *   module:workbox-routing.Route~handlerCallback} for the callback
   * definition.
   * @param {string} [input.method] Only match requests that use this
   * HTTP method. Defaults to `'GET'` if not specified.
   */
  constructor({regExp, handler, method}) {
    isInstance({regExp}, RegExp);

    const match = ({url}) => {
      const result = regExp.exec(url.href);

      // Return null immediately if this route doesn't match.
      if (!result) {
        return null;
      }

      // If this is a cross-origin request, then confirm that the match included
      // the start of the URL. This means that regular expressions like
      // /styles.+/ will only match same-origin requests.
      // See https://github.com/GoogleChrome/workbox/issues/281#issuecomment-285130355
      if ((url.origin !== location.origin) && (result.index !== 0)) {
        logHelper.debug({
          that: this,
          message: `Skipping route, because the RegExp match didn't occur ` +
            `at the start of the URL.`,
          data: {url: url.href, regExp},
        });

        return null;
      }

      // If the route matches, but there aren't any capture groups defined, then
      // this will return [], which is truthy and therefore sufficient to
      // indicate a match.
      // If there are capture groups, then it will return their values.
      return result.slice(1);
    };

    super({match, handler, method});
  }
}

/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

/**
 * The Router takes one or more [Routes]{@link Route} and allows you to apply
 * that routing logic to determine the appropriate way of handling requests
 * inside of a service worker.
 *
 * It also allows you to define a "default" handler that applies to any requests
 * that don't explicitly match a `Route`, and a "catch" handler that responds
 * to any requests that throw an exception while being routed.
 *
 * You can use the `handleRequest()` method to pass a `FetchEvent` through the
 * router and ultimately get a "routed response" back.
 * If you'd like this to be handled automatically for you, calling
 * `addFetchListener()` will cause the `Router` to respond to `fetch` events.
 *
 * If a request matches multiple routes, precedence will be given to the 
 * last-registered route.
 *
 * @memberof module:workbox-routing
 *
 * @example
 * // The following example sets up two routes, one to match requests with
 * // "assets" in their URL, and the other for requests with "images", along
 * // different runtime caching handlers for each.
 * // Both the routes are registered with the router, and any requests that
 * // don't match either route will be handled using the default NetworkFirst
 * // strategy.
 * // "If a request matches both routes, the last route will be used to handle 
 * // the request, in this case, the "images" handler would take precedence.
 * const assetRoute = new RegExpRoute({
 *   regExp: /assets/,
 *   handler: new workbox.runtimeCaching.StaleWhileRevalidate(),
 * });
 * const imageRoute = new RegExpRoute({
 *   regExp: /images/,
 *   handler: new workbox.runtimeCaching.CacheFirst(),
 * });
 *
 * const router = new workbox.routing.Router();
 * router.addFetchListener();
 * router.registerRoutes({routes: [assetRoute, imageRoute]});
 * router.setDefaultHandler({
 *   handler: new workbox.runtimeCaching.NetworkFirst(),
 * });
 */
class Router {
  /**
   * Constructs a new `Router` instance, without any registered routes.
   */
  constructor() {
    // _routes will contain a mapping of HTTP method name ('GET', etc.) to an
    // array of all the corresponding Route instances that are registered.
    this._routes = new Map();
    this._isListenerRegistered = false;
  }

  /**
   * This will register a `fetch` event listener on your behalf which will check
   * the incoming request to see if there's a matching route, and only respond
   * if there is a match.
   *
   * @example
   * const imageRoute = new RegExpRoute({
   *   regExp: /images/,
   *   handler: new CacheFirst(),
   * });
   *
   * const router = new Router();
   * router.registerRoute({route: imageRoute});
   * router.addFetchListener();
   *
   * @return {boolean} Returns `true` if this is the first time the method is
   * called and the listener was registered. Returns `false` if called again,
   * as the listener will only be registered once.
   */
  addFetchListener() {
    if (!this._isListenerRegistered) {
      this._isListenerRegistered = true;
      self.addEventListener('fetch', (event) => {
        const responsePromise = this.handleRequest({event});
        if (responsePromise) {
          event.respondWith(responsePromise);
        }
      });
      return true;
    } else {
      logHelper.warn({
        that: this,
        message: `addFetchListener() has already been called for this Router.`,
      });
      return false;
    }
  }

  /**
   * This can be used to apply the routing rules to generate a response for a
   * given request inside your own `fetch` event handler.
   *
   * @example
   * const imageRoute = new RegExpRoute({
   *   regExp: /images/,
   *   handler: new CacheFirst(),
   * });
   *
   * const router = new Router();
   * router.registerRoute({route: imageRoute});
   *
   * self.addEventListener('fetch', (event) => {
   *   event.waitUntil((async () => {
   *     let response = await router.handleRequest({event});
   *     // Do something with response, and then eventually respond with it.
   *     event.respondWith(response);
   *   })());
   * });
   *
   * @param {Object} input
   * @param {FetchEvent} input.event The event passed in to a `fetch` handler.
   * @return {Promise<Response>|undefined} Returns a promise for a response,
   * taking the registered routes into account. If there was no matching route
   * and there's no `defaultHandler`, then returns undefined.
   */
  handleRequest({event}) {
    isInstance({event}, FetchEvent);
    const url = new URL(event.request.url);
    if (!url.protocol.startsWith('http')) {
      logHelper.log({
        that: this,
        message: `The URL does not start with HTTP, so it can't be handled.`,
        data: {
          request: event.request,
        },
      });
      return;
    }

    let {handler, params} = this._findHandlerAndParams({event, url});

    // If we don't have a handler because there was no matching route, then
    // fall back to defaultHandler if that's defined.
    if (!handler && this.defaultHandler) {
      handler = this.defaultHandler;
    }

    if (handler) {
      let responsePromise = handler.handle({url, event, params});
      if (this.catchHandler) {
        responsePromise = responsePromise.catch((error) => {
          return this.catchHandler.handle({url, event, error});
        });
      }
      return responsePromise;
    }
  }

  /**
   * Checks the incoming event.request against the registered routes, and if
   * there's a match, returns the corresponding handler along with any params
   * generated by the match.
   *
   * @param {FetchEvent} input.event
   * @param {URL} input.url
   * @return {Object} Returns an object with `handler` and `params` properties.
   * They are populated if a matching route was found or `undefined` otherwise.
   * @private
   */
  _findHandlerAndParams({event, url}) {
    const routes = this._routes.get(event.request.method) || [];
    for (const route of routes) {
      let matchResult = route.match({url, event});
      if (matchResult) {
        logHelper.log({
          that: this,
          message: 'The router found a matching route.',
          data: {
            route,
            request: event.request,
          },
        });

        if (Array.isArray(matchResult) && matchResult.length === 0) {
          // Instead of passing an empty array in as params, use undefined.
          matchResult = undefined;
        } else if (matchResult.constructor === Object &&
          Object.keys(matchResult).length === 0) {
          // Instead of passing an empty object in as params, use undefined.
          matchResult = undefined;
        }

        // Break out of the loop and return the appropriate values as soon as
        // we have a match.
        return {
          params: matchResult,
          handler: route.handler,
        };
      }
    }

    // If we didn't have a match, then return undefined values.
    return {handler: undefined, params: undefined};
  }

  /**
   * An optional `handler` that's called by default when no routes
   * explicitly match the incoming request.
   *
   * If the default is not provided, unmatched requests will go against the
   * network as if there were no service worker present.
   *
   * @example
   * router.setDefaultHandler({
   *   handler: new workbox.runtimeCaching.NetworkFirst()
   * });
   *
   * @param {Object} input
   * @param {function|module:workbox-runtime-caching.Handler} input.handler
   * This parameter can be either a function or an object which is a subclass
   * of `Handler`.
   *
   * Either option should result in a `Response` that the `Route` can use to
   * handle the `fetch` event.
   *
   * See [handlerCallback]{@link module:workbox-routing.Route~handlerCallback}
   * for full details on using a callback function as the `handler`.
   */
  setDefaultHandler({handler} = {}) {
    this.defaultHandler = normalizeHandler(handler);
  }

  /**
   * If a Route throws an error while handling a request, this `handler`
   * will be called and given a chance to provide a response.
   *
   * @example
   * router.setCatchHandler(({event}) => {
   *   if (event.request.mode === 'navigate') {
   *     return caches.match('/error-page.html');
   *   }
   *   return Response.error();
   * });
   *
   * @param {Object} input
   * @param {function|module:workbox-runtime-caching.Handler} input.handler
   * This parameter can be either a function or an object which is a subclass
   * of `Handler`.
   *
   * Either option should result in a `Response` that the `Route` can use to
   * handle the `fetch` event.
   *
   * See [handlerCallback]{@link module:workbox-routing.Route~handlerCallback}
   * for full details on using a callback function as the `handler`.
   */
  setCatchHandler({handler} = {}) {
    this.catchHandler = normalizeHandler(handler);
  }

  /**
   * Registers an array of routes with the router.
   *
   * @example
   * router.registerRoutes({
   *   routes: [
   *     new RegExpRoute({ ... }),
   *     new ExpressRoute({ ... }),
   *     new Route({ ... }),
   *   ]
   * });
   *
   * @param {Object} input
   * @param {Array<module:workbox-routing.Route>} input.routes An array of
   * routes to register.
   */
  registerRoutes({routes} = {}) {
    isArrayOfClass({routes}, Route);

    for (let route of routes) {
      if (!this._routes.has(route.method)) {
        this._routes.set(route.method, []);
      }

      // Give precedence to the most recent route by listing it first.
      this._routes.get(route.method).unshift(route);
    }
  }

  /**
   * Registers a single route with the router.
   *
   * @example
   * router.registerRoute({
   *   route: new Route({ ... })
   * });
   *
   * @param {Object} input
   * @param {module:workbox-routing.Route} input.route The route to register.
   */
  registerRoute({route} = {}) {
    isInstance({route}, Route);

    this.registerRoutes({routes: [route]});
  }

  /**
   * Unregisters an array of routes with the router.
   *
   * @example
   * const firstRoute = new RegExpRoute({ ... });
   * const secondRoute = new RegExpRoute({ ... });
   * router.registerRoutes({routes: [firstRoute, secondRoute]});
   *
   * // Later, if you no longer want the routes to be used:
   * router.unregisterRoutes({routes: [firstRoute, secondRoute]});
   *
   * @param {Object} input
   * @param {Array<module:workbox-routing.Route>} input.routes An array of
   * routes to unregister.
   */
  unregisterRoutes({routes} = {}) {
    isArrayOfClass({routes}, Route);

    for (let route of routes) {
      if (!this._routes.has(route.method)) {
        logHelper.error({
          that: this,
          message: `Can't unregister route; there are no ${route.method}
            routes registered.`,
          data: {route},
        });
      }

      const routeIndex = this._routes.get(route.method).indexOf(route);
      if (routeIndex > -1) {
        this._routes.get(route.method).splice(routeIndex, 1);
      } else {
        logHelper.error({
          that: this,
          message: `Can't unregister route; the route wasn't previously
            registered.`,
          data: {route},
        });
      }
    }
  }

  /**
   * Unregisters a single route with the router.
   *
   * @example
   * const route = new RegExpRoute({ ... });
   * router.registerRoute({route});
   *
   * // Later, if you no longer want the route to be used:
   * router.unregisterRoute({route});
   *
   * @param {Object} input
   * @param {module:workbox-routing.Route} input.route The route to unregister.
   */
  unregisterRoute({route} = {}) {
    isInstance({route}, Route);

    this.unregisterRoutes({routes: [route]});
  }
}

/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

/**
 * # workbox-routing
 *
 * It's common in service workers to want to assign specific behaviors and logic
 * to a subset of requests that are received via the `fetch()` event.
 *
 * This library makes it easy to route requests to "handlers", which can be
 * existing behaviors from Workbox or functions for custom handling of a
 * request.
 *
 * @module workbox-routing
 */




var namespace = Object.freeze({
	ExpressRoute: ExpressRoute,
	NavigationRoute: NavigationRoute,
	RegExpRoute: RegExpRoute,
	Route: Route,
	Router: Router
});

/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

/* eslint-env mocha, browser */

const exportedSymbols = [
  'ExpressRoute',
  'NavigationRoute',
  'RegExpRoute',
  'Route',
  'Router',
];

describe(`Test Library Surface`, function() {
  exportedSymbols.forEach((exportedSymbol) => {
    it(`should expose ${exportedSymbol} publicly`, function() {
      expect(namespace[exportedSymbol]).to.exist;
    });
  });
});

/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

/* eslint-env mocha, browser */

describe(`Test of the NavigationRoute class`, function() {
  const path = '/test/path';
  const whitelist = [new RegExp(path)];
  const blacklist = [new RegExp(path)];
  const handler = {handle: () => {}};
  const event = {request: {mode: 'navigate'}};

  const invalidHandler = {};
  const invalidBlacklist = 'invalid';
  const invalidWhitelist = 'invalid';
  const invalidEvent = {request: {mode: 'cors'}};

  it(`should throw when NavigationRoute() is called without any parameters`, function() {
    expect(() => {
      new NavigationRoute();
    }).to.throw().with.property('name', 'assertion-failed');
  });

  it(`should throw when NavigationRoute() is called without a valid whitelist`, function() {
    expect(() => {
      new NavigationRoute({whitelist: invalidWhitelist});
    }).to.throw().with.property('name', 'assertion-failed');
  });

  it(`should throw when NavigationRoute() is called without a valid handler`, function() {
    expect(() => {
      new NavigationRoute({whitelist});
    }).to.throw().with.property('name', 'assertion-failed');
    expect(() => {
      new NavigationRoute({whitelist, handler: invalidHandler});
    }).to.throw().with.property('name', 'assertion-failed');
  });

  it(`should throw when NavigationRoute() is called with an invalid blacklist`, function() {
    expect(() => {
      new NavigationRoute({whitelist, handler, blacklist: invalidBlacklist});
    }).to.throw().with.property('name', 'assertion-failed');
  });

  it(`should not throw when NavigationRoute() is called with valid whitelist and handler parameters`, function() {
    expect(() => new NavigationRoute({handler, whitelist})).not.to.throw();
  });

  it(`should match navigation requests for URLs that are in the whitelist`, function() {
    const url = new URL(path, location);
    const route = new NavigationRoute({handler, whitelist});
    expect(route.match({event, url})).to.be.ok;
  });

  it(`should match navigation requests for URLs whose search portion is in the whitelist`, function() {
    const url = new URL('/willnotmatch', location);
    const urlSearchValue = 'willmatch';
    url.search = urlSearchValue;
    const route = new NavigationRoute({handler, whitelist: [
      new RegExp(`${urlSearchValue}$`),
    ]});
    expect(route.match({event, url})).to.be.ok;
  });

  it(`should not match navigation requests for URLs that are in both the whitelist and the blacklist`, function() {
    const url = new URL(path, location);
    const route = new NavigationRoute({handler, whitelist, blacklist});
    expect(route.match({event, url})).to.not.be.ok;
  });

  it(`should not match navigation requests for URLs that are not in the whitelist`, function() {
    const url = new URL('/does/not/match', location);
    const route = new NavigationRoute({handler, whitelist});
    expect(route.match({event, url})).to.not.be.ok;
  });

  it(`should not match non-navigation requests for URLs that are in the whitelist`, function() {
    const url = new URL(path, location);
    const route = new NavigationRoute({handler, whitelist});
    expect(route.match({event: invalidEvent, url})).to.not.be.ok;
  });
});

/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

/* eslint-env mocha, browser */

describe(`Test of the RegExpRoute class`, function() {
  const crossOrigin = 'https://cross-origin.example.com';
  const path = '/test/path';
  const regExp = new RegExp(path);
  const handler = {
    handle: () => {},
  };
  const invalidHandler = {};

  it(`should throw when RegExpRoute() is called without any parameters`, function() {
    expect(() => new RegExpRoute()).to.throw();
  });

  it(`should throw when RegExpRoute() is called without a valid handler`, function() {
    expect(() => new RegExpRoute({path})).to.throw();
    expect(() => new RegExpRoute({path, handler: invalidHandler})).to.throw();
  });

  it(`should throw when RegExpRoute() is called without a valid regExp`, function() {
    expect(() => new RegExpRoute({handler})).to.throw();
  });

  it(`should not throw when RegExpRoute() is called with valid handler and regExp parameters`, function() {
    expect(() => new RegExpRoute({handler, regExp})).not.to.throw();
  });

  it(`should properly match URLs`, function() {
    const matchingUrl = new URL(path, location);
    const nonMatchingUrl = new URL('/does/not/match', location);
    const crossOriginUrl = new URL(path, crossOrigin);

    const route = new RegExpRoute({handler, regExp});
    expect(route.match({url: matchingUrl})).to.be.ok;
    expect(route.match({url: nonMatchingUrl})).not.to.be.ok;
    // This route will not match because while the RegExp matches, the match
    // doesn't occur at the start of the cross-origin URL.
    expect(route.match({url: crossOriginUrl})).not.to.be.ok;
  });

  it(`should properly match cross-origin URLs with wildcards`, function() {
    const matchingUrl = new URL('https://fonts.googleapis.com/icon?family=Material+Icons');
    const matchingUrl2 = new URL('https://code.getmdl.io/1.2.1/material.indigo-pink.min.css');

    const route = new RegExpRoute({
      handler,
      regExp: /.*\.(?:googleapis|getmdl)\.(?:com|io)\/.*/,
    });
    expect(route.match({url: matchingUrl})).to.be.ok;
    expect(route.match({url: matchingUrl2})).to.be.ok;
  });

  it(`should properly match cross-origin URLs without wildcards`, function() {
    const matchingUrl = new URL(path, crossOrigin);
    const nonMatchingUrl = new URL('/does/not/match', crossOrigin);
    const crossOriginRegExp = new RegExp(crossOrigin + path);

    const route = new RegExpRoute({handler, regExp: crossOriginRegExp});
    expect(route.match({url: matchingUrl})).to.be.ok;
    expect(route.match({url: nonMatchingUrl})).not.to.be.ok;
  });

  it(`should properly match URLs with capture groups`, function() {
    const value1 = 'value1';
    const value2 = 'value2';

    const captureGroupRegExp = new RegExp('/(\\w+)/dummy/(\\w+)');
    const captureGroupMatchingUrl = new URL(`/${value1}/dummy/${value2}`, location);
    const captureGroupNonMatchingUrl = new URL(`/${value1}/${value2}`, location);

    const route = new RegExpRoute({
      handler, regExp: captureGroupRegExp,
    });

    const match = route.match({url: captureGroupMatchingUrl});
    expect(match.length).to.equal(2);
    expect(match[0]).to.equal(value1);
    expect(match[1]).to.equal(value2);

    expect(route.match({url: captureGroupNonMatchingUrl})).not.to.be.ok;
  });
});

/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

/* eslint-env mocha, browser */

describe(`Test of the Route class`, function() {
  const match = () => {};
  const handler = {
    handle: () => {},
  };
  const functionHandler = () => {};
  const method = 'GET';

  const invalidHandler = {};
  const invalidMethod = 'INVALID';

  it(`should throw when Route() is called without any parameters`, function() {
    expect(() => new Route()).to.throw();
  });

  it(`should throw when Route() is called without a valid handler`, function() {
    expect(() => new Route({match})).to.throw();
    expect(() => new Route({match, handler: invalidHandler})).to.throw();
  });

  it(`should throw when Route() is called without a valid match`, function() {
    expect(() => new Route({handler})).to.throw();
  });

  it(`should not throw when Route() is called with valid handler.handle and match parameters`, function() {
    expect(() => new Route({handler, match})).not.to.throw();
  });

  it(`should not throw when Route() is called with a valid function handler and match parameters`, function() {
    expect(() => new Route({handler: functionHandler, match})).not.to.throw();
  });

  it(`should throw when Route() is called with an invalid method`, function() {
    expect(() => new Route({handler, match, method: invalidMethod})).to.throw();
  });

  it(`should use the method provided when Route() is called with a valid method`, function() {
    const route = new Route({handler, match, method});
    expect(route.method).to.equal(method);
  });

  it(`should use a default of GET when Route() is called without a method`, function() {
    const route = new Route({handler, match});
    expect(route.method).to.equal('GET');
  });
});

/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

/* eslint-env mocha, browser */

describe(`Test of the Router class`, function() {
  const MATCH = () => {};
  const HANDLER = () => {};

  let globalStubs = [];
  afterEach(function() {
    globalStubs.forEach((stub) => stub.restore());
    globalStubs = [];
  });

  it(`should modify the internal arrays of routes when register/unregister is called`, function() {
    const router = new Router();

    // Routes without an explicit method will default to GET.
    const getRoute1 = new Route({match: MATCH, handler: HANDLER});
    const getRoute2 = new Route({match: MATCH, handler: HANDLER, method: 'GET'});
    const putRoute1 = new Route({match: MATCH, handler: HANDLER, method: 'PUT'});
    const putRoute2 = new Route({match: MATCH, handler: HANDLER, method: 'PUT'});

    router.registerRoute({route: getRoute1});
    router.registerRoutes({routes: [getRoute2, putRoute1, putRoute2]});

    expect(router._routes.get('GET')).to.have.members([getRoute1, getRoute2]);
    expect(router._routes.get('PUT')).to.have.members([putRoute1, putRoute2]);

    router.unregisterRoutes({routes: [getRoute2]});
    router.unregisterRoute({route: putRoute2});

    expect(router._routes.get('GET')).to.have.members([getRoute1]);
    expect(router._routes.get('PUT')).to.have.members([putRoute1]);
  });

  // addEventListener is defined on the EventTarget interface.
  // In order to properly stub out the method without triggering mocha's
  // global leak detection, we need to walk up the inheritance chain to
  // from ServiceWorkerGlobalScope to EventTarget.
  // See https://developer.mozilla.org/en-US/docs/Web/API/EventTarget
  it(`should call self.addEventListener('fetch') when addFetchListener() is called`, function() {
    const stub = sinon.stub(self.__proto__.__proto__.__proto__, 'addEventListener');
    globalStubs.push(stub);

    const router = new Router();
    router.addFetchListener();

    expect(stub.calledOnce).to.be.true;
    expect(stub.firstCall.args[0]).to.eql('fetch');
  });

  it(`should return false when addFetchListener() is called multiple times`, function() {
    const stub = sinon.stub(self.__proto__.__proto__.__proto__, 'addEventListener');
    globalStubs.push(stub);

    const router = new Router();
    const firstResponse = router.addFetchListener();
    expect(firstResponse).to.be.true;

    const secondResponse = router.addFetchListener();
    expect(secondResponse).to.be.false;
  });

  it(`should return a promise for the correct response when handleRequest() is called`, async function() {
    const expectedText = 'testing';
    const router = new Router();
    const route = new Route({
      match: () => true,
      handler: () => new Response(expectedText),
    });
    router.registerRoute({route});

    // route.match() always returns true, so the Request details don't matter.
    const event = new FetchEvent('fetch', {request: new Request('/')});
    const response = await router.handleRequest({event});
    const responseBody = await response.text();

    expect(responseBody).to.eql(expectedText);
  });
});

/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

/* eslint-env mocha, browser */

// This tests Express and RegExp routing side by side, to ensure consistent,
// expected behavior across the same set of URLs.

describe(`Express/RegExp Routing Suite`, function() {
  const crossOrigin = 'https://cross-origin.example.com/';
  const handler = () => {};

  const testCases = [{
    requestUrl: new URL(crossOrigin),
    regExp: '/',
    express: '/',
    shouldMatch: false,
    reason: `Cross-origin requests should not match when the match is not at the first character.`,
  }, {
    requestUrl: new URL(crossOrigin),
    regExp: crossOrigin,
    express: crossOrigin,
    shouldMatch: true,
    reason: `Cross-origin requests should match when the match is at the first character.`,
  }, {
    requestUrl: new URL('/', location.origin),
    regExp: '/',
    express: '/',
    shouldMatch: true,
    reason: `Same-origin requests only need to match on the pathname.`,
  }, {
    requestUrl: new URL('/', location.origin),
    regExp: crossOrigin,
    express: crossOrigin,
    shouldMatch: false,
    reason: `Requests should not match when the origins are different.`,
  }];

  for (let testCase of testCases) {
    it(testCase.reason, function() {
      const regExpRoute = new RegExpRoute({
        handler,
        regExp: new RegExp(testCase.regExp),
      });
      const expressRoute = new ExpressRoute({
        handler,
        path: testCase.express,
      });

      expect(Boolean(regExpRoute.match({url: testCase.requestUrl})))
        .to.equal(testCase.shouldMatch, 'RegExp Route');
      expect(Boolean(expressRoute.match({url: testCase.requestUrl})))
        .to.equal(testCase.shouldMatch, 'Express Route');
    });
  }
});
//# sourceMappingURL=sw-bundle.js.map
