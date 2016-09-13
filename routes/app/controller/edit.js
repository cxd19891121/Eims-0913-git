/**
 * Created by mooner00 on 8/23/2016.
 */
app.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items)
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



    $scope.print = function()
    {
        printdiv('printElement')
    }
    function printdiv(printdivname)
    {
        var headstr = "<html><head><title>Booking Details</title></head><body>";
        var footstr = "</body>";
        var newstr = document.getElementById(printdivname).innerHTML;
        var newWindow = window.open('');
        newWindow.document.body.innerHTML = headstr+newstr+footstr;
        newWindow.print();
        return false;
    }

    $scope.download = function()
    {

        downloadDiv('printElement','data.html')
    }

    function downloadDiv(divName,filename)
    {
        var data = document.getElementById(divName).innerHTML
        var file = new File([data], filename, {type: "text/html;charset=utf-8"});
        saveAs(file);
    }
})

app.controller('edit',function($scope,$uibModal, dataService)
{

    $scope.totalItems = 10
    $scope.currentPage = 1
    $scope.pageSize = 5
    $scope.editInfo = true;
    $scope.predicate = 'name';
    $scope.reverse = true;

    $scope.order = function (predicate)
    {
        $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
        $scope.predicate = predicate;
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
    })
        return $scope.select = !$scope.select
    }



    $scope.$on('changeData',function(event,info)
    {
        if(info.data == null || info.data == '')
        {
            //$scope.totalItems = 0
            //$scope.users = []
            return alert('Error: no fetched employee')
        }
        else
        {
            console.log(info)
            info.data.forEach(function(element)
            {
                for (i in element)
                {
                    if(!element.hasOwnProperty(i)) continue
                    else element[i] = parseISO8601(element[i])
                }
                element.flag = false
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
            newstr += "Name : " + element.first_name + " " + element.last_name + '<br>'
            newstr += "DoB : " + element.dob + '<br>'
        }
    })

        var data = headstr+newstr+footstr;
        var newWindow = window.open("");
        newWindow.document.body.innerHTML = data;
        newWindow.print();
        //document.body.innerHTML = oldstr;
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
            data += "Name : " + element.first_name + " " + element.last_name + '<br>'
            data += "DoB : " + element.dob + '<br>'
        }
    })
        var file = new File([data], filename, {type: "text/html;charset=utf-8"});
        saveAs(file);

    }

    $scope.detail = {}

    $scope.showEmployeeDetail = function(id)
    {
        if($scope.employeeDetail == false)
        {
            //console.log('first')
            $scope.employeeDetail = true
            //console.log('second')
            $scope.users.forEach(function(element) {if (element.e_id == id) $scope.detail = element})
            //console.log('third')
            $scope.open()
        }
        else
        {
            $scope.users.forEach(function(element) {if (element.e_id == id) $scope.detail = element})
            $scope.open()
        }
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
                }
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
                //console.log('in edit controller, getAllBySql',o);
                $scope.users = o;
                $scope.totalItems = o.length;


            }
            else{
                $scope.users = [{id : 0,first_name:'test',description:'on project',status:'due',dob:'1/1/1995',e_id:0,job_title:'projector',age:10},{id : 1,name:'er',dob:'1/1/1',age:3}]

            }
        })


    }

})

/**
 * Created by mooner00 on 8/24/2016.
 */
