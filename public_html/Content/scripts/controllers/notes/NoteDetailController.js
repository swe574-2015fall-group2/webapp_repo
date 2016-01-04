define(['controllers/controllers'],
  function(controllers) {
    controllers.controller('NoteDetailContr', ['$window',
      '$scope',
      '$http',
      function(
        $window,
        $scope,
        $http) {



        //alert("");
        var Cerez = document.cookie;

        var Duzenli = new RegExp("authToken=([^;=]+)[;\\b]?");
        var Sonuclar = Duzenli.exec(Cerez);
        //alert( unescape(Sonuclar[1]) );
        var authToken = unescape(Sonuclar[1]);

        /*var Duzenli2 = new RegExp("selectedNoteName=([^;=]+)[;\\b]?");
        var Sonuclar2 = Duzenli2.exec(Cerez);
        //alert( unescape(Sonuclar[1]) );
        var selectedNoteName = unescape(Sonuclar2[1]);*/

        var Duzenli3 = new RegExp("selectedNoteTitle=([^;=]+)[;\\b]?");
        var Sonuclar3 = Duzenli3.exec(Cerez);
        //alert( unescape(Sonuclar[1]) );
        var selectedNoteTitle = unescape(Sonuclar3[1]);


        var Duzenli5 = new RegExp("selectedNote=([^;=]+)[;\\b]?");
        var Sonuclar5 = Duzenli5.exec(Cerez);
        //alert( unescape(Sonuclar5[1]) );
        var selectedNote = unescape(Sonuclar5[1]);

        //alert(selectedGroup);

        /*$scope.selectedNoteName = selectedNoteName;*/
        $scope.selectedNoteTitle = selectedNoteTitle;
        $scope.selectedNote = selectedNote;


        //get the note detail
        var data = JSON.stringify({
          authToken: authToken,
          id: selectedNote
        });
        $http.post("http://162.243.18.170:9000/v1/note/query", data).success(function(data, status) {
          $scope.tagsList = data.result.tagList;
          $scope.title = data.result.title;
          $scope.text = data.result.text;

          //alert( "meeting list got" );
        }).error(function(data, status, headers, config) {
          //alert("Error: " + data.consumerMessage);

        });

        //get the resource
        var data = JSON.stringify({
            authToken: authToken,
            noteId: selectedNote
        });
        $http.post("http://162.243.18.170:9000/v1/resource/queryResourcesByGroup", data).success(function (data, status) {
            $scope.resourceList = data.result;

            for(var i = 0; i< $scope.resourceList.length; i++){

                if($scope.resourceList[i].type == "INTERNAL"){
                    $scope.resourceList[i].imgLink = "assets/img/file_types/file.png";
                  }

                  if($scope.resourceList[i].type == "EXTERNAL"){
                    $scope.resourceList[i].imgLink = "assets/img/file_types/icon256.png";
                  }

            }


            /*if (data.result.length > 5) {
                $scope.resourceListCount = data.result.length - 5;
                $scope.showAllResourcesButton = true;
            }*/

        }).error(function (data, status, headers, config) {
            alert("Error: " + data.consumerMessage);

        });

        //download resource
        $scope.downloadResource = function (id, type, link) {

          if(type=="INTERNAL")
          window.open("http://162.243.18.170:9000/v1/resource/downloadResource?resourceId="+ id +"&authToken=b1167600-b282-11e5-b8df-04019494e201", '_blank');
          else if (type=="EXTERNAL")
            window.open(link, '_blank')

        };



        $scope.toMeetingDetail = function(id, desc, loc) {
          document.cookie = "selectedMeeting" + "=" + id;
          document.cookie = "selectedMeetingDesc" + "=" + desc;
          document.cookie = "selectedMeetingLoc" + "=" + loc;
          $window.location.href = '#/meeting_detail';
        };

        $scope.toDiscussionDetail = function(id, name, desc) {
          document.cookie = "selectedDiscussion" + "=" + id;
          document.cookie = "selectedDiscussionDesc" + "=" + desc;
          document.cookie = "selectedDiscussionName" + "=" + name;
          $window.location.href = '#/discussion_detail';
        };

        $scope.toNoteDetail = function(id, title) {
          document.cookie = "selectedNote" + "=" + id;
          document.cookie = "selectedDiscussionDesc" + "=" + title;
          $window.location.href = '#/note_detail';
        };

      }
    ]);
  });
