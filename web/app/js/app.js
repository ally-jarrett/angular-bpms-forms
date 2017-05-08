angular.module('angularWebApp', ['ngRoute', 'ui.bootstrap', 'ngSanitize', 'angular-growl', 'ngAnimate', 'formly', 'formlyBootstrap']);

angular.module('angularWebApp').run(['$log', function ($log) {
    $log.debug('Bootstrapping environmental vars');
    
     // Default environment variables
      var __env = {};

      // Import variables if present
      if(window){
        Object.assign(__env, window.__env);
      }
    
     $log.debug('Environmental Vars Successfully bootstrapped using vars: ');
     $log.debug(__env)
}]);

// Application Routing and Controller Declarations
angular.module('angularWebApp').config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'html/partials/home.html', 
        controller: "HomeController"
    })
    .when('/home', {
        templateUrl: 'html/partials/home.html', 
        controller: "HomeController"
    })    
}]);

// Growl Notifications Config
angular.module('angularWebApp').config(['growlProvider', function (growlProvider) {
    growlProvider.globalTimeToLive({success: 3000, error: 5000, warning: 3000, info: 5000});
    growlProvider.globalReversedOrder(true);
    growlProvider.globalDisableCountDown(true);
}]);

// Inject Custom Interceptor into httpProvider 
angular.module('angularWebApp').config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('KieInterceptor');
}]);


