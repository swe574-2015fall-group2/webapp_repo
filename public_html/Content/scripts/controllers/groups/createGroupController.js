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
                             
                             $http.post("http://162.243.18.170:9000/v1/user/login", data).success(function(data, status) {
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

                                var data = JSON.stringify({
                                    authToken: $scope.authToken,
                                    name: $scope.name,
                                    description: $scope.description,
                                    tagList: $scope.selectedTagList
                                });

                                $http.post("http://162.243.18.170:9000/v1/group/create", data).success(function (data, status) {
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




                            $scope.yeniTagList = [];
                            $scope.selectedTagList = [];


                            $scope.getTag = function () {

                                var data = JSON.stringify({
                                    authToken: $scope.authToken,
                                    queryString: $scope.ngTag
                                });


                                $http.post("http://162.243.18.170:9000/v1/semantic/queryLabel", data).success(function (data, status) {

                                    $scope.myGroupListCount = data.result.dataList.length;

                                    $scope.yeniTagList = data.result.dataList;

                                    for (var i = 0; i <= $scope.myGroupListCount - 1; i++) {
                                        if ($scope.yeniTagList[i].label == $scope.inputTag)
                                        {
                                            $scope.selectedTagList.push($scope.yeniTagList[i].label, $scope.yeniTagList[i].clazz);
                                        }
                                    }

                                }).error(function (data, status, headers, config) {
                                    // alert("Error: " + data.consumerMessage);

                                });
                            };


                            $scope.setTag = function () {

                                var index = 0;
                                for (var i = 0; i <= $scope.myGroupListCount - 1; i++) {
                                    if ($scope.yeniTagList[i].label == $scope.ngTag)
                                    {
                                        index = 1;
                                        $scope.selectedTagList.push({tag: $scope.yeniTagList[i].label, clazz: $scope.yeniTagList[i].clazz});
                                        break;
                                    }
                                }

                                if (index == 0)
                                {
                                    $scope.selectedTagList.push({tag: $scope.ngTag.toString(), clazz: ""});
                                }


                            };





                        }]);
        });
