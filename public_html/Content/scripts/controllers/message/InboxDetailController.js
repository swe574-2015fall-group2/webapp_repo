define(['controllers/controllers'],
        function (controllers) {
            controllers.controller('InboxDetailContr',
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


                            var Duzenli3 = new RegExp("InboxDetailDatetime=([^;=]+)[;\\b]?");
                            var Sonuclar3 = Duzenli3.exec(Cerez);
                            //alert( unescape(Sonuclar[1]) );
                            var InboxDetailDatetime = unescape(Sonuclar3[1]);


                            var Duzenli4 = new RegExp("InboxDetailMessage=([^;=]+)[;\\b]?");
                            var Sonuclar4 = Duzenli4.exec(Cerez);
                            //alert( unescape(Sonuclar[1]) );
                            var InboxDetailMessage = unescape(Sonuclar4[1]);


                            var Duzenli5 = new RegExp("InboxDetailSenderId=([^;=]+)[;\\b]?");
                            var Sonuclar5 = Duzenli5.exec(Cerez);
                            //alert( unescape(Sonuclar[1]) );
                            var InboxDetailSenderId = unescape(Sonuclar5[1]);

                            //alert(selectedGroup);

                            $scope.InboxDetailSenderName = InboxDetailSenderName;
                            $scope.InboxDetailDatetime = InboxDetailDatetime;
                            $scope.InboxDetailMessage = InboxDetailMessage;
                            $scope.InboxDetailSenderId = InboxDetailSenderId;

                            $scope.toReplyMessage = function () {
                                document.cookie = "InboxDetailSenderName" + "=" + $scope.InboxDetailSenderName;
                                document.cookie = "InboxDetailSenderId" + "=" + $scope.InboxDetailSenderId;
                                $window.location.href = '#/new_message';
                            };

                        }]);
        });
