module.exports = function(app, utils) {
  // 自动加载模板函数
  let tpl = utils.tplRequirer(require.context('./controllers', true, /-tpl\.html$/));

  app.config(function($urlRouterProvider, $stateProvider) {

    $urlRouterProvider
      .when('', '/home')
      .otherwise('');

    $stateProvider
      .state({
        name: 'mars',
        url: '',
        controller: 'RootCtrl',
        template: tpl('root'),
      })
      .state({
        name: 'mars.lists',
        url: '/home',
        controller: 'ListsCtrl',
        template: tpl('lists'),
      })
      .state({
        name: 'mars.edit',
        url: '/edit/{listId:int}',
        controller: 'EditCtrl',
        template: tpl('edit'),
      })
      .state({
        name: 'mars.preview',
        url: '/preview/{listId:int}',
        controller: 'PreviewCtrl',
        template: tpl('preview'),
      })
      .state({
        name: 'mars.results',
        url: '/results/{listId:int}',
        controller: 'ResultsCtrl',
        template: tpl('results'),
      })
  });
};
