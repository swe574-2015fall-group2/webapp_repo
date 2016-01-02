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
                            var selectedGroupName = unescape(Sonuclar2[1]);


                            var Sonuclar = Duzenli.exec(Cerez);
                            var goupSonuc = group.exec(Cerez);

                            var authToken = unescape(Sonuclar[1]);
                            var selectedGroup = unescape(goupSonuc[1]);
                            $scope.authToken = authToken;
                            $scope.selectedGroup = selectedGroup;
                            $scope.selectedGroupName = selectedGroupName;

                            $scope.isOnlineMeeting = false;
                            $scope.change = function () {
                                $scope.isOnlineMeeting = !$scope.isOnlineMeeting;
                            };


                            $scope.agendaSet = [];
                            $scope.todoSet = [];


                            $scope.addAgentaItem = function () {
                                if ($scope.agendaText.trim() != "") {
                                    $scope.agendaSet.push($scope.agendaText);
                                    $scope.agendaText = "";
                                }
                            };

                            $scope.addToDoItem = function () {
                                if ($scope.todoText.trim() != "") {
                                    $scope.todoSet.push($scope.todoText);
                                    $scope.todoText = "";
                                }
                            };


                            var DuzenliM2 = new RegExp("selectedMeetingLoc=([^;=]+)[;\\b]?");
                            var Sonuclar2 = DuzenliM2.exec(Cerez);

                            if (Sonuclar2 == null)
                                Sonuclar2 = [" ", " "];
                            var selectedMeetingLoc = unescape(Sonuclar2[1]);

                            var DuzenliM3 = new RegExp("selectedMeetingDesc=([^;=]+)[;\\b]?");
                            var Sonuclar3 = DuzenliM3.exec(Cerez);

                            if (Sonuclar3 == null)
                                Sonuclar3 = [" ", " "];
                            var selectedMeetingDesc = unescape(Sonuclar3[1]);

                            var DuzenliM4 = new RegExp("selectedMeeting=([^;=]+)[;\\b]?");
                            var Sonuclar4 = DuzenliM4.exec(Cerez);

                            var selectedMeeting = unescape(Sonuclar4[1]);

                            $scope.selectedMeetingLoc = selectedMeetingLoc;
                            $scope.selectedMeetingDesc = selectedMeetingDesc;
                            $scope.selectedMeeting = selectedMeeting;

                            $scope.name = "";
                            $scope.description = "";
                            $scope.tags = "";
                            $scope.invitelis = "";
                            $scope.date = "";
                            $scope.starthour = "";
                            $scope.starthourmin = "";
                            $scope.finishhour = "";
                            $scope.finishhourmin = "";
                            $scope.timezone = "";
                            $scope.location = "";

                            $scope.contactName = "";
                            $scope.contactSurname = "";
                            $scope.contactEmail = "";
                            $scope.contactPhone = "";

                            $scope.contactDetail = "";
                            $scope.isPinned = "";




                            var data = JSON.stringify({
                                authToken: $scope.authToken,
                                id: $scope.selectedMeeting
                            });


                            $http.post("http://162.243.18.170:9000/v1/meeting/get", data).success(function (data, status) {

                                $scope.name = data.result.meeting.name;
                                $scope.description = data.result.meeting.description;
                                $scope.tags = data.result.meeting.tagList;
                                $scope.agendaSet = data.result.meeting.agendaSet;
                                $scope.todoSet = data.result.meeting.todoSet;

                                /*$scope.invitelis = "";*/
                                var tempDate = new Date(data.result.meeting.datetime);
                                $scope.starthour = data.result.meeting.startHour.split(":")[0];
                                $scope.starthourmin = data.result.meeting.startHour.split(":")[1];
                                $scope.finishhour = data.result.meeting.endHour.split(":")[0];
                                $scope.finishhourmin = data.result.meeting.endHour.split(":")[1];
                                $scope.timezone = data.result.meeting.timezone;
                                $scope.location = data.result.meeting.location;
                                $scope.contactName = data.result.meeting.contactDetails.name;
                                $scope.contactSurname = data.result.meeting.contactDetails.surname;
                                $scope.contactEmail = data.result.meeting.contactDetails.email;
                                $scope.contactPhone = data.result.meeting.contactDetails.phoneNumber;


                                if (data.result.meeting.isPinned)
                                {
                                    $scope.isPinned = "Yes";
                                } else
                                {
                                    $scope.isPinned = "No";
                                }

                                $scope.selectedTagList = data.result.meeting.tagList;

                                $scope.agendaList = data.result.meeting.agendaSet;

                                for (var i = 0; i <= data.result.meeting.invitedUserSet.length - 1; i++) {

                                    $scope.invitedUsers.push({
                                        firstname: data.result.meeting.invitedUserSet[i].firstname,
                                        lastname: data.result.meeting.invitedUserSet[i].lastname,
                                        id: data.result.meeting.invitedUserSet[i].id,
                                        username: data.result.meeting.invitedUserSet[i].username});

                                }

                                var day = tempDate.getDate();
                                if (day < 10) {
                                    day = "0" + day;
                                }
                                var month = tempDate.getMonth() + 1;
                                if (month < 10) {
                                    month = "0" + month;
                                }
                                var year = tempDate.getFullYear();
                                $scope.date = year + "-" + month + "-" + day;

                            }).error(function (data, status, headers, config) {

                                $scope.popUpHeader = "Error";
                                $scope.popUpBody = data.consumerMessage;
                                $scope.popUpVisible = true;

                            });

                            $scope.agendaList = [];

                            $scope.addAgenda = function () {

                                $scope.agendaList.push($scope.ngAgenda);
                            };

                            var pinned;
                            $scope.invitedUserIdList = [];
                            $scope.contactDetail = "";

                            $scope.updateMeeting = function () {

                                if (!isValid())
                                {
                                    return;
                                }


                                if ($scope.isPinned == "Yes")
                                {
                                    pinned = true;
                                } else
                                {
                                    pinned = false;
                                }

                                if ($scope.isOnlineMeeting == true)
                                    $scope.tip = "ONLINE";
                                else
                                    $scope.tip = "FACE_TO_FACE";


                                $scope.contactDetail = {name: $scope.contactName, surname: $scope.contactSurname, email: $scope.contactEmail, phoneNumber: $scope.contactPhone};

                                $scope.invitedUserIdList = [];
                                for (var i = 0; i <= $scope.invitedUsers.length - 1; i++) {
                                    $scope.invitedUserIdList.push($scope.invitedUsers[i].id);
                                }


                                var data = JSON.stringify({
                                    authToken: $scope.authToken,
                                    name: $scope.name,
                                    datetime: $scope.date,
                                    timezone: $scope.timezone,
                                    startHour: $scope.starthour + ":" + $scope.starthourmin,
                                    endHour: $scope.finishhour + ":" + $scope.finishhourmin,
                                    location: $scope.location,
                                    description: $scope.description,
                                    type: $scope.tip,
                                    groupId: $scope.selectedGroup,
                                    isPinned: pinned,
                                    agendaSet: $scope.agendaList,
                                    contactDetails: $scope.contactDetail,
                                    invitedUserIdList: $scope.invitedUserIdList,
                                    tagList: $scope.selectedTagList,
                                    meetingId: $scope.selectedMeeting,
                                    todoSet: $scope.todoSet
                                });

                                $http.post("http://162.243.18.170:9000/v1/meeting/update", data).success(function (data, status) {


                                    $scope.popUpHeader = "Success";
                                    $scope.popUpBody = "Meeting is updated successfully.";
                                    $scope.meetingUpdated = true;
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


                                }).error(function (data, status, headers, config) {

                                });
                            };

                            var getAllUserData = JSON.stringify({
                                authToken: authToken,
                                queryString: ""
                            });

                            $http.post("http://162.243.18.170:9000/v1/user/query", getAllUserData).success(function (data, status) {

                                $scope.userList = data.result.userList;
                                $scope.allUserCount = data.result.userList.length;
                            }).error(function (data, status, headers, config) {

                            });


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
                            $scope.meetingUpdated = false;
                            $scope.popUpVisible = false;

                            $scope.closePopUp = function () {
                                $scope.popUpVisible = false;

                                if ($scope.meetingUpdated)
                                {
                                    $window.location.href = "#/meeting_detail";
                                }
                            };

                            function isEmpty(MyVariable)
                            {
                                if (
                                        (MyVariable.length == 0)
                                        ||
                                        (MyVariable == "")
                                        ||
                                        (MyVariable.replace(/\s/g, "") == "")
                                        ||
                                        (!/[^\s]/.test(MyVariable))
                                        ||
                                        (/^\s*$/.test(MyVariable))
                                        )
                                {
                                    return true;
                                } else
                                {
                                    return false;
                                }
                            }


                            $scope.array;
                            $scope.invitedUsers = [];

                            $scope.addInvitedUser = function () {

                                var x = $scope.ngUser;
                                x = x.replace(/[\s]/g, '');
                                $scope.array = x.split('|');
                                for (var i = 0; i <= $scope.allUserCount - 1; i++) {
                                    if ($scope.userList[i].username == $scope.array[$scope.array.length - 1]) {

                                        $scope.invitedUsers.push({firstname: $scope.userList[i].firstname, lastname: $scope.userList[i].lastname, id: $scope.userList[i].id, username: $scope.userList[i].username});
                                        $scope.ngUser = "";
                                        break;
                                    }
                                }
                            };

                            $scope.inviteAllUsers = function () {

                                $scope.invitedUsers = [];

                                for (var i = 0; i <= $scope.allUserCount - 1; i++) {

                                    $scope.invitedUsers.push({firstname: $scope.userList[i].firstname, lastname: $scope.userList[i].lastname, id: $scope.userList[i].id, username: $scope.userList[i].username});
                                }

                            };

                            function isValid()
                            {
                                /*     
                                 $scope.tags = "";
                                 $scope.invitelis = "";     
                                 */

                                if (isEmpty($scope.name))
                                {
                                    $scope.popUpHeader = "Warning";
                                    $scope.popUpBody = "You have to enter a meeting name.";
                                    $scope.popUpVisible = true;
                                    return false;
                                }

                                if (isEmpty($scope.description))
                                {
                                    $scope.popUpHeader = "Warning";
                                    $scope.popUpBody = "You have to enter a meeting description.";
                                    $scope.popUpVisible = true;
                                    return false;
                                }

                                if (isEmpty($scope.date))
                                {
                                    $scope.popUpHeader = "Warning";
                                    $scope.popUpBody = "You have to enter a meeting date.";
                                    $scope.popUpVisible = true;
                                    return false;
                                }

                                if (isEmpty($scope.starthour))
                                {
                                    $scope.popUpHeader = "Warning";
                                    $scope.popUpBody = "You have to enter a meeting start hour.";
                                    $scope.popUpVisible = true;
                                    return false;
                                }

                                if (isEmpty($scope.starthourmin))
                                {
                                    $scope.popUpHeader = "Warning";
                                    $scope.popUpBody = "You have to enter a meeting start minute.";
                                    $scope.popUpVisible = true;
                                    return false;
                                }


                                if (isEmpty($scope.finishhour))
                                {
                                    $scope.popUpHeader = "Warning";
                                    $scope.popUpBody = "You have to enter a meeting finish hour.";
                                    $scope.popUpVisible = true;
                                    return false;
                                }

                                if (isEmpty($scope.finishhourmin))
                                {
                                    $scope.popUpHeader = "Warning";
                                    $scope.popUpBody = "You have to enter a meeting finish minute.";
                                    $scope.popUpVisible = true;
                                    return false;
                                }

                                if (isEmpty($scope.timezone))
                                {
                                    $scope.popUpHeader = "Warning";
                                    $scope.popUpBody = "You have to enter a meeting timezone.";
                                    $scope.popUpVisible = true;
                                    return false;
                                }


                                if (isEmpty($scope.location))
                                {
                                    $scope.popUpHeader = "Warning";
                                    $scope.popUpBody = "You have to enter a meeting location.";
                                    $scope.popUpVisible = true;
                                    return false;
                                }

                                if (isEmpty($scope.contactName))
                                {
                                    $scope.popUpHeader = "Warning";
                                    $scope.popUpBody = "You have to enter a contact name.";
                                    $scope.popUpVisible = true;
                                    return false;
                                }

                                if (isEmpty($scope.contactSurname))
                                {
                                    $scope.popUpHeader = "Warning";
                                    $scope.popUpBody = "You have to enter a contact surname.";
                                    $scope.popUpVisible = true;
                                    return false;
                                }

                                if (isEmpty($scope.contactEmail))
                                {
                                    $scope.popUpHeader = "Warning";
                                    $scope.popUpBody = "You have to enter a contact email address.";
                                    $scope.popUpVisible = true;
                                    return false;
                                }

                                if (!isEmailValid($scope.contactEmail))
                                {
                                    $scope.popUpHeader = "Warning";
                                    $scope.popUpBody = "You have entered an invalid contact email address.";
                                    $scope.popUpVisible = true;
                                    return false;
                                }

                                if (isEmpty($scope.contactPhone))
                                {
                                    $scope.popUpHeader = "Warning";
                                    $scope.popUpBody = "You have to enter a contact phone number.";
                                    $scope.popUpVisible = true;
                                    return false;
                                }

                                return true;
                            }

                            function isEmailValid(email)
                            {
                                var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                return re.test(email);
                            }



                        }]);
        });
