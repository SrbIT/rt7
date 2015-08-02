/**
 * Created by soh-l on 21/07/2015.
 */
var express = require('express');

var PORT = 6379,
    HOST = '127.0.0.1',
//HOST = '125.212.209.198',
    redis_client = require("redis").createClient(PORT, HOST);

var app = express();


app.get('/', function (req, res) {
    res.send('hello world');
});

app.get('/api', function (req, res) {


    var vKeyHost = "a"
    console.log(vKeyHost)

    //redis_client.hgetall(vKeyHost, function (err, reply) {
    redis_client.get(vKeyHost, function (err, data) {

        console.log(data);
        res.jsonp(JSON.parse(data));
    });
    //res.jsonp("2");
});

app.listen(3000);