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
        
        
    }]);
});
