(function () {
  "use strict";

  angular.module("app").factory("AppUtils", AppUtils);

  AppUtils.$inject = [
    "$cookies",
    "$localStorage",
    "$state",
    "Restangular",
    "UserService",
    "BASE_URL"
  ];
  function AppUtils(
    $cookies,
    $localStorage,
    $state,
    Restangular,
    UserService,
    BASE_URL
    ) {
    return {
      getCurrentUser: getCurrentUser,
      logout: logout
    };

    function logout() {
      $cookies.remove("token");
      delete $localStorage.user;
      $state.go("login");
    }

    function getCurrentUser() {
      let util = this;
      util.user = $localStorage.user;
      let token = $cookies.get("token");
      if (!util.user) {
        if (!token) {
          $state.go("login");
        } else {
          return UserService.getCurrentUser(token).then(function (response) {
            util.user = updateUserDetails(response);
            $localStorage.user = util.user;
            return util.user;
          });
        }
      } else {
        UserService.getCurrentUser(token).then(function (response) {
          util.user = {};
          util.user = updateUserDetails(response);
          $localStorage.user = util.user;
        });
        return Promise.resolve(util.user);
      }
    }

    function updateUserDetails(response) {
      let object = {};
      object.id = response.data.id;
      object.name = response.data.name;
      if (response.data.image) {
        object.image = 'http://127.0.0.1:8000' +  response.data.image
      };
      object.email = response.data.email;
      object.bio = response.data.bio;
      return object;
    }
  }
})();
