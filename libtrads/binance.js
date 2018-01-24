const WebSocket = require("ws");
const _ = require("lodash");

let binance = (io) => {
    let wss2 = new WebSocket('wss://stream.binance.com:9443/ws/!ticker@arr');
    wss2.on('open', () => {
    })
    wss2.on('message', (msg) => {
        msg = JSON.parse(msg);
        let data = [];
        msg.forEach(m => {
            if (new RegExp('BTC', 'gi').test(m.s)) {
                if (new RegExp('usdt', 'gi').test(m.s)) {
                    data.push( {
                        symbol: m.s.replace(/usdt/i, 'USD'),
                        price: m.b,
                        web:'benance'
                    })
                } else {
                    data.push( {
                        symbol: m.s,
                        price: m.b,
                        web:'Benance'
                    })
                }
                
            }
            
        })
        // data.forEach(m => {
        //     // console.log(m);
        // })
        io.emit('binance',data)
    })
};
let binancefinding = (symbol, io) => {
    symbol = _.toLower(symbol);
    if (symbol === 'btc') {
        symbol += 'usdt';
    } else {
        symbol += 'btc';
    }
    let wss2 = new WebSocket('wss://stream.binance.com:9443/ws/'+symbol+'@ticker');
    wss2.on('open', () => {
    })
    wss2.on('message', (msg) => {
        msg = JSON.parse(msg);
        io.emit('binancefind',msg)
    })
};
module.exports = {
    binance,binancefinding
}