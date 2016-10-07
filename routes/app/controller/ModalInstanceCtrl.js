/**
 * Created by mooner00 on 8/24/2016.
 */
app.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items ,wholeItems)
{
    $scope.detail = items
    $scope.wholeDetail = wholeItems
    $scope.ok = function ()
    {
        $uibModalInstance.close()
    }

    $scope.display = function(key)
    {
        if ($scope.wholeDetail[key] != $scope.detail[key]) return "mouseenter"
        else return "none"
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
        var newWindow = window.open('')
        newstr = newstr.replace(/_/g," ")
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
        data = data.replace(/_/g," ");
        var file = new File([data], filename, {type: "text/html;charset=utf-8"});
        saveAs(file);
    }
})