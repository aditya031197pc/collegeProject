(function() {
    "use strict";
  
    angular.module("app").controller("HomeController", HomeController);
  
    HomeController.$inject = ["$state", "AppUtils", "UserService"];
    function HomeController($state) {
      let vm = this;
      vm.checkup = checkup;
      function checkup() {
        $state.go("disease-prediction");
      }
    }
  })();
  