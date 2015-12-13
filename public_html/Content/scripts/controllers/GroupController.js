define(['controllers/controllers'],
        function (controllers) {
            controllers.controller('GroupContr',
                    ['$window',
                        '$scope',
                        '$http',
                        function (
                                $window,
                                $scope,
                                $http) {



                            //alert("");
                            var Cerez = document.cookie;

                            var Duzenli = new RegExp("authToken=([^;=]+)[;\\b]?");
                            var Sonuclar = Duzenli.exec(Cerez);
                            //alert( unescape(Sonuclar[1]) );	
                            var authToken = unescape(Sonuclar[1]);

                            $scope.authToken = authToken;
                            //alert(authToken);

                            var Duzenli2 = new RegExp("userId=([^;=]+)[;\\b]?");
                            var Sonuclar2 = Duzenli2.exec(Cerez);
                            //alert( unescape(Sonuclar[1]) );	
                            var userId = unescape(Sonuclar2[1]);

                            $scope.userId = userId;



                            //GET USER INFO
                            var data = JSON.stringify({
                                authToken: $scope.authToken,
                                id: $scope.userId
                            });


                            $http.post("http://162.243.215.160:9000/v1/user/get", data).success(function (data, status) {


                                document.getElementById('firstName').innerHTML = data.result.firstname + " " + data.result.lastname;


                            }).error(function (data, status, headers, config) {
                                //alert("Error: " + data.consumerMessage);

                            });








                            //Get ALL GROUPS
                            var data = JSON.stringify({
                                authToken: $scope.authToken
                            });

                            $scope.groupList = "";
                            $http.post("http://162.243.215.160:9000/v1/group/listAll", data).success(function (data, status) {

                                // alert( "There are your groups" );	
                                $scope.groupList = data.result.groupList.slice(0, 3);
                                $scope.groupListCount = data.result.groupList.length - 3;
                                if (data.result.groupList.length > 3) {
                                    $scope.showAllGroupsMoreButton = true;
                                }

                            }).error(function (data, status, headers, config) {
                                // alert("Error: " + data.consumerMessage);

                            });


                            $scope.myGroupList = "";
                            $http.post("http://162.243.215.160:9000/v1/group/listMyGroups", data).success(function (data, status) {

                                // alert( "There are your groups" );	
                                $scope.myGroupList = data.result.groupList.slice(0, 3);
                                $scope.myGroupListCount = data.result.groupList.length - 3;
                                if (data.result.groupList.length > 3) {
                                    $scope.showMyGroupsMoreButton = true;
                                }


                            }).error(function (data, status, headers, config) {
                                // alert("Error: " + data.consumerMessage);

                            });




                            $scope.popularGroupList = "";
                            $http.post("http://162.243.215.160:9000/v1/group/listPopularGroups", data).success(function (data, status) {

                                // alert( "There are your groups" );	
                                $scope.popularGroupList = data.result.groupList.slice(0, 3);
                                $scope.popularGroupListCount = data.result.groupList.length - 3;
                                if (data.result.groupList.length > 3) {
                                    $scope.showPopularGroupsMoreButton = true;
                                }

                            }).error(function (data, status, headers, config) {
                                //alert("Error: " + data.consumerMessage);

                            });


                            $scope.latestGroupList = "";
                            $http.post("http://162.243.215.160:9000/v1/group/listLatest", data).success(function (data, status) {

                                // alert( "There are your groups" );	
                                $scope.latestGroupList = data.result.groupList.slice(0, 3);
                                $scope.latestGroupListCount = data.result.groupList.length - 3;
                                if (data.result.groupList.length > 3) {
                                    $scope.showLatestGroupsMoreButton = true;
                                }

                            }).error(function (data, status, headers, config) {
                                //alert("Error: " + data.consumerMessage);

                            });

                            $scope.recommendedGroupList = "";
                            $http.post("http://162.243.215.160:9000/v1/group/listRecommended", data).success(function (data, status) {

                                // alert( "There are your groups" );	
                                $scope.recommendedGroupList = data.result.groupList.slice(0, 3);
                                $scope.recommendedGroupListCount = data.groupList.result.length - 3;
                                if (data.result.groupList.length > 3) {
                                    $scope.showRecommendedGroupsMoreButton = true;
                                }

                            }).error(function (data, status, headers, config) {
                                //alert("Error: " + data.consumerMessage);

                            });


                            $scope.toGroupDetail = function (index, name, desc, join) {
                                document.cookie = "selectedGroup" + "=" + index;
                                document.cookie = "selectedGroupName" + "=" + name;
                                document.cookie = "selectedGroupDesc" + "=" + desc;
                                document.cookie = "selectedGroupJoined" + "=" + join;
                                //alert(join);
                                $window.location.href = '#/group_detail';
                            };


                        }]);
        });
