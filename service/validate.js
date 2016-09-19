/**
 * Created by mooner00 on 9/19/2016.
 */

module.exports.empValidate = function(emp){
    dateVali(emp.dob);
    numVali(emp.ssn);
    boolVali(emp.marital_status);
    numVali(emp.home_phone);
    numVali(emp.cellphone);
    if(emp.e_id == null){
        emp.e_id = emp.emp_id;
    }
    dateVali(emp.termn_date);
    numVali(emp.payrise_percentage);
    moneyVali(emp.salary);
    numVali(emp.progress);
    for(value in emp){
        stringVali(emp[value]);
    }

}

module.exports.eduValidate  = function(edu){
    for(value in edu){
        stringVali(edu[value]);
    }
}

module.exports.workValidate = function(work){
    dateVali(work.w_start_time);
    dateVali(work.w_end_time);

    for(value in work){
        stringVali(work[value]);
    }
}

module.exports.orderValidate = function(order){

}



function stringVali(data){
    if(data == null){
        data = "";
    }
}

function numVali(data){
    if(data == null || data == ""){
        data = 0;
    }
}

function moneyVali(data){
    if(data == null || data == ""){
        data = 0;
    }
}

function dateVali(data){
    if(data == null || data == ""){
        data = "";
    }
}

function boolVali(data){
    if(data == null){
        data = false;
    }
}






