(function() {
  "use strict";

  angular.module("app").controller("ProfileController", ProfileController);

  ProfileController.$inject = ["$state", "AppUtils", "UserService"];
  function ProfileController($state, AppUtils, UserService) {
    let vm = this;
    vm.getCurrentUser = getCurrentUser;
    vm.logout = logout;
    vm.editProfile = editProfile;

    getCurrentUser();

    function getCurrentUser() {
      AppUtils.getCurrentUser().then(function(user) {
        vm.user = user;
      });
    }

    function logout() {
      UserService.logoutUser().then(function(response){
        AppUtils.logout();
      });
    }

    function editProfile() {
      $state.go("edit-profile");
    }
  }
})();
