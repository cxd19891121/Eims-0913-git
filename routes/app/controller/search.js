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
            if(!data)
            {
                alert('No feteched employee')
            }
            else
            {
                console.log(data)
                $scope.$parent.$broadcast('changeData',{data:data});
            }
        })
    }
    $scope.deepSearch = function()
    {
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
                alert('fail')
            }
            else
            {
                console.log(data)
                $scope.$parent.$broadcast('changeData',{data:data})
            }
        })
    }

}])