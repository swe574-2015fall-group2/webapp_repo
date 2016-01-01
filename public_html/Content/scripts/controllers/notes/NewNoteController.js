define(['controllers/controllers'],
        function (controllers) {
            controllers.controller('NewNoteContr',
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
                            var Sonuclar1 = Duzenli2.exec(Cerez);
                            //alert( unescape(Sonuclar[1]) );	
                            var selectedGroupName = unescape(Sonuclar1[1]);


                            var Sonuclar = Duzenli.exec(Cerez);
                            var goupSonuc = group.exec(Cerez);

                            var authToken = unescape(Sonuclar[1]);
                            var selectedGroup = unescape(goupSonuc[1]);
                            $scope.authToken = authToken;
                            $scope.selectedGroup = selectedGroup;
                            $scope.selectedGroupName = selectedGroupName;


                            var DuzenliM2 = new RegExp("selectedMeetingLoc=([^;=]+)[;\\b]?");
                            var Sonuclar2 = DuzenliM2.exec(Cerez);
                            //alert( unescape(Sonuclar[1]) );

                            var selectedMeetingLoc = "";
                            if (Sonuclar2 != null)
                            {
                                selectedMeetingLoc = unescape(Sonuclar2[1]);
                            }

                            var DuzenliM3 = new RegExp("selectedMeetingDesc=([^;=]+)[;\\b]?");
                            var Sonuclar3 = DuzenliM3.exec(Cerez);
                            //alert( unescape(Sonuclar[1]) );	
                            var selectedMeetingDesc = "";

                            if (Sonuclar3 != null)
                            {
                                selectedMeetingDesc = unescape(Sonuclar3[1]);
                            }

                            var DuzenliM4 = new RegExp("selectedMeeting=([^;=]+)[;\\b]?");
                            var Sonuclar4 = DuzenliM4.exec(Cerez);
                            //alert( unescape(Sonuclar[1]) );	
                            var selectedMeeting = "";
                            if (Sonuclar4 != null)
                            {
                                selectedMeeting = unescape(Sonuclar4[1]);
                            }

                            //alert(selectedGroup);

                            //alert("03"); 
                            $scope.selectedMeetingLoc = selectedMeetingLoc;
                            $scope.selectedMeetingDesc = selectedMeetingDesc;
                            $scope.selectedMeeting = selectedMeeting;


                            $scope.meetingList = [];
                            $scope.meetingList.push({name: selectedMeetingDesc, description: selectedMeetingLoc, type: "ssss", datetime: "22-07:2015"});


                            $scope.sendPost = function () {

                                $scope.meetingList.push({name: "sdsd", description: "sdsd22222", type: "ssss", datetime: "22-07:2015"});

                            };



                            $scope.createNote = function () {

                                var data = JSON.stringify({
                                    authToken: $scope.authToken,
                                    title: $scope.name,
                                    text: $scope.description,
                                    groupId: $scope.selectedGroup,
                                    meetingId: $scope.selectedMeeting,
                                    tagList: $scope.selectedTagList,
                                    resourceIds: [""]
                                });

                                $http.post("http://162.243.18.170:9000/v1/note/create", data).success(function (data, status) {

                                    alert("Note is created successfully!");
                                    $window.location.href = "#/my_groups";
                                }).error(function (data, status, headers, config) {
                                    alert("Error: " + data.consumerMessage);

                                });

                            };

                            $scope.cancel = function () {
                                $scope.name = "";
                                $scope.description = "";
                                $scope.selectedGroup = "";
                                $scope.selectedMeeting = "";
                                $scope.tags = "";
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
