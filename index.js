var app = require('express')()

app.get("/brownies", function(req, res){
  res.send("Ishq wala love");
});

app.get("/", function(req, res){
  res.send("Bhag ke......");
});

app.listen(process.env.PORT || 6969);
