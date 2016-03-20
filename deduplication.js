var q = require('q');

(function() {
    var deduplication = function (arrays) {
        this._ded = arrays;
    }
    deduplication.prototype.ded = function (){
        var copy = {};
        var res = [];
        for(var i=0;i<this._ded.length;i++){
            if(copy[this._ded[i]]){
                res.push(this._ded[i]);
            }else{
                copy[this._ded[i]] = true;
            }
        }
        return res;
    }
    
    module.exports = deduplication;
})();