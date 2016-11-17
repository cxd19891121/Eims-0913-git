app.controller('addCtrl',function($scope,$http,$httpParamSerializerJQLike)
{
    
    $scope.addNew = true

    $scope.tabArray=[];

    $scope.addNewEmployee = 
    {
        personalInfo : true,
        orderStatus: true,
        contactInfo: true,
        address: true,
        visaInfo: true,
        termination: false,
        jobEducation: false,
        salaryBenefit: false,
    }

    $scope.pattern = {
        letters: "[a-zA-Z]+",
        digits:"\"d+",
    }

    $scope.$emit('addDetail',{data: $scope.addNewEmployee})

    $scope.addUser = function()
    {
        //console.log($scope.addNewEmployee)
        $scope.addNew = false
        var number = 0
        forEach($scope.addNewEmployee,function(key,value)
        {
            if (value == true) number++
        })
        var block = (100/number)
        $scope.$broadcast('addDetail',{'addNewEmployee':$scope.addNewEmployee})

        pushTags();

       $scope.$broadcast('selectTags',{})
    }
    $scope.back = function(){
        window.history.back();
    }

    function pushTags(){
        if($scope.addNewEmployee.personalInfo){
            $scope.tabArray.push(0);
        }

        if($scope.addNewEmployee.orderStatus){
            $scope.tabArray.push(1);
        }

        if($scope.addNewEmployee.contactInfo){
            $scope.tabArray.push(2);
        }
        if($scope.addNewEmployee.address){
            $scope.tabArray.push(3);
        }
        if($scope.addNewEmployee.visaInfo){
            $scope.tabArray.push(4);
        }
        if($scope.addNewEmployee.termination){
            $scope.tabArray.push(5);
        }
        if($scope.addNewEmployee.jobEducation){
            $scope.tabArray.push(6);
        }
        if($scope.addNewEmployee.salaryBenefit){
            $scope.tabArray.push(7);
        }
    }



})