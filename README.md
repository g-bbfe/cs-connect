## cs-connect [NEW]

connect client and server;

## Install

```shell
npm install @bbfe/cs-connect
```

## Example

```javascript
/*
Client
*/

import server from 'server';
// connect target
import connect  from '@bbfe/cs-connect';
const resourceAgent = connect('desktop', server);

resourceAgent.addRequestInterceptors(function(request) {
  console.log('request', request);
  return request;
});

resourceAgent.addResponseInterceptors(function(response) {
  console.log('response', response);
  return response;
});

```

## Version Change

0.0.1 init
0.0.2 修复用cached导致的BUG @杨江星


