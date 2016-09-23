module.exports = function(app, utils) {
  app.controller('ListsCtrl', function($scope, $filter, $interval, $location) {
    if (localStorage.getItem("lists") === null) {
      $scope.lists = require('../data.json');
    } else {
      $scope.lists = JSON.parse(localStorage.getItem("lists"));
    }

    let timeout = () => {
      $scope.lists.forEach((item, index, array) => {
        if (item.status === 1) {
          new Date(item.endTime) < new Date()
          ? item.status = 2
          : void 0;
        }
      });
    };

    let interval = $interval(timeout, 1000);

    $scope.$on('$stateChangeStart', (event, toState) => {
      $interval.cancel(interval);
    });

    let updateStorage = () => localStorage.setItem("lists", JSON.stringify($scope.lists));
    updateStorage();

    $scope.allSelected = false;

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
      updateStorage();
    };

    $scope.del = (id) => {
      let i = -1;
      $scope.lists.forEach((item, index) => {
        item.id === id ? i = index : void 0;
      });
      i > -1 ? $scope.lists.splice(i, 1) : void 0;
      updateStorage();
    };

    $scope.addList = () => {
      let nowDate = new Date();
      let newList = {
        id: $scope.lists.length,
        title: "New list",
        startTime: $filter('date')(nowDate, "yyyy/MM/dd"),
        endTime: $filter('date')(nowDate, "yyyy/MM/dd"),
        status: 0,
        questions: []
      };

      $scope.lists.push(newList);
      updateStorage();
    };
  });
}
