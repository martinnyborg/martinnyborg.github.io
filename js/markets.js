class Market {
    constructor() {
        this.apiAdrress = "";
        this.priceInfo = "";
        this.id = null;
        this.percentage = 0;
        this.latestPrice = 0;
    }
    getAdrress() {
        return this.apiAdrress;
    }

    fetchPrices(fctn) {}

    runWebsocketTicker(updateTicker) {

    }

    getPriceInfo() {
        return this.priceInfo;
    }

    getId() {
        return this.id;
    }

    getLatestPrice() {
        return this.latestPrice;
    }

    setLatestPrice(v) {
        this.latestPrice = v;
    }

    getPercentage() {
        return this.percentage;
    }

    setPercentage(v) {
        this.percentage = v;
    }
}

class Coinmarketcap extends Market {

    constructor() {
        super();
        this.apiAdrress = "https://api.coinmarketcap.com/v1/ticker/tron/";
        this.priceInfo = "Based on Bitfinex 24h timeframe";
        this.id = 0;
    }

    runWebsocketTicker(updateTicker) {
        var _this = this;
        $.getJSON('https://api.coinmarketcap.com/v1/ticker/tron/', function(data) {
            _this.latestPrice = data[0].price_usd;
            _this.percentage = data[0].percent_change_1h;
            updateTicker(_this.getPercentage(), _this.getLatestPrice(), _this.getId());
        });
    }

    fetchPrices(fctn) {
        var _this = this;
        $.ajax({
            dataType: "json",
            url: this.getAdrress(),
            success: function(data) {
                _this.setPercentage(data.percent_change_1h);
                _this.setLatestPrice(data.price_usd);
                fctn(_this.getPercentage(), _this.getLatestPrice(), _this.id);
            }
        });
    }

}
