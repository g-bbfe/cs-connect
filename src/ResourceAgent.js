import { memoize , cloneDeep } from 'lodash';
import Session from './Session';
import metaProcessor from './metaProcessor';

function promiseResolveReduce(initialArgument, functions) {
  return functions.reduce((promise, func) => {
    return promise.then(func);
  }, Promise.resolve(initialArgument));
}

function safeTransfer(value) {
  if(value instanceof Error){
    //@TODO ERROR要有协议的传输 否则ERROR存在被其他更改风险
    return value;
  }
  return cloneDeep(value);
}

export default class ResourceAgent {
  _requestInterceptors = [];
  _responseInterceptors = [];
  _session = null;
  resource = {};

  constructor (resourceConfigs, processor) {
    this._session = new Session();
    resourceConfigs.forEach(resourceConfig => {
      this.resource[resourceConfig.name] = this.createResource(resourceConfig, processor);
    });
  }

  addRequestInterceptors(interceptors) {
    if (interceptors) {
      this._requestInterceptors.push(...([].concat(interceptors)));
    }
  }

  addResponseInterceptors(interceptors) {
    if (interceptors) {
      this._responseInterceptors.push(...([].concat(interceptors)));
    }
  }

  createResource(resourceConfig, processor) {
    let requestInterceptors = this._requestInterceptors;
    let responseInterceptors = this._responseInterceptors;
    let session = this._session;
    let { name, path, methods } = resourceConfig;

    return memoize(function(params) {
      return new Proxy({}, {
        // Proxy handler.get
        get: function(target, method, receiver) {
          if (methods.indexOf(method) == -1) {
            throw new Error(`[ResourceProxy] Can't use "${method}" , #${name}# must allow ${methods}`);
          }

          return function(payload) {
            let _metaProcessor = data => data;
            if (payload && payload.$meta) {
              let { $meta } = payload;
              delete payload.$meta;
              _metaProcessor = metaProcessor.bind(null, $meta);
            }

            let options = {
              name,
              path,
              method,
              session,
              params: params || null,
              payload: payload || null
            };

            if (processor === null) {
              throw new Error(`Can't find processor.`);
            }

            let queue = [].concat(requestInterceptors, processor, safeTransfer, _metaProcessor, responseInterceptors);
            return promiseResolveReduce(options, queue);
          };
        }
      });
    });
  }
}

var log = ()=>{
  var args = Array.prototype.slice.apply(Array,arguments);
  args.unshift('app-');
  console.log.apply(console, args);
}