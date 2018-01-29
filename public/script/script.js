
$(document).ready(function (event) {
    let add_permission = true;
    var socket = io();
    socket.on('bitfinex', (msg) => {
        var check = $("#trad_body > tr").hasClass
        (msg.symbol);
        var body = $("#trad_body");
        if (!check) {
            if (add_permission) {
                body.append(`
                <tr class="${msg.symbol}">
                <td>${msg.symbol}</td>
                <td>${Number.parseFloat(msg.price).toPrecision(8)}</td>
                <td></td>
                <td></td>
                </tr>
                `)
            }
        } else {
            var elem = $("." + msg.symbol + " > td:nth-child(2)");
            var old = parseFloat(elem.html());
            if (old <= parseFloat(msg.price)) {
                elem.css('background-color', '#3e923b');
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
                var body = $("#trad_body");
                if (!check) {
                    if (add_permission) { 
                        body.append(`
                        <tr class="${d.symbol}">
                        <td >${d.symbol}</td>
                        <td></td>
                        <td></td>
                        <td>${Number.parseFloat(d.price).toPrecision(8)}</td>
                        </tr>
                        `)
                    }
                    
                } else {
                    var elem = $("." + d.symbol + " > td:nth-child(4)");
                    var old = parseFloat(elem.html());
                    if (old <= parseFloat(d.price)) {
                        elem.css('background-color','#3e923b')
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
                var body = $("#trad_body");
                if (!check) {
                    if (add_permission) {
                        body.append(`
                        <tr class="${d.symbol}">
                        <td >${d.symbol}</td>
                        <td></td>
                        <td class="">${Number.parseFloat(d.price).toPrecision(8)}</td>
                        <td></td>
                        </tr>
                        `)
                    }
                } else {
                    var elem = $("." + d.symbol + " > td:nth-child(3)");
                    var old = parseFloat(elem.html());
                    if (old <= parseFloat(d.price)) {
                        elem.css('background-color','#3e923b')
                    } else {
                        elem.css('background-color','#b04747')
                    }
                    elem.html(d.price)
                }
            })
        })
    }, 2000)
    var table = $(".container"), children, searchString;
	$("#filter").keyup(function(){
		//Get all table columns
		children = table.find('td');
		searchString = $(this).val().toLowerCase();
		//Hide all rows except the for table header
		table.find('tr:gt(0)').hide();
		//Loop through all table columns
		children.each(function(index, child){
			//If search string matches table column
			if(child.innerHTML.toLowerCase().indexOf(searchString) != -1) {
				//Show table row
				$(child).closest('tr').show();
			};
		});
    });
    var get_min_max = (a, b, c) => {
        a = parseFloat(a)||0;
        b = parseFloat(b)||0;
        c = parseFloat(c) || 0;
        a = Number.parseFloat(a).toFixed(8);
        b = Number.parseFloat(b).toFixed(8);
        c = Number.parseFloat(c).toFixed(8);
        var min = a;
        var max = b;
        if (min > b) min = b;
        if (min > c) min = c;
        if (max < a) max = a;
        if (max < c) max = c;
        var val = max - min;
        val = Number.parseFloat(val).toFixed(10);
        return val;
    }
    var init_sort = () => {
        var sort = [];
        $("#trad_body tr").each((i,e) => {
            // console.log($(e).text())
            var bitfinex = $(e).children('td:nth-child(2)').text();
            var bittrex = $(e).children('td:nth-child(3)').text();
            var binance = $(e).children('td:nth-child(4)').text();
            if (bitfinex == '' || bittrex == '' || binance == '') {
                
            } else {
                sort.push({
                    name: $(e).attr('class'),
                    val: get_min_max(bitfinex, bittrex, binance)
                });
            }
            
        })
        return sort;
    }
    
    $("#filter-checkbox").change(() => {
        var checked = $("#filter-checkbox").is(':checked');
        if (checked) {
            add_permission = false;
            hide_row();
            var sort = init_sort();
            var s = sort.sort((a, b) => {
                return b.val-a.val ;
            });
            hide_all();
            var arr = [];
            for (var i in s) {
                var key = s[i].name;
                $("#trad_body tr").each((i, e) => {
                    var sb = $(e).children('td:nth-child(1)').text();
                    if (sb == key) {
                        arr.push(e);
                    }
                })
            }
            arr.forEach(r => {
                $(r).show();
            })
            console.log(arr);
        } else {
            hide_all();
            add_permission = true;
        }
    })
    var hide_all = () =>
    {
        $("#trad_body tr").each((i, e) => {
            $(e).hide();
        })
    }    
    var hide_row = () => {
        $("#trad_body tr").each((i, e) => {
            var bitfinex = $(e).children('td:nth-child(2)').text();
            var bittrex = $(e).children('td:nth-child(3)').text();
            var binance = $(e).children('td:nth-child(4)').text();
            if (bitfinex == '' || bittrex == '' || binance == '') {
                $(e).hide();
            }
        })
    }

    
})