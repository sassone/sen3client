module.exports = function (options) {

    this.add({ foo: 'bar' }, function (args, done) {
        done(null, { color: options.color })
    })

}


var seneca = require("seneca")();
seneca.client({host:"127.0.0.1", port:3000}).act({"role":"users","cmd":"get","id":5}, function (err,response) {
	if (err) return console.log (err.msg);
	console.log (response);
})