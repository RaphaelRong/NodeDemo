/**
 * Created by ronghao on 14-2-28.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var personSchema = new Schema({
    name: {
        first: String
        , last : String
    }
    , major:String
    , email: { type: String, required: true, index: { unique: true, sparse: true } }
    , alive: Boolean
});
mongoose.model('Person', personSchema);


var register = function(first, last, email) {
    var shaSum = crypto.createHash('sha256');
    shaSum.update(last);
    console.log('Registering ' + email);
    var user = new Account({
        email: email,
        name: {
            first: firstName,
            last: lastName
        },
        password: shaSum.digest('hex')
    });
    user.save(registerCallback);
    console.log('Save command was sent');
}

var registerCallback = function(err) {
    if (err) {
        return console.log(err);
    };
    return console.log('Account was created');
};
