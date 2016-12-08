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
    $scope.update = function(id)
    {

    }
    $scope.jobLevel = 
    {
        account:{name:"Accounting Manager" , value:false},
        srJava:{name:"Sr.Software Enginner/Java" , value:false},
        jrJava:{name:"Jr.Software Engineer/Java" , value:false},
        Java:{name:"Software Engineer/Java" , value:false},
        arch:{name:"Enterprise Architect" , value:false},
        market:{name:"Marketing and Placement Manager" , value:false},
        ba:{name:"Business Analyst" , value:false},
        srBa:{name:"Sr.Business Analyst" , value:false},
        jrBa:{name:"Jr.Business Analyst" , value:false},
        hr:{name:"HR Manager" , value:false},
        recruiter:{name:"IT Recruiter" , value:false},
        assHr:{name:"HR Assistant" , value:false},
        marketManager:{name:"Product and Marketing Manager" , value:false},
        devLead:{name:"Development Lead" , value:false},
        trainLead:{name:"Technical Training Lead, Architecture" , value:false},
        trainBa:{name:"BA Trainer" , value:false},
        busDev:{name:"Business Development Manager" , value:false},
        director:{name:"Managing Director" , value:false},
    }

    $scope.visaLevel = 
    [
        {name:"F1-OPT" , value:false},
        {name:"F1-Extension" , value:false},
        {name:"F1-CPT" , value:false},
        {name:"H1B" , value:false},
        {name:"Green Card" , value:false},
        {name:"US Citizen" , value:false},
        {name:"Other" , value:false},
    ]


    $scope.jobUrl = "job.html"
    $scope.visaUrl = "visa.html"
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
        job_title: [],
        visa_status: [],
    }
    $scope.employeeName = ''

    
    $scope.searchByName = function()
    {
        if ($scope.employeeName.indexOf(' ') < 0)
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
        else 
        {
            var login = $scope.employeeName.split(' ')
            dataService.searchByWholeName(login,function(data)
            {
                console.log(data)
                if(data.length == 0)
                {
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
    }
    $scope.advanceSearch = function()
    {
        $scope.myPopover.isOpen = false
        $scope.deepSearch()
    }
    $scope.deepSearch = function()
    {
        $scope.searchObject.job_title = []
        $scope.searchObject.visa_status = []
        $scope.popover.open = false
        $scope.visaLevel.forEach(function(e)
        {
            if (e.value == true) {$scope.searchObject.visa_status.push(e.name)}
            e.value = false
        })
        forEach($scope.jobLevel,function(k,v)
        {
            if (v.value == true) {$scope.searchObject.job_title.push(v.name)}
            v.value = false
        })

        
        dataService.search($scope.searchObject,function(data)
        {
            if(data.length == 0)
            {
                $scope.addAlert('danger','No feteched employee')
            }
            else
            {
                $scope.addAlert('success','Search success')
                $scope.$parent.$broadcast('changeData',{data:data})
            }
            $scope.searchObject.first_name = ""
            $scope.searchObject.last_name = ""
        })
        

    }

}])

