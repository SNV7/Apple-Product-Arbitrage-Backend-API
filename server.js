// BASE SETUP
// ======================================

// CALL THE PACKAGES --------------------
var express    = require('express');		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser'); 	// get body-parser
var morgan     = require('morgan'); 		// used to see requests
var mongoose   = require('mongoose');
//var User       = require('./models/user');
var Currency 	 = require('./models/Currency.js');
var Product 	 = require('./models/Product.js');
var port       	 = process.env.PORT || 8080; // set the port for our app
var jwt 		 = require('jsonwebtoken'); //JSON web token for authentication
var databaseAccess = require("./DatabaseAccess.js");

// super secret for creating tokens
var superSecret = 'somesecretkey';

// APP CONFIGURATION ---------------------
// use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure our app to handle CORS requests
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
});

// log all requests to the console 
app.use(morgan('dev'));


// ROUTES FOR OUR API
// ======================================

// basic route for the home page
app.get('/', function(req, res) {
	res.send('Welcome to the home page!');
});


//get instance of express router
var apiRouter = express.Router();

// on routes that end in /prices/country/:model/:country_code
// http://localhost:8080/api//prices/country/ipadair2_wifi_16/ca
// ----------------------------------------------------
apiRouter.route('/prices/country/:model/:country_code')

	// get the countries products with that product model and country code
	.get(function(req, res) {
		databaseAccess.findCheapestCountryForModel(req.params.model, req.params.country_code, function(err, data) {
			if (err) return res.send(err);
			res.json(data);
		});

	})

// on routes that end in /product_line_list
// http://localhost:8080/api/product_line_list
// ----------------------------------------------------
apiRouter.route('/product_line_list')

	// get a list of all product lines
	.get(function(req, res) {
		databaseAccess.retrieveProductLineList(function(err, data) {
			if (err) return res.send(err);
			res.json(data);
		});
	})

// on routes that end in /product_list/:iPad
// http://localhost:8080/api/product_list/iPad
// ----------------------------------------------------
apiRouter.route('/product_list/:product_line_name')

	// get a list of all products
	.get(function(req, res) {
		databaseAccess.retrieveProductModelList(req.params.product_line_name, function(err, data) {
			if (err) return res.send(err);
			res.json(data);
		});
	})

// on routes that end in /country_list
// http://localhost:8080/api/country_list
// ----------------------------------------------------
apiRouter.route('/country_list')

	// get a list of all countries
	.get(function(req, res) {
		databaseAccess.retrieveCountryList(function(err, data) {
			if (err) return res.send(err);
			res.json(data);
		});
	})

// REGISTER OUR ROUTES -------------------------------
//All routes prefixed with /api
app.use('/api', apiRouter);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server Listening on port ' + port);







