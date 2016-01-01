define(['controllers/controllers'],
        function (controllers) {
            controllers.controller('UpdateDiscussionCont',
                    ['$window',
                        '$scope',
                        '$http',
                        function (
                                $window,
                                $scope,
                                $http) {

                            var Cerez = document.cookie;
                            var Duzenli = new RegExp("authToken=([^;=]+)[;\\b]?");
                            var group = new RegExp("selectedGroup=([^;=]+)[;\\b]?");
                            
                            var Duzenli2 = new RegExp("selectedGroupName=([^;=]+)[;\\b]?");
                            var Sonuclar2 = Duzenli2.exec(Cerez);
                            //alert( unescape(Sonuclar[1]) );	
                            var selectedGroupName = unescape(Sonuclar2[1]);

                            var Duzenli4 = new RegExp("selectedDiscussion=([^;=]+)[;\\b]?");
                            var Sonuclar4 = Duzenli4.exec(Cerez);
                            //alert( unescape(Sonuclar[1]) );	
                            var selectedDiscussion = unescape(Sonuclar4[1]);

                            $scope.selectedDiscussion=selectedDiscussion;
                           
                            var Sonuclar = Duzenli.exec(Cerez);
                            var goupSonuc = group.exec(Cerez);
                         
                            var authToken = unescape(Sonuclar[1]);
                            var selectedGroup = unescape(goupSonuc[1]);
                            $scope.authToken = authToken;
                            $scope.selectedGroup = selectedGroup;
                            $scope.selectedGroupName = selectedGroupName;

                            $scope.name = "";
                            $scope.description = "";
                            $scope.tags = "";
                            $scope.tagList = [];

                                var data = JSON.stringify({
                                    authToken: $scope.authToken,
                                    id: $scope.selectedDiscussion
                                });

                                $http.post("http://162.243.18.170:9000/v1/discussion/query", data).success(function (data, status) {

                                    $scope.name=data.result.name;
                                    $scope.description=data.result.description;
                                    $scope.tagList= data.result.tagList;
                                }).error(function (data, status, headers, config) {
                                    alert("Error: " + data.consumerMessage);

                                });








                            $scope.sendPost = function () {
                               
                                var tagList = $scope.tags.split(',');
                                $scope.tagList = tagList;

                                if ($scope.meetingtype == true)
                                    $scope.tip = "ONLINE";
                                else
                                    $scope.tip = "FACE_TO_FACE";

                                 var data = JSON.stringify({
                                    authToken: $scope.authToken,
                                    groupId: $scope.selectedGroup,
                                    name: $scope.name,
                                    description: $scope.description,
                                    tagList: $scope.tagList,
                                    discussionId: $scope.selectedDiscussion
                                });

                                $http.post("http://162.243.18.170:9000/v1/discussion/update", data).success(function (data, status) {

                                    //alert("Discussion is created successfully!");
                                    $window.location.href = "#/discussion_detail";
                                }).error(function (data, status, headers, config) {
                                    alert("Error: " + data.consumerMessage);

                                });
                            };
                        }]);
        });
