angular.module('angularWebApp').service('UtilityFunctions', ['$log', '$location', 'Constants', 'KieServerService', function ($log, $location, Constants, KieServerService) {

  
    // Work's out TAT Date
    this.daysBetween = function(startDate) {
        var millisecondsPerDay = 24 * 60 * 60 * 1000;
        //var diffDays = Math.round((new Date().getTime() - startDate) / millisecondsPerDay);
        var diffDays = Math.abs((new Date().getTime() - startDate)/(millisecondsPerDay));
        
        // Return Whole Number is >= 10
        if (diffDays >= 10){
            return Math.round(diffDays);
        }

        return +diffDays.toFixed(0);
    };

    // subtract a month from the current date
    this.subtractMonth = function (dateIn){
        var dateOut = new Date(dateIn);
        dateOut.setMonth(dateOut.getMonth()-1);
        return dateOut;
    }

    // subtract a year from the current date
    this.subtractYear = function (dateIn){
        $log.debug('subtractYear  dateIn', dateIn);
        var dateOut = new Date(dateIn);
        dateOut.setYear(dateOut.getFullYear()-1);
        $log.debug('subtractYear  dateOut', dateOut);
        return dateOut;
    }

    // set a date to start of the yeat: 00:00 hours on 1st Jan
    this.getYearStart = function (dateIn){
        $log.debug('getYearStart  dateIn', dateIn);
        var dateOut = new Date(dateIn);
        dateOut = new Date(dateOut.getFullYear(), 0, 1);
        $log.debug('getYearStart  dateOUt', dateOut);
        return dateOut;
    }

    //set a date to the start of the month: 00:00 hours on the 1st of the month
    this.getMonthStart = function (dateIn){
        $log.debug('getMonthStart  dateIn', dateIn);
        var dateOut = new Date(dateIn);
        dateOut = new Date(dateOut.getFullYear(), dateOut.getMonth(), 1);
        $log.debug('getMonthStart  dateOUt', dateOut);
        return dateOut;
    }

    // set a date to the start of the week: 00:00 hours on Monday
    this.getWeekStart = function (dateIn){
        $log.debug('getWeekStart  dateIn', dateIn);
        var dateOut = new Date(dateIn);
        dateOut = new Date(dateOut.getFullYear(), dateOut.getMonth(), (dateOut.getDate() - dateOut.getDay() +1), 1);
        $log.debug('getWeekStart  dateOUt', dateOut);
        return dateOut;
    }

    // set a date to the start of the day i.e. 00:00 hours
    this.getDayStart = function (dateIn){
        $log.debug('getDayStart  dateIn', dateIn);
        var dateOut = new Date(dateIn);
        dateOut = new Date(dateOut.getFullYear(), dateOut.getMonth(), dateOut.getDate(), 1);
        $log.debug('getDayStart  dateOUt', dateOut);
        return dateOut;
    }

    // set a date to the end of day 23:59 hours
    this.setToDayEnd = function (dateIn){
        $log.debug('getDayEnd  dateIn', dateIn);
        var dateOut = new Date(dateIn);
        dateOut.setHours(23);
        dateOut.setMinutes(59);
        $log.debug('getDayEnd  dateOUt', dateOut);
        return dateOut;
    }

    // convert array to string 
    this.arrayToString = function(arr) {
        var str = arr[0];
        for (var i = 1; i < arr.length; i++) {
            str = str.concat(', ' + arr[i]);
        }
        return str;
    }

    // filters collections based on a field value
    // can choose to include or exclude
    this.filter = function(array, field, value, exclude){
        return  _.filter(array, function(item) {
                if(exclude){
                    return item[field] !== value; 
                } else {
                    return item[field] === value; 
                }
            });
    }

}]);