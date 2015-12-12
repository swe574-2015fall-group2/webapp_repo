define(['controllers/controllers'],
    function (controllers) {
        controllers.controller('ProfileContr',
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
        
        //alert("");
        var Cerez = document.cookie;
	
        var Duzenli = new RegExp("authToken=([^;=]+)[;\\b]?");
                    var Sonuclar = Duzenli.exec(Cerez);
                   // alert( unescape(Sonuclar[1]) );	
        var authToken = unescape(Sonuclar[1]);
        
        var Duzenli2 = new RegExp("userId=([^;=]+)[;\\b]?");
                    var Sonuclar2 = Duzenli2.exec(Cerez);
                   // alert( unescape(Sonuclar[1]) );	
        var userId = unescape(Sonuclar2[1]);
        
        
        //Get ProfileDetails
        var data = JSON.stringify({
                        authToken: authToken,
                        id:userId
                    });
                    
        $http.post("http://162.243.215.160:9000/v1/user/get", data).success(function(data, status) {
                   $scope.firstname= data.result.firstname;
                   $scope.lastname= data.result.lastname;
                   $scope.username= data.result.username;
                   $scope.profession= data.result.userDetail.profession;
                   $scope.birthDate= data.result.userDetail.birthDate;
                   $scope.university= data.result.userDetail.university;
                   $scope.programme= data.result.userDetail.programme;
                   $scope.interestedAreas= data.result.userDetail.interestedAreas;
                   $scope.linkedinProfile= data.result.userDetail.linkedinProfile;
                   $scope.academiaProfile= data.result.userDetail.academiaProfile;
                   $scope.nameSurname= data.result.firstname + " " +data.result.lastname;
                   
                }).error(function (data, status, headers, config) {
              alert("Error: " + data.consumerMessage);
              
            });
        
        
        
        
        $scope.authToken=authToken;
        $scope.userId=userId;
        
        $scope.firstname="";
        $scope.description="";
        $scope.sendPost = function() {
            
                var data = JSON.stringify({
                        authToken: authToken,
                        id:userId,
                        firstname:$scope.firstname,
                        lastname:$scope.lastname,
                        birthDate:$scope.birthDate,
                        profession:$scope.profession,
                        university:$scope.university,
                        programme:$scope.programme,
                        interestedAreas:$scope.interestedAreas,
                        linkedinProfile:$scope.linkedinProfile,
                        academiaProfile:$scope.academiaProfile
                    });
        
       $http.post("http://162.243.215.160:9000/v1/user/update", data).success(function(data, status) {
                    //alert(data.result.token);
                    //alert("success");
                    //document.cookie = "authToken" + "=" + data.result.token;
                    //$location.path( "~/Content/" );
                    
                    /*
                    var Cerez = document.cookie;
	
                    var Duzenli = new RegExp("sinan=([^;=]+)[;\\b]?");
                    var Sonuclar = Duzenli.exec(Cerez);
                    alert( unescape(Sonuclar[1]) );	*/
                    //alert( "user updated" );	
                    $window.location.reload();
                }).error(function (data, status, headers, config) {
              alert("Error: " + data.consumerMessage);
              
            });
        };
    }]);
});
