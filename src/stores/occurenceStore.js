'use strict';

//import occurences from '../fixtures/occurences.js'
import occurences from '../fixtures/occSmall.js'
import _ from 'npm:lodash@4.0.0'

var cache = [];

export default { 
  getRandomOccurence: function(){
                        var sample = _.sample(occurences);
                        sample.fresh = false;
                        var isValid = _.every(cache, function(date){ 
                          //TODO revert to 5
                          return Math.abs(date - parseInt(sample.year)) > 1;
                        });
                        if(!isValid){
                          return this.getRandomOccurence();
                        } else {
                          cache.push(parseInt(sample.year));
                          return sample;
                        }
                      },
  clearCache: function(){ cache = []; }
}
