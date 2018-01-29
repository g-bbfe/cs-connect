import { isObject } from 'lodash';

function metaProcessor(meta, response) {
  /*
   * @bugfix
   * @desc response 不一定是对象, 或为 Error , 或 status code 204  为 `undefined`
   */
  if (isObject(response) && !(response instanceof Error)) {
    if (response.$meta) {
      console.warn('metaProcessor: $meta property has been used.');
    } else {
      response.$meta = meta;
    }
  }

  return response;
}

export default metaProcessor;
