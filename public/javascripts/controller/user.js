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
    , email: { type: String, required: true, index: { unique: true, sparse: true } }
    , alive: Boolean
});
mongoose.model('Person', personSchema);
