$(document).ready(function (event) {
    var socket = io();
    socket.on('bitfinex', (msg) => {
        var check = $("#trad_body > tr").hasClass
            (msg.symbol);
        console.log(check)
        var body = $("#trad_body");
        if (!check) {
            body.append(`
            <tr class="${msg.symbol}">
            <td>${msg.symbol}</td>
            <td>${msg.price}</td>
            <td></td>
            <td></td>
            </tr>
            `)
        } else {
            var elem = $("." + msg.symbol + " > td:nth-child(2)");
            var old = parseFloat(elem.html());
            if (old < parseFloat(msg.price)) {
                elem.css('background-color', '#47b04f');
            } else {
                elem.css('background-color', "#b04747");
            }
            elem.html(msg.price)
        }
    })
    setTimeout(() => {
        socket.on('binance', (msg) => {
            msg.forEach(d => {
                var check = $("#trad_body > tr").hasClass
                    (d.symbol);
                console.log(check +" - "+ d.symbol);
                var body = $("#trad_body");
                if (!check) {
                    body.append(`
                    <tr class="${d.symbol}">
                    <td >${d.symbol}</td>
                    <td></td>
                    <td></td>
                    <td>${d.price}</td>
                    </tr>
                    `)
                } else {
                    var elem = $("." + d.symbol + " > td:nth-child(4)");
                var old = parseFloat(elem.html());
                if (old < parseFloat(d.price)) {
                    elem.css('background-color','#47b04f')
                } else {
                    elem.css('background-color','#b04747')
                }   
                elem.html(d.price)
                }
            })
        })
        socket.on('bittrex', (msg) => {
            msg.forEach(d => {
                var check = $("#trad_body > tr").hasClass
                    (d.symbol);
                console.log(d.symbol + check);
                var body = $("#trad_body");
                if (!check) {
                    body.append(`
                    <tr class="${d.symbol}">
                    <td >${d.symbol}</td>
                    <td></td>
                    <td>${d.price}</td>
                    <td></td>
                    </tr>
                    `)
                } else {
                    var elem = $("." + d.symbol + " > td:nth-child(3)");
                var old = parseFloat(elem.html());
                if (old < parseFloat(d.price)) {
                    elem.css('background-color','#47b04f')
                } else {
                    elem.css('background-color','#b04747')
                }
                elem.html(d.price)
                }
            })
        })
    },500)
})