app.controller('search',['$scope','dataService',function($scope,dataService,$http,$httpParamSerializerJQLike)
{
    $scope.open = function(id) 
    {
        $scope.popup[id] = true;
    }

    $scope.popup = 
    {
        opened: false
    }

    $scope.alerts = []
    $scope.addAlert = function(type,msg) 
    {
        if ($scope.alerts == [])
        $scope.alerts.push({type: type,msg: msg});
    }
    $scope.closeAlert = function(index) 
    {
        $scope.alerts.splice(index, 1);
    }

    $scope.ctrlScope = $scope
    $scope.searchObject =
    {
        first_name: '',
        last_name: '',
        job_title: '',
        status: '',
        major: '',
        degree: '',
        'visa_info.start_time':'',

    }
    $scope.employeeName = ''

    $scope.searchByName = function()
    {
        //console.log($scope.employeeName)
        /*$http
        ({
            method: 'POST',
            url: 'http://localhost:3000/search/name',
            data: $httpParamSerializerJQLike({name :$scope.employeeName}),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
            .success(function(data)
            {
                
            })*/
        dataService.searchByName($scope.employeeName,function(data)
        {
            console.log(data)
            if(data.length == 0)
            {
                //alert('No feteched employee');
                $scope.addAlert('danger','No feteched employee')
            }
            else
            {
                $scope.addAlert('success','Search success')
                console.log(data)
                $scope.$parent.$broadcast('changeData',{data:data});
            }
        })
    }
    $scope.deepSearch = function()
    {
        //console.log(1)
        //console.log($scope.showMoreSearch)
        $scope.showMoreSearch = false
        /*$http
        ({
            method: 'POST',
            url: 'http://localhost:3000/search',
            data: $httpParamSerializerJQLike($scope.searchObject),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
            .success(function(data)
            {
                if(!data)
                {
                    alert('fail')
                }
                else
                {
                    console.log(data)
                    $scope.$parent.$broadcast('changeData',data)
                }
            })*/
        dataService.search($scope.searchObject,function(data)
        {
            if(!data)
            {
                $scope.addAlert('danger','No feteched employee')
            }
            else
            {
                $scope.addAlert('success','Search success')
                console.log(data)
                $scope.$parent.$broadcast('changeData',{data:data})
            }
        })

    }

}])