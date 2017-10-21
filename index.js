var app = require('express')()
var unirest = require('unirest');
var walmart = require('walmart')('vabv2m3c8uag5sc9p4hy5wj3');
var prices = [];
var total = 0;
var ing = [];

app.get("/brownies", function(req, res){

unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/extract?forceExtraction=false&url=http%3A%2F%2Fwww.melskitchencafe.com%2Fthe-best-fudgy-brownies%2F") // Recipe API
.header("X-Mashape-Key", "YDsOlewIwlmshyMUUZ7XGSf0Ene3p1aimzrjsnSQMxTqs8cfk2")
.header("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com")
.end(function (result) {
	var count = 0;
  //console.log(result.body.extendedIngredients);
  for(var i = 0; i < result.body.extendedIngredients.length;i++) // Looping through all the ingredients for the name
  {
  	ing.push(result.body.extendedIngredients[i].name); // Storing them
  	//console.log(ing[i]);
  	walmart.stores.search(1003, ing[i]).then(function(data) { // Getting the item at local store
  	var prices = [];
  	var index = [];
  	for(var j = 0; j < data.count ; j++)
  	{
  	prices.push(data.results[j].price.priceInCents);
	}
	//var prices_copy = prices.slice(); // Copying the array for reference later
	prices.sort(); // Sorting it by price
	//console.log(prices[0]);
	total = total + prices[0]; // Calculating total
	//console.log("Total " + total);
	count ++;
	if(count == (result.body.extendedIngredients.length )) // Checking if the total is final or not
	{

    let responseText = buildResponse(ing, total);
    res.send(responseText);
	}
	});

  }
});

});

let counter = 1;

function buildResponse(ing, total) {
  let textRes = "Shopping list for Brownies: ";
  ing.map(x => {
    textRes = textRes.concat(counter + ". " + x + " ");
    counter++;
  })
  //console.log(total)
  textRes = textRes.concat(". Total should be: " + total);

  return textRes;
}

//console.log(responseText);

// app.get("/brownies", function(req, res){
//   res.send("Added ingredients of chocolate brownies added to your Walmart Shopping List");
// });

app.get("/", function(req, res){
  res.send("Bhag ke......");
});

app.listen(process.env.PORT || 6969);
