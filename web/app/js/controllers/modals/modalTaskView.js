/**
 * Controller for Modal used to 
 * 1. display forms or data when executing / viewing a Task
 * 2. Cancelling a task
 */
angular.module('angularWebApp').controller('ModalTaskView',
    ['$scope', '$modalInstance', '$log', 'TaskFormGeneratorService', 'Constants', 'KieTaskManagementService', 'modalInput', 
    function ($scope, $modalInstance, $log, TaskFormGeneratorService, Constants, KieTaskManagementService, modalInput) {
    
    var parsedForm;
    var vm = this;

    $scope.currentTask = modalInput.currentTask;
    $scope.taskName = modalInput.taskName;
    getTaskForm(modalInput.currentTask);

    // parse from data from backend into formly template format
    function  parseForm(form){
      parsedForm = TaskFormGeneratorService.generateTaskForm(form, modalInput.taskName);
      $log.debug('back from parseForm ' + JSON.stringify(parsedForm));
      vm.fields = parsedForm.fields;
      vm.model={};
      vm.title = parsedForm.title;
    }
    
    // called when executing / viewing a Task
    // make REST call to load form data for the current task
    // then call parseForm on the data to configure formly template to get input
    function getTaskForm  (tInstanceId) {
      KieTaskManagementService.getTaskForm(modalInput.containerVersion, tInstanceId).then(function (response) {
        $log.debug('back from getForm ' + JSON.stringify(response.data));
        parseForm(response.data);
      }, function (err) {
        $log.error('Failed to get form for' + tInstanceId +' - ' + JSON.stringify(err));
      });
    }
        
    $scope.modalCancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.submitForm = function () {
        $modalInstance.close(vm.model);
    };

}]);