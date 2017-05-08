/**
 * Created by ajarrett : ajarrett@redhat.com on 18/07/16.
 * Kie Task Instance Management Status Service
 */

(function () {
    'use strict';

    angular.module('angularWebApp')
        .factory('KieTaskManagementService', ['$http', 'KieServerService', KieTaskManagementService]);
        
    function KieTaskManagementService($http, KieServerService) {
        
        var service = {};

        //TODO: Add Pagination, PageSize, Status and other parameters
        
        // ::: MANAGEMENT TASK SERVICE INTERFACE ::: \\
        service.getTask = getTask;
        service.getTaskForm = getTaskForm;
        service.getTaskComments = getTaskComments;
        service.addTaskComments = addTaskComments;
        service.getTaskInputContents = getTaskInputContents;
        service.getTaskOutputContents = getTaskOutputContents;
        service.updateTaskContents = updateTaskContents;
        service.updateTaskDescription = updateTaskDescription;
        service.updateTaskExpiration = updateTaskExpiration;
        service.updateTaskName = updateTaskName;
        service.updateTaskPriority = updateTaskPriority;
        service.updateTaskState = updateTaskState;
        
        
        // ::: QUERY TASK SERVICE INTERFACE ::: \\
        service.getAllUserOwnedTasks = getAllUserOwnedTasks;
        service.getAllAdminOwnedTasks = getAllAdminOwnedTasks;
        service.getAllUserPotentialTasks = getAllUserPotentialTasks;
        service.getAllProcessInstanceTasks = getAllProcessInstanceTasks;
        service.getTaskVariable = getTaskVariable;

        return service;

        // ::: MANAGEMENT TASK SERVICE IMPL ::: \\
        
        // GET :: Return specific Task
        function getTask(containerID, tInstanceId){
            return $http.get(KieServerService.getTaskManagementUrl(containerID) + '/' + tInstanceId +   "?withInputData=true&withOutputData=true");
        }
        
        // GET :: Return specific Task Form
        function getTaskForm(containerID, tInstanceId){
            return $http.get(KieServerService.getKieBaseURL() + '/containers/' + containerID +'/forms/tasks/' + tInstanceId +'?filter=true');
        }
        
        // GET :: Return all Comments for Task
        function getTaskComments(containerID, tInstanceId){
            return $http.get(KieServerService.getTaskManagementUrl(containerID) + '/' + tInstanceId + '/comments');
        }
        
        // POST :: Add new Comments to Task
        function addTaskComments(tInstanceId){
            return $http.post(KieServerService.getTaskManagementUrl(containerID) + '/' + tInstanceId + '/comments');
        }
        
        // GET :: Return all Task input Variables
        function getTaskInputContents(containerID, tInstanceId){
            return $http.get(KieServerService.getTaskManagementUrl(containerID) + '/' + tInstanceId + '/contents/input');
        }
        
        // GET :: Return all Task output Variables
        function getTaskOutputContents(containerID, tInstanceId){
            return $http.get(KieServerService.getTaskManagementUrl(containerID) + '/' + tInstanceId + '/contents/output');
        }
        
        // PUT :: Return update Task Variables
        function updateTaskContents(containerID, tInstanceId){
            return $http.put(KieServerService.getTaskManagementUrl(containerID) + '/' + tInstanceId + '/contents/output');
        }
        
        // PUT :: Update Task Description
        function updateTaskDescription(containerID, tInstanceId){
            return $http.put(KieServerService.getTaskManagementUrl(containerID) + '/' + tInstanceId + '/description');
        }
        
        // PUT :: Update Task Expire Date
        function updateTaskExpiration(containerID, tInstanceId){
            return $http.put(KieServerService.getTaskManagementUrl(containerID) + '/' + tInstanceId + '/expiration');
        }
        
        // PUT :: Update Task Name
        function updateTaskName(containerID, tInstanceId){
            return $http.put(KieServerService.getTaskManagementUrl(containerID) + '/' + tInstanceId + '/name');
        }
        
        // PUT :: Update Task Priority
        function updateTaskPriority(containerID, tInstanceId){
            return $http.put(KieServerService.getTaskManagementUrl(containerID) + '/' + tInstanceId + '/priority');
        }
        
        // PUT :: Update Task Status:
        function updateTaskState(containerID, tInstanceId, status, body){
            if (!body){
                return $http.put(KieServerService.getTaskManagementUrl(containerID) + '/' + tInstanceId + '/states/' + status);    
            }
            return $http.put(KieServerService.getTaskManagementUrl(containerID) + '/' + tInstanceId + '/states/' + status, body);
        }
        
        // ::: QUERY TASK SERVICE IMPL ::: \\
        
        // Return all tasks owned by current user
        function getAllUserOwnedTasks() {
            return $http.get(KieServerService.getKIETaskQueryUrl() + '/owners');
        }
        
        // Return all tasks requiring management approval
        function getAllAdminOwnedTasks() {
            return $http.get(KieServerService.getKIETaskQueryUrl() + '/admins');
        }
        
        // Return all Tasks current user can claim
        function getAllUserPotentialTasks() {
            return $http.get(KieServerService.getKIETaskQueryUrl() + '/pot-owners');
        }
        
        // Return all Tasks for a particular Process 
//        function getAllProcessInstanceTasks(pInstanceId) {
//            var config = {
//                    'user': KieServerService.getKieDemoUser(),
//                    'group': KieServerService.getKieDemoGroup(),
//                    'processId': pInstanceId.toString()
//                };
//
//            var urlQ = KieServerService.getKieServerUrl() + "/kie-server/services/rest/server/queries/definitions/getTasks/filtered-data?mapper=UserTasks&builder=getTasks";
//            return $http.post(urlQ, config);
//        }
        
        function getAllProcessInstanceTasks(pInstanceId) {
            return $http.get(KieServerService.getKIETaskQueryUrl() + '/process/' + pInstanceId);
        }
        
        // Return all Variables for a Task
        function getTaskVariable(varName) {
            return $http.get(KieServerService.getKIETaskQueryUrl() + '/variables/' + varName);
        }
        

    }

})();