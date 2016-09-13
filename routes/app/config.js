var config = angular.module('config',[])
config.factory('$config',function ()
{

    return  {
                newUuser : 'http://localhost:3000/newuser/',
                baseUrl : 'http://localhost:3000/api/',
        
            }
})