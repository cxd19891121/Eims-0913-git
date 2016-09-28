var db = require('./../comm/database');

function isArray(list)
{
    if(Array.isArray(list))
    {
        return true
    }
    else return false
}

function isString(string)
{
    if(typeof(string) == 'string')
    {
        return true
    }
    return false
}

function stringEqual (varA,varB)
{
    return " " + varA + "='" + varB + "' "
}

function numberEqual (varA,varB)
{
    return ' ' + varA + '=' + varB + ' '
}

var typeInfo =
{
    'string' : stringEqual,
    'number' : numberEqual,
}

var sqlBuilderOO =
{
    sqlCode : 'hi',
    build : function(){
            return selectCode + fromCode + whereCode + orderByCode;

   },
    orderByCode:' ',
    buildtest : function () {return this.sqlCode},
    buildLambda: function () {return this.sqlCode},
    select : function(selectColumnList)
            {
                if (isString(selectColumnList)) {selectCode = 'SELECT ' + selectColumnList + ' '}
                else if (selectColumnList == undefined || selectColumnList == '') {selectCode = 'SELECT * '}
                else if (isArray(selectColumnList))
                {
                    selectCode = 'SELECT '
                    for (var i in selectColumnList)
                    {
                        selectCode += selectColumnList[i] + ' '
                    }
                }
                return this
            },
    selectCode : '',
    buildSelectCode : function() {return selectCode},
    buildSelectCodeLambda : function() {return selectCode},
    from : function(fromTableList,joinType,equal)
            {
                if (isString(fromTableList)) {fromCode = 'FROM ' + fromTableList + ' '}
                if (isArray(fromTableList))
                {
                    if (joinType == 'left join')
                    {
                        fromCode = 'FROM ' + fromTableList[0] + ' '
                        for (var i = 1 ; i < fromTableList.length ; i++)
                        {
                            fromCode += joinType + ' ' + fromTableList[i] + ' on ' + fromTableList[i-1] + '.' + equal + '=' + fromTableList[i] + '.' + equal + ' '
                        }
                    }
                }
                return this
            },
    fromCode : '',
    buildFromCode : function() {return fromCode},
    where : function(whereColumnList,valueColumnList,dataTypeList)
            {
                whereCode = 'WHERE '
                if (isString(whereColumnList) && isArray(dataTypeList)) {whereCode += typeInfo[dataTypeList](whereColumnList,valueColumnList)}
                else if (isArray(whereColumnList) && isArray(valueColumnList))
                {
                    if (whereColumnList.length == valueColumnList.length)
                    {
                        for (var i = 0 ; i < whereColumnList.length ; i++)
                        {
                            whereCode += typeInfo[dataTypeList[i]](whereColumnList[i],valueColumnList[i]) + 'AND'
                        }
                    }
                }
                whereCode = whereCode.substring(0,whereCode.length-3)
            return this
            },

    whereNone: function(){
        whereCode = '';
        return this
            },
    whereCode : '',
    buildWhereCode : function() {return whereCode},
    orderBy: function(){
        orderByCode = 'order by emp_id'
        return this;
    },

    orderByCode : function(){return orderByCode}

}

function getObject(searchObject,request)
{
    searchObject.first_name = request.body.first_name
    searchObject.e_id = request.body.e_id
    searchObject.jobTitle = request.body.jobTitle
    searchObject.visaStatus = request.body.visaStatus
    searchObject.major = request.body.major
    searchObject.orderStatus = request.body.orderStatus
    searchObject.education = request.body.education
    searchObject.level = request.body.level

}

function forEach(object,func)
{
    for (var info in object)
    {
        if(!object.hasOwnProperty(info)) continue
        else func(info,object[info])
    }
}

function isJSON(str)
{
    try
    {
        JSON.parse(str);
    }
    catch (e)
    {
        return false;
    }
    return true;
}



function searchByName(request,response,callback)
{
    var name = request.body.name
    var sqlCode = sqlBuilderOO.select(['*'])
                              .from(['employee_info','education_info','order_info','visa_info'],'left join','e_id')
                              //.from([])
                              .where(['first_name'],[name],['string'])
                              .build()
    console.log('sqlCode = ' + sqlCode)
    db.queryPres(sqlCode,function(e,o){

        if(e){
            return console.error('error running query', e);
        }else {
            console.log(o.rows[0])
            if(o.rows[0]){

                callback(null,o);

            }else{
                //console.log(o.rows)
                callback(null,o);
            }

        }
    })
}

