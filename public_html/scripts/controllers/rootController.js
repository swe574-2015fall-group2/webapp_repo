






define(['controllers/controllers',
        'services/liveUpdatesService',
        'services/utilitiesService',
        'services/imageService',
        'services/localStorageService'],
    function (controllers) {
        controllers.controller('RootCtrl',
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
  

               $scope.username="";
               $scope.password="";
               $scope.sendPost = function() {
                var data = JSON.stringify({
                        username: $scope.username,
                        password: $scope.password
                    });

                $http.post("http://162.243.215.160:9000/v1/user/login", data).success(function(data, status) {
                    //alert(data.result.token);
                    document.cookie = "authToken" + "=" + data.result.token;
                    document.cookie = "userId" + "=" + data.result.id;
                    //$location.path( "~/Content/" );
                    
                    /*
                    var Cerez = document.cookie;
	
                    var Duzenli = new RegExp("sinan=([^;=]+)[;\\b]?");
                    var Sonuclar = Duzenli.exec(Cerez);
                    alert( unescape(Sonuclar[1]) );	*/
                    
                    
                    $window.location.href = 'Content/';
                }).error(function (data, status, headers, config) {
              alert("Error! Check your info3");
            });

            };

       


    }]);
});
