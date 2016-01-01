define(['controllers/controllers'],
        function (controllers) {
            controllers.controller('NoteDetailContr',
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

                            /*var Duzenli2 = new RegExp("selectedNoteName=([^;=]+)[;\\b]?");
                            var Sonuclar2 = Duzenli2.exec(Cerez);
                            //alert( unescape(Sonuclar[1]) );	
                            var selectedNoteName = unescape(Sonuclar2[1]);*/

                           var Duzenli3 = new RegExp("selectedNoteTitle=([^;=]+)[;\\b]?");
                            var Sonuclar3 = Duzenli3.exec(Cerez);
                            //alert( unescape(Sonuclar[1]) );	
                            var selectedNoteTitle = unescape(Sonuclar3[1]);


                            var Duzenli5 = new RegExp("selectedNote=([^;=]+)[;\\b]?");
                            var Sonuclar5 = Duzenli5.exec(Cerez);
                            //alert( unescape(Sonuclar5[1]) );	
                            var selectedNote = unescape(Sonuclar5[1]);

                            //alert(selectedGroup);

                            /*$scope.selectedNoteName = selectedNoteName;*/
                            $scope.selectedNoteTitle = selectedNoteTitle;
                            $scope.selectedNote = selectedNote;


                            //get the note detail
                            var data = JSON.stringify({
                                authToken: authToken,
                                id: selectedNote
                            });
                            $http.post("http://162.243.18.170:9000/v1/note/query", data).success(function (data, status) {

                                $scope.title = data.result.title;
                                $scope.text = data.result.text;

                                //alert( "meeting list got" );
                            }).error(function (data, status, headers, config) {
                                //alert("Error: " + data.consumerMessage);

                            });

/*
                            //get the meetings
                            var data = JSON.stringify({
                                authToken: authToken,
                                id: selectedGroup
                            });
                            $http.post("http://162.243.18.170:9000/v1/meeting/queryByGroup", data).success(function (data, status) {


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
                            $http.post("http://162.243.18.170:9000/v1/discussion/list", data).success(function (data, status) {


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
                            $http.post("http://162.243.18.170:9000/v1/note/queryByGroup", data).success(function (data, status) {


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

                                $http.post("http://162.243.18.170:9000/v1/group/join", data).success(function (data, status) {

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

                                $http.post("http://162.243.18.170:9000/v1/group/leave", data).success(function (data, status) {

                                    //alert( "successfully left the group" );	
                                    document.cookie = "selectedGroupJoined" + "=" + false;
                                    $window.location.reload();

                                    //$window.location.href = '#/group_detail';
                                }).error(function (data, status, headers, config) {
                                    alert("Error: " + data.consumerMessage);

                                });


                            };*/

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
                                document.cookie = "selectedDiscussionDesc" + "=" + title;
                                $window.location.href = '#/note_detail';
                            };

                        }]);
        });