function changeOpt(sqlCode,info,operator)
{
        if (sqlCode.indexOf(info) != -1) sqlCode = sqlCode.substring(0,sqlCode.indexOf(info)+info.length) + operator + sqlCode.substring(sqlCode.indexOf(info)+info.length+1)
        return sqlCode
}

function changeRate(sqlCode,name,val1,val2)
{
    if (sqlCode.indexOf(name) != -1) 

    return sqlCode
}

function deepSearch(request,response,callback)
{
    var searchObj = JSON.parse(JSON.stringify(request.body));
   // console.log(searchObj);
    var queryColumnArray = []
    var queryDataArray = []
    var queryTypeArray = []


    for (var info in searchObj)
    {
        if (searchObj.hasOwnProperty(info) && searchObj[info] != '' && searchObj[info] != undefined && info.indexOf('regional_subsides') == -1 && info.indexOf('payraise') == -1)
        {
            queryDataArray.push(searchObj[info])
            queryColumnArray.push(info)
            queryTypeArray.push(typeof(searchObj[info]))
        }
    }

    //console.log(queryColumnArray)
    var sqlCode =
    sqlBuilderOO.select(['*'])
                .from(['user_info','employee_info','education_info','order_info','visa_info'],'left join','e_id')
                .where(queryColumnArray,queryDataArray,queryTypeArray)
                .build()
    //console.log(0)
    sqlCode = changeOpt(sqlCode,'visa_info.start_time','>=')
    sqlCode = changeOpt(sqlCode,'visa_info.end_time','<=')
    sqlCode = sqlCode.substring(0,sqlCode.indexOf("order by emp_id"))
    if (sqlCode.substring(sqlCode.length-3) == "WHE") sqlCode += "RE"
    if (sqlCode.substring(sqlCode.length-3).indexOf("AND") < 0)sqlCode = sqlCode += " AND "
    if (searchObj['regional_subsides_start'] != undefined ) sqlCode += " regional_subsides >= " + searchObj['regional_subsides_start'] + ' AND';
    if (searchObj['regional_subsides_end'] != undefined ) sqlCode += " regional_subsides <= " + searchObj['regional_subsides_end'] + ' AND';
    if (searchObj['payraise_start'] != undefined ) sqlCode += " payrise_percentage >= " + searchObj['payraise_start'] + ' AND';
    if (searchObj['payraise_end'] != undefined ) sqlCode += " payrise_percentage <= " + searchObj['payraise_end'] + ' AND';
    if (sqlCode.substring(sqlCode.length-5).indexOf("AND") > 0)sqlCode = sqlCode.substring(0,sqlCode.lastIndexOf("AND"))
    sqlCode += " order by emp_id "
    console.log('sqlCode = ' + sqlCode)

    db.queryPres(sqlCode,function(e,o){


        if(e){
            return console.error('error running query', e);
        }else {

            if(o.rows[0]){

                callback(null,o);

            }else{
                callback(null,o);
            }

        }
    });
}

function search(request,response,callback)
{
    var searchObject = request.body
    var queryColumnArray = []
    var queryDataArray = []
    var queryTypeArray = []

    console.log('This is only a test for search',searchObject);
    console.log('hi')
    //console.log(searchObject.hasOwnProperty('major'));
    console.log('sdajfkl');
    for (var i in searchObject)
    {
       // if (!searchObject.hasOwnProperty(i)) continue
        console.log(i)
    }


    /*forEach(searchObject,function(key,value)
    {
        console.log(3)
        if (value != undefined)
        {
            queryDataArray.push(value)
            queryColumnArray.push(key)
            queryTypeArray.push(typeof(value))
            console.log(queryTypeArray)
        }
    })*/
   // console.log(2)

    var sqlCode =
    sqlBuilderOO.select(['*'])
                .from(['user_info','employee_info','education_info','order_info','visa_info'],'left join','e_id')
                .where(queryColumnArray,queryDataArray,queryTypeArray)
                .build()
    console.log('sqlCode = ' + sqlCode)
    db.queryPres(sqlCode,function(e,o){
        if(e){
            return console.error('error running query', e);
        }else {

            if(o.rows[0]){

                callback(null,o);

            }else{
                callback(o);
            }

        }
    });
}

exports.build = search;
exports.search = deepSearch;
exports.searchByName = searchByName;
exports.sqlBuilder = sqlBuilderOO;

exports.getAll =  function(callback){

    var sqlCode = sqlBuilderOO.select(['*'])
        .from(['employee_info','education_info','order_info','visa_info','work_info'],'left join','e_id')
        .whereNone()
        .orderBy()
        .build()

    console.log('sqlCode = ' + sqlCode)
    db.queryPres(sqlCode,function(e,o){
        console.log(e);
        callback(e,o);
    })


}
