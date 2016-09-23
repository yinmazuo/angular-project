module.exports = function(app, utils) {
  app.directive("pieChart", function($document) {
    return {
      restrict: "EA",
      replace: true,
      scope: {
        data: "="
      },
      template: `<canvas width="800" height="400" class="pieChart"></canvas>`,
      link(scope, ele, attr) {
        let canvas = ele[0].getContext("2d");
        let defaultColor = ["#a94442", "#337ab7",  "#286090",  "#3c763d", 
                            "#ffeb3b", "#ff9800", "#e91e63"];  
        let drawIcon = (item, index) => {
          canvas.fillStyle = item.backgroundColor;
          let y = 20 + index * 80 + 10;
          canvas.fillRect(480, y, 60, 60);
          canvas.font = "normal 48px Arial";
          canvas.textAlign = "center";
          canvas.textBaseline = "middle";
          canvas.fillText(item.content, 640, y + 30);
        };
                                
        scope.data.forEach((item, index, array) => {
          item.angle = item.percentage * Math.PI * 2;
          item.backgroundColor = defaultColor[index];
          drawIcon(item, index);
        });            

        let drawPie = (startAngle, item, preItem = {x: 200, y: 0, angle: 0}) => {
          let endAngle = startAngle + item.angle;
          item.x = Math.cos(endAngle) * 200;
          item.y = Math.sin(endAngle) * 200;   
 
          canvas.beginPath();
          canvas.strokeStyle = "#000";
          canvas.fillStyle = item.backgroundColor;         

          canvas.moveTo(0, 0);
          canvas.lineTo(preItem.x, preItem.y);
          canvas.arc(0, 0, 200, startAngle, endAngle, false);
          canvas.moveTo(item.x, item.y);
          canvas.lineTo(0, 0);  
             
          canvas.fill();
          canvas.stroke();

          canvas.font = "normal 32px Arial";
          canvas.fillStyle = "#000";
          canvas.textAlign = "center";
          canvas.textBaseline = "middle";

          let textX = Math.cos(startAngle + item.angle / 2) * 200 / 2;
          let textY = Math.sin(startAngle + item.angle / 2) * 200 / 2;
          canvas.fillText(item.percentage * 100 + "%", textX, textY);
                
          canvas.closePath();           
        };        
        
        canvas.translate(200, 200);

        scope.data.map((item, index, array) => {
          let startAngle = 0;          
          if (index > 0) {            
            for (let i = 0; i < index; ++i) {
              startAngle += array[i].angle;
            }
            drawPie(startAngle, item, array[index - 1]);
          } else {
            drawPie(startAngle, item);
          }         
        });
      }
    }
  });
};
