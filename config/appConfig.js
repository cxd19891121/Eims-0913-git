var fs = require('fs');



var config = {

    // baseUrl: '192.168.1.41',
    // port: 3000,
    // database:{
    //     host: 'ec2-54-243-249-149.compute-1.amazonaws.com',
    //     user: 'wxrfbtguomaqwx', //env var: PGUSER
    //     database: 'd92s1tko8rccnl', //env var: PGDATABASE
    //     password: 'tn6TNUUYiBrrGDP7-pZNCbPvQg', //env var: PGPASSWORD
    //     port: 5432, //env var: PGPORT
    //     max: 10, // max number of clients in the pool
    //     idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
    // },
    //
    // redis: {
    //     client:'redis://h:pe9f1ih365dtc5ajp0pha3i12c7@ec2-50-19-83-130.compute-1.amazonaws.com:9119',
    //     port:9119,
    //     password: 'pe9f1ih365dtc5ajp0pha3i12c7',
    //     host: 'ec2-50-19-83-130.compute-1.amazonaws.com',
    //     name:'redis-flexible-80564',
    //     limit: '25MB',
    //
    // },
    //
    // session:{
    //     secret: 'faeb4453e5d14fe6f6d04637f78077c76c73d1b4',
    //     proxy: true,
    //     resave: true,
    //     saveUninitialized: true,
    //     maxAge: 1000 * 60 * 60,
    //
    // },
    //
    // auth:{
    //     noSess:{
    //         level:-1,
    //         tag:'no session',
    //         ops:'login',
    //         filePath: '/login.html',
    //         fileName:'',
    //         url:'http://192.168.1.41:3000/'
    //     },
    //     user:{
    //         level:1,
    //         tag:'users',
    //         ops:'read, download, print',
    //         filePath:'/user.html',
    //         fileName:'user',
    //         url:'http://192.168.1.41:3000/user/'
    //     },
    //     admin:{
    //         level:0,
    //         tag:'HR, administrator',
    //         ops:'read,add,delete,edit,download,print',
    //         filePath :'/administrator.html',
    //         fileName:'admin',
    //         url:'http://192.168.1.41:3000/admin'
    //     },
    //
    //
    // },
    //
    // service:{
    //     authority :{
    //         filePath : './../service/authority',
    //     },
    // },

}
ini();

function ini(){

    config = JSON.parse(fs.readFileSync('config/config.json','utf-8'));
    //console.log(config);
}

var readConfigFromJson = function(callback)
{
    var value = JSON.parse(fs.readFileSync('config/config.json','utf-8'));
   // console.log(value);
    callback(value);
}

var writeJsonFromConfig = function(configObj,callback){

    var configJson = JSON.stringify(configObj);
    //console.log(configObj);
    fs.open('config/config.json','w',function(err,fd)
    {
        if (err) console.log(err)
        else {
            fs.writeSync(fd, configJson, 0, 'utf8');
            //fs.fdatasyncSync(fd);
            callback(null, configJson)


        }
    })
    //fs.writeFileSync('./config.json','1234',{flag:'w'});
    //fs.close();
}

var getConfigSync = function()
{
    return JSON.parse(fs.readFileSync('config/config.json','utf-8'));
}



//writeJsonFromConfig(config);
module.exports = config;
module.exports.readConfig = readConfigFromJson;
module.exports.writeConfig = writeJsonFromConfig;
module.exports.getConfig = getConfigSync;