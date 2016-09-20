/**
 * Created by mooner00 on 9/19/2016.
 */

module.exports.empValidate = function(emp){

    for(value in emp){
        notNullVali(emp[value]);
    }

    dateVali(emp.dob);
    dateVali(emp.termn_date);
    numVali(emp.payrise_percentage);
    moneyVali(emp.salary);
    numVali(emp.progress);
    numVali(emp.ssn);
    boolVali(emp.marital_status);
    numVali(emp.home_phone);
    numVali(emp.cellphone);
}


module.exports.eduValidate  = function(edu){
    for(value in edu){
        notNullVali(edu[value]);
    }
}

module.exports.workValidate = function(work){
    for(value in work){
        notNullVali(work[value]);
    }
    dateVali(work.w_start_time);
    dateVali(work.w_end_time);

}

module.exports.orderValidate = function(order){
    for(value in order){
        notNullVali(order[value]);
    }
    dateVali (order.o_start_time);
    dateVali(order.o_end_time);

}

module.exports.visaValidate = function(visa){
    dateVali (visa.start_time);
    dateVali(visa.end_time);
    for(value in visa){
        notNullVali(visa[value]);
    }
}

module.exports.userValidate = function(user){
    numVali(user.id);
    numVali(user.level);
    stringVali(user.username);
    stringVali(user.password);
    numVali(user.e_id);
}



function notNullVali(data){
    if(data == null){
        data = "";
    }
}

function stringVali(data){
    if(data == null || data == ""){
        data = "";
    }else if( typeof(data) != "string"){
        data = data.toString();
    }
}

function numVali(data){
    if(data == null || data == ""){
        data = 0;
    }else if(typeof(data)!= 'number'){
       if(isNaN(data)){
           data = 0
       }else{
           data = parseInt(data);
       }
    }
}

function moneyVali(data){
    numVali(data);
}

function dateVali(data){
    if(data == null ||data == ""|| !(data instanceof Date)){
        data = new Date("1111-11-11");
    }1
}

function boolVali(data){
    if(data == null){
        data = false;
    }else if(typeof(data)!= "boolean"){
        data = false;
    }
}






