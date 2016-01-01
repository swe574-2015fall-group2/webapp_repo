


define(['controllers/controllers',
        'services/liveUpdatesService',
        'services/utilitiesService',
        'services/imageService',
        'services/localStorageService'],
    function (controllers) {
        controllers.controller('RegisterCtrl',
            ['$window',
                '$scope',
                '$http',
                '$location',
    function (
        $window,
        $scope,
        $http,
        $location
        //LiveUpdatesService,
        //UtilitiesService,
        //ImageService,
        //LocalStorageService
                ) {

               $scope.username=""; //email
               $scope.firstname="";
               $scope.lastname="";
               $scope.password="";
               $scope.sendPost = function() {
                var data = JSON.stringify({
                        username: $scope.username,
                        firstname: $scope.firstname,
                        lastname: $scope.lastname,
                        password: $scope.password
                    });

                $http.post("http://162.243.18.170:9000/v1/user/create", data).success(function(data, status) {
                    //alert(data.result.token);
                    //document.cookie = "authToken" + "=" + data.result.token;
                    //$location.path( "~/Content/" );
                    
                    alert("user created, proceeding to login")
                    
                    
                    
                    $window.location.href = '#/login';
                }).error(function (data, status, headers, config) {
              alert("Error! Check your info2");
            });

            };

       


    }]);
});
