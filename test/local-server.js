import { capitalize, isUndefined } from './utils';
// TODO: beforeInterceptor 和 afterInterceptor
//      分别是在 action 之前和之后进行处理，
//      未考虑在响应之前的错误处理切面
//
// beforeInterceptor +----resolve----> action +----resolve----> afterInterceptor
function promiseResolveReduce(initialArgument, functions) {
  return functions.reduce((promise, func) => {
    return promise.then(func);
  }, Promise.resolve(initialArgument));
}

export default class Server {
  _beforeInterceptors = [];
  _afterInterceptors = [];
  controllerMap = new Map();
  resource = {};
  dispatchConfigs = null;
  resourceConfigs = null;

  constructor ({ dispatchConfigs, resourceConfigs }) {
    if (!dispatchConfigs) {
      throw new Error(`Can't find dispatchConfigs.`);
    }

    if (!resourceConfigs) {
      throw new Error(`Can't find resourceConfigs.`);
    }

    this.dispatchConfigs = dispatchConfigs;
    this.resourceConfigs = resourceConfigs;
  }

  addBeforeInterceptors(interceptors) {
    if (interceptors) {
      this._beforeInterceptors.push(...([].concat(interceptors)));
    }
  }

  addAfterInterceptors(interceptors) {
    if (interceptors) {
      this._afterInterceptors.push(...([].concat(interceptors)));
    }
  }

  dispatch ({ name, path, method, session, params, payload }) {
    let dispatchConfig = this.dispatchConfigs.find(dispatchConfig => {
      return dispatchConfig.name === name;
    });
    let { actionRule } = dispatchConfig;
    let action = this.findAction({path, actionRule, method});
    let queue = [].concat(this._beforeInterceptors, action, this._afterInterceptors);

    return promiseResolveReduce({path, session, actionRule, params, method, payload}, queue)
    .catch(error => {
      return error;
    });
  }

  findAction ({path, actionRule, method}) {
    if (!actionRule) {
      throw new Error('ActionRule undefined in route!');
    } else if (actionRule && !actionRule.controller) {
      throw new Error('Controller undefined in route!');
    }

    let ControllerClass = actionRule.controller;

    if (!ControllerClass) {
      throw new Error('Controller undefined in route!');
    }

    let controller = new ControllerClass();
    this.controllerMap.set(actionRule.controller, controller);

    actionRule.prefix = actionRule.prefix.trim();
    let actionName = actionRule.prefix ? actionRule.prefix + capitalize(method) : method;
    return controller[actionName];
  }
}
