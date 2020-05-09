(function() {
  "use strict";

  angular
    .module("app")
    .controller("SignupController", SignupController);

  SignupController.$inject = [
    "$cookies",
    "$mdToast",
    "$state",
    "$transition$",
    "UserService",
    "messages",
    "passwordStrengths"
  ];
  function SignupController(
    $cookies,
    $mdToast,
    $state,
    transition,
    UserService,
    messages,
    passwordStrengths
  ) {
    let vm = this;
    vm.submitDetails = submitDetails;
    vm.checkPasswordStrength = checkPasswordStrength;
    vm.submitClicked = false;
    vm.gotoLogin = gotoLogin;

    function checkPasswordStrength(value) {
      if (passwordStrengths.STRONG.test(value)) {
        vm.passwordStrength = "Strong";
      } else if (passwordStrengths.MEDIUM.test(value)) {
        vm.passwordStrength = "Medium";
      } else {
        vm.passwordStrength = "Weak";
      }
    }

    function gotoLogin() {
      $state.go('login');
    }

    function submitDetails() {
      vm.submitClicked = true;
      let user = {
        name: vm.name,
        email: vm.email,
        password: vm.password,
        bio: vm.bio,
        image: vm.image
      };
      UserService.createUser(user).then(function(response) {
        if (response.success) {
          $mdToast.show($mdToast.simple().textContent(messages.SIGNUP_SUCCESS));
          $state.go("login");
        } else {
          $mdToast.show($mdToast.simple().textContent(response.message));
        }
        vm.submitClicked = false;
      });
    }
  }
})();