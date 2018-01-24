const WebSocket = require("ws");
const _ = require("lodash");

let bitfinexfinding = (symbol,io) => {
    let wss = new WebSocket('wss://api.bitfinex.com/ws/2');
    let symbolId = [];
    if (symbol === 'BTC') {
        symbol += 'USD';
    } else {
        symbol+='BTC'
    }
    let msg = JSON.stringify({ 
        event: 'subscribe', 
        channel: 'ticker', 
        chanId:2,
        pair: symbol
    })
    wss.on('open', () => wss.send(msg))
    wss.on('message', (msg) => {
        msg = JSON.parse(msg);
        if (msg.event === "subscribed") {
            let id = msg.chanId+"";
            symbolId[msg.chanId] = msg.symbol.replace('t','');
        } else {
            // console.log(msg[0]);
            msg[2] = symbolId[msg[0]];
            if (typeof msg[1] === "object") {
                io.emit("change",msg)
            }
            
        }
        
        
    })
};
let bitfinex = (io) => {
    let wss = new WebSocket('wss://api.bitfinex.com/ws/2');
    let symbolId = [];
    let bitfinex_symbols = ["BTCUSD","ETHBTC","XRPBTC","EOSBTC","BCHBTC","IOTABTC","NEOBTC","LTCBTC","XMRBTC","DASHBTC","OMGBTC","BTGBTC","ZECBTC","SANBTC","QTUMBTC","QASHBTC","TNBBTC","ZRXBTC","ETPBTC","SNTBTC","YYWBTC","DATABTC","MNABTC","FUNBTC","EDOBTC","GNTBTC","BATBTC","SPKBTC","AVTBTC","RRTBTC"];        
    bitfinex_symbols.forEach(s => {
        let msg = JSON.stringify({ 
            event: 'subscribe', 
            channel: 'ticker', 
            chanId:2,
            pair: s
        })
        wss.on('open', () => wss.send(msg))
    })
    wss.on('message', (msg) => {
        msg = JSON.parse(msg);
        if (msg.event === "subscribed") {
            let id = msg.chanId+"";
            symbolId[msg.chanId] = msg.symbol.replace('t','');
        } else {
            msg[2] = symbolId[msg[0]];
            if (typeof msg[1] === "object") {
                io.emit("bitfinex",{
                    symbol: msg[2],
                    price: msg[1][6],
                    web:'Bitfinex'
                })
            }
        }
    })
};
module.exports = {
    bitfinex,bitfinexfinding
}