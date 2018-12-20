var express=require('express');
var cors=require('cors');
var path=require('path');
var bodyParser=require('body-parser');

var index=require('./routes/index');
var tasks=require('./routes/tasks');

var app=express();

var port=3000;
//view engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);


//set static folder
app.use(express.static(path.join(__dirname,'client')));

//for Aloow cros Origin
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
var originsWhitelist = [
    'http://localhost:4200',      //this is my front-end url for development
     //'http://www.myproductionurl.com'
  ];
  var corsOptions = {
    origin: function(origin, callback){
          var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
          callback(null, isWhitelisted);
    },
    credentials:true
  }
  //here is the magic
  app.use(cors(corsOptions));



//usng routes folders
app.use('/',index);
app.use('/api',tasks);

app.listen(port,function(){
    console.log('server started on port '+port);
});
