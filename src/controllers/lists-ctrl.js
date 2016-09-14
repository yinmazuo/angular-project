module.exports = function(app, utils) {
  app.controller('ListsCtrl', function($scope, $filter) {
    let listCounter = 3;

    $scope.allSelected = false;

    $scope.lists = [
      {
        id: 0,
        title: "one",
        startTime: "2016/09/09",
        endTime: "2016/09/10",
        status: 0
      },
      {
        id: 1,
        title: "two",
        startTime: "2016/09/09",
        endTime: "2016/09/10",
        status: 1
      },
      {
        id: 2,
        title: "three",
        startTime: "2016/09/09",
        endTime: "2016/09/10",
        status: 2
      }
    ];

    $scope.$watch('allSelected', (newValue, oldValue) => {
      $scope.lists.forEach((item) => {
        item.selected = newValue;
      });
    });

    $scope.$watch('lists', (newValue, oldValue) => {
      newValue.every((item) => item.selected )?
      $scope.allSelected = true : $scope.allSelected = false;
    }, true);

    $scope.multiDel = () => {
      $scope.lists = $scope.lists.filter((item) => !item.selected );
    };

    $scope.del = (id) => {
      let i = -1;
      $scope.lists.forEach((item, index) => {
        item.id === id ? i = index : void 0;
      });
      i > -1 ? $scope.lists.splice(i, 1) : void 0;
    };

    $scope.addList = () => {
      let nowDate = new Date();
      let newList = {
        id: ++listCounter,
        title: "New list",
        startTime: $filter('date')(nowDate, "yyyy/MM/dd"),
        endTime: $filter('date')(nowDate, "yyyy/MM/dd"),
        status: 0
      };

      $scope.lists.push(newList);
    };
  });
}