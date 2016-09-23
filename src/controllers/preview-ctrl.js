module.exports = function(app, utils) {
  app.controller("PreviewCtrl", function($scope, $state, $stateParams) {
    let index = $stateParams.listId;
    let lists = JSON.parse(localStorage.getItem("lists"));
    $scope.list = lists[index];
    
  });
};
