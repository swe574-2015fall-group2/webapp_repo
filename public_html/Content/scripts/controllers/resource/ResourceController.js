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
                                groupId: selectedGroup
                            });


                            $http.post("http://162.243.18.170:9000/v1/resource/queryResourcesByGroup", data).success(function (data, status) {
                                $scope.resourceList = data.result;

                                for(var i = 0; i< $scope.resourceList.length; i++){

                                    if($scope.resourceList[i].type == "INTERNAL"){
                                        $scope.resourceList[i].imgLink = "assets/img/file_types/file.png";
                                      }

                                      if($scope.resourceList[i].type == "EXTERNAL"){
                                        $scope.resourceList[i].imgLink = "assets/img/file_types/icon256.png";
                                      }

                                }


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


                            $scope.addURL3 = function () {

                              if(!($scope.extURL.indexOf("http")>-1)){

                               $scope.extURL = "http://" + $scope.extURL;
                               }

                                var data = JSON.stringify({
                                    authToken: authToken,
                                    name: $scope.extURLName,
                                    link:$scope.extURL,
                                    groupId:selectedGroup,
                                    tagList:[]

                                });

                                $http.post("http://162.243.18.170:9000/v1/resource/create", data).success(function (data, status) {
                                    //alert(data.result.token);
                                    //alert("success");

                                    $window.location.reload();
                                }).error(function (data, status, headers, config) {
                                    alert("Error: " + data.consumerMessage);

                                });
                            };




                            //Add external resource
                            $scope.addURL = function () {
                                var data = JSON.stringify({
                                    authToken: authToken,
                                    name: $scope.extURLName,
                                    link:$scope.extURL,
                                    groupId:selectedGroup,
                                    tagList:[]

                                });

                                $http.post("http://162.243.18.170:9000/v1/resource/create", data).success(function (data, status) {
                                    //alert(data.result.token);
                                    alert("success");

                                    $window.location.reload();
                                }).error(function (data, status, headers, config) {
                                    alert("Error: " + data.consumerMessage);

                                });
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

                            $scope.downloadResource = function (id, type, link) {

                              if(type=="INTERNAL")
                              window.open("http://162.243.18.170:9000/v1/resource/downloadResource?resourceId="+ id +"&authToken=b1167600-b282-11e5-b8df-04019494e201", '_blank');
                              else if (type=="EXTERNAL")
                                window.open(link, '_blank')

                            };



                        }]);


        });
