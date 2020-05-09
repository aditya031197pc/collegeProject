(function () {
    'use strict';

    angular
    .module("app")
    .config(config)
    .run(run);
    
    config.$inject = [
        "$stateProvider",
        "RestangularProvider",
        "stateNames",
        "stateUrls",
        "stateTemplateUrls",
    ]
    
    function config(
        $stateProvider,
        RestangularProvider,
        stateNames,
        stateUrls,
        stateTemplateUrls,
        ) {
        RestangularProvider.setRequestSuffix("/");
        $stateProvider
            .state(stateNames.HOME, {
                url: stateUrls.HOME,
                templateUrl: stateTemplateUrls.HOME,
                controller: "HomeController",
                controllerAs: "vm",
                isOpen: true
            })
            .state(stateNames.LOGIN, {
                url: stateUrls.LOGIN,
                templateUrl: stateTemplateUrls.LOGIN,
                controller: "LoginController",
                controllerAs: "vm",
                isOpen: true
            })
            .state(stateNames.SIGNUP, {
                url: stateUrls.SIGNUP,
                templateUrl: stateTemplateUrls.SIGNUP,
                controller: "SignupController",
                controllerAs: "vm",
                isOpen: true
            })
            .state(stateNames.DETAILED_PROFILE, {
                url: stateUrls.DETAILED_PROFILE,
                templateUrl: stateTemplateUrls.DETAILED_PROFILE,
                controller: "ProfileController",
                controllerAs: "vm",
                isOpen: false
            })
            .state(stateNames.DISEASE_PREDICTION, {
                url: stateUrls.DISEASE_PREDICTION,
                templateUrl: stateTemplateUrls.DISEASE_PREDICTION,
                controller: "DiseasePredictionController",
                controllerAs: "vm",
                isOpen: true
            })
            .state(stateNames.DISPLAY_DISEASE, {
                url: stateUrls.DISPLAY_DISEASE,
                templateUrl: stateTemplateUrls.DISPLAY_DISEASE,
                controller: "DisplayDiseaseController",
                controllerAs: "vm",
                isOpen: true
            })
            .state(stateNames.INVALID_PAGE, {
                url: stateUrls.INVALID_PAGE,
                templateUrl: stateTemplateUrls.INVALID_PAGE,
                isOpen: true
            });
    }

    run.$inject = [
        "$cookies",
        "$mdToast",
        "$state",
        "$transitions",
        "AppUtils",
        "Restangular",
        "BASE_URL",
        "messages",
        "stateNames",
        "HTTPStatusCodes"
    ];
    function run(
        $cookies,
        $mdToast,
        $state,
        $transitions,
        AppUtils,
        Restangular,
        BASE_URL,
        messages,
        stateNames,
        HTTPStatusCodes,
    ) {
        Restangular.setBaseUrl(BASE_URL);
        Restangular.setFullResponse(true);
        Restangular.addFullRequestInterceptor(function (
            element,
            operation,
            route,
            url,
            headers,
            params,
            httpConfig
        ) {
            let token = $cookies.get("token");
            if (token) {
                return {
                    element: element,
                    params: params,
                    headers: _.extend(headers, { AUTHORIZATION: "TOKEN " + token }),
                    httpConfig: httpConfig
                };
            }
        });
        Restangular.setErrorInterceptor(function (response) {
            if (response.status == HTTPStatusCodes.HTTP_UNAUTHORIZED && $state.current.name != stateNames.LOGIN) {
                $mdToast.show($mdToast.simple().textContent("Please login."));
                AppUtils.logout();
                return false;
            } else if (response.status == HTTPStatusCodes.HTTP_SERVER_ERROR) {
                $mdToast.show($mdToast.simple().textContent(messages.SERVER_DOWN));
                return false;
            }
            return true;
        });
        $transitions.onBefore({}, function ($transition) {
            let state = $transition.$to().name;
            let isOpen = $transition.$to().isOpen;
            let token = $cookies.get("token");
            if (state == stateNames.INVALID_PAGE) {
                return true;
            } else if (isOpen && token) {
                $state.go(stateNames.DETAILED_PROFILE);
                return false;
            } else if (!isOpen && !token) {
                $state.go(stateNames.LOGIN);
                return false;
            }
        });
    }
})();