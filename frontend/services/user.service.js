(function() {
    "use strict";
  
    angular.module("app").service("UserService", UserService);
  
    UserService.$inject = [
      "$cookies",
      "Restangular",
      "apiUrl",
      "messages",
      "Upload",
      "BASE_URL",
      "ResponseService"
    ];
    function UserService(
      $cookies,
      Restangular,
      apiUrl,
      messages,
      Upload,
      BASE_URL,
      ResponseService
    ) {
      let service = {};
      service.loginUser = loginUser;
      service.logoutUser = logoutUser;
      service.createUser = createUser;
      service.checkValidToken = checkValidToken;
      service.createVerifyToken = createVerifyToken;
      service.getEmployees = getEmployees;
      service.getCurrentUser = getCurrentUser;
      service.updateUser = updateUser;
      service.sendInvite = sendInvite;
      return service;
  
      function getEmployees() {
        // TODO FILTER FOR COMPANY EMPLOYEES ONLY
        let employees = Restangular.one(apiUrl.EMPLOYEE);
        return employees
          .get()
          .then(ResponseService.handleSuccess, ResponseService.handleError);
      }
  
      function loginUser(user) {
        let login = Restangular.all(apiUrl.LOGIN);
        return login
          .post(user)
          .then(ResponseService.handleSuccess, ResponseService.handleError);
      }
  
      function logoutUser(){
        let logout = Restangular.one(apiUrl.LOGOUT);
        return logout
          .customDELETE()
          .then(ResponseService.handleSuccess, ResponseService.handleError);
      }
  
      function createUser(user) {
        return Upload.upload({
          method: "POST",
          url: BASE_URL + apiUrl.USER,
          data: user
        }).then(ResponseService.handleSuccess, ResponseService.handleError);
      }
  
      function updateUser(user) {
        if (user["image"]) {
          // Uploading image using angular-file-upload
          let xurl = BASE_URL + apiUrl.USER + user.id + "/";
          return Upload.upload({
            method: "PATCH",
            url: xurl,
            headers: {'Authorization': 'Token ' + $cookies.get('token')},
            data: user
          }).then(ResponseService.handleSuccess, ResponseService.handleError);
        } else {
          // id = user.pop(id)
          return Restangular.one(apiUrl.USER, user.id)
            .customPATCH(user)
            .then(ResponseService.handleSuccess, ResponseService.handleError);
        }
      }
  
      function createVerifyToken(email) {
        let verify = Restangular.all(apiUrl.VERIFY_EMAIL);
        return verify
          .post(email)
          .then(ResponseService.handleSuccess, ResponseService.handleError);
      }
  
      function checkValidToken(token) {
        let verify = Restangular.one(apiUrl.VERIFY_EMAIL, token);
        return verify
          .get()
          .then(ResponseService.handleSuccess, ResponseService.handleError);
      }
  
      function getCurrentUser() {
        let user = Restangular.one(apiUrl.PROFILE);
        return user
          .get()
          .then(ResponseService.handleSuccess, ResponseService.handleError);
      }
  
      function sendInvite(request) {
        let invite = Restangular.all(apiUrl.INVITE_EMPLOYEES);
        return invite
          .post(request)
          .then(ResponseService.handleSuccess, ResponseService.handleError);
      }
    }
  })();
  