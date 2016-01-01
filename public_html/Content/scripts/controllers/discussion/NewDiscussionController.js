define(['controllers/controllers'],
  function(controllers) {
    controllers.controller('NewDiscussionCont', ['$window',
      '$scope',
      '$http',
      function(
        $window,
        $scope,
        $http) {



        $(document).ready(function() {


        });




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
        $scope.tagList = [];

        //get meetings of the group
        var data = JSON.stringify({
          authToken: $scope.authToken,
          id: $scope.selectedGroup,
        });

        $scope.meetingList = []; // meeting list that comes from the service
        $scope.selectedMeetingList = []; // meetings that user has selected
        $scope.selectedMeetingListtoService = [];  //meetings that record id to send to service on save

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


          //alert("here are the meetings" + $scope.meetingList[0].name);

          $scope.fillAutocomplete();
          /*


          */
        }).error(function(data, status, headers, config) {
          //alert("Error: " + data.consumerMessage);

        });

        $scope.fillAutocomplete = function() {

          $("#meetings").autocomplete({
            source: $scope.meetingList,
            minLength: 1,
            messages: {
              noResults: '',
              results: function() {}
            },
            select: function(event, ui) {
              //alert(ui.item.value);
              var tempMeeting = {
                id: ui.item.id,
                value: ui.item.value,
                label: ui.item.label,
                location: ui.item.location,
                startHour: ui.item.startHour,
                endHour: ui.item.endHour,
                day: ui.item.day,
                monthYear : ui.item.monthYear
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

          /*
            alert("autocopm")
          $scope.userList = ["Sinan Can", "Hayrican", "Barış", "Mehmet", "Orkun", "Recep", "Ahmet", "Kerem", "Veli", "George", "Kyle"];

          $("#meetings").autocomplete({
            source:   $scope.meetingList,
            messages: {
              noResults: '',
              results: function() {}
            }
          });*/



        };

        $scope.removeMeeting = function(item) {
          var index = $scope.selectedMeetingList.indexOf(item);
          $scope.selectedMeetingList.splice(index, 1);
        }


        $scope.sendPost = function() {

          var tagList = $scope.tags.split(',');
          $scope.tagList = tagList;

          if ($scope.meetingtype == true)
            $scope.tip = "ONLINE";
          else
            $scope.tip = "FACE_TO_FACE";

          var data = JSON.stringify({
            authToken: $scope.authToken,
            groupId: $scope.selectedGroup,
            name: $scope.name,
            description: $scope.description,
            tagList: $scope.selectedTagList,
            meetingIdList:$scope.selectedMeetingListtoService
          });

          $http.post("http://162.243.18.170:9000/v1/discussion/create", data).success(function(data, status) {

            alert("Discussion is created successfully!");
            $window.location.href = "#/group_detail";
          }).error(function(data, status, headers, config) {
            alert("Error: " + data.consumerMessage);

          });
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
