(function () {
  "use strict";

  angular.module("app").controller("LoginController", LoginController);

  LoginController.$inject = [
    "$cookies",
    "$mdToast",
    "$state",
    "UserService",
    "messages",
    "stateNames"
  ];
  function LoginController(
    $cookies,
    $mdToast,
    $state,
    UserService,
    messages,
    stateNames
    ) {
    let vm = this;
    vm.submit = submit;
    vm.submitClicked = false;
    vm.goToSignup = goToSignup;
    function submit() {
      vm.submitClicked = true;
      let user = {
        username: vm.email,
        password: vm.password
      };
      UserService.loginUser(user).then(function (response) {
        if (response.success) {
          $mdToast.show($mdToast.simple().textContent(messages.LOGIN_SUCCESS));
          $cookies.put("token", response.data.token);
          console.log('reached')
        } else {
          $mdToast.show($mdToast.simple().textContent(response.message));
        }
        $state.go('profile');
        vm.submitClicked = false;
      });
    }
    function goToSignup() {
      $state.go(stateNames.SIGNUP);
    }
  }
})();
