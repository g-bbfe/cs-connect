import LocalServer from './local-server';


class ActionService {
  constructor(options) {
  }
  async get() {
      return 'success';
  }
  async post(){
      return {};
  }
};

const resourceConfigs = [{
    name: 'test',
    path: '/test',
    methods: ['get', 'post'],
}];
const dispatchConfigs = [{
    name: 'test',
    actionRule: { controller: ActionService, prefix:'',}
}];

function init() {
    return  new LocalServer({ dispatchConfigs, resourceConfigs });
}

export default {
    init
};