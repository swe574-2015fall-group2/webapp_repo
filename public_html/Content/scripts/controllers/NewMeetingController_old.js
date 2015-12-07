define(['controllers/controllers'],
        function (controllers) {
            controllers.controller('NewMeetingCont',
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

                            $scope.name = "";
                            $scope.description = "";
                            $scope.tags = "";
                            $scope.invitelis = "";
                            $scope.date = "";
                            $scope.starthour = "";
                            $scope.finishhour = "";
                            $scope.timezone = "";
                            $scope.location = "";



                            $scope.sendPost = function () {

                                if ($scope.meetingtype == true)
                                    $scope.tip = "ONLINE";
                                else
                                    $scope.tip = "FACE_TO_FACE";

                                var data = JSON.stringify({
                                    authToken: $scope.authToken,
                                    datetime: $scope.date,
                                    agendaSet: [
                                        ""
                                    ],
                                    estimatedDuration: 0,
                                    location: $scope.location,
                                    description: $scope.description,
                                    type: $scope.tip,
                                    groupId: $scope.selectedGroup

                                });

                                $http.post("http://162.243.215.160:9000/v1/meeting/create", data).success(function (data, status) {

                                    alert("Meeting is created successfully!");
                                    $window.location.href = "#/my_groups";
                                }).error(function (data, status, headers, config) {
                                    alert("Error: " + data.consumerMessage);

                                });
                            };
                        }]);
        });
