module.exports = function(app) {
  app.filter("toLetter", function() {
    return (input) => String.fromCharCode(65 + input);
  })
};