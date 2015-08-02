var express = require("express");
var http = require("http");
var socketio = require("socket.io");
var app = express();
var server = http.createServer(app);
var io = socketio.listen(server);
var redis = require("redis");

var PORT = 6379,
    HOST = '127.0.0.1',
    client_RedisC = redis.createClient(PORT, HOST),
    client_RedisP = redis.createClient(PORT, HOST);

app.use(express.static("public"));

app.get("/foo", function (req, res, next) {
    res.send(200, {
        body: "Hello from foo!"
    });
});

io.on("connection", function (socket) {

    var interVal = setInterval(function () {

        //console.log("Hello");
        client_RedisP.get("201507221109", function (err, reply) {
            //console.log(reply);

            //client_RedisP.publish("redis_I", parseInt(reply));
            socket.emit("echo", reply)
        })

    }, 1000);
    //client_RedisC.subscribe("redis_I");
    //
    //client_RedisC.on("message", function (channel, message) {
    //    console.log("send_IO: " + channel + ": " + message);

        //console.log(data);
        //socket.emit("echo", message);

    //});


    socket.on("message", function (data) {

        console.log(data);
        socket.emit("echo", "0");


        //client_RedisC.on("message", function (channel, message) {
        //    console.log("send_IO: " + channel + ": " + message);
        //
        //    console.log(data);
        //    socket.emit("echo", message);
        //
        //});


    });

    socket.on('disconnect', function () {
        clearInterval(interVal)
        console.log("Disconnect")
    });
});

server.listen(8000)