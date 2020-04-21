// stock market portfolio app
const express = require('express');
const app = express();
var exphbs  = require('express-handlebars');
const path = require('path');
const request =  require('request');
const bodyParser =require('body-parser');
const PORT = process.env.PORT || 3000;

//sk_3becb91acd1d437397ce9f1ff2db140a
app.use(bodyParser.urlencoded({extended: false}));

function call_api(finishedAPI,ticker)
{
request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=sk_3becb91acd1d437397ce9f1ff2db140a',{json: true},(err,res,body) =>{
	if(err){return console.log(err);}
	if(res.statusCode === 200){
		//console.log(body);
		finishedAPI(body);
	}
});
};
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const otherstuff = "hello this is other stuff!";



app.get('/', function (req, res) {
	call_api(function(doneAPI){
		 res.render('home',{
    	stock: doneAPI
    	});
	}, "fb");
});

app.post('/', function (req, res) {
	call_api(function(doneAPI){
	//	posted_stuff=req.body.stock_ticker;
		 res.render('home',{
    	stock: doneAPI
    	});
	}, req.body.stock_ticker);
});

app.get('/about.html', function (req, res) {
    res.render('about');
});

app.use(express.static(path.join(__dirname,'public')));

app.listen(PORT,() => console.log('Server listenning on port'));