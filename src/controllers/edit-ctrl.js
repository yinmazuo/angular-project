module.exports = function(app, utils) {
  app.controller('EditCtrl', function($scope, $state) {
    $scope.list = {
      id: 0,
      title: "one",
      startTime:  new Date("2016/09/09"),
      endTime:  new Date("2016/09/10"),
      status: 0,
      questions: [
        {
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
          type: "textarea",
          title: "question title",
          textarea: "textarea"
        },
      ]
    }

    $scope.dateOptions = {
      maxDate: new Date(2020, 1, 1),
      minDate: new Date(2010, 1, 1),
      startingDay: 1
    };
    $scope.titleEdit = () => $scope.titleEditable = true;
    $scope.titleSave = () => $scope.titleEditable = false;
    $scope.questionSave = (question) => question.editable = false;
    $scope.edit = (question) => question.editable = true;
    $scope.del = (index) => $scope.list.questions.splice(index, 1);

    $scope.isEmpty = () => {
      $scope.addQuestionType !== ""
        ?$scope.isNotEmpty = true
        :$scope.isNotEmpty = false;
    };
    $scope.addQuestion = () => {
      let question = {};
      if ($scope.addQuestionType !== "textarea") {
        question = {
          type: $scope.addQuestionType,
          title: "question title",
          items: [
            "item 1",
            "item 2",
            "item 3",
            "item 4"
          ]
        };
      }
      if ($scope.addQuestionType === "textarea") {
        question = {
          type: $scope.addQuestionType,
          title: "question title",
          textarea: "textarea"
        };
      }
      $scope.list.questions.push(question);
    };
    $scope.clone = (question) => {
      $scope.list.questions.push(question);
    };
    $scope.up = (index, question) => {
      if (index === 0) {
        return false;
      }
      $scope.list.questions.splice(index, 1);
      $scope.list.questions.splice(index - 1, 0, question);
    };
    $scope.down = (index, question) => {
      if (index === $scope.list.questions.length - 1) {
        return false;
      }
      $scope.list.questions.splice(index, 1);
      $scope.list.questions.splice(index + 1, 0, question);
    };

    $scope.save = () => {
      $state.go("mars.lists")
    };

  });
}
