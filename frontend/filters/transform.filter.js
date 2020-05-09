(function(){
    'use strict';

    angular
        .module('app')
        .filter('transform', transform)

    function transform(){

        return FilterFn;

        function FilterFn(input){
            
        var output = "";
        if(input) {
            for (var i = 0; i < input.length; i++) {
                var x = input.charAt(i) == "_" ? " " : input.charAt(i);
                output = output + x;
                if(i==0) {
                    output = output.toUpperCase()
                }
              }
              return output;
        }
        return input
        }
    }

}());