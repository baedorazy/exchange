let client = require('cheerio-httpcli'),
    URLType =  require('url'),
    request = require('request'),
    fs = require('fs'),
    moment = require('moment'),
    url = "https://m.search.naver.com/search.naver?sm=mtp_hty.top&where=m&query=%ED%99%98%EC%9C%A8";

let cron = require('node-cron');
let colors = require('colors');

cron.schedule('*/2 * * * *', function(){
	
	let d = new Date();
	let fileName = d.toISOString().slice(0,10).replace(/-/g, '');
	let fileCon = moment(d).format('YYYY-MM-DD HH:mm:ss');

	client.fetch(url, {}, function(err, $, res) {
		if(err) { console.log( "err: " + err ); return;}
		
		let msg = $(".price_info strong").text();

		fs.appendFileSync( fileName+'.txt', fileCon + ': '+msg+ '\n', 'utf-8', function(err, data) {
			if(err) {throw err};
		});
		console.log( colors.green(fileCon), ': ', colors.rainbow(msg) ); 
	});
});
	

