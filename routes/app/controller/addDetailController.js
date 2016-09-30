/**
 * Created by mooner00 on 8/14/2016.
 */


app.controller('addDetailController', ['$scope','dataService', function ($scope, dataService) {
    var vm = this;

    $scope.open = function(id) 
    {
        $scope.popup[id] = true;
    }

    $scope.popup = 
    {
        opened: false
    }
    $scope.progressValue = 0

    $scope.info = 100

    $scope.$on('addDetail',function(event,data)
    {
        var block = 0
        $scope.addDetail = true
        $scope.addNewEmployee = data['addNewEmployee']

        forEach(vm.getObj(),function(key,value)
        {
            // if ($scope.addNewEmployee[key] == true)
            // {
                forEach(value,function(k,v){ block++ })
            //}
        })

        if (block != 0) $scope.block = Math.ceil(100/block)
        else $scope.block = 100
    })
    
    vm.message  = [];

    vm.data = {
        emp:{},
        work:{},
        edu :{},
        order: {},
        visa: {},
        other:{
            cPhoneLocation: [
                {country: 'China', toString: 'China (+86)'},
                {country: 'USA', toString: 'USA (+1)'}
            ],
            chinesePhone: false,
            chineseHomePhone: false,

        },
    }

    vm.err = {
        emp:{},
        work:{},
        edu:{},
        order:{},
        visa:{},
    }



    //autoFill();
    function autoFill(){
        dataService.getAllById(1,function(e,o){
            if(o) {
                var emp = o.data.emp.data;
                var work = o.data.work.data;
                var edu = o.data.edu.data;
                var visa = o.data.visa.data;
                var order = o.data.order.data;

                vm.data.emp.fName = emp.first_name;
                vm.data.emp.lName = emp.last_name;
                vm.data.emp.mName = emp.middle_name;
                vm.data.emp.DOB = new Date(emp.dob);
                vm.data.emp.SSN = emp.ssn;
                vm.data.emp.mStatus = emp.marital_status;
                vm.data.emp.jTitle = emp.job_title;
                vm.data.emp.jLevel = emp.job_level;
                vm.data.emp.salary = emp.salary;
                vm.data.emp.hPhone = emp.home_phone
                vm.data.emp.cPhone = emp.cellphone
                vm.data.emp.email = emp.email
                vm.data.emp.tDate = new Date(emp.termn_data);
                vm.data.emp.tReason = emp.termn_reason
                vm.data.emp.pAdd = emp.p_add;
                vm.data.emp.pCity = emp.p_city;
                vm.data.emp.pState = emp.p_state;
                vm.data.emp.pZip = emp.p_zip;
                vm.data.emp.pCountry = emp.p_country;
                vm.data.emp.bAdd = emp.b_add;
                vm.data.emp.bCity = emp.b_city;
                vm.data.emp.bState = emp.b_state;
                vm.data.emp.bZip = emp.b_zip;
                vm.data.emp.bCountry = emp.b_country;
                vm.data.emp.hInsurance = emp.health_ins
                vm.data.emp.rSubside = emp.regional_subsides
                vm.data.emp.reimbursement = emp.reimbursement
                vm.data.emp.rPercent = emp.payrise_percentage;

                //visa
                vm.data.visa.type = visa.type;
                vm.data.visa.sTime = new Date(visa.start_time);
                vm.data.visa.eTime = new Date(visa.end_time);
                vm.data.visa.status = visa.status;

                //work
                vm.data.work.des = work.description;
                vm.data.work.sTime = new Date(work.w_start_time);
                vm.data.work.eTime = new Date(work.w_end_time);
                vm.data.work.type = work.type;
                vm.data.work.title = work.title;
                vm.data.work.location = work.location;

                //edu
                vm.data.edu.uni = edu.university_name;
                vm.data.edu.degree = edu.degree;
                vm.data.edu.major = edu.major;

                //order
                vm.data.order.jLocation = order.location
                vm.data.order.company = order.company_name;
                vm.data.order.des = order.description;
                vm.data.order.type = order.type;
                vm.data.order.title = order.title;
                vm.data.order.sTime = new Date(order.o_start_time);
                vm.data.order.eTime = new Date(order.o_end_time);
                vm.data.order.owner = order.owner;
                vm.data.order.ext = order.extension_time;
            }
        })
    }

    vm.getPhone = function getCellPhone(phones){
        var phoneNumString = "";
        phones.forEach(function(phonePart){
            phoneNumString += (phonePart + "");
        })
        return parseInt(phoneNumString);
    }



    vm.insertData = function(){
        vm.data.emp.progress = $scope.progressValue;
        //getCellPhone(vm.data.other.cPhoneLocation,[vm.data.other.cPhoneFP,vm.data.other.cPhoneSP,vm.data.other.cPhoneThird]);

        dataService.addAll(vm.data,function(e,o){
            if(e){
                vm.message = e;
            }else{
                vm.message = o;
            }
           // dataService.backToIndex();
        });
    }

    vm.back= function(){
        window.history.back();
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
         //       t_data : vm.data.emp.tDate,
          //      t_reason : vm.data.emp.tReason
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
    //$scope.progressValue = 0;

    
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

        
        var value = index * $scope.block
        if (value > 100) value = 100
        $scope.progressValue = value
        return value
    }
    

}])