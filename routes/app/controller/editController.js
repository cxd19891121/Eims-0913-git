/**
 * Created by mooner00 on 8/14/2016.
 */

app.controller('editController', ['$scope','dataService' , function ($scope, dataService) {


    $scope.alert = {
        good: "New User Added",
        fail:"Add Fail",
    }
    $scope.goodAdd = false;
    $scope.failAdd = false;


    $scope.alerts = []
    $scope.addAlert = function() {
        $scope.alerts.push({type:'success',msg: 'Success update!'});
    };

    $scope.addFailAlert = function(){
        $scope.alerts.push({type:"danger",msg:"fail to update"});
    }

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

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
        if(info == null){
            return 0;
        }
        return Number(info.replace(/[^0-9\.]+/g,""));
    }
    
    function init(){
        var block = 0
        forEach(vm.getObj(),function(key,value)
        {
            // if ($scope.addNewEmployee[key] == true)
            // {
            forEach(value,function(k,v){ block++ })
            //}
        })

        if (block != 0) $scope.block = Math.ceil(100/block)
        else $scope.block = 100;

        dataService.getAllById($scope.id,function(e,o){
            if(o) {

                var data = o.data;
                console.log(o);
                //console.log(data)

                $scope.progressValue = data.emp.data.progress;
               // $scope.setProgress();

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


    $scope.addNewEmployee =
    {
        personalInfo : true,
        orderStatus: true,
        contactInfo: true,
        address: true,
        visaInfo: true,
        termination:true,
        jobEducation: true,
        salaryBenefit: true,
    }

    $scope.setProgress = function()
    {

        var index = 0;



        forEach($scope.addNewEmployee,function(k,v)
        {
            if (v == true)
            {
                var obj = vm.getObj()
                forEach(obj[k],function(key,value)
                {
                    if (value != '' && value != undefined && value != null) index++
                })

            }
        })
        var value = index * $scope.block;
        if (value > 100) value = 100
        $scope.progressValue = value
        return value
    }

    vm.tabValidate = {
        pTab:false,
        oTab:false,
        cTab:false,
        adTab:false,
        vTab:false,
        tTab:false,
        jTab:false,
        sTab:false,
    }
    vm.tabVerify = function(pTab,oTab,cTab,adTab,vTab,tTab,jTab,sTab){
        vm.tabValidate.pTab = pTab;
        vm.tabValidate.oTab = oTab;
        vm.tabValidate.cTab = cTab;
        vm.tabValidate.adTab = adTab;
        vm.tabValidate.vTab = vTab;
        vm.tabValidate.tTab = tTab;
        vm.tabValidate.jTab = jTab;
        vm.tabValidate.sTab = sTab;
    }

    vm.back = function(){
        window.history.back();
    }
    vm.updateAllById = function(){
        vm.data.emp.progress = $scope.progressValue;
        dataService.updateAllById($scope.id,vm.data,function(e,o){

            if(e){

                $scope.addFailAlert();
            } else{
                $scope.addAlert();
            }
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

    vm.getObj = function()
    {
        return {
            personalInfo:
            {
                first_name : vm.data.emp.fName,
                //    middle_name : vm.data.emp.mName,
                last_name : vm.data.emp.lName,
                dob : vm.data.emp.DOB,
                ssn : vm.data.emp.SSN,
                //    marital_status : vm.data.emp.mStatus,
            },
            orderStatus:
            {
                company_name : vm.data.order.company,
                description : vm.data.order.des,
                location : vm.data.order.jLocation,
                owner : vm.data.order.owner,
                type : vm.data.order.type,
                job_title : vm.data.order.title,
                start_time : vm.data.order.sTime,
                end_time : vm.data.order.eTime,
                extension_time: vm.data.order.ext,
            },
            contactInfo:
            {
                home_phone : vm.data.emp.hPhone,
                cellphone : vm.data.emp.cPhone,
                email : vm.data.emp.email,
            },
            address:
            {
                p_city : vm.data.emp.pCity,
                p_add : vm.data.emp.pAdd,
                p_state : vm.data.emp.pState,
                p_zip : vm.data.emp.pZip,
                p_country : vm.data.emp.pCountry,
                b_add : vm.data.emp.bAdd,
                b_city : vm.data.emp.bCity,
                b_state : vm.data.emp.bState,
                b_zip : vm.data.emp.bZip,
                b_country : vm.data.emp.bCountry,
            },
            visaInfo:
            {
                visa_type : vm.data.visa.type,
                start_time : vm.data.visa.sTime,
                end_time : vm.data.visa.eTime,
                status : vm.data.visa.status

            },
            termination:
            {
                t_data : vm.data.emp.tDate,
                t_reason : vm.data.emp.tReason
            },
            jobEducation:
            {
                university_name : vm.data.edu.uni,
                major : vm.data.edu.major,
                degree : vm.data.edu.degree,
                title : vm.data.work.title,
                type : vm.data.work.type,
                start_time : vm.data.work.sTime,
                end_time : vm.data.work.eTime,
                location : vm.data.work.location,
                description : vm.data.work.des
            },
            salaryBenefit:
            {
                job_title : vm.data.emp.jTitle,
                job_level : vm.data.emp.jLevel,
                salary : vm.data.emp.salary,
                insurance : vm.data.emp.hInsurance,
                regional_subsides : vm.data.emp.rSubside,
                reimbursement : vm.data.emp.reimbursement,
                raise : vm.data.emp.rPercent,

            }
        }
    }
}])