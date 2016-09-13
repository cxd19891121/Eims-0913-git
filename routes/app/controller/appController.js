/**
 * Created by mooner00 on 8/14/2016.
 */

app.controller('appController', ['$scope','dataService','$location' , function ($scope, dataService, $location) {



    var vm = this;
    vm.test =  "This is test for app Controller";
    vm.message = [];

    vm.allUser = [];
    vm.lastUser ={}
    vm.allWork = [];
    vm.allEmp = [];
    vm.allEdu = [];

    init();
    function init(){
        dataService.getAllUser(function(e,o){
            if(e){
                vm.allUser = e;
            }else{
                vm.allUser = o.data.rows;
            }
        })

        dataService.getLast('user',function(e,o){
            if(e){
                vm.lastUser = e;
            }else{
                vm.lastUser = o.data.rows;

            }}

        )

        dataService.getAll('emp',function(e,o){
            if(e){
                vm.message.push(e);
            }else{
                vm.allEmp = o.data.rows;
            }
        })
        dataService.getAll('edu',function(e,o){
            if(e){
                vm.message.push(e);
            }else{
                vm.allEdu = o.data.rows;
            }
        })
        dataService.getAll('work',function(e,o){
            if(e){
                vm.message.push(e);
            }else{
                vm.allWork = o.data.rows;
            }
        })

    }


    vm.goEdit = function (id){

        $location.path('/edit/' + id);
    }

    vm.goAdd = function(){
        console.log('goAdd');
        $location.path('/add');
    }

    vm.deleteUser = function(id){
        dataService.deleteElementById(id,'user',function(e,o){
            if(o){
                init();
            }
        });
    }
    




}])