define(['controllers/controllers'],
  function(controllers) {
    controllers.controller('UpdateDiscussionCont', ['$window',
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
        var Sonuclar2 = Duzenli2.exec(Cerez);
        //alert( unescape(Sonuclar[1]) );
        var selectedGroupName = unescape(Sonuclar2[1]);
        var Duzenli4 = new RegExp("selectedDiscussion=([^;=]+)[;\\b]?");
        var Sonuclar4 = Duzenli4.exec(Cerez);
        //alert( unescape(Sonuclar[1]) );
        var selectedDiscussion = unescape(Sonuclar4[1]);
        $scope.selectedDiscussion = selectedDiscussion;
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
        var data = JSON.stringify({
          authToken: $scope.authToken,
          id: $scope.selectedDiscussion
        });

        $scope.meetingList = []; // meeting list that comes from the service
        $scope.selectedMeetingList = []; // meetings that user has selected
        $scope.selectedMeetingListtoService = []; //meetings that record id to send to service on save


        $http.post("http://162.243.18.170:9000/v1/discussion/query", data).success(function(data, status) {

          $scope.name = data.result.name;
          $scope.description = data.result.description;
          $scope.selectedTagList = data.result.tagList;


                    $scope.reDesignedSelectedTagList = [];
                    for (var i = 0; i < $scope.selectedTagList.length; i++) {
                      $scope.reDesignedSelectedTagList.push({
                        label: $scope.selectedTagList[i].tag,
                        clazz: $scope.selectedTagList[i].clazz
                      });
                    }



          $scope.meetingIdList = data.result.meetingIdList;

          //gets meetingIdList details
          $scope.fillSelectedMeetingList();

        }).error(function(data, status, headers, config) {
          alert("Error: " + data.consumerMessage);
        });

        //get meetings of the group
        var data = JSON.stringify({
          authToken: $scope.authToken,
          id: $scope.selectedGroup,
        });

        $scope.fillSelectedMeetingList = function() {
          for (var i = 0; i < $scope.meetingIdList.length; i++) {

            var data = JSON.stringify({
              authToken: $scope.authToken,
              id: $scope.meetingIdList[i]
            });

            $http.post("http://162.243.18.170:9000/v1/meeting/get", data).success(function(data, status) {


              var date = new Date(data.result.meeting.datetime);
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
                id: data.result.meeting.id,
                value: data.result.meeting.description,
                label: data.result.meeting.name,
                location: data.result.meeting.location,
                startHour: data.result.meeting.startHour,
                endHour: data.result.meeting.endHour,
                day: $scope.day,
                monthYear: $scope.monthYear
              };

              $scope.selectedMeetingList.push(tempMeeting);

            }).error(function(data, status, headers, config) {});



          }


        }


        //Get related resourceList
        var data = JSON.stringify({
            authToken: authToken,
            discussionId: $scope.selectedDiscussion
        });

        //get the resources for related resources
        //$scope.resourceList = []; // meeting list that comes from the service
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

            $scope.selectedResourceList.push(tempResource);

          }
          //$scope.fillAutocompleteResource();

        }).error(function(data, status, headers, config) {

        });

        //get meetings of the group
        var data = JSON.stringify({
            authToken: authToken,
            id: selectedGroup,
        });


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


          $scope.fillAutocomplete();
          /*


           */
        }).error(function(data, status, headers, config) {

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

        //Get resourceList
        var data = JSON.stringify({
            authToken: authToken,
            groupId: $scope.selectedGroup
        });

        //get the resources for related resources
        $scope.resourceList = []; // meeting list that comes from the service
        //$scope.selectedResourceList = []; // meetings that user has selected
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





        $scope.updateDiscussion = function() {

          if (isEmpty($scope.name)) {
            $scope.popUpHeader = "Warning";
            $scope.popUpBody = "You have to enter a discussion name.";
            $scope.popUpVisible = true;
            return;
          }

          if (isEmpty($scope.description)) {
            $scope.popUpHeader = "Warning";
            $scope.popUpBody = "You have to enter a description.";
            $scope.popUpVisible = true;
            return;
          }

          $scope.meetingListToSend = [];
          for (var i = 0; i < $scope.selectedMeetingList.length; i++) {
            $scope.meetingListToSend.push($scope.selectedMeetingList[i].id);

          }

          $scope.resourceListToSend = [];
          for(var i = 0 ;i < $scope.selectedResourceList.length ; i++){
            $scope.resourceListToSend.push($scope.selectedResourceList[i].id);

          }

          var data = JSON.stringify({
            authToken: $scope.authToken,
            groupId: $scope.selectedGroup,
            name: $scope.name,
            description: $scope.description,
            tagList: $scope.tagsListToSend,
            discussionId: $scope.selectedDiscussion,
            meetingIdList: $scope.meetingListToSend,
            resourceIdList:  $scope.resourceListToSend
          });
          $http.post("http://162.243.18.170:9000/v1/discussion/update", data).success(function(data, status) {

            $scope.popUpHeader = "Success";
            $scope.popUpBody = "Discussion is updated successfully.";
            $scope.discussionUpdated = true;
            $scope.popUpVisible = true;

          }).error(function(data, status, headers, config) {

            $scope.popUpHeader = "Error";
            $scope.popUpBody = data.consumerMessage;
            $scope.popUpVisible = true;

          });
        };

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


        $scope.yeniTagList = [];
        $scope.selectedTagList = [];

        /*$scope.getTag = function() {

          var data = JSON.stringify({
            authToken: $scope.authToken,
            queryString: $scope.ngTag
          });
          $http.post("http://162.243.18.170:9000/v1/semantic/queryLabel", data).success(function(data, status) {

            $scope.myGroupListCount = data.result.dataList.length;
            $scope.yeniTagList = data.result.dataList;


          }).error(function(data, status, headers, config) {
            // alert("Error: " + data.consumerMessage);

          });
        };*/


        /*$scope.setTag = function() {

          var index = 0;
          for (var i = 0; i <= $scope.selectedTagList - 1; i++) {
            if ($scope.yeniTagList[i].label == $scope.ngTag) {
              index = 1;
              $scope.selectedQueryTags.push({
                label: $scope.yeniTagList[i].label,
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


        };*/

        $scope.popUpHeader = "";
        $scope.popUpBody = "";
        $scope.discussionUpdated = false;

        $scope.closePopUp = function() {
          $scope.popUpVisible = false;

          if ($scope.discussionUpdated) {
            $window.location.href = "#/discussion_detail";
          }
        };

        function isEmpty(MyVariable) {
          if (
            (MyVariable.length == 0) ||
            (MyVariable == "") ||
            (MyVariable.replace(/\s/g, "") == "") ||
            (!/[^\s]/.test(MyVariable)) ||
            (/^\s*$/.test(MyVariable))
          ) {
            return true;
          } else {
            return false;
          }
        }




      }
    ]);
  });
