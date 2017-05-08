/**
 * Created by ajarrett : ajarrett@redhat.com on 18/07/16.
 * Kie Server Management Service
 */

(function () {
    'use strict';

    angular.module('angularWebApp')
        .factory('KieContainerManagementService', ['Constants', '$http', '$q', 'KieServerService', KieContainerManagementService]);
    
    function KieContainerManagementService(Constants, $http, $q, KieServerService) {      
        
        var service = {};
        
        // ::: MANAGEMENT SERVICES INTERFACE ::: \\
        service.createKieContainer = createKieContainer;
        service.deleteKieContainer = deleteKieContainer;
        service.getKieContainer = getKieContainer;
        service.sayHello = sayHello;

        return service;

        // ::: MANAGEMENT SERVICE IMPL ::: \\
        
        function sayHello(container){
            return $http.put(KieServerService.getKieBaseURL()  + '/containers/test_ticket', container);
        }

//      URL: kie-server/services/rest/server/containers/{id}
        function createKieContainer(container){
            console.log(container);
            return $http.put(KieServerService.getKieBaseURL()  + '/containers/' + container['container-id'], container);
        }

//      URL: kie-server/services/rest/server/containers/{id}
        function deleteKieContainer(containerID){
             return $http.delete(KieServerService.getKieBaseURL()  + '/containers/' + containerID);
        }
       
//      URL: kie-server/services/rest/server/containers/{id}
        function getKieContainer(){
             return $http.get(KieServerService.getKieBaseURL()  + '/containers/' + containerID);
        }
    }

})();