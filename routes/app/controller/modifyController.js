/**
 * Created by mooner00 on 9/6/2016.
 */
app.controller('modify', function($scope,$http,$httpParamSerializerJQLike, $uibModal,dataService)
{
    $scope.config = {};
    $scope.newLevel = {}
    $scope.msg = {}
    $scope.init = function()
    {
        console.log($scope.config.database)
    }

    $scope.back= function(){
        window.history.back();
    }

    $scope.createLevel = function()
    {
        $scope.config.auth[$scope.newLevel.name] =
        {
            level: $scope.newLevel.level,
            tag: $scope.newLevel.tag,
            ops: $scope.newLevel.ops,
            filePath: $scope.newLevel.filePath
        }
        console.log($scope.config.auth)
    }

    getConfig();

    function getConfig(){
        dataService.getConfig(function(e,o){
           $scope.config = o.data;
        })
    }

    $scope.updateConfig = function(){

        dataService.updateConfig({config:$scope.config},function(e,o){
            if(o){
                $scope.msg = o;
            }else{
                $scope.msg = e;
            }
        })

    }

    $scope.config = {

        baseUrl: 'localhost',
        port: 3000,

        database:{
            host: 'ec2-54-243-249-149.compute-1.amazonaws.com',
            user: 'wxrfbtguomaqwx', //env var: PGUSER
            database: 'd92s1tko8rccnl', //env var: PGDATABASE
            password: 'tn6TNUUYiBrrGDP7-pZNCbPvQg', //env var: PGPASSWORD
            port: 5432, //env var: PGPORT
            max: 10, // max number of clients in the pool
            idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
        },

        redis: {
            client:'redis://h:pe9f1ih365dtc5ajp0pha3i12c7@ec2-50-19-83-130.compute-1.amazonaws.com:9119'
        },

        session:{
            secret: 'faeb4453e5d14fe6f6d04637f78077c76c73d1b4',
            proxy: true,
            resave: true,
            saveUninitialized: true,
            maxAge: 1000 * 60 * 60,

        },

        auth:{
            noSess:{
                level:-1,
                tag:'no session',
                ops:'login',
                filePath: '/app/partial/login.html',
            },
            user:{
                level:0,
                tag:'users',
                ops:'',
                filePath:'/user.html',
            },
            admin:{
                level:1,
                tag:'HR, administrator',
                ops:'read,add,delete,edit,download,print',
                filePath :'/index2.html',
            },
            developer:{
                level:2,
                tag:'developer',
                ops:'read,add,delete,edit,download,print',
                filePath:'',
            }
        },

        service:{
            authority :{
                filePath : './../service/authority',
            },
        },

    }
})