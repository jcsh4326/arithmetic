
var q = require('q');
(function(){
    'use strict';
    var circularqueue = function(size){
        var me = this;
        me._size = size, me._tail = me._head = me._hold = 0;
        me._queue = new Array(this._size);
    }

    circularqueue.prototype.push = function(obj){
        var me = this;
        var defer = q.defer();
        var _push = function(me, obj){
            me._tail = (me._head+me._hold)%me._size;
            me._queue[me._tail] = obj;
            me._hold++;
            return me._hold;
        }
        if(me._hold<me._size){
            console.log('there is enough spare');
            var length = _push(me, obj);
            defer.resolve(length);
        }else{
            var _times = 0;
            var loop = setInterval(function(){
                if(_times<4){
                    _times++;
                    console.log('try ' + _times + ' more time to push...');
                    if(me._hold<me._size){
                        var length = _push(me, obj);
                        defer.resolve(length);
                    }
                }else{
                    console.log('cancel push...');
                    clearInterval(loop);
                    defer.reject({message:'there is no more spare for pushing in', object: obj});
                }
            },1000);
        }
        console.log('return promise');
        return defer.promise;
    }

    circularqueue.prototype.shift = function(){
        var me = this;
        var defer = q.defer();
        var _shift = function(me){
            me._head = (me._tail-me._hold)%me._size+1;
            var pop = me._queue[me._head];
            me._hold--;
            console.log('still ' + me._hold + ' room spare');
            return me._hold;
        }
        if(me._hold>0){
            var pop = _shift(me);
            defer.resolve(pop);
        }else{
            var _times = 0;
            var loop = setInterval(function(){
                if(_times<4){
                    times++;
                    console.log('try ' + _times + ' more time to shift...');
                    if(me._hold>0){
                        var pop = _shift(me);
                        defer.resolve(pop);
                    }
                }else{
                    console.log('cancel shift...');
                    clearInterval(loop);
                    defer.reject({message:'there is nothing to shift', object: me._hold});
                }
            }, 1000);
        }
        console.log('return promise');
        return defer.promise;
    }

    circularqueue.prototype.toString = function(){
        return this._queue.toString();
    }

    module.exports = circularqueue;
})();
