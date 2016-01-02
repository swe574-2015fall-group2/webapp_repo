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
                            $scope.selectedDiscussion = selectedDiscussion;
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

                                $scope.name = data.result.name;
                                $scope.description = data.result.description;
                                $scope.selectedTagList = data.result.tagList;
                            }).error(function (data, status, headers, config) {
                                alert("Error: " + data.consumerMessage);
                            });









                            $scope.updateDiscussion = function () {
                                var data = JSON.stringify({
                                    authToken: $scope.authToken,
                                    groupId: $scope.selectedGroup,
                                    name: $scope.name,
                                    description: $scope.description,
                                    tagList: $scope.selectedTagList,
                                    discussionId: $scope.selectedDiscussion
                                });
                                $http.post("http://162.243.18.170:9000/v1/discussion/update", data).success(function (data, status) {

                                    $scope.popUpHeader = "Success";
                                    $scope.popUpBody = "Discussion is updated successfully.";
                                    $scope.discussionUpdated = true;
                                    $scope.popUpVisible = true;

                                }).error(function (data, status, headers, config) {

                                    $scope.popUpHeader = "Error";
                                    $scope.popUpBody = data.consumerMessage;
                                    $scope.popUpVisible = true;

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
                                    /* for (var i = 0; i <= $scope.myGroupListCount - 1; i++) {
                                     if ($scope.yeniTagList[i].label == $scope.inputTag)
                                     {
                                     $scope.selectedTagList.push($scope.yeniTagList[i].label, $scope.yeniTagList[i].clazz);
                                     }
                                     }*/

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

                            $scope.popUpHeader = "";
                            $scope.popUpBody = "";
                            $scope.discussionUpdated = false;

                            $scope.closePopUp = function () {
                                $scope.popUpVisible = false;

                                if ($scope.discussionUpdated)
                                {
                                    $window.location.href = "#/discussion_detail";
                                }
                            };


                        }]);
        });
