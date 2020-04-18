// stock market portfolio app
const app = express();
var exphbs  = require('express-handlebars');
const path = require('path');

const PORT =process.env.PORT || 5000;

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const otherstuff = "hello this is other stuff!";
app.get('/', function (req, res) {
    res.render('home',{
    	stuff:otherstuff
    });
});

app.use(express.static(path.join(__dirname,'public')));

app.listen(PORT,()=>console.log('Server listenning on port'));