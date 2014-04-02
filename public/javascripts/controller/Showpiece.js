/**
 * Created by ronghao on 14-3-7.
 */

module.exports = function(mongoose) {

    var ShowpieceSchema = new mongoose.Schema({
        name: String,
        author: String,
        area: String,
        position: String,
        category: String,
        alive: Boolean,
        beaconMajor: Number,
        beaconMinor: Number
    });
    var Showpiece = mongoose.model('Showpiece', ShowpieceSchema);

    var createCallback = function(err) {
        if (err) {
            return console.log(err);
        };
        return console.log('Show piece was created');
    };


    var createShowpiece = function(name, author, area, position, category, beaconMajor, beaconMinor) {
        var isExist = false;
        Showpiece.find({$or:[{ name:name}, {$and:[{beaconMajor:beaconMajor}, {beaconMinor:beaconMinor}]}]}, function (err, docs){
            for (var aDoc in docs){
                console.log(aDoc);
                isExist = true;
            }
        });


//        console.log(isExist);
        if (isExist) {
            return false;
        }

        console.log("start create");

        var showPiece = new Showpiece({
            name: name,
            author: author,
            area: area,
            position: position,
            category: category,
            alive: true,
            beaconMajor: beaconMajor,
            beaconMinor: beaconMinor
        });
        showPiece.save(createCallback);

        console.log('Showpiece save command was sent');
    };

    var deleteShowpiece = function(res, name) {
        Showpiece.remove({_id:name}, function(err){
            if(err) {
                console.log(err);
                res.send("can not delete" + name);
            };

            console.log( name + ' was deleted');
        });
    };

    return {
        deleteShowpiece: deleteShowpiece,
        createShowpiece: createShowpiece,
        Showpiece: Showpiece
    }
}
