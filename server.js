var helper = require('./helper');
var url = require('url');
var express = require('express');  
var apiv1 = require('./apiv1');
var auth = require('./auth');
var tickprotocol = require('./tickprotocol');
var tick = require('./tick');

var server = require('http').createServer(app);

var app = express();
helper.connectMongodb();

app.use(require('body-parser')());

app.get('/', function (req, res) {  
        res.sendfile(__dirname + '/public/index.html');  
    });
app.use('/public', express.static(__dirname + '/public'));
app.use('/upload', express.static(__dirname + '/upload'));

apiv1.serve(app);
auth.serve(app);

tickprotocol.installConnectHandler(server, tick.tickHandler);

server.listen(helper.config.server.port, helper.config.server.host);
console.log('daemon start on http://' + helper.config.server.host + ':' + helper.config.server.port);
