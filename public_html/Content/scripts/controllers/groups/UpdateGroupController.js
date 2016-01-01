define(['controllers/controllers'],
    function (controllers) {
        controllers.controller('UpdateGroupContr',
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
        
        $http.post("http://162.243.18.170:9000/v1/user/login", data).success(function(data, status) {
            alert("success");
        });*/
        
        //alert("");
        var Cerez = document.cookie;
	
        var Duzenli = new RegExp("authToken=([^;=]+)[;\\b]?");
                    var Sonuclar = Duzenli.exec(Cerez);
                   // alert( unescape(Sonuclar[1]) );	
        var authToken = unescape(Sonuclar[1]);
        
        var Duzenli5 = new RegExp("selectedGroup=([^;=]+)[;\\b]?");
                    var Sonuclar5 = Duzenli5.exec(Cerez);
                    //alert( unescape(Sonuclar5[1]) );	
        var selectedGroup = unescape(Sonuclar5[1]);
        
        $scope.authToken=authToken;
        $scope.selectedGroupId=selectedGroup;
        
        
         var data = JSON.stringify({
                        authToken: $scope.authToken,
                        id: $scope.selectedGroupId
                    });
        var a = 0;
       $http.post("http://162.243.18.170:9000/v1/group/query", data).success(function(data, status) {
                    
                    $scope.name = data.result.name;
                    $scope.description = data.result.description;
                    $scope.tagList = data.result.tagList;
                    
                }).error(function (data, status, headers, config) {
              alert("Error: " + data.consumerMessage);
              
            });
        
        
        
        
        
        
        
        $scope.sendPost = function() {
            //alert("");
                var data = JSON.stringify({
                        authToken: $scope.authToken,
                        name: $scope.name,
                        description: $scope.description
                    });
        
       $http.post("http://162.243.18.170:9000/v1/group/update", data).success(function(data, status) {
                    //alert(data.result.token);
                    //alert("success");
                    //document.cookie = "authToken" + "=" + data.result.token;
                    //$location.path( "~/Content/" );
                    
                    /*
                    var Cerez = document.cookie;
	
                    var Duzenli = new RegExp("sinan=([^;=]+)[;\\b]?");
                    var Sonuclar = Duzenli.exec(Cerez);
                    alert( unescape(Sonuclar[1]) );	*/
                    alert( "Group is updated successfully!" );	
                    //$window.location.href = "#/my_groups";
                }).error(function (data, status, headers, config) {
              alert("Error: " + data.consumerMessage);
              
            });
        };
    }]);
});
