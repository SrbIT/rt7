var express = require("express");
var http = require("http");
var path = require("path");

var socketio = require("socket.io");
var moment = require('moment');
var app = express();
var server = http.createServer(app);
var io = socketio.listen(server);
var redis = require("redis");

var PORT = 6379,
    HOST = '127.0.0.1',
    client_Redis = redis.createClient(PORT, HOST);

app.use(express.static("public"));
app.use(express.static(__dirname));


app.get("/foo", function (req, res, next) {
    res.send(200, {
        body: "Hello from foo!"
    });
});

app.get('/mon', function (req, res) {
    console.log()

    res.sendFile(path.join(__dirname + '/index5.html'));

});

io.on("connection", function (socket) {

    var interVal = setInterval(function () {

        var vMinuteFormatter = moment.utc().subtract(1, 'minutes').format("YYYYMMDDHHmm")
        //var vMinuteFormatter = "201507231017"
        var redisSessionKey = vMinuteFormatter + ":session:"
        var redisProductKey = vMinuteFormatter + ":product:"

        client_Redis.hgetall(redisProductKey, function (err, reply) {

            if (reply === null) {

                var tmp = [{name: "hdo", y: 10},
                    {name: "hdviet", y: 20},
                    {name: "vip_hdviet", y: 10}]
console.log(redisProductKey)
                console.log("E" + err)
                socket.emit("echo1", tmp)
            } else {

                var keys = Object.keys(reply);
                var data = [];
                for (var i = 0; i < keys.length; i++) {
                    var z = {};
                    z.name = keys[i];
                    z.y = parseInt(reply[keys[i]]);
                    data.push(z);
                }

                socket.emit("echo1", data)
            }

        })

        client_Redis.hlen(redisSessionKey, function (err, reply) {
            console.log(err)

            if (reply === null) {
                socket.emit("echo2", "0")
            } else {

                socket.emit("echo2", reply)
            }

        })

    }, 30000);

    socket.on("message1", function (data) {
        console.log(data);

        var tmp = [{name: "hdo", y: 35},
            {name: "hdviet", y: 35},
            {
                name: "vip_hdviet", y: 30,
                sliced: true,
                selected: true
            }]

        socket.emit("echo1", tmp)

    });

    socket.on("message2", function (data) {
        console.log(data);

        socket.emit("echo2", "7000")

    });

    socket.on('disconnect', function () {
        clearInterval(interVal)
        console.log("Disconnect")
    });
});

server.listen(3000)
console.log("Server listening port: 3000")
