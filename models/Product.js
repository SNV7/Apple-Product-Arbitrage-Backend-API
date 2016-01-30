var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ProductSchema = new Schema(
{
	country_code: String, 
    currency_symbol: String, 
    country_name: String,
    product_line: String,
    model: String, 
    price: Number, 
    price_formatted: String, 
    date_price_updated: Date,
    product_url: String
    },
	{collection:"DATA_Product"}
);

module.exports = mongoose.model('Product', ProductSchema);


