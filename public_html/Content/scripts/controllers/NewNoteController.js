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
                            
                       //alert("03"); 
                            $scope.selectedMeetingLoc = selectedMeetingLoc;
                            $scope.selectedMeetingDesc = selectedMeetingDesc;
                            $scope.selectedMeeting = selectedMeeting;

                   
                            $scope.meetingList=[];
                            $scope.meetingList.push({name:selectedMeetingDesc, description:selectedMeetingLoc, type:"ssss", datetime:"22-07:2015"});
    

                            $scope.sendPost = function () {

                               $scope.meetingList.push({name:"sdsd", description:"sdsd22222", type:"ssss", datetime:"22-07:2015"});

                            };


                            $scope.createNote = function () {

                                var data = JSON.stringify({
                                    authToken: $scope.authToken,
                                    title: $scope.name,
                                    text: $scope.description,
                                    groupId: $scope.selectedGroup,
                                    meetingId: $scope.selectedMeeting,
                                    tagList:[$scope.tags],
                                    resourceIds: [""]
                                });

                                $http.post("http://162.243.215.160:9000/v1/note/create", data).success(function (data, status) {

                                    alert("Note is created successfully!");
//                                    $window.location.href = "#/my_groups";
                                }).error(function (data, status, headers, config) {
                                    alert("Error: " + data.consumerMessage);

                                });

                            };






                        }]);
        });
