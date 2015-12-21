define(['controllers/controllers'],
        function (controllers) {
            controllers.controller('MeetingDetailContr',
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

                            var Duzenli2 = new RegExp("selectedMeetingLoc=([^;=]+)[;\\b]?");
                            var Sonuclar2 = Duzenli2.exec(Cerez);

                            var selectedMeetingLoc = "";
                            if (Sonuclar2 != null)
                            {
                                selectedMeetingLoc = unescape(Sonuclar2[1]);
                            }

                            var Duzenli3 = new RegExp("selectedMeetingDesc=([^;=]+)[;\\b]?");
                            var Sonuclar3 = Duzenli3.exec(Cerez);

                            var selectedMeetingDesc = "";
                            if (Sonuclar3 != null)
                            {
                                selectedMeetingDesc = unescape(Sonuclar3[1]);
                            }

                            var Duzenli4 = new RegExp("selectedMeeting=([^;=]+)[;\\b]?");
                            var Sonuclar4 = Duzenli4.exec(Cerez);

                            var selectedMeeting = "";
                            if (Duzenli4 == null)
                            {
                                alert("Selected meeting was not found.");
                            } else
                            {
                                selectedMeeting = unescape(Sonuclar4[1]);
                            }

                            $scope.selectedMeetingLoc = selectedMeetingLoc;
                            $scope.selectedMeetingDesc = selectedMeetingDesc;
                            $scope.selectedMeeting = selectedMeeting;

                            //get the meetings
                            var data = JSON.stringify({
                                authToken: authToken,
                                id: selectedMeeting
                            });
                            $http.post("http://162.243.215.160:9000/v1/meeting/get", data).success(function (data, status) {

                                $scope.meetingName = data.result.meeting.name;
                                $scope.meetingDescription = data.result.meeting.description;
                                $scope.agendaItems = data.result.meeting.agendaSet;
                                $scope.todoItems = data.result.meeting.todoSet;
                                $scope.datetime = data.result.meeting.datetime;
                                $scope.selectedMeetingLoc = data.result.meeting.location;

                                $scope.attandedUsers = getUserDetails(data.result.meeting.attandedUserSet);
                                $scope.invitedUsers = getUserDetails(data.result.meeting.invitedUserSet);
                                $scope.startHour = data.result.meeting.startHour;
                                $scope.endHour = data.result.meeting.endHour;
                                var date = new Date($scope.datetime);
                                $scope.day = date.getDate();
                                $scope.month = date.getMonth() + 1;

                                var tagsString = "Tags: ";
                                var tags = data.result.meeting.tagList;
                                for (i = 0; i < tags.length; i++) {
                                    tagsString += tags[i].tag;

                                    if (i < (tags.length - 1))
                                    {
                                        tagsString += " ,";
                                    }
                                }
                                $scope.tags = tagsString;

                                var month = "Jan";
                                switch ($scope.month) {
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


                                //alert( "meeting list got" );
                            }).error(function (data, status, headers, config) {
                                //alert("Error: " + data.consumerMessage);

                            });

                            function getUserDetails(idList) {
                                var resultList = [];
                                var com;
                                var sayac = 0;
                                for (com in idList) {

                                    //GET USER INFO
                                    var data = JSON.stringify({
                                        authToken: authToken,
                                        id: idList[sayac]
                                    });


                                    $http.post("http://162.243.215.160:9000/v1/user/get", data).success(function (data, status) {

                                        var tempName = (data.result.firstname + " " + data.result.lastname);

                                        resultList.push({name: tempName});

                                        sayac++;

                                    }).error(function (data, status, headers, config) {
                                        alert("Error: " + data.consumerMessage);

                                    });

                                }
                                return resultList;
                            }




                        }]);
        });
