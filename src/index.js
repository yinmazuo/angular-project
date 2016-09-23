
require('angular');
require('lodash');
require('whatwg-fetch');

//加载libs中的通用样式
require('./libs/common.scss');

require('angular-ui-bootstrap/src/datepickerPopup');
require('bootstrap/dist/css/bootstrap.min.css');

require('angular-ui-router');
require('angular-ui-router.statehelper');
let questionApp = angular.module('questionApp', [
  'ui.router',
  'ui.router.stateHelper',
  'ui.bootstrap.module.datepickerPopup'
]);

questionApp
  .config(function ($httpProvider) {
    $httpProvider.defaults.cache = false;
  })
  .run(function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.appName = questionApp.name;
  });

let utils = require('./utils');

// 配置路由
require('./router')(questionApp, utils);

// 自动加载 controllers, directives, services, filters
utils.requireAllWithArgs(require.context('./controllers', true, /-ctrl\.js$/), questionApp, utils);
utils.requireAllWithArgs(require.context('./directives', true, /\.(js|scss|sass|css)$/), questionApp, utils);
utils.requireAllWithArgs(require.context('./services', true, /\.js$/), questionApp, utils);
utils.requireAllWithArgs(require.context('./filters', true, /\.js$/), questionApp, utils);

// 自动加载所有 controllers 目录下的样式
utils.requireAll(require.context('./controllers', true, /\.(sass|scss|css)$/));
