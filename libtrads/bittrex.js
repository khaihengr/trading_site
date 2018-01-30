const WebSocket = require("ws");
const _ = require("lodash");
const bt = require('node-bittrex-api');
const util = require("util");

let bittrex = (io) => {
    bt.websockets.listen(function (data, client) {
        if (data.M === 'updateSummaryState') {
            var msg = data.A; msg = msg[0]; msg = msg.Deltas;
            for (let i = 0; i < msg.length; i++){
                var s = _.replace(msg[i].MarketName, "-", "");
                s = s.substring(3, s.length)+s.substring(0, 3);
                if(s[0]==='T')s=s.replace("T","");
                msg[i].MarketName = s;
            }
            let arr = [];
            msg.forEach(e => {
                if (new RegExp('BTC', 'gi').test(e.MarketName)) {
                    arr.push({
                        symbol: e.MarketName,
                        price: e.Last,
                        web:'bittrex'
                    })
                }
            });
            io.emit("bittrex", arr);
        }
    });
}    
let bittrexfinding = (symbol, io) => {
    if (symbol === 'BTC') {
        symbol+='-USDT'
    } else {
        symbol += '-BTC'
    }
    console.log(symbol);
    
    bt.websockets.subscribe(['USDT-BTC'], (data, client) => {
        if (data.M === 'updateExchangeState') {
            var msg = data.A; msg = msg[0]; 
            console.log(msg);
        }
    })
}
module.exports = {
    bittrex,bittrexfinding
}