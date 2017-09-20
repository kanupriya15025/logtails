
var express = require('express');

var path = require('path');
var files1 = [];
//var testFolder = '/var/log';
var testFolder = process.env.folder;
const fs = require('fs');

var cp = require ('child_process'),
    spawn=cp.spawn;




fs.readdir(testFolder, (err, files) => {
  files.forEach(file => {
    //console.log(file);
    files1.push(file);
  });
})

var n = 50;
var word = 'none';



filename='';
var app = express()
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
var http = require('http');
server=http.createServer(app);
var io = require('socket.io').listen(server);

app.set('views', __dirname + '/views')
app.set('stylesheets',__dirname + '/stylesheets')

app.set('view engine', 'jade')
app.use(express.logger('dev'))


app.get('/tails/p*',function(req,res){
  //console.log("logpath:"+req.query["filename"]);
  logpath=req.query["filename"];
  console.log("filepath ="+logpath);
  if(fs.lstatSync(testFolder+"/"+logpath).isDirectory()){
    files2=[];
    fs.readdir(testFolder+"/"+logpath, (err, files) => {
  files.forEach(file => {
    console.log(file);
    files2.push(file);
  });
  console.log(req.path);
  res.render('layout',
  {lists:files2,
  currenturl:req.path,
  log:logpath,
  home:false,
  ipaddr:ip.address()})
})

  }
  else{
  n = req.query.n || n;
  word = req.query.grep || 'none';
  filename=testFolder+logpath;  
    res.render('display_file',
  {
    logfilename : testFolder+logpath,
     grep:word
  });


  }
})

app.get('/tails', function (req, res) {
  console.log("tails path="+ req.path);



  res.render('layout',
  { lists : files1 ,
  currenturl:req.path,
  home:true,
}
  )
})


io.sockets.on ('connection', function (socket)
{
  
  var tail = spawn ('tail', ['-f','-n', n, filename]);
  console.log ("INFO: Socket connected!");
  

  tail.stdout.on ('data', function (data)
  {
    
    socket.emit ('data', {
      lines: data.toString().split("\n")
    });
  });
  
  tail.stderr.on ('data', function (data)
  {
    console.log ('Error: ' + data.toString());
  });

  socket.on ('disconnect', function ()
  {
    tail.kill();
  }); 
});
server.listen(3000)