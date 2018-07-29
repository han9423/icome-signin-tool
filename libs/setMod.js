module.exports =  function(mod,callback){
    let tempMod = {};
    for(let prop in mod){
        tempMod[prop] = require(mod[prop]);
    }
    return tempMod;
}