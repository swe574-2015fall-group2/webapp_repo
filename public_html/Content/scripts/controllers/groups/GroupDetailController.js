define(['controllers/controllers'],
        function (controllers) {
            controllers.controller('GroupDetailContr',
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

                            var Duzenli2 = new RegExp("selectedGroupName=([^;=]+)[;\\b]?");
                            var Sonuclar2 = Duzenli2.exec(Cerez);
                            //alert( unescape(Sonuclar[1]) );	
                            var selectedGroupName = unescape(Sonuclar2[1]);

                            var Duzenli3 = new RegExp("selectedGroupDesc=([^;=]+)[;\\b]?");
                            var Sonuclar3 = Duzenli3.exec(Cerez);
                            //alert( unescape(Sonuclar[1]) );	
                            var selectedGroupDesc = unescape(Sonuclar3[1]);

                            var Duzenli4 = new RegExp("selectedGroupJoined=([^;=]+)[;\\b]?");
                            var Sonuclar4 = Duzenli4.exec(Cerez);
                            //alert( unescape(Sonuclar[1]) );	
                            var selectedGroupJoined = unescape(Sonuclar4[1]);

                            var Duzenli5 = new RegExp("selectedGroup=([^;=]+)[;\\b]?");
                            var Sonuclar5 = Duzenli5.exec(Cerez);
                            //alert( unescape(Sonuclar5[1]) );	
                            var selectedGroup = unescape(Sonuclar5[1]);

                            //alert(selectedGroup);

                            $scope.selectedGroupName = selectedGroupName;
                            $scope.selectedGroupDesc = selectedGroupDesc;
                            $scope.selectedGroupJoined = selectedGroupJoined;
                            $scope.selectedGroup = selectedGroup;
                            $scope.isUserJoined = false;

                            //alert("group detail:" + selectedGroupName);
                            //alert(selectedGroupJoined);
                            if (selectedGroupJoined == "true") {
                                $scope.isUserJoined = true;
                                //alert("leave");
                            }

                            //get the group detail
                            var data = JSON.stringify({
                                authToken: authToken,
                                id: selectedGroup
                            });
                            $http.post("http://162.243.215.160:9000/v1/group/query", data).success(function (data, status) {


                                var tags = data.result.tagList;
                                var tagsString = "Tags ";

                                for (i = 0; i < tags.length; i++) {
                                    tagsString += tags[i].tag;

                                    if (i < (tags.length - 1))
                                    {
                                        tagsString += ", ";
                                    }
                                }

                                $scope.tags = tagsString;
                                $scope.userList = data.result.users;
                                $scope.userListCount = $scope.userList.length;

                                //alert( "meeting list got" );
                            }).error(function (data, status, headers, config) {
                                //alert("Error: " + data.consumerMessage);

                            });


                            //get the meetings
                            var data = JSON.stringify({
                                authToken: authToken,
                                id: selectedGroup
                            });
                            $http.post("http://162.243.215.160:9000/v1/meeting/queryByGroup", data).success(function (data, status) {


                                $scope.meetingList = data.result.meetingList;
                                //alert( "meeting list got" );
                            }).error(function (data, status, headers, config) {
                                //alert("Error: " + data.consumerMessage);

                            });


                            //get the discussions
                            var data = JSON.stringify({
                                authToken: authToken,
                                id: selectedGroup
                            });
                            $http.post("http://162.243.215.160:9000/v1/discussion/list", data).success(function (data, status) {


                                $scope.discussionList = data.result.discussionList;
                                //alert( "meeting list got" );
                            }).error(function (data, status, headers, config) {
                                //alert("Error: " + data.consumerMessage);

                            });


                            //get the notes
                            var data = JSON.stringify({
                                authToken: authToken,
                                id: selectedGroup
                            });
                            $http.post("http://162.243.215.160:9000/v1/note/queryByGroup", data).success(function (data, status) {


                                $scope.noteList = data.result.noteList;
                                
                                //alert( "meeting list got" );
                            }).error(function (data, status, headers, config) {
                                //alert("Error: " + data.consumerMessage);

                            });


                            $scope.joinGroup = function () {

                                var data = JSON.stringify({
                                    authToken: authToken,
                                    groupId: selectedGroup
                                });

                                $http.post("http://162.243.215.160:9000/v1/group/join", data).success(function (data, status) {

                                    //alert( "successfully joined" );	
                                    document.cookie = "selectedGroupJoined" + "=" + true;
                                    $window.location.reload();

                                    //$window.location.href = '#/group_detail';
                                }).error(function (data, status, headers, config) {
                                    alert("Error: " + data.consumerMessage);

                                });


                            };

                            $scope.leaveGroup = function () {

                                var data = JSON.stringify({
                                    authToken: authToken,
                                    groupId: selectedGroup
                                });

                                $http.post("http://162.243.215.160:9000/v1/group/leave", data).success(function (data, status) {

                                    //alert( "successfully left the group" );	
                                    document.cookie = "selectedGroupJoined" + "=" + false;
                                    $window.location.reload();

                                    //$window.location.href = '#/group_detail';
                                }).error(function (data, status, headers, config) {
                                    alert("Error: " + data.consumerMessage);

                                });


                            };

                            $scope.toMeetingDetail = function (id, desc, loc) {
                                document.cookie = "selectedMeeting" + "=" + id;
                                document.cookie = "selectedMeetingDesc" + "=" + desc;
                                document.cookie = "selectedMeetingLoc" + "=" + loc;
                                $window.location.href = '#/meeting_detail';
                            };

                            $scope.toDiscussionDetail = function (id, name, desc) {
                                document.cookie = "selectedDiscussion" + "=" + id;
                                document.cookie = "selectedDiscussionDesc" + "=" + desc;
                                document.cookie = "selectedDiscussionName" + "=" + name;
                                $window.location.href = '#/discussion_detail';
                            };
                            
                            $scope.toNoteDetail = function (id, title) {
                                document.cookie = "selectedNote" + "=" + id;
                                document.cookie = "selectedNoteTitle" + "=" + title;
                                $window.location.href = '#/note_detail';
                            };

                        }]);
        });
