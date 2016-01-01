define(['controllers/controllers'],
        function (controllers) {
            controllers.controller('InboxNewMessageContr',
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

                            var Duzenli2 = new RegExp("InboxDetailSenderName=([^;=]+)[;\\b]?");
                            var Sonuclar2 = Duzenli2.exec(Cerez);
                            //alert( unescape(Sonuclar[1]) );	
                            var InboxDetailSenderName = unescape(Sonuclar2[1]);

                            var Duzenli3 = new RegExp("InboxDetailSenderId=([^;=]+)[;\\b]?");
                            var Sonuclar3 = Duzenli3.exec(Cerez);
                            //alert( unescape(Sonuclar[1]) );	
                            var InboxDetailSenderId = unescape(Sonuclar3[1]);
                            
                             $scope.InboxDetailSenderName = InboxDetailSenderName;
                            $scope.InboxDetailSenderId = InboxDetailSenderId;
                            
                            

                            $scope.discardMessage = function () {
                                $window.location.href = '#/inbox';
                            };
                            
                            $scope.sendMessage = function () {
                                
                                var data = JSON.stringify({
                                authToken: authToken,
                                receiverId: $scope.InboxDetailSenderId,
                                message:$scope.message
                            });
                             $http.post("http://162.243.18.170:9000/v1/messagebox/send", data).success(function (data, status) {


                                
                                $window.location.href = '#/inbox';
                                //alert( "meeting list got" );
                            }).error(function (data, status, headers, config) {
                                alert("Error: " + data.consumerMessage);

                            });
                                
                                
                                
                                
                                
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
                                $window.location.href = '#/group_detail';
                            };

                        }]);
        });
