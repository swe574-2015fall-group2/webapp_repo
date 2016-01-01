define(['controllers/controllers'],
        function (controllers) {
            controllers.controller('ResourceContr',
                    ['$window',
                        '$scope',
                        '$http',
                        'fileUpload',
                        function (
                                $window,
                                $scope,
                                $http,
                                fileUpload) {


                            /*var data = JSON.stringify({
                             username: "string2",
                             password: "string"
                             });

                             $http.post("http://162.243.18.170:9000/v1/user/login", data).success(function(data, status) {
                             alert("success");
                             });*/

                            //alert("");
                            var Cerez = document.cookie;

                            var Duzenli = new RegExp("authToken=([^;=]+)[;\\b]?");
                            var Sonuclar = Duzenli.exec(Cerez);
                            // alert( unescape(Sonuclar[1]) );
                            var authToken = unescape(Sonuclar[1]);

                            var Duzenli2 = new RegExp("userId=([^;=]+)[;\\b]?");
                            var Sonuclar2 = Duzenli2.exec(Cerez);
                            // alert( unescape(Sonuclar[1]) );
                            var userId = unescape(Sonuclar2[1]);

                            var Duzenli5 = new RegExp("selectedGroup=([^;=]+)[;\\b]?");
                            var Sonuclar5 = Duzenli5.exec(Cerez);
                            //console.log( unescape(Sonuclar5[1]) );
                            var selectedGroup = unescape(Sonuclar5[1]);



                            //Get resourceList
                            var data = JSON.stringify({
                                authToken: authToken,
                                id: selectedGroup
                            });


                            $http.post("http://162.243.18.170:9000/v1/resource/queryResourcesByGroup", data).success(function (data, status) {
                                $scope.resourceList = data.result;


                            }).error(function (data, status, headers, config) {
                                alert("Error: " + data.consumerMessage);

                            });



                            $scope.authToken = authToken;
                            $scope.userId = userId;


                            $scope.uploadFile = function () {
                                var file = $scope.myFile;
                                console.log('file is ');
                                console.dir(file);
                                var uploadUrl = 'http://162.243.18.170:9000/v1/resource/upload?groupId='+ selectedGroup+'&authToken=' + authToken;
                                fileUpload.uploadFileToUrl(file, uploadUrl);

                            };

                            $scope.deleteExternalResource = function (id) {


                                var data = JSON.stringify({
                                    authToken: authToken,
                                    id: id
                                });

                                $http.post("http://162.243.18.170:9000/v1/resource/"+id, data).success(function (data, status) {
                                    //alert(data.result.token);
                                    alert("success");
                                    //document.cookie = "authToken" + "=" + data.result.token;
                                    //$location.path( "~/Content/" );




                                    /*
                                     var Cerez = document.cookie;

                                     var Duzenli = new RegExp("sinan=([^;=]+)[;\\b]?");
                                     var Sonuclar = Duzenli.exec(Cerez);
                                     alert( unescape(Sonuclar[1]) );	*/
                                    //alert( "user updated" );
                                    $window.location.reload();
                                }).error(function (data, status, headers, config) {
                                    alert("Error: " + data.consumerMessage);

                                });
                            };





                        }]);


        });
