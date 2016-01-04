define(['controllers/controllers'],
  function(controllers) {
    controllers.controller('NewNoteContr', ['$window',
      '$scope',
      '$http',
      function(
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

        var selectedMeetingLoc = "";
        if (Sonuclar2 != null) {
          selectedMeetingLoc = unescape(Sonuclar2[1]);
        }

        var DuzenliM3 = new RegExp("selectedMeetingDesc=([^;=]+)[;\\b]?");
        var Sonuclar3 = DuzenliM3.exec(Cerez);
        //alert( unescape(Sonuclar[1]) );
        var selectedMeetingDesc = "";

        if (Sonuclar3 != null) {
          selectedMeetingDesc = unescape(Sonuclar3[1]);
        }

        var DuzenliM4 = new RegExp("selectedMeeting=([^;=]+)[;\\b]?");
        var Sonuclar4 = DuzenliM4.exec(Cerez);
        //alert( unescape(Sonuclar[1]) );
        var selectedMeeting = "";
        if (Sonuclar4 != null) {
          selectedMeeting = unescape(Sonuclar4[1]);
        }

        //alert(selectedGroup);

        //alert("03");
        $scope.selectedMeetingLoc = selectedMeetingLoc;
        $scope.selectedMeetingDesc = selectedMeetingDesc;
        $scope.selectedMeeting = selectedMeeting;


        //  $scope.meetingList = [];
        //  $scope.meetingList.push({name: selectedMeetingDesc, description: selectedMeetingLoc, type: "ssss", datetime: "22-07:2015"});


        //get meetings of the group
        var data = JSON.stringify({
          authToken: $scope.authToken,
          id: $scope.selectedGroup,
        });

        //get the meetings of the groups for related meetings
        $scope.meetingList = []; // meeting list that comes from the service
        $scope.selectedMeetingList = []; // meetings that user has selected
        $scope.selectedMeetingListtoService = []; //meetings that record id to send to service on save

        $http.post("http://162.243.18.170:9000/v1/meeting/queryByGroup", data).success(function(data, status) {

          for (var i = 0; i < data.result.meetingList.length; i++) {

            var date = new Date(data.result.meetingList[i].datetime);
            $scope.day = date.getDate();
            var month = date.getMonth() + 1;

            switch (month) {
              case 1:
                month = "Jan"
                break;
              case 2:
                month = "Feb"
                break;
              case 3:
                month = "Mar"
                break;
              case 4:
                month = "Apr"
                break;
              case 5:
                month = "May"
                break;
              case 6:
                month = "Jun"
                break;
              case 7:
                month = "Jul"
                break;
              case 8:
                month = "Aug"
                break;
              case 9:
                month = "Sep"
                break;
              case 10:
                month = "Oct"
                break;
              case 11:
                month = "Nov"
                break;
              case 12:
                month = "Dec"
                break;
            }
            $scope.monthYear = month + " " + date.getFullYear();


            var tempMeeting = {
              id: data.result.meetingList[i].id,
              value: data.result.meetingList[i].description,
              label: data.result.meetingList[i].name,
              location: data.result.meetingList[i].location,
              startHour: data.result.meetingList[i].startHour,
              endHour: data.result.meetingList[i].endHour,
              day: $scope.day,
              monthYear: $scope.monthYear
            };

            $scope.meetingList.push(tempMeeting);
            $scope.selectedMeetingListtoService.push(data.result.meetingList[i].id);
          }


          $scope.fillAutocompleteMeeting();
          /*


           */
        }).error(function(data, status, headers, config) {

        });

        $scope.fillAutocompleteMeeting = function() {

          $("#meetings").autocomplete({
            source: $scope.meetingList,
            minLength: 1,
            messages: {
              noResults: '',
              results: function() {}
            },
            select: function(event, ui) {
              $scope.selectedMeetingList = [];
              var tempMeeting = {
                id: ui.item.id,
                value: ui.item.value,
                label: ui.item.label,
                location: ui.item.location,
                startHour: ui.item.startHour,
                endHour: ui.item.endHour,
                day: ui.item.day,
                monthYear: ui.item.monthYear
              };
              $scope.selectedMeetingList.push(tempMeeting);
              $scope.$apply(function() {});

              $scope.inviteText = "";
              $('#meetings').val('');
              $('#meetings').html('');

              // feed hidden id field
              $("#field_id").val(ui.item.id);
              // update number of returned rows
              $('#results_count').html('');
            },
            open: function(event, ui) {
              // update number of returned rows
              var len = $('.ui-autocomplete > li').length;
              $('#results_count').html('(#' + len + ')');
            },
            close: function(event, ui) {
              // update number of returned rows
              $('#results_count').html('');

              $scope.inviteText = "";
              $('#meetings').val('');
              $('#meetings').html('');
            },
            // mustMatch implementation
            change: function(event, ui) {

              if (ui.item === null) {
                $(this).val('');
                $('#field_id').val('');
              }
            }
          });

          // mustMatch (no value) implementation
          $("#field").focusout(function() {
            if ($("#field").val() === '') {
              $('#field_id').val('');
            }
          });




        };

        $scope.removeMeeting = function(item) {
          var index = $scope.selectedMeetingList.indexOf(item);
          $scope.selectedMeetingList.splice(index, 1);
        }



        //get resources of the group
        var data = JSON.stringify({
          authToken: $scope.authToken,
          groupId: $scope.selectedGroup,
        });

        //get the resources for related resources
        $scope.resourceList = []; // meeting list that comes from the service
        $scope.selectedResourceList = []; // meetings that user has selected
        //$scope.selectedMeetingListtoService = [];  //meetings that record id to send to service on save

        $http.post("http://162.243.18.170:9000/v1/resource/queryResourcesByGroup", data).success(function(data, status) {

          //  $scope.resourceList = data.result;

          for (var i = 0; i < data.result.length; i++) {

            var tempResource = {
              id: data.result[i].id,
              value: data.result[i].description,
              label: data.result[i].description
            };

            $scope.resourceList.push(tempResource);

          }

          $scope.fillAutocompleteResource();

        }).error(function(data, status, headers, config) {

        });

        $scope.fillAutocompleteResource = function() {

          $("#resources").autocomplete({
            source: $scope.resourceList,
            minLength: 1,
            messages: {
              noResults: '',
              results: function() {}
            },
            select: function(event, ui) {
              var tempResource = {
                id: ui.item.id,
                value: ui.item.value,
                label: ui.item.label
              };

              $scope.selectedResourceList.push(tempResource);
              $scope.$apply(function() {});

              $scope.resourceText = "";
              $('#resources').val('');
              $('#resources').html('');

              // feed hidden id field
              $("#field_id").val(ui.item.id);
              // update number of returned rows
              $('#results_count').html('');
            },
            open: function(event, ui) {
              // update number of returned rows
              var len = $('.ui-autocomplete > li').length;
              $('#results_count').html('(#' + len + ')');
            },
            close: function(event, ui) {
              // update number of returned rows
              $('#results_count').html('');

              $scope.resourceText = "";
              $('#resources').val('');
              $('#resources').html('');
            },
            // mustMatch implementation
            change: function(event, ui) {

              if (ui.item === null) {
                $(this).val('');
                $('#field_id').val('');
              }
            }
          });

          // mustMatch (no value) implementation
          $("#field").focusout(function() {
            if ($("#field").val() === '') {
              $('#field_id').val('');
            }
          });




        };

        $scope.removeResource = function(item) {
          var index = $scope.selectedResourceList.indexOf(item);
          $scope.selectedResourceList.splice(index, 1);
        }


        $scope.sendPost = function() {

          $scope.meetingList.push({
            name: "sdsd",
            description: "sdsd22222",
            type: "ssss",
            datetime: "22-07:2015"
          });

        };



        $scope.createNote = function() {


          $scope.meetingListToSend = [];
          for (var i = 0; i < $scope.selectedMeetingList.length; i++) {
            $scope.meetingListToSend.push($scope.selectedMeetingList[i].id);

          }

          $scope.resourceListToSend = [];
          for (var i = 0; i < $scope.selectedResourceList.length; i++) {
            $scope.resourceListToSend.push($scope.selectedResourceList[i].id);

          }

          var data = JSON.stringify({
            authToken: $scope.authToken,
            title: $scope.name,
            text: $scope.description,
            groupId: $scope.selectedGroup,
            meetingId: $scope.meetingListToSend[0],
            tagList: $scope.selectedTagList,
            resourceIds:$scope.resourceListToSend
          });

          $http.post("http://162.243.18.170:9000/v1/note/create", data).success(function(data, status) {

            alert("Note is created successfully!");
            $window.location.href = "#/my_groups";
          }).error(function(data, status, headers, config) {
            alert("Error: " + data.consumerMessage);

          });

        };


        $scope.cancel = function() {
          $scope.name = "";
          $scope.description = "";
          $scope.selectedGroup = "";
          $scope.selectedMeeting = "";
          $scope.tags = "";
        };


        $scope.yeniTagList = [];
        $scope.selectedTagList = [];


        $scope.getTag = function() {

          var data = JSON.stringify({
            authToken: $scope.authToken,
            queryString: $scope.ngTag
          });


          $http.post("http://162.243.18.170:9000/v1/semantic/queryLabel", data).success(function(data, status) {

            $scope.myGroupListCount = data.result.dataList.length;

            $scope.yeniTagList = data.result.dataList;

            for (var i = 0; i <= $scope.myGroupListCount - 1; i++) {
              if ($scope.yeniTagList[i].label == $scope.inputTag) {
                $scope.selectedTagList.push($scope.yeniTagList[i].label, $scope.yeniTagList[i].clazz);
              }
            }

          }).error(function(data, status, headers, config) {
            // alert("Error: " + data.consumerMessage);

          });
        };


        $scope.setTag = function() {

          var index = 0;
          for (var i = 0; i <= $scope.myGroupListCount - 1; i++) {
            if ($scope.yeniTagList[i].label == $scope.ngTag) {
              index = 1;
              $scope.selectedTagList.push({
                tag: $scope.yeniTagList[i].label,
                clazz: $scope.yeniTagList[i].clazz
              });
              break;
            }
          }

          if (index == 0) {
            $scope.selectedTagList.push({
              tag: $scope.ngTag.toString(),
              clazz: ""
            });
          }


        };









      }
    ]);
  });
