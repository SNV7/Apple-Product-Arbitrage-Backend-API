var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CurrencySchema = new Schema(
{
    price_usd: Number,
    currency_symbol: String,
    last_updated: Date,
    currency_name: String
    },
	{collection:"DATA_Currency"}
);

module.exports = mongoose.model('Currency', CurrencySchema);


