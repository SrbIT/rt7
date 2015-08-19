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
        var redisISPKey = vMinuteFormatter + ":isp:"
        var redisInfoKey = vMinuteFormatter + ":info:"
        var redisDeviceKey = vMinuteFormatter + ":device:"
        var redisProfileKey = vMinuteFormatter + ":profile:"

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
        client_Redis.hgetall(redisISPKey, function (err, reply) {

            if (reply === null) {

                var tmp = [{name: "fpt", y: 1265},
                    {name: "vnpt", y: 2970},
                    {name: "viettel", y: 1466},
                    {name: "other", y: 246},
                    {name: "SCTV", y: 124},
                    {name: "CMC", y: 113},
                    {name: "SPT", y: 25}]
                console.log(redisISPKey)
                console.log("E" + err)
                socket.emit("echo3", tmp)
            } else {

                var keys = Object.keys(reply);
                var data = [];
                for (var i = 0; i < keys.length; i++) {
                    var z = {};
                    z.name = keys[i];
                    z.y = parseInt(reply[keys[i]]);
                    data.push(z);
                }

                socket.emit("echo3", data)
            }

        })
        client_Redis.hgetall(redisInfoKey, function (err, reply) {

            if (reply === null) {

                var tmp = [{name: "hot", y: 2648},
                    {name: "cool", y: 211},
                    {name: "warm", y: 135}]
                console.log(redisInfoKey)
                console.log("E" + err)
                socket.emit("echo4", tmp)
            } else {

                var keys = Object.keys(reply);
                var data = [];
                for (var i = 0; i < keys.length; i++) {
                    var z = {};
                    z.name = keys[i];
                    z.y = parseInt(reply[keys[i]]);
                    if (z.name !== "hoto") {
                        data.push(z);
                    }
                }

                socket.emit("echo4", data)

            }

        })
        client_Redis.hgetall(redisDeviceKey, function (err, reply) {

            if (reply === null) {

                var tmp = [{name: "pc", y: 4749},
                    {name: "ipad", y: 763},
                    {name: "android", y: 297},
                    {name: "iphone", y: 470},
                    {name: "dunehd", y: 96},
                    {name: "other", y: 1}]
                console.log(redisProductKey)
                console.log("E" + err)
                socket.emit("echo5", tmp)
            } else {

                var keys = Object.keys(reply);
                var data = [];
                for (var i = 0; i < keys.length; i++) {
                    var z = {};
                    z.name = keys[i];
                    z.y = parseInt(reply[keys[i]]);
                    data.push(z);
                }

                socket.emit("echo5", data)
            }

        })
        client_Redis.hgetall(redisProfileKey, function (err, reply) {

            if (reply === null) {

                var tmp = [{name: "450p", y: 747},
                    {name: "360p", y: 2748},
                    {name: "180p", y: 201},
                    {name: "576p", y: 830},
                    {name: "270p", y: 1052},
                    {name: "720p", y: 2080},
                    {name: "other", y: 7},
                    {name: "1080p", y: 90},
                    {name: "1008p", y: 1}]
                console.log(redisProductKey)
                console.log("E" + err)
                socket.emit("echo6", tmp)
            } else {

                var keys = Object.keys(reply);
                var data = [];
                for (var i = 0; i < keys.length; i++) {
                    var z = {};
                    z.name = keys[i];
                    z.y = parseInt(reply[keys[i]]);
                    data.push(z);
                }

                socket.emit("echo6", data)
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

    }, 20000);

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

    socket.on("message3", function (data) {
        console.log(data);

        var tmp = [{name: "fpt", y: 1265},
            {name: "vnpt", y: 2970},
            {
                name: "viettel", y: 1466,
                sliced: true,
                selected: true
            },
            {name: "other", y: 246},
            {name: "SCTV", y: 124},
            {name: "CMC", y: 113},
            {name: "SPT", y: 25}]

        socket.emit("echo3", tmp)

    });

    socket.on("message4", function (data) {
        console.log(data);

        var tmp = [{name: "hot", y: 2648},
            {name: "cool", y: 211},
            {
                name: "warm", y: 135,
                sliced: true,
                selected: true
            }]

        socket.emit("echo4", tmp)

    });

    socket.on("message5", function (data) {
        console.log(data);

        var tmp = [{name: "pc", y: 4749},
            {
                name: "ipad", y: 763,
                sliced: true,
                selected: true
            },
            {name: "android", y: 297},
            {name: "iphone", y: 470},
            {name: "dunehd", y: 96},
            {name: "other", y: 1}]

        socket.emit("echo5", tmp)

    });

    socket.on("message6", function (data) {
        console.log(data);

        var tmp = [{name: "450p", y: 747},
            {name: "360p", y: 2748},
            {name: "180p", y: 201},
            {name: "576p", y: 830},
            {name: "270p", y: 1052},
            {
                name: "720p", y: 2080
                ,
                sliced: true,
                selected: true
            },
            {name: "other", y: 7},
            {name: "1080p", y: 90},
            {name: "1008p", y: 1}]


        socket.emit("echo6", tmp)

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
