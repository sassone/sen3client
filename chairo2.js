const Chairo = require('chairo');
const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 3100 });

//, host: 'localhost'

// Pass options to the Seneca constructor
var senecaOptions = { log: 'silent' };

// Register plugin

server.register({ register: Chairo, options: senecaOptions }, function (err) {

    // Add a Seneca action

    let id = 0;
    server.seneca.add({ generate: 'id' }, function (message, next) {

        return next(null, { id: ++id });
    });

    // Invoke a Seneca action

    server.seneca.act({ generate: 'id' }, function (err, result) {

        // result: { id: 1 }
    });
});

server.route({
    method: 'POST',
    path: '/a/id',
    handler: function (request, reply) {
        // Invoke a Seneca action using the request decoration
    request.seneca.act({ generate: 'id' }, function (err, result) {
    if (err) {
    return reply(err);
    }
   return reply(result);
    });
}
});

server.route({
    method: 'GET',
    path: '/a/id',
    handler: function (request, reply) {
        // Invoke a Seneca action using the request decoration
        var seneca = require("seneca")();
        // host: "127.0.0.1",
        seneca.client({ host: "sen3.sen3.senecachiaro", port: 3000 }).act({ "role": "users", "cmd": "get", "id": 5 }, function (err, response) {
            if (err) {
                return reply(err);
            }
            return reply(response);
        })
    }
});

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Hello, world!');
    }
});

server.route({
    method: 'GET',
    path: '/{name}',
    handler: function (request, reply) {
        reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
    }
});



server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at:`);
});

