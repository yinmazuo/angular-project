module.exports = function(app, utils) {
  app.directive("progressBar", function() {
    return {
      restrict : "EA",
      replace: true,
      scope: {
        percentage: "="
      },
      template: `<div class="progressBarWarpper">
                  <span class="percentage">{{percentage * 100}}%</span>
                  <div class="progressBarInner"></div>
                </div>`,
      link(scope, ele, attrs) {
        angular.element(ele).find("div").css("width", scope.percentage * 100 + "%");
      }
    }
  });
};
