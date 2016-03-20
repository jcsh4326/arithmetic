var circularqueue = require('./circularqueue.js'), assert = require('assert');
var cq = new circularqueue(3);
describe('push in range', function(){
    it('it should push 0 into queue', function(){
        cq.push(0).then(function (length) {
            assert.equal(length, 1);
            assert.equal(cq.toString(), '0,,');
        });        
    });
    it('it should push 0,1 into queue', function(){
        cq.push(1).then(function (length) {
            assert.equal(length, 2);
            assert.equal(cq.toString(), '0,1,');
        });        
    });
    it('it should push 0,1,2 into queue', function(){
        cq.push(2).then(function (length) {
            assert.equal(length, 3);
            assert.equal(cq.toString(), '0,1,2');
        });        
    });
});
describe('overflow', function(){        
    it('push 3 and overflow', function(){
        return cq.push(3).then(function () {
            console.log('never get here!');
        }, function (result) {
            assert.equal(result.object, 3);            
        });
    });
});
describe('push and shift', function(){
    it('push 4 in', function(done){
        cq.push(3);
        setTimeout(function(){
            cq.shift();
        },20);
        done();
        console.log(cq.toString());
    });
});

