var Currency 	 = require('./models/Currency.js');
var Product 	 = require('./models/Product.js');
var mongoose     = require('mongoose');
var Constants 	 = require('./Constants.js');

//mongoose.connect("mongodb://localhost/AppleAlien"); //connect to local database
mongoose.connect("mongodb://Admin:password@ds######.mongolab.com:#####/aadb"); //connect to MongoLab


exports.findPricesForCountry = function(countryName, callback)
{
	//var ObjectID = require('mongodb').ObjectID;

	if(countryName == null || !countryName)
	{
		callback(null,null);
	}//end if

	Product.find({country_name: countryName}, {_id:0, country_name:1, model:1, price_formatted:1}, function(err, data)
	{
		if(err){
			console.log(err);
			callback(err,null);
		}else{
			callback(null,data);
		}//end if
	});
};


exports.findCheapestCountryForModel = function(modelName, countryCode, callback)
{
	//var ObjectID = require('mongodb').ObjectID;

	modelName = findModelNameForURLCode(modelName);

	if(countryCode == null || !countryCode || !modelName || modelName == null)
	{
		callback(null,null);
	}//end if

	//Find the model for country
	Product.findOne({model: modelName, country_code: countryCode},  function(err, fromCountryProduct)
	{
		if(!fromCountryProduct || fromCountryProduct == null){
			callback(null, null);
		} 
		else
		{

		//Find all exchange rates
		Currency.find({}, function(err, allExchangeRatesArray)
		{
			//Find all products that match modelName
			Product.find({model: modelName},  function(err, productsArray)
			{
				//Find exchange rate for fromCountryProduct
				var lastExchangeRateUpdated = new Date();
				var from_rate_per_usd = 0;
				for(var j=0; j<allExchangeRatesArray.length; j++)
				{
					//console.log(allExchangeRatesArray[j].currency_symbol+" and "+fromCountryProduct.currency_symbol);
					if(String(allExchangeRatesArray[j].currency_symbol) == String(fromCountryProduct.currency_symbol))
					{
						lastExchangeRateUpdated = allExchangeRatesArray[j].last_updated;
						from_rate_per_usd = allExchangeRatesArray[j].price_usd;
						break;
					}//end if
				}//end for

				var originPrice = fromCountryProduct.price;

				//Calculate price data for each country that sells the Product
				var tempResponseArray = new Array();
				for(var i=0; i<productsArray.length; i++)
				{
					var rate_per_usd = findCurrentExchangeRate(allExchangeRatesArray, productsArray[i].currency_symbol);

					var exchange_rate = from_rate_per_usd / rate_per_usd;

					var localPrice = productsArray[i].price;
					var fromConvertedPrice = localPrice * exchange_rate; //Cost in from Currency

					//Create response model
					var respModel = createCheapestPriceResponseModel();
					respModel.country_name = productsArray[i].country_name;
					respModel.currency_symbol = productsArray[i].currency_symbol;
					respModel.product_line = productsArray[i].product_line;
					respModel.model = productsArray[i].model;
					respModel.local_price = productsArray[i].price;
					respModel.local_formatted_price = productsArray[i].price_formatted;
					respModel.converted_price = roundWithDecimalPlaces(fromConvertedPrice, 2);
					respModel.exchange_rate = exchange_rate;
					respModel.price_difference = roundWithDecimalPlaces(fromConvertedPrice - originPrice, 2);
					respModel.percent_difference = roundWithDecimalPlaces(((fromConvertedPrice - originPrice) / originPrice) * 100, 2)+"%";
					respModel.exchange_rate = exchange_rate;
					respModel.product_url = productsArray[i].product_url;
					respModel.price_last_update = productsArray[i].date_price_updated;
					respModel.exchange_rate_last_update = lastExchangeRateUpdated;

					tempResponseArray.push(respModel);
				}//end for

				var responseDataArray = sortResponseDataArray(tempResponseArray);
				callback(null, responseDataArray);
			});
		});

		}//end if
	});

};

exports.retrieveProductLineList = function(callback)
{
	var products = Constants.retreiveProductLines();
	callback(products);
}

exports.retrieveProductModelList = function(productLineName, callback)
{
	var products = Constants.retreiveProducts();

	//Filter out non product line models
	var filteredProducts = new Array();
	for(var i=0; i<products.length; i++)
	{
        if(products[i].product_line == productLineName) filteredProducts.push(products[i])

	}//end for

	callback(filteredProducts);
}

exports.retrieveCountryList = function(callback)
{
	var countres = Constants.retrieveCountries(new Array());
	callback(countres);
}

/*
 * Finds the current exchange rate given an array of Currencies and the Currency symbol to find for
 */
function findCurrentExchangeRate(allExchangeRatesArray, currency_symbol)
{
	var rate = 0;
	for(var j=0; j<allExchangeRatesArray.length; j++)
	{
		if(String(allExchangeRatesArray[j].currency_symbol) == String(currency_symbol))
		{
			//Found currency match
			rate = allExchangeRatesArray[j].price_usd;
			break;
		}//end if
	}

	return rate;
}

/*
 * Sorts a Response data array from cheapest converted_price to most expensive
 * Takes unsorted array and returns sorted array
 */
function sortResponseDataArray(responseDataArray)
{
	var key = "converted_price";
	var swapped;

    do 
    {
    	swapped = false;

        for (var i=0; i < responseDataArray.length+1; i++) 
        {
        	if(responseDataArray[i+1])
        	{	
        		if (Number(responseDataArray[i][key]) > Number(responseDataArray[i+1][key])) 
        		{
                	var temp = responseDataArray[i];
                	responseDataArray[i] = responseDataArray[i+1];
                	responseDataArray[i+1] = temp;
                	swapped = true;
            	}//end if 
            	
        	}//end if
        }//end for
        
    } while (swapped);

	return responseDataArray;
}

function createCheapestPriceResponseModel()
{
	var respModel = {
		"country_name": null,
		"currency_symbol": null,
		"product_line": null,
		"model": null,
		"local_price": null,
		"local_formatted_price": null,
		"converted_price": null,
		"exchange_rate": null,
		"price_difference": null,
		"percent_difference": null,
		"product_url": null,
		"price_last_update": null,
		"exchange_rate_last_update": null
	};
	return respModel;
}

/*
 * Rounds a Number, a given number of decimal places
 * Takes the Number to round and the number of decimal places to round to
 */
function roundWithDecimalPlaces (num,places)
{
	var toFixedNumber = places;

	if(places == 1)
	{
		places = 10;
	}
	else if(places == 2)
	{
		places = 100;
	}
	else if(places == 3)
	{
		places = 1000;
	}
	else if(places == 4)
	{
		places = 10000;
	}
	else{
		places = 1;
	}
	
	if(!isNaN(num))
	{
		num = Math.round(num * places) / places;
		num = num.toFixed(toFixedNumber)
	}
	return num;
}

/*
 * Takes a model id (found in url param) and returns the Model name
 */
function findModelNameForURLCode(modelId)
{
	//Macbook Pro
	var products = Constants.retreiveProducts();

	for(var i=0; i<products.length; i++)
	{
		if(String(products[i].product_id) == String(modelId))
		{
			return products[i].product_model;
			break;
		}
	}//end for

}


