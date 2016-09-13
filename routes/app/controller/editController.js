/**
 * Created by mooner00 on 8/14/2016.
 */

app.controller('editController', ['$scope','dataService' , function ($scope, dataService) {
    var vm = this;
    $scope.id = -1
    $scope.showEdit = false

    $scope.$on('setUserId',function(event,data)
    {
        $scope.id = data
        init();
    })

    vm.message  = {};
    vm.data = {
        emp:{},
        work:{},
        edu :{},
        order: {},
        visa: {},
    }

    $scope.open = function(id)
    {
        $scope.popup[id] = true;
    }

    $scope.popup =
    {
        opened: false
    }

    $scope.showEdit = false;

    function moneyToInt(info)
    {
        return Number(info.replace(/[^0-9\.]+/g,""));
    }
    
    function init(){
        dataService.getAllById($scope.id,function(e,o){
            if(o) {


                var data = o.data;
                console.log(o);
                //console.log(data)
                vm.data.e_id = data.emp.data.e_id
                //console.log(vm.data.e_id)
                vm.data.emp.fName = data.emp.data.first_name;
                vm.data.emp.lName = data.emp.data.last_name;
                vm.data.emp.mName = data.emp.data.middle_name;
                vm.data.emp.DOB = new Date(data.emp.data.dob);
                vm.data.emp.SSN = data.emp.data.ssn;
                vm.data.emp.mStatus = data.emp.data.marital_status;
                vm.data.emp.jTitle = data.emp.data.job_title;
                vm.data.emp.jLevel = data.emp.data.job_level;
                vm.data.emp.salary = moneyToInt(data.emp.data.salary);
                vm.data.emp.hPhone = data.emp.data.home_phone
                vm.data.emp.cPhone = data.emp.data.cellphone
                vm.data.emp.email = data.emp.data.email
                vm.data.emp.tDate = new Date(data.emp.data.termn_date);
                vm.data.emp.tReason = data.emp.data.termn_reason
                vm.data.emp.pAdd = data.emp.data.p_add;
                vm.data.emp.pCity = data.emp.data.p_city;
                vm.data.emp.pState = data.emp.data.p_state;
                vm.data.emp.pZip = data.emp.data.p_zip;
                vm.data.emp.pCountry = data.emp.data.p_country;
                vm.data.emp.bAdd = data.emp.data.b_add;
                vm.data.emp.bCity = data.emp.data.b_city;
                vm.data.emp.bState = data.emp.data.b_state;
                vm.data.emp.bZip = data.emp.data.b_zip;
                vm.data.emp.bCountry = data.emp.data.b_country;
                vm.data.emp.hInsurance = data.emp.data.health_ins
                vm.data.emp.rSubside = data.emp.data.regional_subsides
                vm.data.emp.reimbursement = data.emp.data.reimbursement
                vm.data.emp.rPercent = data.emp.data.payrise_percentage;

                //visa
                vm.data.visa.type = data.visa.data.type;
                vm.data.visa.sTime = new Date(data.visa.data.start_time);
                vm.data.visa.eTime = new Date(data.visa.data.end_time);
                vm.data.visa.status = data.visa.data.status;

                //work
                vm.data.work.des = data.work.data.description;
                vm.data.work.sTime = new Date(data.work.data.w_start_time);
                vm.data.work.eTime = new Date(data.work.data.w_end_time);
                vm.data.work.type = data.work.data.type;
                vm.data.work.title = data.work.data.title;
                vm.data.work.location = data.work.data.location;

                //edu
                vm.data.edu.uni = data.edu.data.university;
                vm.data.edu.degree = data.edu.data.degree;
                vm.data.edu.major = data.edu.data.major;

                //order
                vm.data.order.jLocation = data.order.data.location
                vm.data.order.company = data.order.data.company_name;
                vm.data.order.des = data.order.data.order_description;
                vm.data.order.type = data.order.data.type;
                vm.data.order.title = data.order.data.title;
                vm.data.order.sTime = new Date(data.order.data.o_start_time);
                vm.data.order.eTime = new Date(data.order.data.o_end_time);
                vm.data.order.owner = data.order.data.owner;
                vm.data.order.ext = data.order.data.extension_time;
            }
        })
    }

    vm.updateAllById = function(){
        dataService.updateAllById($scope.id,vm.data,function(e,o){
            //console.log(vm.data)
            //alert(1)
            // var length = window.location.href.length
            //
            // var main = window.location.href.substring(0,length-6)
            // console.log(main)
            // if(e){
            //     vm.message = e;
            //     window.location.href = main
            // }else{
            //     vm.message = o;
            //     window.location.href = main
            // }
          //  dataService.backToIndex();
        })
    }
}])