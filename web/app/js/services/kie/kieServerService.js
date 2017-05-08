/**
 * Created by ajarrett : ajarrett@redhat.com on 18/07/16.
 * Kie Server Management Service
 */

(function () {
    'use strict';

    angular.module('angularWebApp')
        .factory('KieServerService', ['Constants', '$http', '$q', KieServerService]);
    
    function KieServerService(Constants, $http, $q) {      
        
        var baseUrl = '/kie-server/services/rest/server';
        var service = {};
        
        // ::: MANAGEMENT SERVICES INTERFACE ::: \\
        service.getKieServerUrl = getKieServerUrl;
        service.getKieExecutionContainerName = getKieExecutionContainerName;
        service.getKieProcessID = getKieProcessID;
        service.getKieServerDetails = getKieServerDetails;
        service.getKieServerContainers = getKieServerContainers;
        service.getKieServerContainerDetails = getKieServerContainerDetails;
        service.getProcessManagementUrl = getProcessManagementUrl;
        service.getTaskManagementUrl = getTaskManagementUrl;
        service.getBaseManagementUrl = getBaseManagementUrl;
        service.getKIEQueryUrl = getKIEQueryUrl;
        service.getKIETaskQueryUrl = getKIETaskQueryUrl;
        service.getKieBaseURL = getKieBaseURL;
        service.getProcessImageUrl = getProcessImageUrl;

        return service;

        // ::: MANAGEMENT SERVICE IMPL ::: \\
        
        // Return KIE Container Server HOST/Part URL
        function getKieServerUrl(){
             return __env.protocol + __env.hostname + ":" + __env.port;
        }
        
        // Return KIE Container Instance name
        function getKieExecutionContainerName(demoId){
            var container = 'kieserver_' + demoId + '_containerId';
            return Constants.ENV[container];
        }
        
        // Return Kie Demo Process ID
        function getKieProcessID(demoId){
            var processId = 'kieserver_' + demoId + '_processId';
            return Constants.ENV[processId];
        }
        
        function getKieBaseURL(){
            return getKieServerUrl() + baseUrl;
        }
        
        // Return Kie Demo Process ID
        function getKieServerDetails(){
            return $http.get(getKieServerUrl() + baseUrl);
        }
        
        // Return All Deployed Kie Container Details
        function getKieServerContainers(){
            return $http.get(getKieServerUrl() + baseUrl + '/containers');
        }
                             
        // Return All Specific Kie Container Details
        function getKieServerContainerDetails(containerID){
            return $http.get(getKieServerUrl() + baseUrl + '/containers/' + containerID);
        }

        function getBaseManagementUrl(containerID){
            return getKieServerUrl() + "/kie-server/services/rest/server/containers/" + containerID;
        } 

        function getKIEQueryUrl(){
            return getKieServerUrl() + "/kie-server/services/rest/server/queries";
        }
        
        function getProcessManagementUrl(containerID){
            return getBaseManagementUrl(containerID) + "/processes";
        }
        
        function getProcessImageUrl(containerID){
            return getBaseManagementUrl(containerID) + "/images/processes/";
        }
        
        /** TASK Management Services 
        * Desc : API's to invoke KIE Task Services i.e. Claim/Release/Complete etc...
        * Path : http://localhost:8080/kie-serverindex.html/services/rest/server/containers/{id}/tasks
        */
        function getTaskManagementUrl(containerID){
            return getBaseManagementUrl(containerID) + "/tasks";
        }
        
        /** TASK QUERY Services 
        * Desc : Query Tasking API's to return information around Task Ownership & Management
        * Path : http://localhost:8080/kie-serverindex.html/services/rest/server/queries
        */
        function getKIETaskQueryUrl(){
            return getKIEQueryUrl() + "/tasks/instances";
        }
    }

})();