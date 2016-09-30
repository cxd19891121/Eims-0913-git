/**
 * Created by mooner00 on 9/6/2016.
 */
app.controller('modify', function($scope,$http,$httpParamSerializerJQLike, $uibModal,dataService)
{

    $scope.print = function()
    {
        console.log($scope.config.auth)
    }
    $scope.config = {};
    $scope.newLevel = {}
    $scope.msg = {}
    $scope.alerts = []
    $scope.levelAlert = []
    $scope.newLevel = 
    {
        name: undefined,
        level: undefined,
        tag: undefined,
        ops: undefined,
        filePath: undefined,
        url: undefined
    }

    $scope.getHighestLevel = function(obj,property)
    {
        var highest = 0
        //var 
        return highest
    }
    $scope.addAlert = function(type,msg) 
    {
        $scope.alerts.push({type: type,msg: msg});
    }

    $scope.addLevelAlert = function(type,msg)
    {
        $scope.levelAlert.push({type:type,msg:msg})
    }

    $scope.closeLevelAlert = function(index)
    {
        //console.log("close")
        $scope.levelAlert.splice(index ,1);
    }

    $scope.closeAlert = function(index) 
    {
        $scope.alerts.splice(index, 1);
    }

    $scope.init = function()
    {
        console.log($scope.config.database)
    }

    $scope.back = function(){
        window.history.back();
    }

    $scope.createLevel = function()
    {
        var count = true
        console.log($scope.newLevel)
        forEach($scope.newLevel,function(key,value)
        {
            if(value == "" || value == undefined) 
            {
                //console.log(1)
                $scope.addLevelAlert("danger","must fill " + key)
                count = false
            }
        })
        //console.log($scope.levelAlert)
        if (count)
        {
            $scope.config.auth[$scope.newLevel.name] =
            {
                level: $scope.newLevel.level,
                tag: $scope.newLevel.tag,
                ops: $scope.newLevel.ops,
                filePath: $scope.newLevel.filePath,
                fileName: $scope.newLevel.name,
                url: $scope.newLevel.url
            }

            $scope.addLevelAlert("success","success add level")
            console.log($scope.config.auth)
            $scope.updateConfig()
        }
    }

    getConfig();

    function getConfig(){
        dataService.getConfig(function(e,o){
           $scope.config = o.data;
           console.log($scope.config)
           $scope.getHighestLevel($scope.config,"authority")
        })
    }

    $scope.updateConfig = function(){

        dataService.updateConfig({config:$scope.config},function(e,o){
            if(o){
                $scope.addAlert("success","update success")
                $scope.msg = o;
            }else{
                $scope.addAlert("fail","update fail")
                $scope.msg = e;
            }
        })

    }

    $scope.config = {}
})