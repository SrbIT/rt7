/**
 * Created by soh-l on 22/07/2015.
 */
var moment = require('moment');
var redis = require("redis");
var PORT = 6379,
    HOST = '127.0.0.1',
    client_Redis = redis.createClient(PORT, HOST);


client_Redis.on("error", function (err) {
    console.log("Error " + err);
});


//var vMinuteFormatter = moment().format("YYYYMMDDHHmm")
//var vMinuteFormatter = moment().format("YYYYMMDDHHmm") - 2

var vMinuteFormatter = 201507221109
//var vMinuteFormatter = 201507221100
console.log(vMinuteFormatter - 1)
var avg;

function getDataRedis(i, total) {
    //setTimeout(function () {

        if (i < 5) {
            client_Redis.get(vMinuteFormatter - i, function (err, reply) {
                console.log(reply);
                total = total + parseInt(reply);
                //console.log(total);
                getDataRedis(i + 1, total);
            });
        } else {
            console.log(Math.round(total / 3));
            avg = Math.round(total / 3);
            //client_Redis.quit();
            console.log("Avg: " + avg);
        }


    //}, 1000);
}

getDataRedis(0, 0);


console.log("Avg: " + avg);
