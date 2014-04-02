/**
 * Created by ronghao on 14-3-23.
 */

module.exports = function(mongoose) {

    var AccountSchema = new mongoose.Schema({
        accountName: String,
        password: String,
        accountRole: String,
        roleOfAdd: Boolean,
        roleOfDel: Boolean,
        roleOfMod: Boolean,
        roleOfSea: Boolean,
        isAlive:Boolean
    });

    var Account = mongoose.model('Account', AccountSchema);

    var createCallback = function(err) {
        if (err) {
            return console.log(err);
        };
        return console.log('Account was created');
    };

    var createAccount = function(accountName, password, accountRole, roleOfAdd, roleOfDel, roleOfMod, roleOfSea, isAlive) {
        var isExist = false;
        Account.find({$and:[{accountName:accountName}, {isAlive:true}]}, function (err, docs){
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

        var account = new Account({
            accountName: accountName,
            password: password,
            accountRole: accountRole,
            roleOfAdd: roleOfAdd,
            roleOfDel: roleOfDel,
            roleOfMod: roleOfMod,
            roleOfSea: roleOfSea,
            isAlive:true
        });
        account.save(createCallback);

        console.log('Account save command was sent');
    };

    var deleteAccount = function(res, name) {
        Account.remove({_id:name}, function(err){
            if(err) {
                console.log(err);
                res.send("can not delete" + name);
            };

            console.log( name + ' was deleted');
        });
    };

    return {
        deleteAccount: deleteAccount,
        createAccount: createAccount,
        Account: Account
    }
}