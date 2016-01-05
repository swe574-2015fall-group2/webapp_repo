//define(['controllers/controllers'],
        function (controllers) {
            controllers.controller('InboxContr',
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

                            $scope.allReceivedMessages = [];

                            //get the group detail
                            var data = JSON.stringify({
                                authToken: authToken
                            });
                            $http.post("http://162.243.18.170:9000/v1/messagebox/getByReceiver", data).success(function (data, status) {

                                var messages = data.result.messages;
                                var allReceivedMessages = [];

                                for(var i = 0; i < messages.length; i++){
                                     for(var j = 0; j < messages[i].messageList.length; j++){
                                     var temp = messages[i].messageList[j];
                                     temp.senderId = messages[i].senderId;
                                        allReceivedMessages.push(messages[i].messageList[j]);
                                    }
                                }

                                var a = allReceivedMessages.sort(function(x, y){
                                    return x.datetime - y.datetime;
                                })

                                /*for (var i = 0; i < a.length; i++){
                                    var temp = a[i];
                                     temp.senderName = getUserDetails(a[i].senderId);
                                }*/
                                var abb = getUserDetails(a);


                                /*var tags = data.result.tagList;
                                var tagsString = "";

                                for (i = 0; i < tags.length; i++) {
                                    tagsString += tags[i];

                                    if (i < (tags.length - 1))
                                    {
                                        tagsString += ",";
                                    }
                                }

                                $scope.tags = tagsString;
                                $scope.userList = data.result.users;
                                $scope.userListCount = $scope.userList.length;*/

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


                            };

                            function getUserDetails(idList) {
                                var resultList = [];
                                var com;
                                var sayac = 0;
                                for (com in idList) {

                                    //GET USER INFO
                                    var data = JSON.stringify({
                                        authToken: authToken,
                                        id: idList[sayac].senderId
                                    });


                                    $http.post("http://162.243.18.170:9000/v1/user/get", data).success(function (data, status) {

                                        var tempName = (data.result.firstname + " " + data.result.lastname);
                                        var tempObj = idList[sayac];
                                        tempObj.senderName = tempName;
                                        resultList.push(tempObj);

                                        sayac++;

                                    }).error(function (data, status, headers, config) {
                                        alert("Error: " + data.consumerMessage);

                                    });

                                }
                                $scope.allReceivedMessages = resultList;
                                return resultList;
                            }




                            $scope.toInboxDetail = function (name, id,  date, mes) {
                                document.cookie = "InboxDetailSenderName" + "=" + name;
                                document.cookie = "InboxDetailSenderId" + "=" + id;
                                document.cookie = "InboxDetailDatetime" + "=" + date;
                                document.cookie = "InboxDetailMessage" + "=" + mes;
                                $window.location.href = '#/inbox_detail';
                            };


                        }]);
        });
