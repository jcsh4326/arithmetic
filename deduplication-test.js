var deduplication = require('./deduplication.js'), assert = require('assert');
describe('deduplication', function(){
    var ded = new deduplication([1,3,4,2,5,6,0,9,8,2,3,5,6,1,3,5]);
    it('get the deduplication array', function(){
        var res = ded.ded();
        assert.deepEqual([2,3,5,6,1,3,5], res);
    });
});
