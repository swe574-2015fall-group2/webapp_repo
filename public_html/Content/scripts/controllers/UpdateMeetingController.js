define(['controllers/controllers'],
        function (controllers) {
            controllers.controller('UpdateMeetingCont',
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
                            var selectedMeetingLoc = unescape(Sonuclar2[1]);

                            var DuzenliM3 = new RegExp("selectedMeetingDesc=([^;=]+)[;\\b]?");
                            var Sonuclar3 = DuzenliM3.exec(Cerez);
                            //alert( unescape(Sonuclar[1]) );	
                            var selectedMeetingDesc = unescape(Sonuclar3[1]);

                            var DuzenliM4 = new RegExp("selectedMeeting=([^;=]+)[;\\b]?");
                            var Sonuclar4 = DuzenliM4.exec(Cerez);
                            //alert( unescape(Sonuclar[1]) );	
                            var selectedMeeting = unescape(Sonuclar4[1]);

                            //alert(selectedGroup);

                            $scope.selectedMeetingLoc = selectedMeetingLoc;
                            $scope.selectedMeetingDesc = selectedMeetingDesc;
                            $scope.selectedMeeting = selectedMeeting;




                            var data = JSON.stringify({
                                authToken: $scope.authToken,
                                id: $scope.selectedMeeting
                            });


                            $http.post("http://162.243.215.160:9000/v1/meeting/get", data).success(function (data, status) {

                                $scope.name = data.result.meeting.name;
                                $scope.description = data.result.meeting.description;
                                $scope.tags = data.result.meeting.tagList;
                                /*$scope.invitelis = "";*/
                                $scope.date = data.result.meeting.datetime;
                                $scope.starthour = data.result.meeting.startHour;
                                $scope.finishhour = data.result.meeting.endHour;
                                $scope.timezone = data.result.meeting.timezone;
                                $scope.location = data.result.meeting.location;



                                /* "id": "56649f94e4b0495c8a3eec6d",
                                 "creatorId": "56649232e4b0411d15ea23c8",
                                 "groupId": "56649261e4b0411d15ea23c9",
                                 "name": "Meeting name",
                                 "datetime": 1430611200000,
                                 "timezone": "Australian Central Daylight Savings Time\tUTC+10:30",
                                 "agendaSet": null,
                                 "todoSet": null,
                                 "startHour": "10:00",
                                 "endHour": "12:00",
                                 "actualDuration": null,
                                 "location": "pendik",
                                 "description": "Meeting description",
                                 "status": "NOT_STARTED",
                                 "type": "FACE_TO_FACE",
                                 "invitedUserSet": null,
                                 "attandedUserSet": null,
                                 "rejectedUserSet": null,
                                 "tentativeUserSet": null,
                                 "tagList": [
                                 ""
                                 ]*/



                            }).error(function (data, status, headers, config) {
                                alert("Error: " + data.consumerMessage);

                            });



                            $scope.sendPost = function () {

                                if ($scope.meetingtype == true)
                                    $scope.tip = "ONLINE";
                                else
                                    $scope.tip = "FACE_TO_FACE";

                                var data = JSON.stringify({
                                    authToken: $scope.authToken,
                                    name: $scope.name,
                                    datetime: $scope.date,
                                    timezone: $scope.timezone,
                                    startHour: $scope.starthour,
                                    endHour: $scope.finishhour,
//                                    agendaSet: [""],
                                    location: $scope.location,
                                    description: $scope.description,
                                    type: $scope.tip,
                                    groupId: $scope.selectedGroup,
//                                    invitedUserIdList: [""],
                                    //tagList: [$scope.tags],
//                                    actualDuration: 0,
                                    meetingId: $scope.selectedMeeting,
//                                    todoSet: [""],
//                                    status: "NOT_STARTED"
                                });

                                $http.post("http://162.243.215.160:9000/v1/meeting/update", data).success(function (data, status) {

                                    alert("Meeting is created successfully!");
                                    $window.location.href = "#/my_groups";
                                }).error(function (data, status, headers, config) {
                                    alert("Error: " + data.consumerMessage);

                                });
                            };
                        }]);
        });
