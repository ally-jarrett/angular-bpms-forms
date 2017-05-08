angular.module('angularWebApp').controller('HomeController', ['$scope', '$http', 'Constants', 'KieProcessInstanceService', 'KieTaskManagementService', 'growl', '$modal', 'StateStore', function($scope, $http, Constants, KieProcessInstanceService, KieTaskManagementService, growl, $modal, StateStore) { 
    
    $scope.error = {};
    $scope.data = {};
    $scope.process = {};
    $scope.error.show = false;
    
    var containerID = Constants.ENV.kieserver_demo1_containerId;
    var processID = Constants.ENV.kieserver_demo1_processId;
 
    $scope.reload = function() {
        $scope.data = {};   
    }
    
    $scope.createTicket = function() {
        if (!$scope.ticket.assignment) {
            console.log('entering' + $scope.error.show);
            $scope.error.show = true;
            $scope.error.title = "Validation ERROR! ";
            $scope.error.desc = "Please ensure all fields have a provided value";
        }
        
       console.log(JSON.stringify($scope.ticket));
    }

    $scope.createNewProcess = function(ticket) {
        
        console.log("Attempting to create a new Angular Forms BPM Process Instance");
        
        KieProcessInstanceService.startNewProcessInstance(containerID, processID, null)
            .then(function(response) {
                $scope.data.result = response.data;
                growl.error('Created ticket with Process Instance ID: ' + response.data, {title: 'Success!'});
            }, function(response) {
                growl.error('Unable to Create Ticket! KIE Server threw a HTTP Response: ' + response.status,{title: 'Error!'});
            }).finally(function() {
                processInstances();
                taskInstances();
                $scope.clearForm();
            });
            
    }   
    
    var processInstances = function() {
        $scope.processes = {};
        KieProcessInstanceService.getAllProcessInstances(processID).then(function (response) {
                $scope.processes = response.data;
                console.log(response.data);
                console.log(JSON.stringify(response.data));
            })
            ,(function (response) {
                $scope.error = {};
                $scope.error.show = 'true';
                $scope.error.title = 'Unable to create Process Instance!'
                $scope.error.desc = 'KIE Server threw a HTTP: ' + response.status
            });
    }
    
    var taskInstances = function() {
        $scope.processes = {};
        KieTaskManagementService.getAllUserPotentialTasks().then(function (response) {
                $scope.taskInstances = response.data;
                console.log(response.data);
                console.log(JSON.stringify(response.data));
            })
            ,(function (response) {
                $scope.error = {};
                $scope.error.show = 'true';
                $scope.error.title = 'Unable to create Ticket!'
                $scope.error.desc = 'KIE Server threw a HTTP: ' + response.status
            });
    }
    
    var ownedInstances = function() {
        $scope.processes = {};
        KieTaskManagementService.getAllUserOwnedTasks()
         .then(function (response) {
                $scope.ownedInstances = response.data;
                console.log(response.data);
                console.log(JSON.stringify(response.data));
            })
            ,(function (response) {
                $scope.error = {};
                $scope.error.show = 'true';
                $scope.error.title = 'Unable to create Ticket!'
                $scope.error.desc = 'KIE Server threw a HTTP: ' + response.status
            });
    }
    
    $scope.abortProcess = function(processInstID) {
        
        KieProcessInstanceService.deleteProcessInstance(containerID, processInstID).then(function(response) {
                growl.success(processInstID + ' Has been successfully aborted!',{title: 'Success!'});
                console.log(response.data);
            }, function(response) {
                growl.error('Unable to abort Process w/ ID: ' + processInstID + '. KIE Server threw a HTTP: ' + response.status,{title: 'Error!'});
            }).finally(function() {
                // Reload everything!
                refreshAllStates();
            });
    }
    
    //updateTaskInstanceState(tInstanceId, 'completed'
    $scope.processTicket = function(tInstanceId, updateStatus) {
        
        KieTaskManagementService.updateTaskState(containerID, tInstanceId, updateStatus).then(function(response) {
                growl.success('Task Instance: ' + tInstanceId + ' has been successfully updated to: ' + updateStatus,{title: 'Success!'});
                console.log(response.data);
            }, function(response) {
                growl.error('Unable to update Task w/ ID: ' + tInstanceId + '. KIE Server threw a HTTP: ' + response.status,{title: 'Error!'});
            }).finally(function() {
                // Reload everything!
                refreshAllStates();
            });
    }
    
    $scope.modalTaskViewOpen = function (taskID, taskName) {
        console.log('Opening Task View for Task ID : ' + taskID);
        var currentTask = taskID ?  taskID : null;
        var modalInput = {
            currentTask: taskID,
            taskName : taskName,
            containerVersion : 'angular-forms-container'
        }
        
        StateStore.setCurrentTask(taskID);
        var modalInstance = $modal.open({
            templateUrl: 'html/partials/modals/taskForm.html',
            controller: 'ModalTaskView as vm',
            resolve: {
                'modalInput': function () {
                    return modalInput;
                    }
                }
            }
        );
        
        modalInstance.result.then(function (formData) {
            //$scope.selected = selectedItem;
            console.log("Back from Modal Action with... " + angular.toJson(formData) + ' :::: ' + containerID + ' :::: ' + taskID);
            
            // containerID, tInstanceId, status, body
            KieTaskManagementService.updateTaskState(containerID, taskID, 'completed', formData).then(function (response) {
                growl.success(taskID + ' has been successfully Completed!!!!', {title: 'Success Completed !'});
                console.log('Succesfully updated task ' + taskID + ' with the status: completed');

            }, function (error) {
                console.log('Unsuccessfully updated task ' + taskId + ' with the status: completed');
            }).finally(function() {
                // Reload everything!
                refreshAllStates();
            });;

        }, function () {
            console.log('Modal dismissed at: ' + new Date() + '.  Sending release call');

        });

    }
    
    function refreshAllStates(){
        ownedInstances();
        processInstances();
        taskInstances();
    }
    
    // Call when the JS file is loaded.
    refreshAllStates();

}])
