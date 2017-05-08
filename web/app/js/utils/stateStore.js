angular.module('angularWebApp').factory('StateStore', function () {
    
    var currentTask;
    var currentContainer; 
    
    var getCurrentTask = function () {
        return currentTask;
    };

    var setCurrentTask = function (id) {
        currentTask = id;
    };
    
    var getCurrentContainer = function () {
        return currentContainer;
    };

    var setCurrentContainer = function (container) {
        currentContainer = container;
    };

    return {
        getCurrentTask: getCurrentTask,
        setCurrentTask: setCurrentTask,
        getCurrentContainer: getCurrentContainer,
        setCurrentContainer: setCurrentContainer
    };

});