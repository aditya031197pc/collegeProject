(function () {
    'use strict';

    angular
        .module('app')
        .controller('DiseasePredictionController', DiseasePredictionController)


    DiseasePredictionController.$inject = ["symptoms", "diseaseDetails", "valid_symptoms", "PredictionService"]
    function DiseasePredictionController(symptoms, diseaseDetails, valid_symptoms, predictionService) {
        var vm = this;
        vm.symptomsArray = [...symptoms];
        vm.predictDisease = predictDisease;
        vm.valid_symptoms = valid_symptoms;
        vm.notFalse = notFalse;
        init();

        function init() {
            vm.symptomsMap = [];
            for (let i = 0; i < symptoms.length; i++) {
                vm.symptomsMap.push(false);
            };

            vm.predictedDisease = null;
            vm.predictedDiseaseProbab = null;
            vm.isPrediction = false;
            vm.predictedDisease = null;
            vm.predictedDiseaseProbab = null;
            vm.isPrediction = false;
            vm.submitClicked = false;
            console.log(vm.symptomsMap);
        }

        function predictDisease() {
            // console.log(vm.symptomsMap);
            // const x = [0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1]
            if(vm.symptomsMap.includes(true)) {
            predictionService.predict(vm.symptomsMap)
                .then(response => {
                    vm.predictedDisease = response.data.disease;
                    vm.predictedDiseaseProbab = response.data.probability.toFixed(2);
                    vm.isPrediction = response.data.predicted;
                    vm.predictedDiseaseDetails = diseaseDetails[vm.predictedDisease];
                    console.log(vm.predictedDiseaseDetails);
                });
            }
            else {
                vm.predictedDisease = "No symptoms were selected"
            }
        }
        function notFalse(s) {
            return valid_symptoms.includes(s);
        }

        vm.reset = () => {
            init();
        }

    }

}());