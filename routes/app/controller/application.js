/**
 * Created by mooner00 on 8/24/2016.
 */
app.controller('application', function($scope,dataService,$uibModal)
{
    $scope.messages = []
    $scope.username = window.localStorage.username
    $scope.unreadNumber = function(messges)
    {
        var num = 0;
        $scope.messages.forEach( function(element)
        {
            if (element.flag === false) num++
        })
        return num;
    }
    $scope.letterNum = $scope.unreadNumber($scope.messages)

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
        dataService.getMessage(window.localStorage.username,function(data)
        {
            if(data)
            {
                $scope.messages = []
                data.forEach(function(element)
                {
                    if(element.delete == undefined || element.delete == false)
                    {   
                        $scope.messages.push(element)
                    }
                })
                //$scope.messages = data
                $scope.messages.sort(function(ele1,ele2)
                {
                    // console.log(Date.parse(ele1.sendTime))
                    //console.log(Date.parse(ele1.sendTime)-Date.parse(ele2.sendTime));
                    return Date.parse(ele2.sendTime)-Date.parse(ele1.sendTime)
                })
                //$scope.messages.forEach((a) => console.log(a));
                $scope.messages.forEach(function(element)
                {
                    element.sendTime=parseISO8601(element.sendTime);
                    //console.log(element)
                    // $scope.messages[index].sendTime = parseISO8601($scope.messages[index].sendTime)
                })
               //console.log($scope.messages);
            }
        })
        $scope.open('lg')

    }

    $scope.refresh = function()
    {
        dataService.getMessage(window.localStorage.username,function(data)
        {
            if(data)
            {
                $scope.messages = []
                data.forEach(function(element)
                {
                    if(element.delete == undefined)
                    {
                        $scope.messages.push(element)
                    }
                })
                //$scope.messages = data
                $scope.messages.forEach(function(element,index)
                {
                    $scope.messages[index].sendTime = parseISO8601($scope.messages[index].sendTime)
                })
                $scope.letterNum = $scope.unreadNumber($scope.messages)
            }
        })
    }
    $scope.refresh();




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
        //$scope.getMessage();
        //console.log($scope.letterNum)
        //console.log($scope.messages)
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

app.controller('message', function ($scope, $uibModalInstance, items, nums ,dataService)
{
    $scope.messages = items
    $scope.totalItems = items.length
    $scope.currentPage = 1
    $scope.pageSize = 10

    $scope.paginate = function (value)
    {
        var begin, end, index;
        begin = ($scope.currentPage - 1) * $scope.pageSize;
        end = begin + $scope.pageSize;
        index = $scope.messages.indexOf(value);
        return (begin <= index && index < end);
    }

    $scope.ok = function ()
    {
        //console.log($scope.messages)
        items.forEach(function(element,index)
        {
            if (element.flag == false)
            {
                items[index].flag = true
            }
            if (element.delete == true)
            {
                items.splice(index, 1);
            }
        })
        //console.log(items)
        nums = 0
        dataService.putMessage(items,function(d)
        {
            console.log("data putted")
            //console.log(d)
        })
        $uibModalInstance.close()
    }
})

app.controller('send', function ($scope, $uibModalInstance,dataService)
{
    $scope.data = ""
    $scope.users = []
    $scope.disables = true;
    $scope.disableSend = function()
    {
        let temp = true;
        $scope.users.forEach(function(element,index)
        {
            if (element.flag == true) 
            {
                temp = false;
                //console.log($scope.disables)
                return;
            }
        })
        
        $scope.disables = temp;
        return ;
    }
    $scope.getAllUser = function()
    {
        dataService.getAllUser(function(data)
        {
            //console.log(data)
            $scope.users = []
            data.forEach(function(element,index)
            {
                //console.log(element.username)
                if (element.username != window.localStorage.username)
                {
                    //console.log(element.username)
                    $scope.users.push(element)
                    //$scope.users[index].flag = false
                }
            })
            $scope.users.forEach(function(element,index)
            {
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
            //console.log(2)
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
            //console.log(packet)
            $uibModalInstance.close()
        })

    }
    $scope.getAllUser()
})