(function() {
  "use strict";

  angular.module("app").service("ResponseService", ResponseService);

  ResponseService.$inject = [];
  function ResponseService() {
    let service = {};
    service.handleSuccess = handleSuccess;
    service.handleError = handleError;
    return service;

    function handleSuccess(response) {
      response.success = true;
      return response;
    }

    function handleError(response) {
      response.success = false;
      response.message = response.data.error || response.data.detail || response.message || response.data;
      return response;
    }
  }
})();
