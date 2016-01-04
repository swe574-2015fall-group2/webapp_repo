define(['controllers/controllers'],
        function (controllers) {
            controllers.controller('SearchContr',
                    ['$window',
                        '$scope',
                        '$http',
                        function (
                                $window,
                                $scope,
                                $http) {

                            //alert("welcome to latest groups")

                            //alert(" all groups");
                            var Cerez = document.cookie;

                            var Duzenli = new RegExp("authToken=([^;=]+)[;\\b]?");
                            var Sonuclar = Duzenli.exec(Cerez);
                            //alert( unescape(Sonuclar[1]) );	
                            var authToken = unescape(Sonuclar[1]);

                            var Duzenli2 = new RegExp("searchQuery=([^;=]+)[;\\b]?");
                            var Sonuclar2 = Duzenli2.exec(Cerez);
                            //alert( unescape(Sonuclar[1]) );	
                            var searchQuery = unescape(Sonuclar2[1]);
                            //alert(searchQuery);
                            $scope.searchQuery = searchQuery;
                            $scope.authToken = authToken;
                            $scope.groupList = "";
                            $scope.searchedClass = "";
                            var searchData;





                            var data2 = JSON.stringify({
                                authToken: $scope.authToken,
                                queryString: searchQuery
                            });

                            $http.post("http://162.243.18.170:9000/v1/semantic/querySearchString", data2).success(function (data, status) {

                                $scope.yeniTagList = data.result.dataList;

                                $scope.searchedClass = "";
                                for (var i = 0; i <= data.result.dataList.length - 1; i++) {
                                    if (data.result.dataList[i].label == searchQuery)
                                    {
                                        $scope.searchedClass = data.result.dataList[i].clazz;
                                        break;
                                    }
                                }

                                if ($scope.searchedClass == "")
                                {
                                    searchData = JSON.stringify({
                                        authToken: $scope.authToken,
                                        tagData: {tag: searchQuery}
                                    });
                                } else
                                {
                                    searchData = JSON.stringify({
                                        authToken: $scope.authToken,
                                        tagData: {tag: searchQuery, clazz: $scope.searchedClass}
                                    });
                                }


                                search(searchData);

                            }).error(function (data, status, headers, config) {

                                searchData = JSON.stringify({
                                    authToken: $scope.authToken,
                                    tagData: {tag: searchQuery, clazz: ""}
                                });

                                search(searchData);

                            });




                            function search(searchData)
                            {

                                $http.post("http://162.243.18.170:9000/v1/semantic/search", searchData).success(function (data, status) {
                                    $scope.dataList = data.result.resultList;
                                    createLists();

                                }).error(function (data, status, headers, config) {
                                    alert("Error: " + data.consumerMessage);

                                });

                            }
                            ;



                            $scope.discussionList = [];
                            $scope.groupList = [];
                            $scope.meetingList = [];
                            $scope.noteList = [];
                            $scope.resourceList = [];

                            function createLists()
                            {
                                $scope.discussionList = [];
                                $scope.groupList = [];
                                $scope.meetingList = [];
                                $scope.noteList = [];
                                $scope.resourceList = [];

                                for (var i = 0; i <= $scope.dataList.length - 1; i++) {

                                    if ($scope.dataList[i].type == "DISCUSSION")
                                    {
                                        $scope.discussionList.push($scope.dataList[i]);
                                    } else
                                    if ($scope.dataList[i].type == "GROUP")
                                    {
                                        $scope.groupList.push($scope.dataList[i]);
                                    } else
                                    if ($scope.dataList[i].type == "MEETING")
                                    {
                                        $scope.meetingList.push($scope.dataList[i]);
                                    } else
                                    if ($scope.dataList[i].type == "NOTE")
                                    {
                                        $scope.noteList.push($scope.dataList[i]);
                                    } else
                                    if ($scope.dataList[i].type == "RESOURCE")
                                    {
                                        $scope.resourceList.push($scope.dataList[i]);
                                    }
                                }

                                var abs = 0;

                            }



                            $scope.toGroupDetail = function (index) {
                                document.cookie = "selectedGroup" + "=" + index;
                                document.cookie = "selectedGroupName" + "=" + "empty";
                                document.cookie = "selectedGroupDesc" + "=" + "empty";
                                document.cookie = "selectedGroupJoined" + "=" + "empty";
                                $window.location.href = '#/group_detail';
                            };

                            $scope.toMeetingDetail = function (id) {

                                document.cookie = "selectedMeeting" + "=" + id;
                                document.cookie = "selectedMeetingDesc" + "=" + "empty";
                                document.cookie = "selectedMeetingLoc" + "=" + "empty";
                                $window.location.href = '#/meeting_detail';

                            };

                            $scope.toDiscussionDetail = function (id) {
                                document.cookie = "selectedDiscussion" + "=" + id;
                                document.cookie = "selectedDiscussionDesc" + "=" + "empty";
                                document.cookie = "selectedDiscussionName" + "=" + "empty";
                                $window.location.href = '#/discussion_detail';
                            };

                            $scope.toNoteDetail = function (id) {
                                document.cookie = "selectedNote" + "=" + id;
                                document.cookie = "selectedNoteTitle" + "=" + "empty";
                                $window.location.href = '#/note_detail';
                            };














                            /*$http.post("http://162.243.18.170:9000/v1/semantic/querySearchString", data).success(function (data, status) {
                             
                             //alert( "There are your groups" );	
                             $scope.dataList = data.result.dataList;
                             
                             }).error(function (data, status, headers, config) {
                             alert("Error: " + data.consumerMessage);
                             
                             });*/





                            /*
                             $http.post("http://162.243.18.170:9000/v1/group/listAll", data).success(function(data, status) {
                             
                             // alert( "There are your groups" );	
                             $scope.groupList=data.result.groupList.slice(0,3);
                             $scope.groupListCount = data.result.groupList.length-3;
                             var b = "a";
                             
                             }).error(function (data, status, headers, config) {
                             alert("Error: " + data.consumerMessage);
                             
                             });
                             
                             
                             $scope.myGroupList="";
                             $http.post("http://162.243.18.170:9000/v1/group/listMyGroups", data).success(function(data, status) {
                             
                             // alert( "There are your groups" );	
                             $scope.myGroupList=data.result.groupList.slice(0,3);
                             var b = "a";
                             
                             }).error(function (data, status, headers, config) {
                             alert("Error: " + data.consumerMessage);
                             
                             });
                             
                             $scope.toGroupDetail = function (index,name, desc, join) {
                             document.cookie = "selectedGroup" + "=" + index;
                             document.cookie = "selectedGroupName" + "=" + name;
                             document.cookie = "selectedGroupDesc" + "=" + desc;
                             document.cookie = "selectedGroupJoined" + "=" + join;
                             alert(join);
                             $window.location.href = '#/group_detail';
                             };
                             */

                        }]);
        });
