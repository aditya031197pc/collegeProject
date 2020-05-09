(function(){
    'use strict';

    angular
        .module('app')
        .controller('DisplayDiseaseController', DisplayDiseaseController)

        DisplayDiseaseController.$inject = [];
    function DisplayDiseaseController(){
        var vm = this;
        vm.predictedDisease = {
            disease:null,
            probability: null
        };
        
        init();

        function init(){
            // request by using the id in the url

            console.log(vm.predictedDisease);
        }

    }

}());