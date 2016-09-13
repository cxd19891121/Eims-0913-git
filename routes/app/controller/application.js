/**
 * Created by mooner00 on 8/24/2016.
 */
app.controller('application', function($scope,dataService)
{
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
            window.location.href = 'http://localhost:3000';
        })

    }





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
})