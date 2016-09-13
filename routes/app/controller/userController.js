/**
 * Created by mooner00 on 8/14/2016.
 */

app.controller('userCtrl', ['$scope','dataService' , function ($scope, dataService) {
    var vm = this;
    vm.test = "This is only a test!!!! Hope this would work which wont only show {{vm.test}}"
    init();


    vm.init = function () {
        vm.userTable =[];
        addSampleData(1);
        addSampleData(2);
        vm.test = dataService.getTest();
        dataService.getAllUser(function(e,o){
            vm.data = o;
        });
    }

    function init(){
        vm.test =  "This is init test !!!!";
    }

    function addSampleData(id){
        var data ={
            id: id,
            username: "name" + id,
            password: "pass" + id,
            eid: id + 1000,
            level: id+ 10,
        }
        vm.userTable.push(data);
    }

}])