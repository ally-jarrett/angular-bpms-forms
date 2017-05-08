/**
 * Created by ajarrett : ajarrett@redhat.com on 18/07/16.
 * Kie Process Instance Management Status Service
 */

(function () {
    'use strict';

    angular.module('angularWebApp')
        .factory('KieProcessInstanceService', ['$http', 'KieServerService', '$q', KieProcessInstanceService]);

    function KieProcessInstanceService($http, KieServerService, $q) {   
        
        var service = {};

        //TODO: Add Pagination, PageSize, Status and other parameters
        // ::: MANAGEMENT PROCESS SERVICES INTERFACE ::: \\
        service.deleteAllProcessInstance = deleteAllProcessInstance;
        service.deleteProcessInstance = deleteProcessInstance;
        service.getProcessInstance = getProcessInstance;
        service.getProcessInstanceVariable = getProcessInstanceVariable;
        service.updateProcessInstanceVariable = updateProcessInstanceVariable;
        service.getAllProcessInstanceVariables = getProcessInstanceVariable;
        service.addNewProcessInstanceVariables = addNewProcessInstanceVariables; 
        service.startNewProcessInstance = startNewProcessInstance;
        service.startNewProcessInstanceCorrelationId = startNewProcessInstanceCorrelationId;
        service.getProcessInstanceDefinition = getProcessInstanceDefinition;
        service.getProcessInstanceSubProcesses = getProcessInstanceSubProcesses;
        service.getKieProcessImage = getKieProcessImage;
        service.getKieProcessInstanceImage = getKieProcessInstanceImage;

        
        // ::: QUERY PROCESS SERVICES INTERFACE ::: \\
        service.getAllProcessInstances = getAllProcessInstances;
        service.getAllVariablesForProcessInstance = getAllVariablesForProcessInstance;
        service.getAllProcessDefinitions = getAllProcessDefinitions;
        service.getAllProcessDefinitions = getAllProcessDefinitions;
        service.getProcessDefinition = getProcessDefinition;
        service.getQueryProcessInstance = getQueryProcessInstance;
        service.getProcessInstanceCorrelationId = getProcessInstanceCorrelationId;
        service.getAllRunningProcessInstancesForContainer = getAllRunningProcessInstancesForContainer;

        return service;

        // ::: MANAGEMENT PROCESS SERVICE IMPL ::: \\
        
        
        function getKieProcessImage(containerID, processID){
            return $http.get(KieServerService.getProcessImageUrl(containerID) + processID);
        }
        
        function getKieProcessInstanceImage(containerID, pInstanceID){
            return $http.get(KieServerService.getProcessImageUrl(containerID) + 'instances/' + pInstanceID);
        }
        
        
        // DELETE :: Remove all Process instances
        function deleteAllProcessInstance(){
            return $http.delete(processManagementURL + '/instances');
        }
        
        // DELETE :: Remove specific Process instances
        function deleteProcessInstance(containerID, pInstanceId){
            // /kie-server/services/rest/server/containers/ticket_app/processes/instances/2
            return $http.delete(KieServerService.getProcessManagementUrl(containerID) + '/instances/' + pInstanceId);
        }
        
        // GET :: Return specific Process Instance
        function getProcessInstance(containerID, pInstanceId){
            return $http.get(KieServerService.getProcessManagementUrl(containerID) + pInstanceId);
        }
        
        // GET :: Return specific Process Instance Variables
        function getProcessInstanceVariable(containerID, pInstanceId, varName){
            return $http.get(KieServerService.getProcessManagementUrl(containerID) + '/instances/' + pInstanceId + '/variable/' + varName);
        }
        
        // PUT :: Update Process Instance Variables
        function updateProcessInstanceVariable(containerID, pInstanceId, varName, data){
            return $http.put(KieServerService.getProcessManagementUrl(containerID) + '/instances/' + pInstanceId + '/variable/' + varName, data);
        }
        
        // GET :: Return specific Process Instance Variables
        function getAllProcessInstanceVariables(containerID, pInstanceId){
            return $http.get(KieServerService.getProcessManagementUrl(containerID) + pInstanceId + '/variables' );
        }
        
        // PUT :: Update Process Instance Variables
        function addNewProcessInstanceVariables(containerID, pInstanceId){
            return $http.post(KieServerService.getProcessManagementUrl(containerID) + pInstanceId + '/variables' );
        }
        
        // POST :: Create/Start new Process Instance
        function startNewProcessInstance(containerID, processId, processVariables){
            console.log(KieServerService.getProcessManagementUrl(containerID) + '/' + processId + '/instances');
            return $http.post(KieServerService.getProcessManagementUrl(containerID) + '/' + processId + '/instances', processVariables);
        }
        
        // POST :: Create/Start new Process Instance with Correlation Key
        function startNewProcessInstanceCorrelationId(containerID, processId, correlationKey, processVariables){
            console.log(KieServerService.getProcessManagementUrl(containerID) + '/' + processId + '/instances/correlation/');
            return $http.post(KieServerService.getProcessManagementUrl(containerID) + '/' + processId + '/instances/correlation/' + correlationKey, processVariables);
        }
        
        // GET :: Returns Process Instance Definition inc. Input/Output Variables etc.
        function getProcessInstanceDefinition(containerID, processId){
            return $http.get(KieServerService.getProcessManagementUrl(containerID) + '/definitions/' + processId);
        }
        
        // GET :: Returns Process Instance Definition inc. Input/Output Variables etc.
        function getProcessInstanceSubProcesses(containerID, processId){
            return $http.get(KieServerService.getProcessManagementUrl(containerID) + '/definitions/' + processId + '/subprocesses');
        }
        
        // ::: QUERY TASK SERVICES ::: \\
        
        // GET :: Return all Process Instances for a given Process ID
        function getAllProcessInstances(processId) {
            return $http.get(KieServerService.getKIEQueryUrl() + '/processes/' + processId + '/instances?pageSize=50');
        }
        
        // GET :: Return all Process Instance Variables for a given Process ID
        function getAllVariablesForProcessInstance(processId) {
            return $http.get(KieServerService.getKIEQueryUrl() + '/processes/instances/' + processId + '/variables/instances');
        }
        
        // GET :: Return all Process Instances for a given Process ID on a given Container
        function getAllRunningProcessInstances() {
            return $http.get(KieServerService.getKIEQueryUrl() + '/containers/' + KieServerService.getKieExecutionContainerName()  + '/process/instances');
        }
        
        // GET :: Return all Process Instances for a given Process ID on a given Container
        function getAllRunningProcessInstancesForContainer(containerID) {
            return $http.get(KieServerService.getKIEQueryUrl() + '/containers/' + containerID  + '/process/instances');
        }
        
        // GET :: Return all Process Definitions
        function getQueryProcessInstance(pInstanceId) {
            return $http.get(KieServerService.getKIEQueryUrl() + '/processes/instances/' + pInstanceId);
        }
        
        // GET :: Return all Process Definitions
        function getAllProcessDefinitions() {
            return $http.get(KieServerService.getKIEQueryUrl() + '/processes/definitions');
        }
        
        // GET :: Return the Process Definitions for a given Process ID
        function getProcessDefinition(processId) {
            return $http.get(KieServerService.getKIEQueryUrl() + '/processes/definitions/' + processId);
        }
        
        // GET :: Return the Process Instance for a given Correlation Key/ID
        function getProcessInstanceCorrelationId(correlationKey) {
            return $http.get(KieServerService.getKIEQueryUrl() + '/processes/instance/correlation/' + correlationKey);
        }

    }

})();