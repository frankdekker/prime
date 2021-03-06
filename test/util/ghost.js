"use strict";

var expect = require('expect.js')
var ghost = require('../../util/ghost')
var string = require('../../types/string')
var shell = require('../../util/shell')

describe('ghost', function(){

    it('should ghost types for chaining methods', function(){
        expect(ghost([1, 2, 3]).join().valueOf()).to.equal('1,2,3')
        expect(ghost('  1,A,F   ').trim().split(',').map(function(value){
            return parseInt(value, 16)
        }).valueOf()).to.eql([1, 10, 15])
    })

    it('should use valueOf automatically', function(){
        expect(ghost('abcd').indexOf('c').is(2)).to.be.ok()
        expect(ghost('abcd').indexOf('c') + 1).to.equal(3)
    })

    it('should return a string when ghost.toString() is called', function(){
        expect(ghost('foo').split('').toString()).to.equal('f,o,o')
    })

    it('should use ghost.is() to test if the value of the ghost is a value', function(){
        expect(ghost('ping').is('random')).not.to.be.ok()
        expect(ghost('ping').is('ping')).to.be.ok()
    })

    it('should add new methods when a method is implemented in the shell', function(){
        string.implement({
            cat: function(b){
                return this + b
            }
        })
        expect(ghost('first').cat('second').valueOf()).to.be('firstsecond')
    })

    it('should register and unregister a ghost type', function(){
        var all = function(){ return true }
        ghost.register(all, shell({thing: function(){ return 'prime' }}))
        expect(ghost(null).thing().valueOf()).to.be('prime')
        ghost.unregister(all)
        expect(ghost(null)).to.be(null)
    })

})

