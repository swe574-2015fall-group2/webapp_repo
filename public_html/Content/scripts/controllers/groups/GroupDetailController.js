define(['controllers/controllers'],
        function (controllers) {
            controllers.controller('GroupDetailContr', ['$window',
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
                    //console.log( unescape(Sonuclar5[1]) );
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
                    $http.post("http://162.243.18.170:9000/v1/group/query", data).success(function (data, status) {


                        $scope.tagsList = data.result.tagList;

                        $scope.userList = data.result.users;
                        $scope.userListCount = $scope.userList.length;

                        $scope.selectedGroupName = data.result.name;
                        $scope.selectedGroupDesc = data.result.description;

                        //alert( "meeting list got" );
                    }).error(function (data, status, headers, config) {
                        //alert("Error: " + data.consumerMessage);

                    });


                    //get the resource
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


                        /*if (data.result.length > 5) {
                            $scope.resourceListCount = data.result.length - 5;
                            $scope.showAllResourcesButton = true;
                        }*/

                    }).error(function (data, status, headers, config) {
                        alert("Error: " + data.consumerMessage);

                    });

                    //download resource
                    $scope.downloadResource = function (id, type, link) {

                      if(type=="INTERNAL")
                      window.open("http://162.243.18.170:9000/v1/resource/downloadResource?resourceId="+ id +"&authToken=b1167600-b282-11e5-b8df-04019494e201", '_blank');
                      else if (type=="EXTERNAL")
                        window.open(link, '_blank')

                    };


                    //get the meetings
                    var data = JSON.stringify({
                        authToken: authToken,
                        id: selectedGroup
                    });
                    $http.post("http://162.243.18.170:9000/v1/meeting/queryByGroup", data).success(function (data, status) {


                        $scope.meetingList = data.result.meetingList;
                        getRelatedMeetingsDetails(data.result.meetingList);
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


                    //get the related meetings
                    function getRelatedMeetingsDetails(meetingList) {
                        $scope.shownMeetingList = [];
                        var com;
                        var sayac = 0;
                        for (com in meetingList) {


                            var date = new Date(meetingList[com].datetime);
                            meetingList[com].day = date.getDate();
                            var month = date.getMonth() + 1;

                            switch (month) {
                                case 1:
                                    month = "Jan"
                                    break;
                                case 2:
                                    month = "Feb"
                                    break;
                                case 3:
                                    month = "Mar"
                                    break;
                                case 4:
                                    month = "Apr"
                                    break;
                                case 5:
                                    month = "May"
                                    break;
                                case 6:
                                    month = "Jun"
                                    break;
                                case 7:
                                    month = "Jul"
                                    break;
                                case 8:
                                    month = "Aug"
                                    break;
                                case 9:
                                    month = "Sep"
                                    break;
                                case 10:
                                    month = "Oct"
                                    break;
                                case 11:
                                    month = "Nov"
                                    break;
                                case 12:
                                    month = "Dec"
                                    break;
                            }
                            meetingList[com].monthYear = month + " " + date.getFullYear();
                            $scope.shownMeetingList.push(meetingList[com]);

                            sayac++;
                        }
                    }

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

                }
            ]);
        });
