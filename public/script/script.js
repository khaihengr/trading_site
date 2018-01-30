

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
                <td class="${msg.web}">${Number.parseFloat(msg.price).toPrecision(8)}</td>
                <td></td>
                <td></td>
                </tr>
                `)
            }
            
        } else {
            // var hasDiff = $('#trad_body > tr.' + msg.symbol + ' > td:nth-child(5)').hasClass('diff');
            // if (!add_permission&&!hasDiff) {
            //     $('#trad_body > tr.' + msg.symbol).append(`<td class="diff"></td>`);
            // }
            var elem = $("." + msg.symbol + " > td:nth-child(2)");
            // var bitfinex = $('.' + msg.symbol + ' > td:nth-child(2)').text();
            // var bittrex = $('.' + msg.symbol + ' > td:nth-child(3)').text();
            // var binance = $('.' + msg.symbol + ' > td:nth-child(4)').text();
            // if (!add_permission && is_take(bittrex, bitfinex, binance)) {
            //     bitfinex = parseFloat((bitfinex != "" ? bitfinex : 0));
            //     bittrex = parseFloat((bittrex != "" ? bittrex : 0));
            //     binance = parseFloat((binance != "" ? binance : 0));
            //     var diff = get_diff(bittrex, binance, bitfinex);
            //     $('#trad_body > tr.'+msg.symbol+' > td:nth-child(5)').text(diff);
            // } 
            var old = parseFloat(elem.html());
            if (old < parseFloat(msg.price)) {
                elem.css('background-color', '#3e923b');
            }else if (old == parseFloat(msg.price)) { 
                elem.css('background-color', '#3b6e92');
            }else {
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
                        <td class="${d.web}">${Number.parseFloat(d.price).toPrecision(8)}</td>
                        </tr>
                        `)
                    }
                    
                } else {
                    // var hasDiff = $('#trad_body > tr.' + msg.symbol + ' > td:nth-child(5)').hasClass('diff');
                    // if (!add_permission&&!hasDiff) {
                    //     $('#trad_body > tr.' + msg.symbol).append(`<td class="diff"></td>`);
                    // }
                    var elem = $("." + d.symbol + " > td:nth-child(4)");
                    // var bitfinex = $('.' + msg.symbol + ' > td:nth-child(2)').text();
                    // var bittrex = $('.' + msg.symbol + ' > td:nth-child(3)').text();
                    // var binance = $('.' + msg.symbol + ' > td:nth-child(4)').text();
                    // if (!add_permission && is_take(bittrex, bitfinex, binance)) {
                    //     bitfinex = parseFloat((bitfinex != "" ? bitfinex : 0));
                    //     bittrex = parseFloat((bittrex != "" ? bittrex : 0));
                    //     binance = parseFloat((binance != "" ? binance : 0));
                    //     var diff = get_diff(bittrex, binance, bitfinex);
                    //     $('#trad_body > tr.'+msg.symbol+' > td:nth-child(5)').text(diff);
                    // } 
                    
                    var old = parseFloat(elem.html());
                    if (old < parseFloat(d.price)) {
                        elem.css('background-color','#3e923b')
                    }else if (old == parseFloat(d.price)) { 
                        elem.css('background-color', '#3b6e92');
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
                        <td class="${d.web}">${Number.parseFloat(d.price).toPrecision(8)}</td>
                        <td></td>
                        </tr>
                        `)
                    }
                } else {
                    // var hasDiff = $('#trad_body > tr.' + msg.symbol + ' > td:nth-child(5)').hasClass('diff');
                    // if (!add_permission&&!hasDiff) {
                    //     $('#trad_body > tr.' + msg.symbol).append(`<td class="diff"></td>`);
                    // }
                    var elem = $("." + d.symbol + " > td:nth-child(3)");
                    
                    // var bitfinex = $('.' + msg.symbol + ' > td:nth-child(2)').text();
                    // var bittrex = $('.' + msg.symbol + ' > td:nth-child(3)').text();
                    // var binance = $('.' + msg.symbol + ' > td:nth-child(4)').text();
                    // if (!add_permission && is_take(bittrex, bitfinex, binance)) {
                    //     bitfinex = parseFloat((bitfinex != "" ? bitfinex : 0));
                    //     bittrex = parseFloat((bittrex != "" ? bittrex : 0));
                    //     binance = parseFloat((binance != "" ? binance : 0));
                    //     var diff = get_diff(bittrex, binance, bitfinex);
                    //     $('#trad_body > tr.'+msg.symbol+' > td:nth-child(5)').text(diff);
                    // } 
                    var old = parseFloat(elem.html());
                    if (old < parseFloat(d.price)) {
                        elem.css('background-color','#3e923b')
                    }else if (old == parseFloat(d.price)) { 
                        elem.css('background-color', '#3b6e92');
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
    var get_diff = (a, b, c) => {
        // a = a.toFixed(8);
        // b = b.toFixed(8);
        // c = c.toFixed(8);
        var min = a>0?a:b;
        var max = b>0?b:c;
        if (min > b&&b!=0) min = b;
        if (min > c&&c!=0) min = c;
        if (max < a&&a!=0) max = a;
        if (max < c&&c!=0) max = c;
        var val = max - min;
        return val;
    }
    var get_min_max = (bitfinex, bittrex, binance) => {
        var obj={min:"bitfinex",max:"bittrex"}
        var min = bitfinex>0?bitfinex:bittrex;
        var max = bittrex>0?bittrex:binance;
        if (min > bittrex&&bittrex!=0) min = bittrex;
        if (min > binance&&binance!=0) min = binance;
        if (max < bitfinex&&bitfinex!=0) max = bitfinex;
        if (max < binance && binance != 0) max = binance;
        if (min == bittrex) obj.min = "bittrex";
        if (min == binance) obj.min = "binance";
        if (max == binance) obj.max = "bifinex";
        if (max == binance) obj.max = "binance";
        return obj;
    }
    var is_take = function (a, b, c) {
        var count = 0;
        if (a != 0) count++;
        if (b != 0) count++;
        if (c != 0) count++; 
        if (count >= 2) return true;
        return false;
    }
    var init_sort = () => {
        var sort = [];
        $("#trad_body tr").each(function(i,e) {
            var bitfinex = $(e).children('td:nth-child(2)').text();
            var bittrex = $(e).children('td:nth-child(3)').text();
            var binance = $(e).children('td:nth-child(4)').text();
            
            if (is_take(bittrex, bitfinex, binance)) {
                bitfinex = parseFloat((bitfinex != "" ? bitfinex : 0));
                bittrex = parseFloat((bittrex != "" ? bittrex : 0));
                binance = parseFloat((binance != "" ? binance : 0));
                min_max_obj = get_min_max(bitfinex, bittrex, binance);
                sort.push({
                    symbol: $(e).attr('class'), bitfinex, bittrex, binance, diff: 0,
                    min: min_max_obj.min,
                    max:min_max_obj.max
                })
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
            for (var i = 0; i < sort.length; i++){
                sort[i].diff = get_diff(sort[i].bittrex, sort[i].binance, sort[i].bitfinex);
            }
            setTimeout(() => {
                var s = sort.sort((a, b) => {
                    return b.diff - a.diff;
                });
                hide_all();
                setTimeout(() => {
                    console.log(s);
                    $("#mytrad thead tr").append(`<th data-sort="float"><h1>Compare</h1></th>`);
                    s.forEach(function (r) {
                        $("#trad_body tr."+r.symbol).append(`<td class="compare">${r.diff}</td>`);
                        $("#trad_body").append(`<tr >${$("#trad_body tr."+r.symbol).html()}</tr>`);
                    })
                },500)
            }, 500);
        } else {
            // hide_all();
            $("#mytrad > thead > tr > th:nth-child(5)").remove();
            
            $("#trad_body tr").each(function (i, e) {
                $(this).remove();
            })
            add_permission = true;
        }
    })
    var hide_all = () =>
    {
        $("#trad_body tr.compare").each((i, e) => {
            $(e).hide();
        })
    }    
    var hide_row = () => {
        $("#trad_body tr").each((i, e) => {
            var bitfinex = $(e).children('td:nth-child(2)').text();
            var bittrex = $(e).children('td:nth-child(3)').text();
            var binance = $(e).children('td:nth-child(4)').text();
            if (!is_take(bittrex, bitfinex, binance)) {
                $(e).hide();
            }
        })
    }
    $("#mytrad").stupidtable();
    
})
