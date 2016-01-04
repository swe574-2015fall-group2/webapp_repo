define(['controllers/controllers'],
  function(controllers) {
    controllers.controller('NewMeetingCont', ['$window',
      '$scope',
      '$http',
      function(
        $window,
        $scope,
        $http) {

        $(document).ready(function() {

          $('#datePicker').datepick({
            dateFormat: 'yyyy-mm-dd'
          });

          $('#textarea')
            .textext({
              plugins: 'tags autocomplete'
            })
            .bind('getSuggestions', function(e, data) {
              var list = $scope.getTag(),
                textext = $(e.target).textext()[0],
                query = (data ? data.query : '') || '';

              $(this).trigger(
                'setSuggestions', {
                  result: textext.itemManager().filter(list, query)
                }
              );
            });


          $scope.userList = ["Sinan Can", "Hayrican", "Barış", "Mehmet", "Orkun", "Recep", "Ahmet", "Kerem", "Veli", "George", "Kyle"];

          $("#tags").autocomplete({
            source: $scope.userList,
            messages: {
              noResults: '',
              results: function() {}
            }
          });

        });

        $scope.invitelist = [];


        $scope.addToInviteList = function() {
          //alert(")");
          var asss = $('#tags')[0];

          $scope.invitelist.push({
            "name": $scope.inviteText
          });
          //$scope.inviteText ="";

        };

        $scope.isOnlineMeeting = false;
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
        $scope.starthourmin = "";
        $scope.finishhour = "";
        $scope.finishhourmin = "";
        $scope.timezone = "";
        $scope.location = "";

        $scope.contactName = "";
        $scope.contactSurname = "";
        $scope.contactEmail = "";
        $scope.contactPhone = "";

        $scope.contactDetail = "";
        $scope.isPinned = "";


        var pinned;

        /*"contactDetails": {
         "name": "string",
         "surname": "string",
         "email": "string",
         "phoneNumber": "string"
         }*/

        $scope.invitedUserIdList = [];
        $scope.createMeeting = function() {

          if (!isValid()) {
            return;
          }

          if ($scope.isPinned == "Yes") {
            pinned = true;
          } else {
            pinned = false;
          }

          if ($scope.isOnlineMeeting == true)
            $scope.tip = "ONLINE";
          else
            $scope.tip = "FACE_TO_FACE";

          var diziTag = $scope.tags.split(",");

          $scope.contactDetail = {
            name: $scope.contactName,
            surname: $scope.contactSurname,
            email: $scope.contactEmail,
            phoneNumber: $scope.contactPhone
          };

          $scope.invitedUserIdList = [];
          for (var i = 0; i <= $scope.invitedUsers.length - 1; i++) {
            $scope.invitedUserIdList.push($scope.invitedUsers[i].id);
          }


          $scope.tagListTemp = $('#tagListData').val();
          $scope.tagListTemp = $scope.tagListTemp.substr(1, $scope.tagListTemp.length - 2);
          $scope.tagListTemp = $scope.tagListTemp.split(",");

          var tagsListToSend = [];
          if ($('#tagListData').val() != "[]") {

            for (var i = 0; i <= $scope.tagListTemp.length - 1; i++) {
              var clazz = $scope.tagListTemp[i].split(" - ")[1].replace("\"", "");
              var tag = $scope.tagListTemp[i].split(" - ")[0].replace("\"", "");
              var tagObj = {
                tag: tag,
                clazz: clazz
              };
              tagsListToSend.push(tagObj);
            }
          }

          $scope.tagsListToSend = tagsListToSend;


          var data = JSON.stringify({
            authToken: $scope.authToken,
            name: $scope.name,
            datetime: $scope.date,
            timezone: $scope.timezone,
            startHour: $scope.starthour + ":" + $scope.starthourmin,
            endHour: $scope.finishhour + ":" + $scope.finishhourmin,
            agendaSet: $scope.agendaList,
            location: $scope.location,
            description: $scope.description,
            type: $scope.tip,
            groupId: $scope.selectedGroup,
            invitedUserIdList: $scope.invitedUserIdList,
            tagList: $scope.tagsListToSend,
            contactDetails: $scope.contactDetail,
            isPinned: pinned
          });

          $http.post("http://162.243.18.170:9000/v1/meeting/create", data).success(function(data, status) {

            $scope.popUpHeader = "Success";
            $scope.popUpBody = "Meeting is created successfully.";
            $scope.popUpVisible = true;
            $scope.meetingCreated = true;

          }).error(function(data, status, headers, config) {

            $scope.popUpHeader = "Error";
            $scope.popUpBody = data.consumerMessage;
            $scope.popUpVisible = true;

          });
        };

        $scope.yeniTagList = [];
        $scope.selectedTagList = [];
        $scope.yeniTagList2 = [];


        $scope.getTag = function() {

          $scope.ngTag = $('#textarea').val();
          if ($scope.ngTag == "") {
            $scope.ngTag = "a";
          }

          var data = JSON.stringify({
            authToken: $scope.authToken,
            queryString: $scope.ngTag
          });


          $http.post("http://162.243.18.170:9000/v1/semantic/queryLabel", data).success(function(data, status) {

            $scope.myGroupListCount = data.result.dataList.length;

            $scope.yeniTagList = data.result.dataList;

            for (var i = 0; i <= $scope.myGroupListCount - 1; i++) {
              $scope.yeniTagList2.push("" + $scope.yeniTagList[i].label + " - " + $scope.yeniTagList[i].clazz);
            }

          }).error(function(data, status, headers, config) {

          });

          $scope.yeniTagList2 = $scope.eliminateDuplicates($scope.yeniTagList2);

          return $scope.yeniTagList2;

        };


        $scope.eliminateDuplicates = function(arr) {
          var i,
            len = arr.length,
            out = [],
            obj = {};

          for (i = 0; i < len; i++) {
            obj[arr[i]] = 0;
          }
          for (i in obj) {
            out.push(i);
          }
          return out;
        }


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









        $scope.agendaList = [];

        $scope.addAgenda = function() {

          $scope.agendaList.push($scope.ngAgenda);
        };

        function isValid() {
          /*
           $scope.tags = "";
           $scope.invitelis = "";
           */





          /* if ($('#tagListData').val()=="[]")
           {
               $scope.popUpHeader = "Warning";
               $scope.popUpBody = "You have to enter a meeting name.";
               $scope.popUpVisible = true;
               return false;
           }*/

          if (isEmpty($scope.name)) {
            $scope.popUpHeader = "Warning";
            $scope.popUpBody = "You have to enter a meeting name.";
            $scope.popUpVisible = true;
            return false;
          }

          if (isEmpty($scope.description)) {
            $scope.popUpHeader = "Warning";
            $scope.popUpBody = "You have to enter a meeting description.";
            $scope.popUpVisible = true;
            return false;
          }

          $scope.date = $('#datePicker').val();
          if (isEmpty($scope.date)) {
            $scope.popUpHeader = "Warning";
            $scope.popUpBody = "You have to enter a meeting date.";
            $scope.popUpVisible = true;
            return false;
          }

          if (isEmpty($scope.starthour)) {
            $scope.popUpHeader = "Warning";
            $scope.popUpBody = "You have to enter a meeting start hour.";
            $scope.popUpVisible = true;
            return false;
          }

          if (isEmpty($scope.starthourmin)) {
            $scope.popUpHeader = "Warning";
            $scope.popUpBody = "You have to enter a meeting start minute.";
            $scope.popUpVisible = true;
            return false;
          }


          if (isEmpty($scope.finishhour)) {
            $scope.popUpHeader = "Warning";
            $scope.popUpBody = "You have to enter a meeting finish hour.";
            $scope.popUpVisible = true;
            return false;
          }

          if (isEmpty($scope.finishhourmin)) {
            $scope.popUpHeader = "Warning";
            $scope.popUpBody = "You have to enter a meeting finish minute.";
            $scope.popUpVisible = true;
            return false;
          }

          if (isEmpty($scope.timezone)) {
            $scope.popUpHeader = "Warning";
            $scope.popUpBody = "You have to enter a meeting timezone.";
            $scope.popUpVisible = true;
            return false;
          }


          if (isEmpty($scope.location)) {
            $scope.popUpHeader = "Warning";
            $scope.popUpBody = "You have to enter a meeting location.";
            $scope.popUpVisible = true;
            return false;
          }

          if ($scope.invitedUsers == "") {
            $scope.popUpHeader = "Warning";
            $scope.popUpBody = "You have to invite at least a user to your meeting.";
            $scope.popUpVisible = true;
            return false;
          }

          if (isEmpty($scope.contactName)) {
            $scope.popUpHeader = "Warning";
            $scope.popUpBody = "You have to enter a contact name.";
            $scope.popUpVisible = true;
            return false;
          }

          if (isEmpty($scope.contactSurname)) {
            $scope.popUpHeader = "Warning";
            $scope.popUpBody = "You have to enter a contact surname.";
            $scope.popUpVisible = true;
            return false;
          }

          if (isEmpty($scope.contactEmail)) {
            $scope.popUpHeader = "Warning";
            $scope.popUpBody = "You have to enter a contact email address.";
            $scope.popUpVisible = true;
            return false;
          }

          if (!isEmailValid($scope.contactEmail)) {
            $scope.popUpHeader = "Warning";
            $scope.popUpBody = "You have entered an invalid contact email address.";
            $scope.popUpVisible = true;
            return false;
          }

          if (isEmpty($scope.contactPhone)) {
            $scope.popUpHeader = "Warning";
            $scope.popUpBody = "You have to enter a contact phone number.";
            $scope.popUpVisible = true;
            return false;
          }

          return true;
        }


        $scope.popUpHeader = "";
        $scope.popUpBody = "";
        $scope.meetingCreated = false;
        $scope.popUpVisible = false;

        $scope.closePopUp = function() {
          $scope.popUpVisible = false;

          if ($scope.meetingCreated) {
            $window.location.href = "#/my_groups";
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

        function isEmailValid(email) {
          var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(email);
        }


        $scope.userList = [];
        $scope.allUserCount = 0;


        var getAllUserData = JSON.stringify({
          authToken: authToken,
          queryString: ""
        });

        $http.post("http://162.243.18.170:9000/v1/user/query", getAllUserData).success(function(data, status) {

          $scope.userList = data.result.userList;
          $scope.allUserCount = data.result.userList.length;
        }).error(function(data, status, headers, config) {

        });


        $scope.array;
        $scope.invitedUsers = [];

        $scope.addInvitedUser = function() {

          var x = $scope.ngUser;
          x = x.replace(/[\s]/g, '');
          $scope.array = x.split('|');
          for (var i = 0; i <= $scope.allUserCount - 1; i++) {
            if ($scope.userList[i].username == $scope.array[$scope.array.length - 1]) {

              $scope.invitedUsers.push({
                firstname: $scope.userList[i].firstname,
                lastname: $scope.userList[i].lastname,
                id: $scope.userList[i].id,
                username: $scope.userList[i].username
              });
              $scope.ngUser = "";
              break;
            }
          }
        };

        $scope.inviteAllUsers = function() {

          $scope.invitedUsers = [];

          for (var i = 0; i <= $scope.allUserCount - 1; i++) {

            $scope.invitedUsers.push({
              firstname: $scope.userList[i].firstname,
              lastname: $scope.userList[i].lastname,
              id: $scope.userList[i].id,
              username: $scope.userList[i].username
            });
          }

        };






      }
    ]);
  });
