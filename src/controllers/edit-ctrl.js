module.exports = function(app, utils) {
  app.controller('EditCtrl', function($scope) {
    $scope.list = {
      id: 0,
      title: "one",
      startTime:  new Date("2016/09/09"),
      endTime:  new Date("2016/09/10"),
      status: 0,
      questions: [
        {
          seq: 0,
          type: "radio",
          title: "question title",
          items: [
            "item 1",
            "item 2",
            "item 3",
            "item 4"
          ]
        },
        {
          seq: 1,
          type: "checkbox",
          title: "question title",
          items: [
            "item 1",
            "item 2",
            "item 3",
            "item 4"
          ]
        },
        {
          seq: 2,
          type: "textarea",
          title: "question title",
          textarea: "textarea"
        },
      ]
    }

    $scope.titleEdit = () => $scope.titleEditable = true;
    $scope.titleSave = () => $scope.titleEditable = false;
    $scope.questionSave = (question) => question.editable = false;
    $scope.edit = (question) => question.editable = true;

    $scope.dateOptions = {
      maxDate: new Date(2020, 1, 1),
      minDate: new Date(2010, 1, 1),
      startingDay: 1
    };

  });
}
