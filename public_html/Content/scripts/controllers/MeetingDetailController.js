define(['controllers/controllers'],
    function (controllers) {
        controllers.controller('MeetingDetailContr',
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
        
        var Duzenli2 = new RegExp("selectedMeetingLoc=([^;=]+)[;\\b]?");
                    var Sonuclar2 = Duzenli2.exec(Cerez);
                    //alert( unescape(Sonuclar[1]) );	
        var selectedMeetingLoc = unescape(Sonuclar2[1]);
        
        var Duzenli3 = new RegExp("selectedMeetingDesc=([^;=]+)[;\\b]?");
                    var Sonuclar3 = Duzenli3.exec(Cerez);
                    //alert( unescape(Sonuclar[1]) );	
        var selectedMeetingDesc = unescape(Sonuclar3[1]);
        
        var Duzenli4 = new RegExp("selectedMeeting=([^;=]+)[;\\b]?");
                    var Sonuclar4 = Duzenli4.exec(Cerez);
                    //alert( unescape(Sonuclar[1]) );	
        var selectedMeeting = unescape(Sonuclar4[1]);
        
        //alert(selectedGroup);
        
        $scope.selectedMeetingLoc=selectedMeetingLoc;
        $scope.selectedMeetingDesc=selectedMeetingDesc;
        $scope.selectedMeeting=selectedMeeting;
        
        //get the meetings
       var data = JSON.stringify({
                        authToken: authToken,
                        id: selectedMeeting
                    });
        $http.post("http://162.243.215.160:9000/v1/meeting/get", data).success(function(data, status) {
                    
                    $scope.meetingName=data.result.meeting.name;
                    $scope.meetingDescription=data.result.meeting.description;
                    $scope.agendaItems = data.result.meeting.agendaSet;
                    $scope.todoItems = data.result.meeting.todoSet;
                    $scope.datetime = data.result.meeting.datetime;
                     $scope.selectedMeetingLoc= data.result.meeting.location;
                    var date = new Date($scope.datetime);
                    // Hours part from the timestamp
                    //alert(date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear());
                    
                   $scope.attandedUsers = getUserDetails(data.result.meeting.attandedUserSet);
                     $scope.invitedUsers = getUserDetails(data.result.meeting.invitedUserSet);
                    
                    $scope.startHour = data.result.meeting.startHour;
                    $scope.endHour = data.result.meeting.endHour;
                    
                    $scope.day = date.getDate();
                    
                    $scope.month = date.getMonth()+1;
                    var month = "Jan"
                    switch($scope.month){
                        case 1:
                            month="Jan"
                            break;
                        case 2:
                            month="Feb"
                            break;
                        case 3:
                            month="Mar"
                            break;
                        case 4:
                            month="Apr"
                            break;
                        case 5:
                            month="May"
                            break;
                        case 6:
                            month="Jun"
                            break;
                        case 7:
                            month="Jul"
                            break;
                        case 8:
                            month="Aug"
                            break;
                        case 9:
                            month="Sep"
                            break;
                        case 10:
                            month="Oct"
                            break;
                        case 11:
                            month="Nov"
                            break;    
                        case 12:
                            month="Dec"
                            break;   
                        
                        
                    }
                    $scope.monthYear = month + " "+date.getFullYear();
                    
                    
                  //alert( "meeting list got" );
                }).error(function (data, status, headers, config) {
              //alert("Error: " + data.consumerMessage);
              
            });
            
            function getUserDetails(idList){
                 var resultList = [];
                var com;
                var sayac = 0;
                for (com in idList) { 
            
                //GET USER INFO
                var data = JSON.stringify({
                        authToken: authToken,
                        id: idList[sayac]
                    });
                    
                    
                    $http.post("http://162.243.215.160:9000/v1/user/get", data).success(function(data, status) {
      
                        var tempName =  (data.result.firstname +" "+ data.result.lastname);

                        resultList.push({name:tempName});
                        
                        sayac++;

                        }).error(function (data, status, headers, config) {
                        alert("Error: " + data.consumerMessage);

                 });

             }
             return resultList;
            }
            
            
            
            
    }]);
});
