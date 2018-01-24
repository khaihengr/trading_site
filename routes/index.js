"use strict";
module.exports = (io) => {
    let router = require("express").Router();
    const WebSocket = require("ws");
    const _ = require("lodash");
    const { bittrex,bittrexfinding } = require("../libtrads/bittrex");
    const { bitfinex,bitfinexfinding } = require("../libtrads/bitfinex");
    const { binance,binancefinding } = require("../libtrads/binance");
    const { poloniex } = require("../libtrads/poloniex");
    router.get('/',(req,res)=>{
        io.on('connection', function (socket) {
            bitfinex(io);
            binance(io);
            bittrex(io);
        });
        res.render("index",{tab:"screen/trad"})
    })
    router.get('/find',(req,res)=>{
        io.on('connection', function (socket) {
            let symbol = req.query.symbol;
            bitfinexfinding("BTC",io);
            binancefinding("BTC", io);
            bittrexfinding("BTC", io);
        });
        res.render("index",{tab:"screen/trad"})
    })
    


    return router;
}
