module.exports = function(app, utils) {
  app.controller('ResultsCtrl', function($scope) {
    $scope.result = {
      title: "results",
      startTime: "2016/09/09",
      endTime: "2016/09/10",
      questions: [
        {
          title: "radio question",
          type: "radio",
          items: [
            {
              content: "item 1",
              percentage: 0.20,
            },
            {
              content: "item 2",
              percentage: 0.10,
            },
            {
              content: "item 3",
              percentage: 0.40,
            },
            {
              content: "item 4",
              percentage: 0.30,
            },
          ]
        },
        {
          title: "checkbox",
          type: "checkbox",
          items: [
            {
              content: "item 1",
              percentage: 0.73,
            },
            {
              content: "item 2",
              percentage: 0.80,
            },
            {
              content: "item 3",
              percentage: 0.36,
            },
            {
              content: "item 4",
              percentage: 0.12,
            },
          ]
        },
        {
          title: "textarea",
          type: "textarea",
          validResponsePercentage: 0.93
        },
      ]      
    };
  });
}
