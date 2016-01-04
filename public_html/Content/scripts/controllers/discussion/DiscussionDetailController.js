define(['controllers/controllers'],
        function (controllers) {
            controllers.controller('DiscussionDetailContr', ['$window',
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

                    var Duzenli2 = new RegExp("selectedDiscussionName=([^;=]+)[;\\b]?");
                    var Sonuclar2 = Duzenli2.exec(Cerez);
                    //alert( unescape(Sonuclar[1]) );
                    var selectedDiscussionName = unescape(Sonuclar2[1]);

                    var Duzenli3 = new RegExp("selectedDiscussionDesc=([^;=]+)[;\\b]?");
                    var Sonuclar3 = Duzenli3.exec(Cerez);
                    //alert( unescape(Sonuclar[1]) );
                    var selectedDiscussionDesc = unescape(Sonuclar3[1]);

                    var Duzenli4 = new RegExp("selectedDiscussion=([^;=]+)[;\\b]?");
                    var Sonuclar4 = Duzenli4.exec(Cerez);
                    //alert( unescape(Sonuclar[1]) );
                    var selectedDiscussion = unescape(Sonuclar4[1]);

                    $scope.selectedDiscussionName = selectedDiscussionName;
                    $scope.selectedDiscussionDesc = selectedDiscussionDesc;
                    $scope.selectedDiscussion = selectedDiscussion;

                    getComments();

                    //get the comments
                    function getComments() {
                        var data = JSON.stringify({
                            authToken: authToken,
                            id: $scope.selectedDiscussion
                        });
                        $http.post("http://162.243.18.170:9000/v1/discussion/query", data).success(function (data, status) {
                            $scope.tagsList = data.result.tagList;
                            $scope.selectedDiscussionName = data.result.name;
                            $scope.selectedDiscussionDesc = data.result.description;

                            getUserDetails(data.result.commentList);
                            getRelatedMeetingsDetails(data.result.meetingIdList)

                        }).error(function (data, status, headers, config) {
                            //alert("Error: " + data.consumerMessage);

                        });

                    }

                    //get the commenters user details
                    function getRelatedMeetingsDetails(meetingList) {
                        $scope.shownMeetingList = [];
                        var com;
                        var sayac = 0;
                        for (com in meetingList) {
                            //alert(sayac);
                            //GET USER INFO
                            var data = JSON.stringify({
                                authToken: authToken,
                                id: meetingList[sayac]
                            });

                            $http.post("http://162.243.18.170:9000/v1/meeting/get", data).success(function (data, status) {

                                var date = new Date(data.result.meeting.datetime);
                                $scope.day = date.getDate();
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
                                $scope.monthYear = month + " " + date.getFullYear();


                                var tempMeeting = {
                                    id: data.result.meeting.id,
                                    value: data.result.meeting.description,
                                    label: data.result.meeting.name,
                                    location: data.result.meeting.location,
                                    startHour: data.result.meeting.startHour,
                                    endHour: data.result.meeting.endHour,
                                    day: $scope.day,
                                    monthYear: $scope.monthYear
                                };

                                $scope.shownMeetingList.push(tempMeeting);



                            }).error(function (data, status, headers, config) {
                                alert("Error: " + data.consumerMessage);

                            });
                            sayac++;
                        }
                    }


                    //get the commenters user details
                    function getUserDetails(commentList) {
                        $scope.commentList = [];
                        var com;
                        var sayac = 0;
                        for (com in commentList) {

                            //GET USER INFO
                            var data = JSON.stringify({
                                authToken: authToken,
                                id: commentList[sayac].creatorId
                            });


                            $http.post("http://162.243.18.170:9000/v1/user/get", data).success(function (data, status) {

                                var tempName = (data.result.firstname + " " + data.result.lastname);

                                var createdTime = commentList[sayac].creationTime;
                                var comment = commentList[sayac].comment;

                                $scope.commentList.push({
                                    name: tempName,
                                    createdTime: createdTime,
                                    comment: comment
                                });
                                var aggw = 0
                                sayac++;

                            }).error(function (data, status, headers, config) {
                                alert("Error: " + data.consumerMessage);

                            });

                        }
                    }




                    $scope.addComment = function () {

                        var data = JSON.stringify({
                            authToken: authToken,
                            discussionId: $scope.selectedDiscussion,
                            comment: $scope.commentText
                        });

                        $http.post("http://162.243.18.170:9000/v1/discussion/addComment", data).success(function (data, status) {
                            getComments();
                            $scope.commentText = "";
                            // alert("Note is created successfully!");
                            //                                    $window.location.href = "#/my_groups";
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


                }
            ]);
        });
