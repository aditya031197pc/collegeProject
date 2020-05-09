(function () {
  "use strict";
  angular
    .module("app")
    .controller("appNavigationController", appNavigationController)
    .directive("appNavigation", appNavigation);

  appNavigation.$inject = ["directiveTemplateUrls"];
  function appNavigation(directiveTemplateUrls) {
    return {
      templateUrl: directiveTemplateUrls.NAVIGATION,
      restrict: "E",
      link: linkFunction,
      controller: "appNavigationController",
      controllerAs: "vm"
    };

    function linkFunction(scope, elem, attrs) { }
  }

  appNavigationController.$inject = [
    "$scope",
    "$localStorage",
    "$transitions",
    "AppUtils",
    "UserService",
    "stateNames",
  ];
  function appNavigationController(
    $scope,
    $localStorage,
    $transitions,
    AppUtils,
    UserService,
    stateNames,
  ) {
    let vm = this;
    vm.navLinks = [];
    vm.currentNavItem = null;
    vm.showLogout = false;
    vm.logout = logout;

    function logout() {
      UserService.logoutUser().then(function (response) {
        AppUtils.logout();
      });
    }

    $scope.$watch(getUser, function (user) {
      if (user) {
        vm.navLinks = [
          { name: "PROFILE", link: stateNames.DETAILED_PROFILE },
          { name: "CHECKUP", link: stateNames.DISEASE_PREDICTION },
          { name: "HOME", link: stateNames.HOME}
        ];
        vm.showLogout = true;

      } else {
        vm.navLinks = [
          { name: "LOGIN", link: stateNames.LOGIN },
          { name: "SIGNUP", link: stateNames.SIGNUP }
        ];
        vm.showLogout = false;
      }
    });

    $transitions.onSuccess({}, function (trans) {
      vm.currentNavItem = trans.to().name;
    });

    function getUser() {
      return $localStorage.user;
    }
  }
})();
