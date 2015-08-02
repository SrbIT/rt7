var redis = require("redis"),
    client1 = redis.createClient(), client2 = redis.createClient();

//client1.on("subscribe", function (channel, count) {
    client2.publish("a nice channel", "I am sending a message 2.");
    client2.publish("a nice channel", "I am sending a second message.");
    client2.publish("a nice channel", "I am sending my last message.");
//});
