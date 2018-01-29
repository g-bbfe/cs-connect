(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'lodash'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('lodash'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.lodash);
    global.metaProcessor = mod.exports;
  }
})(this, function (module, exports, _lodash) {
  'use strict';

  exports.__esModule = true;


  function metaProcessor(meta, response) {
    /*
     * @bugfix
     * @desc response 不一定是对象, 或为 Error , 或 status code 204  为 `undefined`
     */
    if ((0, _lodash.isObject)(response) && !(response instanceof Error)) {
      if (response.$meta) {
        console.warn('metaProcessor: $meta property has been used.');
      } else {
        response.$meta = meta;
      }
    }

    return response;
  }

  exports['default'] = metaProcessor;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tZXRhUHJvY2Vzc29yLmpzIl0sIm5hbWVzIjpbIm1ldGFQcm9jZXNzb3IiLCJtZXRhIiwicmVzcG9uc2UiLCJFcnJvciIsIiRtZXRhIiwiY29uc29sZSIsIndhcm4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLFdBQVNBLGFBQVQsQ0FBdUJDLElBQXZCLEVBQTZCQyxRQUE3QixFQUF1QztBQUNyQzs7OztBQUlBLFFBQUksc0JBQVNBLFFBQVQsS0FBc0IsRUFBRUEsb0JBQW9CQyxLQUF0QixDQUExQixFQUF3RDtBQUN0RCxVQUFJRCxTQUFTRSxLQUFiLEVBQW9CO0FBQ2xCQyxnQkFBUUMsSUFBUixDQUFhLDhDQUFiO0FBQ0QsT0FGRCxNQUVPO0FBQ0xKLGlCQUFTRSxLQUFULEdBQWlCSCxJQUFqQjtBQUNEO0FBQ0Y7O0FBRUQsV0FBT0MsUUFBUDtBQUNEOzt1QkFFY0YsYSIsImZpbGUiOiJtZXRhUHJvY2Vzc29yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaXNPYmplY3QgfSBmcm9tICdsb2Rhc2gnO1xuXG5mdW5jdGlvbiBtZXRhUHJvY2Vzc29yKG1ldGEsIHJlc3BvbnNlKSB7XG4gIC8qXG4gICAqIEBidWdmaXhcbiAgICogQGRlc2MgcmVzcG9uc2Ug5LiN5LiA5a6a5piv5a+56LGhLCDmiJbkuLogRXJyb3IgLCDmiJYgc3RhdHVzIGNvZGUgMjA0ICDkuLogYHVuZGVmaW5lZGBcbiAgICovXG4gIGlmIChpc09iamVjdChyZXNwb25zZSkgJiYgIShyZXNwb25zZSBpbnN0YW5jZW9mIEVycm9yKSkge1xuICAgIGlmIChyZXNwb25zZS4kbWV0YSkge1xuICAgICAgY29uc29sZS53YXJuKCdtZXRhUHJvY2Vzc29yOiAkbWV0YSBwcm9wZXJ0eSBoYXMgYmVlbiB1c2VkLicpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXNwb25zZS4kbWV0YSA9IG1ldGE7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3BvbnNlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBtZXRhUHJvY2Vzc29yO1xuIl19