/**
 * Created by mooner00 on 9/6/2016.
 */
app.controller('userConfigController', function($scope,$http,$httpParamSerializerJQLike, $uibModal,dataService,configService,$timeout)
{
    $scope.newUser = {}

    $scope.levels = []
    var init = function()
    {
        dataService.getConfigDetail('auth',function(data)
        {
            console.log(data)
            forEach(data,function(key,value)
            {
                if (value.level >=0) $scope.levels.push(value)
            })
            console.log($scope.levels)
        })
    }()
    
    $scope.users = [{id:1,level:1,username:"hi",password:"hello"}]

    $scope.msg = {};

    $scope.changeAuth = function(user,auth)
    {
        console.log(user)
        user.level = auth
    }
    $scope.alert = 
    {
        good: "New User Added",
        fail:"Add Fail",
    }
    $scope.goodAdd = false;
    $scope.failAdd = false;


    $scope.alerts = []
    $scope.addAlert = function() {
        $scope.alerts.push({type:'success',msg: 'Success add!'});
    };

    $scope.deleteAlert = function(){
        $scope.alerts.push({type:"success",msg:"user has been delete"});
    }
    $scope.deleteFailAlert = function(){
        $scope.alerts.push({type:"danger",msg:"fail to delete"});
}

    $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
    };
   



    $scope.createUser = function()
    {
        $scope.users.push($scope.newUser)
        dataService.insertUser({user: $scope.newUser},function(data)
        {
            console.log(data)
            $scope.goodAdd = true;
            $scope.addAlert();
            $timeout(function(){
                $scope.goodAdd = false;
            }, 2000);

        })
    }

    $scope.deleteUser = function(id){
        dataService.deleteUser(id, function(e,o){
            if(e){
                $scope.deleteAlert();
            }else{
                $scope.deleteFailAlert();
            }
        })
    }

    $scope.editUser = function(id)
    {
        var newUser = {};
        $scope.users.forEach(function(element){
            if(element.id == id){
                newUser = element;

            }
        })
        newUser.eid = newUser.e_id;

        dataService.updateUserById(id,{user:newUser},function(e,o){
            if(e){
                $scope.msg = e;
            }else{
                $scope.msg = o;
                $scope.addAlert();
                // var config = configService.getConfig();
                // var url = config.route.index;
                // window.history.back();
            }
        });

    }
    $scope.init = function()
    {
        dataService.getAllUser(function(data)
        {
            //console.log(data);
            $scope.users = data;
            $scope.totalItems = $scope.users.length
        })
    }
    $scope.totalItems = 10
    $scope.currentPage = 1
    $scope.pageSize = 5
    $scope.editInfo = true;
    $scope.predicate = 'name';
    $scope.reverse = true;

    $scope.order = function (predicate)
    {
        $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
        $scope.predicate = predicate;
    }

    $scope.paginate = function (value)
    {
        var begin, end, index;
        begin = ($scope.currentPage - 1) * $scope.pageSize;
        end = begin + $scope.pageSize;
        index = $scope.users.indexOf(value);
        return (begin <= index && index < end);
    }

    $scope.back = function(){
        window.history.back();
    }

})