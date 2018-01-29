(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/core-js/promise', 'lodash', './Session', './metaProcessor'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/core-js/promise'), require('lodash'), require('./Session'), require('./metaProcessor'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.classCallCheck, global.promise, global.lodash, global.Session, global.metaProcessor);
    global.ResourceAgent = mod.exports;
  }
})(this, function (module, exports, _classCallCheck2, _promise, _lodash, _Session, _metaProcessor2) {
  'use strict';

  exports.__esModule = true;

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _promise2 = _interopRequireDefault(_promise);

  var _Session2 = _interopRequireDefault(_Session);

  var _metaProcessor3 = _interopRequireDefault(_metaProcessor2);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _arguments = arguments;


  function promiseResolveReduce(initialArgument, functions) {
    return functions.reduce(function (promise, func) {
      return promise.then(func);
    }, _promise2['default'].resolve(initialArgument));
  }

  function safeTransfer(value) {
    if (value instanceof Error) {
      //@TODO ERROR要有协议的传输 否则ERROR存在被其他更改风险
      return value;
    }
    return (0, _lodash.cloneDeep)(value);
  }

  var ResourceAgent = function () {
    function ResourceAgent(resourceConfigs, processor) {
      var _this = this;

      (0, _classCallCheck3['default'])(this, ResourceAgent);
      this._requestInterceptors = [];
      this._responseInterceptors = [];
      this._session = null;
      this.resource = {};

      this._session = new _Session2['default']();
      resourceConfigs.forEach(function (resourceConfig) {
        _this.resource[resourceConfig.name] = _this.createResource(resourceConfig, processor);
      });
    }

    ResourceAgent.prototype.addRequestInterceptors = function addRequestInterceptors(interceptors) {
      if (interceptors) {
        var _requestInterceptors;

        (_requestInterceptors = this._requestInterceptors).push.apply(_requestInterceptors, [].concat(interceptors));
      }
    };

    ResourceAgent.prototype.addResponseInterceptors = function addResponseInterceptors(interceptors) {
      if (interceptors) {
        var _responseInterceptors;

        (_responseInterceptors = this._responseInterceptors).push.apply(_responseInterceptors, [].concat(interceptors));
      }
    };

    ResourceAgent.prototype.createResource = function createResource(resourceConfig, processor) {
      var requestInterceptors = this._requestInterceptors;
      var responseInterceptors = this._responseInterceptors;
      var session = this._session;
      var name = resourceConfig.name,
          path = resourceConfig.path,
          methods = resourceConfig.methods;


      return (0, _lodash.memoize)(function (params) {
        return new Proxy({}, {
          // Proxy handler.get
          get: function get(target, method, receiver) {
            if (methods.indexOf(method) == -1) {
              throw new Error('[ResourceProxy] Can\'t use "' + method + '" , #' + name + '# must allow ' + methods);
            }

            return function (payload) {
              var _metaProcessor = function _metaProcessor(data) {
                return data;
              };
              if (payload && payload.$meta) {
                var $meta = payload.$meta;

                delete payload.$meta;
                _metaProcessor = _metaProcessor3['default'].bind(null, $meta);
              }

              var options = {
                name: name,
                path: path,
                method: method,
                session: session,
                params: params || null,
                payload: payload || null
              };

              if (processor === null) {
                throw new Error('Can\'t find processor.');
              }

              var queue = [].concat(requestInterceptors, processor, safeTransfer, _metaProcessor, responseInterceptors);
              return promiseResolveReduce(options, queue);
            };
          }
        });
      });
    };

    return ResourceAgent;
  }();

  exports['default'] = ResourceAgent;


  var log = function log() {
    var args = Array.prototype.slice.apply(Array, _arguments);
    args.unshift('app-');
    console.log.apply(console, args);
  };
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9SZXNvdXJjZUFnZW50LmpzIl0sIm5hbWVzIjpbInByb21pc2VSZXNvbHZlUmVkdWNlIiwiaW5pdGlhbEFyZ3VtZW50IiwiZnVuY3Rpb25zIiwicmVkdWNlIiwicHJvbWlzZSIsImZ1bmMiLCJ0aGVuIiwicmVzb2x2ZSIsInNhZmVUcmFuc2ZlciIsInZhbHVlIiwiRXJyb3IiLCJSZXNvdXJjZUFnZW50IiwicmVzb3VyY2VDb25maWdzIiwicHJvY2Vzc29yIiwiX3JlcXVlc3RJbnRlcmNlcHRvcnMiLCJfcmVzcG9uc2VJbnRlcmNlcHRvcnMiLCJfc2Vzc2lvbiIsInJlc291cmNlIiwiZm9yRWFjaCIsInJlc291cmNlQ29uZmlnIiwibmFtZSIsImNyZWF0ZVJlc291cmNlIiwiYWRkUmVxdWVzdEludGVyY2VwdG9ycyIsImludGVyY2VwdG9ycyIsInB1c2giLCJjb25jYXQiLCJhZGRSZXNwb25zZUludGVyY2VwdG9ycyIsInJlcXVlc3RJbnRlcmNlcHRvcnMiLCJyZXNwb25zZUludGVyY2VwdG9ycyIsInNlc3Npb24iLCJwYXRoIiwibWV0aG9kcyIsInBhcmFtcyIsIlByb3h5IiwiZ2V0IiwidGFyZ2V0IiwibWV0aG9kIiwicmVjZWl2ZXIiLCJpbmRleE9mIiwicGF5bG9hZCIsIl9tZXRhUHJvY2Vzc29yIiwiZGF0YSIsIiRtZXRhIiwiYmluZCIsIm9wdGlvbnMiLCJxdWV1ZSIsImxvZyIsImFyZ3MiLCJBcnJheSIsInByb3RvdHlwZSIsInNsaWNlIiwiYXBwbHkiLCJ1bnNoaWZ0IiwiY29uc29sZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlBLFdBQVNBLG9CQUFULENBQThCQyxlQUE5QixFQUErQ0MsU0FBL0MsRUFBMEQ7QUFDeEQsV0FBT0EsVUFBVUMsTUFBVixDQUFpQixVQUFDQyxPQUFELEVBQVVDLElBQVYsRUFBbUI7QUFDekMsYUFBT0QsUUFBUUUsSUFBUixDQUFhRCxJQUFiLENBQVA7QUFD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QUExQyxFQUF3RGdDLGNBQXhELEVBQXdFWixvQkFBeEUsQ0FBWjtBQUNBLHFCQUFPNUIscUJBQXFCNEMsT0FBckIsRUFBOEJDLEtBQTlCLENBQVA7QUFDRCxhQXZCRDtBQXdCRDtBQS9Ca0IsU0FBZCxDQUFQO0FBaUNELE9BbENNLENBQVA7QUFtQ0QsSzs7Ozs7dUJBbEVrQmxDLGE7OztBQXFFckIsTUFBSW1DLE1BQU0sU0FBTkEsR0FBTSxHQUFJO0FBQ1osUUFBSUMsT0FBT0MsTUFBTUMsU0FBTixDQUFnQkMsS0FBaEIsQ0FBc0JDLEtBQXRCLENBQTRCSCxLQUE1QixhQUFYO0FBQ0FELFNBQUtLLE9BQUwsQ0FBYSxNQUFiO0FBQ0FDLFlBQVFQLEdBQVIsQ0FBWUssS0FBWixDQUFrQkUsT0FBbEIsRUFBMkJOLElBQTNCO0FBQ0QsR0FKRCIsImZpbGUiOiJSZXNvdXJjZUFnZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbWVtb2l6ZSAsIGNsb25lRGVlcCB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgU2Vzc2lvbiBmcm9tICcuL1Nlc3Npb24nO1xuaW1wb3J0IG1ldGFQcm9jZXNzb3IgZnJvbSAnLi9tZXRhUHJvY2Vzc29yJztcblxuZnVuY3Rpb24gcHJvbWlzZVJlc29sdmVSZWR1Y2UoaW5pdGlhbEFyZ3VtZW50LCBmdW5jdGlvbnMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9ucy5yZWR1Y2UoKHByb21pc2UsIGZ1bmMpID0+IHtcbiAgICByZXR1cm4gcHJvbWlzZS50aGVuKGZ1bmMpO1xuICB9LCBQcm9taXNlLnJlc29sdmUoaW5pdGlhbEFyZ3VtZW50KSk7XG59XG5cbmZ1bmN0aW9uIHNhZmVUcmFuc2Zlcih2YWx1ZSkge1xuICBpZih2YWx1ZSBpbnN0YW5jZW9mIEVycm9yKXtcbiAgICAvL0BUT0RPIEVSUk9S6KaB5pyJ5Y2P6K6u55qE5Lyg6L6TIOWQpuWImUVSUk9S5a2Y5Zyo6KKr5YW25LuW5pu05pS56aOO6ZmpXG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHJldHVybiBjbG9uZURlZXAodmFsdWUpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXNvdXJjZUFnZW50IHtcbiAgX3JlcXVlc3RJbnRlcmNlcHRvcnMgPSBbXTtcbiAgX3Jlc3BvbnNlSW50ZXJjZXB0b3JzID0gW107XG4gIF9zZXNzaW9uID0gbnVsbDtcbiAgcmVzb3VyY2UgPSB7fTtcblxuICBjb25zdHJ1Y3RvciAocmVzb3VyY2VDb25maWdzLCBwcm9jZXNzb3IpIHtcbiAgICB0aGlzLl9zZXNzaW9uID0gbmV3IFNlc3Npb24oKTtcbiAgICByZXNvdXJjZUNvbmZpZ3MuZm9yRWFjaChyZXNvdXJjZUNvbmZpZyA9PiB7XG4gICAgICB0aGlzLnJlc291cmNlW3Jlc291cmNlQ29uZmlnLm5hbWVdID0gdGhpcy5jcmVhdGVSZXNvdXJjZShyZXNvdXJjZUNvbmZpZywgcHJvY2Vzc29yKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFkZFJlcXVlc3RJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3JzKSB7XG4gICAgaWYgKGludGVyY2VwdG9ycykge1xuICAgICAgdGhpcy5fcmVxdWVzdEludGVyY2VwdG9ycy5wdXNoKC4uLihbXS5jb25jYXQoaW50ZXJjZXB0b3JzKSkpO1xuICAgIH1cbiAgfVxuXG4gIGFkZFJlc3BvbnNlSW50ZXJjZXB0b3JzKGludGVyY2VwdG9ycykge1xuICAgIGlmIChpbnRlcmNlcHRvcnMpIHtcbiAgICAgIHRoaXMuX3Jlc3BvbnNlSW50ZXJjZXB0b3JzLnB1c2goLi4uKFtdLmNvbmNhdChpbnRlcmNlcHRvcnMpKSk7XG4gICAgfVxuICB9XG5cbiAgY3JlYXRlUmVzb3VyY2UocmVzb3VyY2VDb25maWcsIHByb2Nlc3Nvcikge1xuICAgIGxldCByZXF1ZXN0SW50ZXJjZXB0b3JzID0gdGhpcy5fcmVxdWVzdEludGVyY2VwdG9ycztcbiAgICBsZXQgcmVzcG9uc2VJbnRlcmNlcHRvcnMgPSB0aGlzLl9yZXNwb25zZUludGVyY2VwdG9ycztcbiAgICBsZXQgc2Vzc2lvbiA9IHRoaXMuX3Nlc3Npb247XG4gICAgbGV0IHsgbmFtZSwgcGF0aCwgbWV0aG9kcyB9ID0gcmVzb3VyY2VDb25maWc7XG5cbiAgICByZXR1cm4gbWVtb2l6ZShmdW5jdGlvbihwYXJhbXMpIHtcbiAgICAgIHJldHVybiBuZXcgUHJveHkoe30sIHtcbiAgICAgICAgLy8gUHJveHkgaGFuZGxlci5nZXRcbiAgICAgICAgZ2V0OiBmdW5jdGlvbih0YXJnZXQsIG1ldGhvZCwgcmVjZWl2ZXIpIHtcbiAgICAgICAgICBpZiAobWV0aG9kcy5pbmRleE9mKG1ldGhvZCkgPT0gLTEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgW1Jlc291cmNlUHJveHldIENhbid0IHVzZSBcIiR7bWV0aG9kfVwiICwgIyR7bmFtZX0jIG11c3QgYWxsb3cgJHttZXRob2RzfWApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBmdW5jdGlvbihwYXlsb2FkKSB7XG4gICAgICAgICAgICBsZXQgX21ldGFQcm9jZXNzb3IgPSBkYXRhID0+IGRhdGE7XG4gICAgICAgICAgICBpZiAocGF5bG9hZCAmJiBwYXlsb2FkLiRtZXRhKSB7XG4gICAgICAgICAgICAgIGxldCB7ICRtZXRhIH0gPSBwYXlsb2FkO1xuICAgICAgICAgICAgICBkZWxldGUgcGF5bG9hZC4kbWV0YTtcbiAgICAgICAgICAgICAgX21ldGFQcm9jZXNzb3IgPSBtZXRhUHJvY2Vzc29yLmJpbmQobnVsbCwgJG1ldGEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgICAgcGF0aCxcbiAgICAgICAgICAgICAgbWV0aG9kLFxuICAgICAgICAgICAgICBzZXNzaW9uLFxuICAgICAgICAgICAgICBwYXJhbXM6IHBhcmFtcyB8fCBudWxsLFxuICAgICAgICAgICAgICBwYXlsb2FkOiBwYXlsb2FkIHx8IG51bGxcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmIChwcm9jZXNzb3IgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW4ndCBmaW5kIHByb2Nlc3Nvci5gKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHF1ZXVlID0gW10uY29uY2F0KHJlcXVlc3RJbnRlcmNlcHRvcnMsIHByb2Nlc3Nvciwgc2FmZVRyYW5zZmVyLCBfbWV0YVByb2Nlc3NvciwgcmVzcG9uc2VJbnRlcmNlcHRvcnMpO1xuICAgICAgICAgICAgcmV0dXJuIHByb21pc2VSZXNvbHZlUmVkdWNlKG9wdGlvbnMsIHF1ZXVlKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuXG52YXIgbG9nID0gKCk9PntcbiAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuYXBwbHkoQXJyYXksYXJndW1lbnRzKTtcbiAgYXJncy51bnNoaWZ0KCdhcHAtJyk7XG4gIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIGFyZ3MpO1xufSJdfQ==