var rule = angular.module('rule',[])
rule.factory('$rule',function ()
{
    var checkName = function(type,value) { if (value == undefined || value == '') return 'please input ' + type }
    var checkAge = {}
    var checkdob = {}
    var tableDriver =
    {
        name : checkName,
        age : checkAge,
        dob : checkdob
    }

    return {
        check: function(type,value)
        {
            return tableDriver['name'](type,value)
        }
    }
})