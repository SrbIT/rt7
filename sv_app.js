// API to get content based on responses from Redis
var moment = require('moment');

var http = require("http"), server,
    PORT = 6379,
    HOST = '127.0.0.1',
//HOST = '125.212.209.198',
    redis_client = require("redis").createClient(PORT, HOST);


redis_client.on("error", function (err) {
    console.log("Error " + err);
});


server = http.createServer(function (request, response) {
    response.writeHead(200, {
        //"Content-Type": "text/plain"
        //"Content-Type": "text/plain"
        "Content-Type": "application/javascript"
        //"Content-Type": "application/javascript"

    });

    var redis_host;
    //var vMinuteFormatter = moment().format("YYYYMMDDHHmm") - 1
    //var vKeyHost = vMinuteFormatter + ":host"
    var vKeyHost = "a"
    console.log(vKeyHost)

    //redis_client.hgetall(vKeyHost, function (err, reply) {
    redis_client.get(vKeyHost, function (err, data) {

        console.log(data);
        //redis_host = JSON.stringify(reply);
        //response.write(" + redis_host + ");
        //response.write({"a",JSON.parse(redis_host))};
        //response.write(JSON.parse(redis_host));
        //response.write(redis_host);

        response.end();

    });

}).listen(8090);
