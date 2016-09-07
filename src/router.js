module.exports = function(app, utils) {
  // 自动加载模板函数
  let tpl = utils.tplRequirer(require.context('./controllers', true, /-tpl\.html$/));

  app.config(function($urlRouterProvider, $stateProvider) {
    
    $urlRouterProvider
      .when('', '/')
      .otherwise('');

    $stateProvider
      .state({
        name: 'mars',
        url: '/',
        controller: 'RootCtrl',
        template: tpl('root'),
      })
      .state({
        name: 'mars.lists',
        url: '/lists',
        controller: 'ListsCtrl', 
        template: tpl('lists'),
      })

  });
};