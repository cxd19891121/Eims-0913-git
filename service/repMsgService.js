/**
 * Created by mooner00 on 8/24/2016.
 */

exports.buildGetMsg = function(repObj,tableName,e,o){
    if(e){
        repObj.msg = 'fail to get access to SELECT from table: '+ tableName;
        repObj.err = e;
    }else{
        if(o.rowCount > 0){
            repObj.data = o.rows[0];
            repObj.msg = 'success to SELECT data from table: ' + tableName;
        }else{
            repObj.msg = 'no result match for table: '+ tableName;
        }
    }
}


exports.buildGetAllMsg = function(repObj,tableName,e,o){
    if(e){
        repObj.msg = 'fail to get access to SELECT from table: '+ tableName;
        repObj.err = e;
    }else{
        if(o.rowCount > 0){
            repObj.data = o.rows;
            repObj.msg = 'success to SELECT data from table: ' + tableName;
        }else{
            repObj.msg = 'no result match for table: '+ tableName;
        }
    }
}

exports.buildAddMsg = function(repObj,tableName,e,data){
    if(e){
        repObj.msg = 'fail to get access to INSERT the table: '+ tableName;
        repObj.err = e;
    }else{
        repObj.msg = 'success to INSERT data into table: '+ tableName;
        repObj.data = data;
    }
}

exports.buildUpdateMsg = function(repObj,tableName,e,data){
    if(e){
        repObj.msg = 'fail to get access to UPDATE the table: '+ tableName;
        repObj.err = e;
    }else{
        repObj.msg = 'success to UPDATE data for table: '+ tableName;
        repObj.data = data;
    }
}

exports.buildDeleteMsg = function(repObj,tableName,e,data){
    if(e){
        repObj.msg = 'fail to get access to DELETE the table: '+ tableName;
        repObj.err = e;
    }else{
        repObj.msg = 'success to DELETE data for table: '+ tableName;
        repObj.data = data;
    }
}

exports.normalizeMsg = function(ori,tar){
    tar = {
        msg: ori.emp.msg + '; ' + ori.edu.msg + '; ' + ori.work.msg +'; '+ ori.visa.msg + '; ' + ori.order.msg,
    }
    if(ori.emp.data){ tar.data.emp = ori.emp.data; }
    if(ori.emp.err){ tar.data.empErr = ori.emp.err};
    if(ori.edu.data){ tar.data.edu = ori.edu.data; }
    if(ori.edu.err){ tar.data.eduErr = ori.edu.err};
    if(ori.work.data){ tar.data.work = ori.work.data; }
    if(ori.work.err){ tar.data.workErr = ori.work.err};
    if(ori.visa.data){ tar.data.visa = ori.visa.data; }
    if(ori.visa.err){ tar.data.visaErr = ori.visa.err};
    if(ori.order.data){ tar.data.order = ori.order.data; }
    if(ori.order.err){ tar.data.orderErr = ori.order.err};
}

