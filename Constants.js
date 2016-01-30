/*
 * Defined Constants for Update Scripts
 */

//var utilityFunctions = require('./UtilityFunctions.js');

/*
 * Returns an array of country codes, which are used by apple to identify different countries
 * Takes an array of countrry codes, whose countries to not return in the array
 */
 exports.retrieveCountries = function(countriesToIgnoreArray)
 {
 	var countries = new Array();
    if(countriesToIgnoreArray.indexOf("au") == -1) countries.push(createCountryObject("au", "Australia", "AUD=X"));
    if(countriesToIgnoreArray.indexOf("at") == -1) countries.push(createCountryObject("at", "Austria", "EUR=X"));
    if(countriesToIgnoreArray.indexOf("benl") == -1) countries.push(createCountryObject("benl", "Belgium", "EUR=X"));
    if(countriesToIgnoreArray.indexOf("br") == -1) countries.push(createCountryObject("br", "Brazil", "BRL=X"));
    if(countriesToIgnoreArray.indexOf("ca") == -1) countries.push(createCountryObject("ca", "Canada", "CAD=X"));
    if(countriesToIgnoreArray.indexOf("cn") == -1) countries.push(createCountryObject("cn", "China", "CNY=X"));
    if(countriesToIgnoreArray.indexOf("cz") == -1) countries.push(createCountryObject("cz", "Czech Republic", "CZK=X"));
    if(countriesToIgnoreArray.indexOf("dk") == -1) countries.push(createCountryObject("dk", "Denmark", "DKK=X"));
    if(countriesToIgnoreArray.indexOf("fi") == -1) countries.push(createCountryObject("fi", "Finland", "EUR=X"));
    if(countriesToIgnoreArray.indexOf("fr") == -1) countries.push(createCountryObject("fr", "France", "EUR=X"));
    if(countriesToIgnoreArray.indexOf("de") == -1) countries.push(createCountryObject("de", "Germany", "EUR=X"));
    if(countriesToIgnoreArray.indexOf("hk") == -1) countries.push(createCountryObject("hk", "Hong Kong", "HKD=X"));
    if(countriesToIgnoreArray.indexOf("hu") == -1) countries.push(createCountryObject("hu", "Hungary", "HUF=X"));
    if(countriesToIgnoreArray.indexOf("in") == -1) countries.push(createCountryObject("in", "India", "INR=X"));
    if(countriesToIgnoreArray.indexOf("id") == -1) countries.push(createCountryObject("id", "Indonesia", "IDR=X"));
    if(countriesToIgnoreArray.indexOf("ie") == -1) countries.push(createCountryObject("ie", "Ireland", "EUR=X"));
    if(countriesToIgnoreArray.indexOf("it") == -1) countries.push(createCountryObject("it", "Italy", "EUR=X"));
    if(countriesToIgnoreArray.indexOf("jp") == -1) countries.push(createCountryObject("jp", "Japan", "JPY=X"));
    if(countriesToIgnoreArray.indexOf("lu") == -1) countries.push(createCountryObject("lu", "Luxembourg", "EUR=X"));
    if(countriesToIgnoreArray.indexOf("my") == -1) countries.push(createCountryObject("my", "Malaysia", "MYR=X"));
    if(countriesToIgnoreArray.indexOf("mx") == -1) countries.push(createCountryObject("mx", "Mexico", "MXN=X"));
    if(countriesToIgnoreArray.indexOf("nl") == -1) countries.push(createCountryObject("nl", "Netherlands", "EUR=X"));
    if(countriesToIgnoreArray.indexOf("nz") == -1) countries.push(createCountryObject("nz", "New Zealand", "NZD=X"));
    if(countriesToIgnoreArray.indexOf("no") == -1) countries.push(createCountryObject("no", "Norway", "NOK=X"));
    if(countriesToIgnoreArray.indexOf("ph") == -1) countries.push(createCountryObject("ph", "Philipines", "PHP=X"));
    if(countriesToIgnoreArray.indexOf("pl") == -1) countries.push(createCountryObject("pl", "Poland", "PLN=X"));
    if(countriesToIgnoreArray.indexOf("pt") == -1) countries.push(createCountryObject("pt", "Portugal", "EUR=X"));
    if(countriesToIgnoreArray.indexOf("ru") == -1) countries.push(createCountryObject("ru", "Russia", "RUB=X"));
    if(countriesToIgnoreArray.indexOf("sg") == -1) countries.push(createCountryObject("sg", "Singapore", "SGD=X"));
    if(countriesToIgnoreArray.indexOf("kr") == -1) countries.push(createCountryObject("kr", "South Korea", "KRW=X"));
    if(countriesToIgnoreArray.indexOf("es") == -1) countries.push(createCountryObject("es", "Spain", "EUR=X"));
    if(countriesToIgnoreArray.indexOf("se") == -1) countries.push(createCountryObject("se", "Sweeden", "SEK=X"));
    if(countriesToIgnoreArray.indexOf("chde") == -1) countries.push(createCountryObject("chde", "Switzerland", "CHF=X"));
    if(countriesToIgnoreArray.indexOf("tw") == -1) countries.push(createCountryObject("tw", "Taiwan", "TWD=X"));
    if(countriesToIgnoreArray.indexOf("th") == -1) countries.push(createCountryObject("th", "Thailand", "THB=X"));
    if(countriesToIgnoreArray.indexOf("tr") == -1) countries.push(createCountryObject("tr", "Turkey", "TRY=X"));
    if(countriesToIgnoreArray.indexOf("ae") == -1) countries.push(createCountryObject("ae", "United Arab Emirates", "AED=X"));
    if(countriesToIgnoreArray.indexOf("uk") == -1) countries.push(createCountryObject("uk", "United Kingdom", "GBP=X"));
 	if(countriesToIgnoreArray.indexOf("us") == -1) countries.push(createCountryObject("us", "United States", "USD=X"));
 	if(countriesToIgnoreArray.indexOf("vn") == -1) countries.push(createCountryObject("vn", "Vietnam", "VND=X"));

 	return countries;
 }

