/**
 * Created by mooner00 on 8/24/2016.
 */
app.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items)
{
    $scope.detail = items

    $scope.ok = function ()
    {
        $uibModalInstance.close()
    }

    $scope.cancel = function ()
    {
        $uibModalInstance.dismiss('cancel')
    }



    $scope.print = function()
    {
        printdiv('printElement')
    }
    function printdiv(printdivname)
    {
        var headstr = "<html><head><title>Booking Details</title></head><body>";
        var footstr = "</body>";
        var newstr = document.getElementById(printdivname).innerHTML;
        var newWindow = window.open('');
        newWindow.document.body.innerHTML = headstr+newstr+footstr;
        newWindow.print();
        return false;
    }

    $scope.download = function()
    {

        downloadDiv('printElement','data.html')
    }

    function downloadDiv(divName,filename)
    {
        var data = document.getElementById(divName).innerHTML
        var file = new File([data], filename, {type: "text/html;charset=utf-8"});
        saveAs(file);
    }
})