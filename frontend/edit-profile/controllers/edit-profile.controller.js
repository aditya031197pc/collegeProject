(function () {
  "use strict";

  angular
    .module("app")
    .controller("EditProfileController", EditProfileController);

  EditProfileController.$inject = [
    "$cookies",
    "$localStorage",
    "$state",
    "AppUtils",
    "UserService",
    "passwordStrengths"
  ];
  function EditProfileController(
    $cookies,
    $localStorage,
    $state,
    AppUtils,
    UserService,
    passwordStrengths
  ) {
    var vm = this;
    vm.user = {};
    vm.showImageForm = false;
    vm.showPasswordForm = false;
    vm.cancel = cancel;
    vm.editUser = editUser;
    vm.submitClicked = false;
    vm.removeImage = false;
    vm.checkPasswordStrength = checkPasswordStrength;
    init();

    function init() {
      // TODO: can the admin edit any profile of the company members ?
      let token = $cookies.get("token");
      AppUtils.getCurrentUser().then(function (user) {
        vm.user = user;
      });
    }

    function checkPasswordStrength(value) {
      if (passwordStrengths.STRONG.test(value)) {
        vm.passwordStrength = "Strong";
      } else if (passwordStrengths.MEDIUM.test(value)) {
        vm.passwordStrength = "Medium";
      } else {
        vm.passwordStrength = "Weak";
      }
    }


    function editUser() {
      vm.submitClicked = true;
      delete vm.user.image;

      if (vm.showPasswordForm) {
        vm.user.password = vm.password;
      }

      if (vm.showImageForm) {
        if (vm.removeImage) {
          vm.image = null;
        }
        vm.user.image = vm.image;
      }

      console.log(vm.image)
      console.log(vm.removeImage)

      UserService.updateUser(vm.user).then(function (response) {
        vm.submitClicked = false;
        delete $localStorage.user;
        $state.go("profile");
      });
    }

    function cancel() {
      $state.go("profile");
    }
  }
})();
