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
                                    
                                  $(document).ready(function() {
    
                            $scope.userList = ["Sinan Can","Hayrican", "Barış", "Mehmet", "Orkun", "Recep", "Ahmet", "Kerem","Veli", "George", "Kyle"];

                            $( "#tags" ).autocomplete({
                                source: $scope.userList,
                                messages: {
                                noResults: '',
                                results: function() {}
                            }
                            });
                           
                        });
                        
                            $scope.invitelist = [];


                            $scope.addToInviteList = function () {
                            //alert(")");
                            var asss = $('#tags')[0]; 
                 
                                $scope.invitelist.push({"name":$scope.inviteText});
                                //$scope.inviteText ="";
                                
                            };
                            
                            $scope.isOnlineMeeting=false;
                             $scope.change = function() {
                                $scope.isOnlineMeeting = !$scope.isOnlineMeeting;
                              };
                            

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

                                if ($scope.isOnlineMeeting == true)
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
                                    agendaSet: [""],
                                    location: $scope.location,
                                    description: $scope.description,
                                    type: $scope.tip,
                                    groupId: $scope.selectedGroup,
                                    /*invitedUserIdList:[""],*/
                                    tagList: [$scope.tags]
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
