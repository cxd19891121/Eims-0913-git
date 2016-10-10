app.controller('search',['$scope','dataService',function($scope,dataService,$http,$httpParamSerializerJQLike)
{
    $scope.myPopover = {}
    $scope.open = function(id) 
    {
        $scope.popup[id] = true;
    }
    $scope.popover = 
    {
        open: false
    }
    $scope.keyPressSearch = function(event)
    {
        if (event.keyCode == 13)$scope.searchByName()
    }
    $scope.keyPressDeepSearch = function(event)
    {
        if (event.keyCode == 13)$scope.deepSearch()
    }
    

    $scope.toggle = function()
    {
        $scope.displayAdvanceSearch = !$scope.displayAdvanceSearch
    }

    $scope.popup = 
    {
        opened: false
    }
    $scope.advanceSearchUrl = "advanceSearch.html"
    $scope.dynamicPopover = 'myPopoverTemplate.html'
    $scope.alerts = []
    $scope.addAlert = function(type,msg) 
    {
        if ($scope.alerts.length == 0) $scope.alerts.push({type: type,msg: msg});
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
    $scope.advanceSearch = function()
    {
        $scope.myPopover.isOpen = false
        $scope.deepSearch()
    }
    $scope.deepSearch = function()
    {

        $scope.popover.open = false
        
        dataService.search($scope.searchObject,function(data)
        {
            console.log(data)
            if(data.length == 0)
            {
                $scope.addAlert('danger','No feteched employee')
            }
            else
            {
                $scope.addAlert('success','Search success')
                //console.log(data)
                $scope.$parent.$broadcast('changeData',{data:data})
            }
        })

    }

}])

