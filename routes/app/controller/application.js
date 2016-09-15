/**
 * Created by mooner00 on 8/24/2016.
 */
app.controller('application', function($scope,dataService,$uibModal)
{
    $scope.messages = [{from: 'admin',to: 'user',toID: 1,message: 'welcome to EIMS',flag: false ,readTime: '2016/1/1',sendTime: '2017/04/19'} , {from: 'login',to: 'user',toId: 1,message: 'hi', flag: true, readTime:'',sendTime:'2018/9/1'}]

    $scope.messages.unreadNumber = function()
    {
        var num = 0;
        $scope.messages.forEach( function(element)
        {
            if (element.flag === false) num++            
        })
        return num;
    }
    $scope.letterNum = $scope.messages.unreadNumber()

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

    $scope.open = function ()
    {
        console.log($scope.letterNum)    
        //console.log($scope.messages)
        var modalInstance = $uibModal.open
        ({
            animation: $scope.animationsEnabled,
            templateUrl: 'message.html',
            controller: 'message',
            //size: size,
            resolve:
            {
                items: function ()
                {
                    return $scope.messages
                },
                nums: function()
                {
                    return $scope.letterNum
                }
            }
        })
        $scope.letterNum = 0
    }

    $scope.sendMessage = function ()
    {
        var modalInstance = $uibModal.open
        ({
            animation: $scope.animationsEnabled,
            templateUrl: 'send.html',
            controller: 'send',
            //size: size,
            resolve:
            {
                dataService: function ()
                {
                    return dataService
                },
            }
        })
    }
})

app.controller('message', function ($scope, $uibModalInstance, items, nums )
{
    $scope.messages = items

    $scope.ok = function ()
    {
        $uibModalInstance.close()
        items.forEach(function(element,index)
        {
            if (element.flag == false)
            {
                items[index].flag = true
            }
        })
        nums = 0
    }
})

app.controller('send', function ($scope, $uibModalInstance,dataService)
{
    $scope.data = ""
    $scope.users = []
    $scope.getAllUser = function()
    {
        dataService.getAllUser(function(data)
        {
            console.log(data)
            $scope.users = data
            $scope.users.forEach( function(element,index)            {
                $scope.users[index].flag = false
            })
        })
    } 
    $scope.ok = function()
    {
        //$scope.getAllUser()
    }

    $scope.send = function()
    {
        var packet = []
        $scope.users.forEach(function (element,index)
        {
            console.log(2)
            if (element.flag == true)
            {
                var obj = 
                {
                    from: window.localStorage.username,
                    to: element.username,
                    message: $scope.data,
                    flag: false,
                    toId: element.id,
                    sendTime: new Date(),
                    readTime: ''
                }
                packet.push(obj)

            }
        })
        //console.log(packet)

        dataService.sendMessage(packet,function()
        {
            console.log($scope.users)
            $uibModalInstance.close()
        })

    }
    $scope.getAllUser()
})