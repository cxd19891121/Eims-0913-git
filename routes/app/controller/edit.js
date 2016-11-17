/**
 * Created by mooner00 on 8/23/2016.
 */


app.controller('edit',function($scope,$uibModal, dataService)
{

    $scope.totalItems = 10
    $scope.currentPage = 1
    $scope.pageSize = 5
    $scope.editInfo = true;
    $scope.predicate = 'name';
    $scope.reverse = true;
    $scope.all = Symbol("all")
    $scope.complete = Symbol("complete")
    $scope.incomplete = Symbol("incomplete")

    $scope.$on("refresh",function(e,i)
    {
        init()
    })
    $scope.changePageSize = function(num)
    {
        $scope.pageSize = num
        window.localStorage.pageSize = num
    }

    var initial = function()
    {
        //console.log(window.localStorage.pageSize)
        if (window.localStorage.pageSize != undefined) $scope.pageSize = window.localStorage.pageSize
    }()
    

    $scope.order = function (predicate)
    {
        $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
        $scope.predicate = predicate;
        //console.log($scope.predicate)
    }

    $scope.displayDownload = false

    $scope.display = function()
    {
        var result = false
        $scope.users.forEach(function (element)
        {
            if (element.flag == true) result = true
        })
        
        $scope.displayDownload = result
        return result
    }

    $scope.changeUser = function (symbol)
    {
        switch (symbol)
        {
            case $scope.all: 
            {
                //console.log(1)
                $scope.users = $scope.allUsers
                $scope.totalItems = $scope.users.length
                return
            }
            case $scope.complete: 
            {
                //console.log(2)
                $scope.users = $scope.allUsers.filter(function (element)
                {
                    return element.progress == 100
                })
                $scope.totalItems = $scope.users.length
                return 
            }
            case $scope.incomplete:
            {
                //console.log(3)
                $scope.users = $scope.allUsers.filter(function (element)
                {
                    return element.progress != 100
                })
                $scope.totalItems = $scope.users.length
                return
            }
        }
    }

    $scope.paginate = function (value)
    {
        var begin, end, index;
        begin = ($scope.currentPage - 1) * $scope.pageSize;
        end = begin + $scope.pageSize;
        index = $scope.users.indexOf(value);
        return (begin <= index && index < end);
    }

    $scope.employeeDetail = false
    $scope.allUsers = []
    $scope.users = [{id : 0,first_name:'test',description:'on project',status:'due',dob:'1/1/1995',e_id:0,job_title:'projector',age:10},{id : 1,name:'er',dob:'1/1/1',age:3}]

    $scope.select = true

    $scope.selectAll = function ()
    {

        $scope.users.forEach(function(element)
        {
            if($scope.select)
        {
            element.flag = true
        }
        else
        {
            element.flag = false

        }
        $scope.display()
    })
        return $scope.select = !$scope.select
    }



    $scope.$on('changeData',function(event,info)
    {
        if(info.data == null || info.data == '')
        {
            return //alert('Error: no fetched employee')
        }
        else
        {
            info.data.forEach(function(element)
            {
                for (i in element)
                {
                    if(!element.hasOwnProperty(i)) continue
                    else element[i] = parseISO8601(element[i])
                }
                element.flag = false
                //console.log(element)
            })
        }
        $scope.users = info.data
        $scope.totalItems = $scope.users.length
    })

    $scope.printAll = function ()
    {
        var headstr = "<html><head><title>Booking Details</title></head><body>";
        var footstr = "</body>";
        var newstr = ""
        var oldstr = document.body.innerHTML;

        $scope.users.forEach(function(element)
        {
            if (element.flag == true)
            {
                var formatedData = getFormatedData(element)
                forEach(formatedData,function(key,value)
                {
                    if(value != null && value != undefined)
                    {
                        newstr += key + " : " + value + "<br>"
                    }
                })
                newstr += "<br><br>"
            }
            
        })
        newstr = newstr.replace(/_/g," ")

        var data = headstr+newstr+footstr;
        var newWindow = window.open("");
        newWindow.document.body.innerHTML = data;
        newWindow.print();
        return false;

    }


    $scope.downloadAll = function()
    {
        var data = ''
        var filename = 'information.html'
        $scope.users.forEach(function(element)
        {
            if (element.flag == true)
            {
                var formatedData = getFormatedData(element)
                forEach(formatedData,function(key,value)
                {
                    if(value != null && value != undefined)
                    {
                        data += key + " : " + value + "<br>"
                    }
                })
                data += "<br><br>"
             
            }
        })
        data = data.replace(/_/g," ")
        var file = new File([data], filename, {type: "text/html;charset=utf-8"});
        saveAs(file);

    }

    $scope.detail = {}
    $scope.wholeDetail = {}
    
    $scope.showEmployeeDetail = function(id)
    {
        
        //console.log(1)
        $scope.employeeDetail = true
        $scope.users.forEach(function(element) {if (element.e_id == id) $scope.detail = JSON.parse(JSON.stringify(element))})
        console.log($scope.users)
        $scope.wholeDetail = JSON.parse(JSON.stringify($scope.detail));
        Object.keys($scope.detail).forEach(function(key)
        {
            if (typeof $scope.detail[key] == 'string')
            {
                if ($scope.detail[key].length > 24)
                {
                    $scope.detail[key] = $scope.detail[key].substring(0,24) + '...'
                }
            }
        })
        $scope.open() 
    }

    $scope.animationsEnabled = true

    $scope.open = function (size)
    {
        
        var modalInstance = $uibModal.open
        ({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve:
            {
                items: function ()
                {
                    return $scope.detail
                },
                wholeItems: function()
                {
                    return $scope.wholeDetail
                }
            }
        })

    }

    $scope.alerts = []
    $scope.addAlert = function(type,msg)
    {
        if ($scope.alerts.length == 0) $scope.alerts.push({type: type,msg: msg});
    }
    $scope.closeAlert = function(index)
    {
        $scope.alerts.splice(index, 1);
        init();
    }

    $scope.deleteUser = function(id){
        dataService.deleteAllById(id,function(e,o){
            if(e){
                $scope.addAlert('danger','Fail to delete the employee');
            }else{
                $scope.addAlert('success','Employee has been deleted');
            }
        })

    }

    $scope.editUser = function(id)
    {        
        //console.log('id = ' + id)
        window.location.href = window.location + 'edit/' + id
        //$scope.editInfo = false;
        $scope.$emit('editUser',{id:id});
    }

    init();

    function init(){
        dataService.getAllBySql(function(e,o){
            if(o){
                $scope.users = o;
                console.log($scope.users)
                $scope.users.forEach(function(element)
                {
                    for (i in element)
                    {
                        if(!element.hasOwnProperty(i)) continue
                        else element[i] = parseISO8601(element[i])
                    }
                    element.flag = false
                    if (element.marital_status == true) element.marital_status = "yes";
                    else if (element.marital_status == false) element.marital_status = "no";
                })
                $scope.totalItems = o.length;
                $scope.allUsers = $scope.users
            }
            else{
                $scope.users = []
            }
        })


    }

    var getFormatedData = function(people)
    {
        var formatedData = 
        {
            name: people.first_name + people.last_name,
            cellphone: people.cellphone,
            email: people.email,
            SSN: people.ssn,
            birthday: people.dob,
            company: people.company_name,
            insurance: people.health_ins,
            job_level: people.job_level,
            job_title: people.job_title,
            location: people.location,
            salary: people.salary,
            degree: people.degree,
            university: people.university,
            payrise_percentage: people.payrise_precentage || people.payrise_percentage,
            visa_start_time: people.start_time,
            visa_end_time: people.end_time,

        }
        return formatedData
    }

})



/**
 * Created by mooner00 on 8/24/2016.
 */