function createCountryObject (code, name, symbol)
{
    var country = {
        "country_code": null, 
        "country_name": null, 
        "currency_symbol": null
    };

    country.country_code = code;
    country.country_name = name;
    country.currency_symbol = symbol;

    return country;
}

exports.retreiveProductLines = function()
{
    var productLines = [
        {"product_line_name": "iPad"},
        {"product_line_name": "MacBook Pro"}
    ];

    return productLines;
}

 exports.retreiveProducts = function()
 {

 	 	var products = [
 	 	//Macbook Pro
 		{"product_line": "MacBook Pro", "product_model": "MacBook Pro 13-inch 128GB", "product_id": "mbp_13_128"},
 		{"product_line": "MacBook Pro", "product_model": "MacBook Pro 13-inch 256GB", "product_id": "mbp_13_256"}, 
 		{"product_line": "MacBook Pro", "product_model": "MacBook Pro 13-inch 512GB", "product_id": "mbp_13_512"}, 
 		{"product_line": "MacBook Pro", "product_model": "MacBook Pro 15-inch 256GB", "product_id": "mbp_13_256"}, 
 		{"product_line": "MacBook Pro", "product_model": "MacBook Pro 15-inch 512GB", "product_id": "mbp_13_512"}, 

 		//iPad
 		{"product_line": "iPad", "product_model": "iPad Air 2 Wi-Fi 16GB", "product_id": "ipadair2_wifi_16"}, 
 		{"product_line": "iPad", "product_model": "iPad Air 2 Wi-Fi 64GB", "product_id": "ipadair2_wifi_64"}, 
 		{"product_line": "iPad", "product_model": "iPad Air 2 Wi-Fi 128GB", "product_id": "ipadair2_wifi_128"}, 
 		{"product_line": "iPad", "product_model": "iPad Air 2 Wi-Fi & Cellular 16GB", "product_id": "ipadair2_wifi_cellular_16"}, 
 		{"product_line": "iPad", "product_model": "iPad Air 2 Wi-Fi & Cellular 64GB", "product_id": "ipadair2_wifi_cellular_64"}, 
 		{"product_line": "iPad", "product_model": "iPad Air 2 Wi-Fi & Cellular 128GB", "product_id": "ipadair2_wifi_cellular_128"}, 
 		{"product_line": "iPad", "product_model": "iPad Air Wi-Fi 16GB", "product_id": "ipadair_wifi_16"}, 
 		{"product_line": "iPad", "product_model": "iPad Air Wi-Fi 32GB", "product_id": "ipadair_wifi_32"}, 
 		{"product_line": "iPad", "product_model": "iPad Air Wi-Fi & Cellular 16GB", "product_id": "ipadair_wifi_cellular_16"}, 
 		{"product_line": "iPad", "product_model": "iPad Air Wi-Fi & Cellular 32GB", "product_id": "ipadair_wifi_cellular_32"},  
        {"product_line": "iPad", "product_model": "iPad Mini 2 Wi-Fi 16GB", "product_id": "ipadmini2_wifi_16"}, 
        {"product_line": "iPad", "product_model": "iPad Mini 2 Wi-Fi 32GB", "product_id": "ipadmini2_wifi_32"}, 
        {"product_line": "iPad", "product_model": "iPad Mini 2 Wi-Fi & Cellular 16GB", "product_id": "ipadmini2_wifi_cellular_16"}, 
        {"product_line": "iPad", "product_model": "iPad Mini 2 Wi-Fi & Cellular 32GB", "product_id": "ipadmini2_wifi_cellular_32"},
 		{"product_line": "iPad", "product_model": "iPad Mini 3 Wi-Fi 16GB", "product_id": "ipadmini3_wifi_16"}, 
 		{"product_line": "iPad", "product_model": "iPad Mini 3 Wi-Fi 64GB", "product_id": "ipadmini3_wifi_64"}, 
 		{"product_line": "iPad", "product_model": "iPad Mini 3 Wi-Fi 128GB", "product_id": "ipadmini3_wifi_128"}, 
        {"product_line": "iPad", "product_model": "iPad Mini 3 Wi-Fi & Cellular 16GB", "product_id": "ipadmini3_wifi_cellular_16"}, 
 		{"product_line": "iPad", "product_model": "iPad Mini 3 Wi-Fi & Cellular 64GB", "product_id": "ipadmini3_wifi_cellular_64"},
        {"product_line": "iPad", "product_model": "iPad Mini 3 Wi-Fi & Cellular 128GB", "product_id": "ipadmini3_wifi_cellular_128"},
        ];

 	return products;
 }

exports.macBookPro_name = function(){
 	return "MacBook Pro";
}

exports.iPad_name = function(){
 	return "iPad";
}