app.service('dataService', ['$http', '$httpParamSerializerJQLike', function ($http, $httpParamSerializerJQLike) {

    var url = 'http://localhost:3000/'
    var config = {
        newUser: url + 'newuser/',
        baseUrl: url + 'api/',
        searchByName: url + 'search/name',
        search: url + 'search'
    }

    var vm = this;
    var baseUrl = config.baseUrl

    vm.getAllBySql = function(callback){

        $http({
            method: 'GET',
            url: baseUrl + 'all',
        }).then(function successCallback(data) {
            var dataArr = data.data.rows;
            callback(null,dataArr);
        }, function errorCallback(data) {
            console.log("in error callback");
            console.log(data);
            callback(data);
        });



    }


    vm.getConfig = function (callback){

        $http({
            method: 'GET',
            url: baseUrl + 'config',
        }).then(function successCallback(data) {

            callback(null,data)
        }, function errorCallback(data) {
            console.log("in error callback");
            console.log(data);
            callback(data);
        });
    }

    vm.updateConfig = function (data,callback){
        console.log(data)
        $http({
            method: 'PUT',
            url: baseUrl + 'config',
            data:angular.toJson(data),
        }).then(function successCallback(data) {

            callback(null,data);
        }, function errorCallback(data) {
            console.log("in error callback");
            console.log(data);
            //callback(data);
        });
    }


    vm.getTest = function () {

        return {name: 'ooo', data: 'test Data'};
    }

    vm.refreshPage = function(){

        $http
        ({
            method: 'GET',
            url: 'http://localhost:3000/backToIndex',
        }).success(function(data)
        {
            window.location.href = data;
        })
    }
    function backToIndex(){
        window.location.herf = url;
    }
    vm.backToIndex = backToIndex;



    vm.logout = function(callback)
    {
        $http
        ({
            method: 'GET',
            url: 'http://localhost:3000/logout',
        }).success(function(data)
            {
                alert('user logout');
                window.location.href = data;

            })
    }

    vm.getAll = function (tableName, callback) {

        console.log('in function');
        $http({
            method: 'GET',
            url: baseUrl + tableName,
        }).then(function successCallback(data) {
            console.log("in sucess callback");
            console.log(data);
            callback(null, data)
        }, function errorCallback(data) {
            console.log("in error callback");
            console.log(data);
            callback(data);
        });
    }

    vm.addUser = function (callback) {
        $http
        ({
            method: 'POST',
            url: $config.newUser,
            data: angular.toJson($scope.newData),
            headers: {'Content-Type': 'application/json'}
        })
            .success(function (data) {
                callback(data)
            })
    }

    vm.getAllUser = function (callback) {
        var tableName = 'user'
        console.log('in function');
        $http({
            method: 'GET',
            url: baseUrl + tableName,
        }).then(function successCallback(data) {
            console.log("in sucess callback");
            console.log(data);
            callback(data.data.rows)
        }, function errorCallback(data) {
            console.log("in error callback");
            console.log(data);
            callback(data);
        });
    }

    vm.insertUser = function (user, callback) {
        var tableName = 'user'
        console.log('in function');
        console.log(user);
        console.log(angular.toJson(user));
        $http({
            method: 'POST',
            url: baseUrl + tableName,
            data: angular.toJson(user),
            headers: {'Content-Type': 'application/json'}
            //{ 'Content-Type': 'application/json' }

        }).then(function successCallback(data) {
            console.log("in sucess callback");
            console.log(data);
            callback(null, data)
        }, function errorCallback(data) {
            console.log("in error callback");
            console.log(data);
            callback(data);
        });
    }

    vm.insertElement = function (element, tableName, callback) {

        console.log('in function');
        console.log(element);
        console.log(angular.toJson(element));
        $http({
            method: 'POST',
            url: baseUrl + tableName,
            data: angular.toJson(element),
            headers: {'Content-Type': 'application/json'}
            //{ 'Content-Type': 'application/json' }

        }).then(function successCallback(data) {
            console.log("in sucess callback");
            console.log(data);
            callback(null, data)
        }, function errorCallback(data) {
            console.log("in error callback");
            console.log(data);
            callback(data);
        });
    }

    vm.getUserById = function (id, callback) {
        var tableName = 'user';
        console.log('in function');
        $http({
            method: 'GET',
            url: baseUrl + tableName + '/' + id,
        }).then(function successCallback(data) {
            console.log("in sucess callback");
            console.log(data);
            callback(null, data)
        }, function errorCallback(data) {
            console.log("in error callback");
            console.log(data);
            callback(data);
        });
    }

    vm.getElementById = function (id, tableName, callback) {

        console.log('in function');
        $http({
            method: 'GET',
            url: baseUrl + tableName + '/' + id,
        }).then(function successCallback(data) {
            console.log("in sucess callback");
            console.log(data);
            callback(null, data)
        }, function errorCallback(data) {
            console.log("in error callback");
            console.log(data);
            callback(data);
        });
    }

    vm.getLast = function (tableName, callback) {

        console.log('in function');
        $http({
            method: 'GET',
            url: baseUrl + tableName + '/last',
        }).then(function successCallback(data) {
            console.log("in sucess callback");
            console.log(data);
            callback(null, data)
        }, function errorCallback(data) {
            console.log("in error callback");
            console.log(data);
            callback(data);
        });


    }


    vm.deleteUserById = function (id, callback) {
        console.log('in function');
        $http({
            method: 'DELETE',
            url: baseUrl + 'user/' + id,
        }).then(function successCallback(data) {
            callback(null, data)
        }, function errorCallback(data) {
            callback(data);
        });
    }


    vm.deleteElementById = function (id, tableName, callback) {
        console.log('in function');
        $http({
            method: 'DELETE',
            url: baseUrl + tableName + '/' + id,
        }).then(function successCallback(data) {
            callback(null, data)
        }, function errorCallback(data) {
            callback(data);
        });
    }

    vm.updateUserById = function (id, user, callback) {
        console.log('this is the update function')

        console.log('user data:',angular.toJson(user));
        var tableName = 'user'
        $http({
            method: 'PUT',
            url: baseUrl + tableName + '/' + id,
            data: angular.toJson(user),
            headers: {'Content-Type': 'application/json'}
        }).then(function successCallback(data) {
            console.log("in sucess callback");
            console.log(data);
            //alert('User Information has been updated');
            //window.location.href = url;
            callback(null, data)
        }, function errorCallback(data) {
            console.log("in error callback");
            console.log(data);
            callback(data);
        });
    }

    vm.updateElementById = function (id, element, tableName, callback) {
        console.log('this is the update function')

        $http({
            method: 'PUT',
            url: baseUrl + tableName + '/' + id,
            data: angular.toJson(element),
            headers: {'Content-Type': 'application/json'}
        }).then(function successCallback(data) {
            console.log("in sucess callback");
            console.log(data);
            callback(null, data)
        }, function errorCallback(data) {
            console.log("in error callback");
            console.log(data);
            callback(data);
        });
    }


    vm.getElementByEId = function (eid, tableName, callback) {

        console.log('in function');
        $http({
            method: 'GET',
            url: baseUrl + tableName + '/EId/' + eid,
        }).then(function successCallback(data) {
            console.log("in sucess callback");
            console.log(data);
            callback(null, data)
        }, function errorCallback(data) {
            console.log("in error callback");
            console.log(data);
            callback(data);
        });
    }


    vm.deleteAllById = function (id, callback) {
        $http({
            method: 'DELETE',
            url: baseUrl + "all/" + id,
            headers: {'Content-Type': 'application/json'}
            //{ 'Content-Type': 'application/json' }
        }).then(function successCallback(data) {
            console.log(data);
            callback(null, data)
        }, function errorCallback(data) {
            callback(data);
        });


    }

    vm.getAllById = function (id, callback) {
        $http({
            method: 'GET',
            url: baseUrl + "all/" + id,
            headers: {'Content-Type': 'application/json'}
            //{ 'Content-Type': 'application/json' }
        }).then(function successCallback(data) {
            //console.log(data);
            callback(null, data)
        }, function errorCallback(data) {
            callback(data);
        });

    }


    vm.addAll = function (data, callback) {

        console.log(angular.toJson(data));
        $http({
            method: 'POST',
            url: baseUrl + 'all',
            data: angular.toJson(data),
            headers: {'Content-Type': 'application/json'}
            //{ 'Content-Type': 'application/json' }

        }).then(function successCallback(data) {
            console.log("in sucess callback");
            console.log(data);
            var data = data.data;
            alert(data.emp.msg + '\n'+ data.edu.msg+'\n' +
                data.visa.msg+ '\n' + data.order.msg + '\n'+ data.work.msg);
            window.location.href = url;
            callback(null, data)
        }, function errorCallback(data) {
            console.log("in error callback");
            console.log(data);
            alert("fail to add user");
            callback(data);
        });
    }

    vm.updateAllById = function (id, data, callback) {

        console.log('data send',angular.toJson(data));
        $http({
            method: 'PUT',
            url: baseUrl + 'all/' + id,
            data: angular.toJson(data),
            headers: {'Content-Type': 'application/json'}
            //{ 'Content-Type': 'application/json' }

        }).success(function successCallback(e,data) {
            console.log("in sucess callback");
            console.log(data);
            alert('user has been updated');
            window.location.href= url;
            callback(null, data)
        }, function errorCallback(data) {
            console.log("in error callback");
            console.log(data);
            alert(data);
            callback(data);
        });
        callback(null, 'done')
    }

    vm.searchByName = function (name, callback) {
        $http
        ({
            method: 'POST',
            url: config.searchByName,
            data: $httpParamSerializerJQLike({name: name}),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
            .success(function (data) {
                    callback(data)
            })
    }

    vm.search = function (searchObj, callback) {
        $http
        ({
            method: 'POST',
            url: config.search,
            data: $httpParamSerializerJQLike(searchObj),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
            .success(function (data) {
                console.log('search back data',data);
                callback(data)
            })
    }


}])
