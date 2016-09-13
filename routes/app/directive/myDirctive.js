/**
 * Created by mooner00 on 8/16/2016.
 */
app.directive('myDirective', function() {
    return {
        template: 'This is the directive from Partial {{vm.test}}',
    };
});
app.directive('myDirectiveHtml', function() {
    return {
        templateUrl: "'/app/partial/myTest.html'"
    };
});