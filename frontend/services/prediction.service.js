(function () {
    'use strict';

    angular
        .module('app')
        .service('PredictionService', PredictionService)

    PredictionService.$inject = [
        "Restangular",
        "apiUrl",
        "BASE_URL",
        "ResponseService"
    ];
    function PredictionService(
        Restangular,
        apiUrl,
        BASE_URL,
        ResponseService
    ) {
        let service = {};
        service.predict = predict;
        service.getResult = getResult;
        return service;

        function predict(symptomsArray) {
            console.log("In Service")
            console.log(symptomsArray)
            // API CALL TO PREDICT DISEASE AND GET BACK RESULT
            let prediction = Restangular.all(apiUrl.DISEASE_PREDICTION);
            return prediction
                .post(symptomsArray)
                .then(ResponseService.handleSuccess, ResponseService.handleError);

        }

        function getResult(id) {

        }

    }

}());