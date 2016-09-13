

app.service('configService', [function () {
    var vm = this;
    var url  = 'http://localhost:3000';
    var config = {
        url: url,
        newUser: url + 'newuser/',
        baseUrl: url + 'api/',
        searchByName: url + 'search/name',
        search: url + 'search'
    }

    var completeConfig = {
        url: 'http://localhost:3000',
        api: {
            baseUrl: url + 'api/',
            search: url + 'search',
            searchByName: url + 'search/name',
            addAll: url + 'api/all',
            updateAllById: url + 'api/all/',
            deleteAllById: url + 'api/all/',
            getAllById: url + 'api/all/',

            getUserById: url + 'api/user/',
            getAllUser: url + 'api/user/all',
            updateUserById: url + 'api/user/',
            deleteUserById: url + 'api/user/',
            addUser: url + 'api/user/',

            updateConfig: url + 'api/config',
            getConfig: url + 'api/config',

            logout: url + 'logout',
            login: url + 'login',
        },

        route: {
            index: url,
            add: url + 'add',
            config: url + 'config',
            userConfig: url + 'userConfig',
            updateById: url + 'edit/',
        }
    }

    vm.getSimpleConfig = function(){
        return config;
    }

    vm.getConfig = function(){
        return completeConfig;
    }

}])
