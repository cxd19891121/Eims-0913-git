app.service('dataService', ['$http', '$httpParamSerializerJQLike', function ($http, $httpParamSerializerJQLike) {

    
    var url = "";
    var config = {
        newUser: url + 'newuser/',
        baseUrl: url + 'api/',
        searchByName: url + 'search/name',
        search: url + 'search',
        forget: url + 'forget',
        refresh: url + 'backToIndex',
        logout: url + 'logout',
        message: url + 'api/message/',
        update: url + 'api/message/'

    }


    var vm = this;
    var baseUrl = config.baseUrl
    vm.userInfo = {}
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

    vm.login = function(loginForm,callback){
        console.log(url)
        vm.userInfo = loginForm;
        $http
        ({
            method: 'POST',
            url: url ,
            data: $httpParamSerializerJQLike(loginForm),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .success(function(data)
        {

            if(data.error){
                alert(data.msg)
            }else {
                window.localStorage.username = loginForm.username
            }
            //console.log(window.cookie)
            callback(data)
            /*if(!data.error) {
                console.log(data);
                window.location.href = data;
            }*/
        })
    }

    vm.forget = function(username,callback)
    {
        $http
        ({
            method: 'POST',
            url: config.forget,
            data: $httpParamSerializerJQLike({username:username}),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .success(function(data)
        {
            callback(data)
            /*if(!data)
            {
                alert('fail')
            }
            else
            {
                $uibModalInstance.close()
                console.log(data)
                
                //$scope.$parent.$broadcast('changeData',data)
            }*/
        })
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
            url: config.refresh,//'http://localhost:3000/backToIndex',
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
            url: config.logout//'http://localhost:3000/logout',
        })
        .success(function(data)
        {
            //alert('user logout');
            console.log(window.location)
            console.log(window.location.hostname + ':' + window.location.port)
            var location = 'http://' + window.location.hostname + ':' + window.location.port
            window.location.href = location
        })
    }

    vm.getMessage = function(username,callback)
    {
        $http({
            method: 'GET',
            url: config.message + username,
        }).success(function(data)
        {
            //console.log('getMessage',data);
            if (data)
            {
                callback(data)
            }
        })
    }

    vm.sendMessage = function(obj,callback)
    {
        console.log(obj)
        var sendObj = {message: obj}
        $http({
            method:'POST',
            url: config.message,
            data: angular.toJson(sendObj),
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

    vm.putMessage = function(obj,callback)
    {
        $http({
            method: 'PUT',
            url: config.update + window.localStorage.username,
            data: angular.toJson({message: obj}),
            headers: {'Content-Type': 'application/json'}
        }).then(function successCallback(data) {
            //console.log("in sucess callback");
            //console.log(data);
            //alert('User Information has been updated');
            //window.location.href = url;
            callback(data)
        }, function errorCallback(data) {
            //console.log("in error callback");
            console.log(data);
            callback(data);
        });
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
        //console.log('in function');
        $http({
            method: 'GET',
            url: baseUrl + tableName,
        }).then(function successCallback(data) {
            //console.log("in sucess callback");
            //console.log(data);
            callback(data.data.rows)
        }, function errorCallback(data) {
            //console.log("in error callback");
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

            console.log("in success callback");
            console.log(data);

            if(data.msg){
                alert('fail to insert data');
                callback(data);
            }else {
                var data = data.data;
                alert("New Employee Info Added");
                window.history.back();
                callback(null, data)
            }
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
