/**
 * Created by ajarrett : ajarrett@redhat.com on 18/07/16.
 * Kie Process Instance Management Status Service
 */
(function () {
    'use strict';
    angular.module('angularWebApp').factory('TaskFormGeneratorService', ['$http', 'Constants', '$log', TaskFormGeneratorService]);
    

    function TaskFormGeneratorService($http, Constants, $log) {
        
        var formObject = {};
        var service = {};
        
        // Define Service Calls
        service.generateTaskForm = generateTaskForm;
        return service;

        
      /*  EXAMPLE jBPM TASK FORM SCHEMA 
            {      
                "errorMessage": "",
                "fieldClass": "java.lang.String",           
                "fieldRequired": false,
                "groupWithPrevious": false,
                "hideContent": false,
                "id": 734456628,
                "inputBinding": "REDHAT ONBOARDING",
                "isHTML": false,
                "label": "Project",
                "name": "project",
                "position": 0,
                "readonly": true,
                "title": "",
                "type": "InputText"
            }   
        
          EXAMPLE ANGULAR FORMLY FIELD CONSTRAINTS   
            {
                key:   'field.name'
                type:  'field.type' (input/datepicker/checkbox)
                templateOptions {
                        label: 'field.label'
                        type: 'field.type' (email/text)
                        placeholder: //
                        required: 'field.fieldRequired.
                        readonly: 'field.readonly'
           }
      */

    function generateAcceptActionForm() {
        // Generic Empty Form to accept current task
        formObject.model = {};
        formObject.fields = [];
        return formObject;
    }
        
    function generateTaskForm(bpmFormData, taskName) {
        // Instantiate Form Object
        formObject.model = {};
        formObject.fields = [];

        if (bpmFormData.form.field.length > 1) {
            if (taskName){
                formObject.title = taskName;  
            } else {
                formObject.title = bpmFormData.form.name;
            }
            //sort form fields
            var fieldArr = _.chain(bpmFormData.form.field)
                .filter(function(item) {
                  return item.label;
                })
                .sortBy('position')
                .value();

            angular.forEach(fieldArr, function (fieldObject, idx) {
                $log.debug('id: ' + fieldObject.id);
                createSchemaFormObject(fieldObject, bpmFormData.form.dataHolder, idx);
            });
        } else {
            //console.log('fieldClass: ' + response.data.form.field.fieldClass );
            createSchemaFormObject(bpmFormData.form.field, bpmFormData.form.dataHolder, 0);
        }
        return formObject;
    }

    function checkIDMapping(fieldID, dataholder) {
        var field = _.find(dataholder,{"id": fieldID});
        if (field && field.outId && field.outId !== "" && field.outId !== fieldID) {
            $log.debug('Mapping Check - ID change '+ fieldID + ' to ' + field.outId);
            return field.outId;
        } else {
            $log.error('Mapping Check - ID OK '+ fieldID) ;
            return fieldID;
        }

    }

    function createSchemaFormObject(fieldObject, formData, idx) {

        // Define form variable types if necessary
        if (fieldObject.label) {
            var inputType = fieldObject.fieldClass === 'java.util.Date' ? 'datepicker' : 'input'; //default
            var type = 'text'; //default to text can change later if needed

            // check mapping in form dataHolder
            var fieldName = checkIDMapping(fieldObject.name, formData);

            var field = {
                key: fieldName,
                type: inputType,
                id: 'task-form-' + idx,
                templateOptions: {
                    label: fieldObject.label,
                    placeholder: fieldObject.inputBinding || fieldObject.outputBinding || '',
                    type: type,
                    disabled: fieldObject.readonly || false,
                    required: fieldObject.fieldRequired || false
                }
            };


            //modify if it's a date
            if(fieldObject.fieldClass === 'java.util.Date'){
                field.templateOptions.datepickerPopup = 'dd-MMMM-yyyy';
                field.defaultValue = new Date();
                field.templateOptions.datepickerOptions = {
                    format: 'dd-MMMM-yyyy'
                  };

                if(fieldObject.label.indexOf('Completion') >= 0){
                    field.templateOptions.maxDate = new Date();
                }
            } else if (fieldObject.rangeFormula ){
            // modify if it's a dropdown dropdown

                var optObj = fieldObject.rangeFormula;
                //strip brackets
                optObj = optObj.replace('{','').replace('}','');
                var arrObj = optObj.split(';');
                var options = [];

                for (var i = 0; i < arrObj.length; i++) {
                    var obj = {};
                    // obj[arrObj[i].split(',')[0]] = arrObj[i].split(',')[1];
                    obj.name = arrObj[i].split(',')[1];
                    obj.value =  arrObj[i].split(',')[0];
                    options.push(obj);
                }

                field.type='select';
                field.templateOptions.options=options;

            }
            formObject.fields.push(field);
        }  
    }    
}
    
})();
