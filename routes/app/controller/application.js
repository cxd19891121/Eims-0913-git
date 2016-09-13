/**
 * Created by mooner00 on 8/24/2016.
 */
app.controller('application', function($scope,dataService,$uibModal)
{
    $scope.letterNum = 0;

    $scope.showSearch = true
    $scope.addDetail = false
    $scope.addNew = false
    $scope.addNewUser = function()
    {
        var add = window.location + 'add'
        window.location.href = add
    }

    $scope.modifyConfig = function()
    {
        var config = window.location + 'config';
        window.location.href = config;
    }

    $scope.userConfig = function()
    {
        var userConfig = window.location + 'userConfig';
        window.location.href = userConfig;
    }

    $scope.logout = function(){
        dataService.logout(function(data){
        })
    }

    $scope.getMessage = function()
    {
        $scope.open()
        dataService.getMessage(window.localStorage.username,function(data)
        {
            if(data)
            {
                $scope.messages = data
            }
        })
        
    }
    

    $scope.messages = []

    $scope.id = -1
    $scope.$on('editUser',function(event,data)
    {
        $scope.id = data.id
        console.log('id = ' + $scope.id)
    })
    $scope.$on('$viewContentLoaded', function()
    {
        $scope.$broadcast('setUserId',$scope.id)
    });

    $scope.open = function (size)
    {
        
        var modalInstance = $uibModal.open
        ({
            animation: $scope.animationsEnabled,
            templateUrl: 'message.html',
            controller: 'message',
            size: size,
            resolve:
            {
                items: function ()
                {
                    return $scope.detail
                }
            }
        })

    }
})

app.controller('message', function ($scope, $uibModalInstance, items)
{
    $scope.detail = items

    $scope.ok = function ()
    {
        $uibModalInstance.close()
    }

    $scope.cancel = function ()
    {
        $uibModalInstance.dismiss('cancel')
    }

    
})