define(['controllers/controllers'],
    function (controllers) {
        controllers.controller('CreateMeetingContr',
            ['$window',
            '$scope',
            '$http',
    function (
        $window,
        $scope,
        $http) {
         
        
        /*var data = JSON.stringify({
                username: "string2",
                password: "string"
            });
        
        $http.post("http://162.243.215.160:9000/v1/user/login", data).success(function(data, status) {
            alert("success");
        });*/
        
        //alert("new meeting");
        var Cerez = document.cookie;
	
        var Duzenli = new RegExp("authToken=([^;=]+)[;\\b]?");
                    var Sonuclar = Duzenli.exec(Cerez);
                    //alert( unescape(Sonuclar[1]) );	
        var authToken = unescape(Sonuclar[1]);
        
        var Duzenli2 = new RegExp("selectedGroupName=([^;=]+)[;\\b]?");
                    var Sonuclar2 = Duzenli2.exec(Cerez);
                    //alert( unescape(Sonuclar[1]) );	
        var selectedGroupName = unescape(Sonuclar2[1]);
        
        var Duzenli3 = new RegExp("selectedGroupDesc=([^;=]+)[;\\b]?");
                    var Sonuclar3 = Duzenli3.exec(Cerez);
                    //alert( unescape(Sonuclar[1]) );	
        var selectedGroupDesc = unescape(Sonuclar3[1]);
        
        var Duzenli4 = new RegExp("selectedGroup=([^;=]+)[;\\b]?");
                    var Sonuclar4 = Duzenli4.exec(Cerez);
                    //alert( unescape(Sonuclar[1]) );	
        var selectedGroupId = unescape(Sonuclar4[1]);
        
        $scope.selectedGroupName=selectedGroupName;
        $scope.selectedGroupDesc=selectedGroupDesc;
        
         
        $scope.name="";
        $scope.description="";
        $scope.authToken=authToken;
        
        
        
        
        
        
        
       
        $scope.sendPost = function() {
            
                var data = JSON.stringify({
                        authToken: $scope.authToken,
                        location: $scope.name,
                        description: $scope.description,
                        groupId: selectedGroupId
                    });
      
       $http.post("http://162.243.215.160:9000/v1/meeting/create", data).success(function(data, status) {
                    //alert(data.result.token);
                    //alert("success");
                    //document.cookie = "authToken" + "=" + data.result.token;
                    //$location.path( "~/Content/" );
                    
                    /*
                    var Cerez = document.cookie;
	
                    var Duzenli = new RegExp("sinan=([^;=]+)[;\\b]?");
                    var Sonuclar = Duzenli.exec(Cerez);
                    alert( unescape(Sonuclar[1]) );	*/
                    alert( "Meeting is created successfully!" );	
                    $window.location.href = "#/group_detail";
                }).error(function (data, status, headers, config) {
              alert("Error: " + data.consumerMessage);
              
            });
        };
    }]);
});
