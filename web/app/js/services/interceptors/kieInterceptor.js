/**
 * Created by ajarrett : ajarrett@redhat.com on 07/09/16.
 * HTTP Request Interceptor for KIE Specific Headers
 */

angular.module('angularWebApp').factory('KieInterceptor', ['$log', function($log) {  
    $log.debug('Appending KIE specific headers to request');
    
    var KieInterceptor = {
        request: function(config) {
                    /* Attaches Accept, Content-Type & Hardcoded Auth Headers to all Requests 
                       Hard Coded user1 / password1! in BPMS*/
                    config.headers['Authorization'] = 'Basic YnBtc0FkbWluOnBhc3N3b3JkMSE=';                 
                    //var url = (config.url);
                    if (config.url.indexOf('images/processes') !== -1){
                        config.headers['Accept'] = "*/*";
                        config.headers['Content-Type'] = "application/svg+xml"; 
                    } else {
                        config.headers['Accept'] = "application/json";
                        config.headers['Content-Type'] = "application/json"; 
                    }
                return config;
            }   
        };

    return KieInterceptor;

}]);    