define(['controllers/controllers'],
        function (controllers) {
            controllers.controller('UpdateNoteContr',
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
                            var groupName = new RegExp("selectedGroupName=([^;=]+)[;\\b]?");



                            var Sonuclar = Duzenli.exec(Cerez);
                            var goupSonuc = group.exec(Cerez);
                            var groupNameResult = groupName.exec(Cerez);

                            var authToken = unescape(Sonuclar[1]);
                            var selectedGroup = unescape(goupSonuc[1]);
                            var selectedGroupName = unescape(groupNameResult[1]);

                            $scope.authToken = authToken;
                            $scope.selectedGroup = selectedGroup;
                            $scope.selectedGroupName = selectedGroupName;

                            var DuzenliM4 = new RegExp("selectedMeeting=([^;=]+)[;\\b]?");
                            var Sonuclar4 = DuzenliM4.exec(Cerez);
                            var selectedMeeting = unescape(Sonuclar4[1]);
                            $scope.selectedMeeting = selectedMeeting;


                            var Duzenli5 = new RegExp("selectedNote=([^;=]+)[;\\b]?");
                            var Sonuclar5 = Duzenli5.exec(Cerez);
                            var selectedNote = unescape(Sonuclar5[1]);
                            $scope.selectedNote = selectedNote;



                            // NEW TAG SYSYTEM START
                            $scope.queryTags = [];
                            $scope.selectedQueryTags = [];
                            $scope.tagsListToSend = [];

                            $scope.searchTagChanged = function() {
                              var data = JSON.stringify({
                                authToken: $scope.authToken,
                                queryString: $scope.searcTag
                              });
                              $http.post("http://162.243.18.170:9000/v1/semantic/queryLabel", data).success(function(data, status) {

                                $scope.tagListCount = data.result.dataList.length;
                                $scope.yeniTagList = data.result.dataList;
                                $scope.queryTags = data.result.dataList;
                                //  for (var i = 0; i <= $scope.tagListCount - 1; i++) {
                                //    $scope.yeniTagList.push("" + $scope.yeniTagList[i].label + " - " + $scope.yeniTagList[i].clazz);
                                //  }

                              }).error(function(data, status, headers, config) {

                              });
                            }

                            $scope.addTag = function(item) {
                              $scope.reDesignedSelectedTagList.push(item);
                              $scope.updateTagsList();
                            }
                            $scope.removeTag = function(item) {
                              var index = $scope.reDesignedSelectedTagList.indexOf(item);
                              $scope.reDesignedSelectedTagList.splice(index, 1);
                              $scope.updateTagsList();
                            }

                            $scope.updateTagsList = function(item) {
                              $scope.tagsListToSend= [];
                              for (var i = 0; i <= $scope.reDesignedSelectedTagList.length; i++) {
                                $scope.tagsListToSend.push({
                                  tag: $scope.reDesignedSelectedTagList[i].label,
                                  clazz: $scope.reDesignedSelectedTagList[i].clazz
                                });
                              }
                            }

                            // NEW TAG SYSYTEM FINISH


                            var data = JSON.stringify({
                                authToken: $scope.authToken,
                                id: $scope.selectedNote
                            });


                            $http.post("http://162.243.18.170:9000/v1/note/query", data).success(function (data, status) {

                                 $scope.name=data.result.title;
                                 $scope.description=data.result.text;
                                 $scope.selectedTagList=data.result.tagList;


                                           $scope.reDesignedSelectedTagList = [];
                                           for (var i = 0; i < $scope.selectedTagList.length; i++) {
                                             $scope.reDesignedSelectedTagList.push({
                                               label: $scope.selectedTagList[i].tag,
                                               clazz: $scope.selectedTagList[i].clazz
                                             });
                                           }


                            }).error(function (data, status, headers, config) {
                                alert("Error: " + data.consumerMessage);

                            });


                            $scope.updateNote = function () {

                                var data = JSON.stringify({
                                    authToken: $scope.authToken,
                                    id: $scope.selectedNote,
                                    title: $scope.name,
                                    text: $scope.description,
                                    groupId: $scope.selectedGroup,
                                    meetingId: $scope.selectedMeeting,
                                    tagList:$scope.tagsListToSend,
                                    resourceIds: [""]
                                });



                                $http.post("http://162.243.18.170:9000/v1/note/update", data).success(function (data, status) {

                                    alert("Note is updated successfully!");
                                      $window.location.href = "#/note_detail";
                                }).error(function (data, status, headers, config) {
                                    alert("Error: " + data.consumerMessage);

                                });

                            };


                        }]);
        });
