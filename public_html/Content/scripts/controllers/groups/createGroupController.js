define(['controllers/controllers'],
        function (controllers) {
            controllers.controller('CreateGroupContr',
                    ['$window',
                        '$scope',
                        '$http',
                        function (
                                $window,
                                $scope,
                                $http) {


                            /*var data = JSON.stringify({
                             username: "string2",
                             password: "string"
                             });
                             
                             $http.post("http://162.243.215.160:9000/v1/user/login", data).success(function(data, status) {
                             alert("success");
                             });*/

                            //alert("");
                            var Cerez = document.cookie;

                            var Duzenli = new RegExp("authToken=([^;=]+)[;\\b]?");
                            var Sonuclar = Duzenli.exec(Cerez);
                            // alert( unescape(Sonuclar[1]) );	
                            var authToken = unescape(Sonuclar[1]);

                            $scope.authToken = authToken;
                            $scope.name = "";
                            $scope.description = "";
                            $scope.sendPost = function () {

                                var diziTag = $scope.tags.split(",");

                                var data = JSON.stringify({
                                    authToken: $scope.authToken,
                                    name: $scope.name,
                                    description: $scope.description,
                                    tagList: diziTag
                                });

                                $http.post("http://162.243.215.160:9000/v1/group/create", data).success(function (data, status) {
                                    //alert(data.result.token);
                                    //alert("success");
                                    //document.cookie = "authToken" + "=" + data.result.token;
                                    //$location.path( "~/Content/" );

                                    /*
                                     var Cerez = document.cookie;
                                     
                                     var Duzenli = new RegExp("sinan=([^;=]+)[;\\b]?");
                                     var Sonuclar = Duzenli.exec(Cerez);
                                     alert( unescape(Sonuclar[1]) );	*/
                                    alert("Group is created successfully!");
                                    $window.location.href = "#/my_groups";
                                }).error(function (data, status, headers, config) {
                                    alert("Error: " + data.consumerMessage);

                                });
                            };
                        }]);
        });
