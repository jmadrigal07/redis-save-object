//incluimos redis a nuestro script
var redis = require('redis');

//creamos un cliente
var redisClient = redis.createClient({
    host: "redis-cache",
    password: "asdqwe123"
});
redisClient.on('connect', function () {
    console.log('Conectado a Redis Server');
});

var circle = {
    radius: 10,
    area: function () {
        return Math.PI * this.radius * this.radius;
    }
};

console.log(circle.area());

// Parse toString the methods of your object
var parsedObject = JSON.stringify(circle, function (key, value) {
    if (typeof value === 'function') {
        return value.toString();
    } else {
        return value;
    }
});

redisClient.set("circle", String(parsedObject));
redisClient.get("circle", function (err, reply) {
    if (err) throw err;
    console.log("-------------------");
    var newObj = JSON.parse(reply);
    // Recreate the methods in your object
    newObj.area = new Function(`return ${newObj.area}`)();
    console.log("area: ", newObj.area());
});
