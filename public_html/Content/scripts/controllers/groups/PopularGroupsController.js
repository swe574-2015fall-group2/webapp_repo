define(['controllers/controllers'],
    function (controllers) {
        controllers.controller('PopularGroupsContr',
            ['$window',
            '$scope',
            '$http',
    function (
        $window,
        $scope,
        $http) {
         
        
        var Cerez = document.cookie;
	
        var Duzenli = new RegExp("authToken=([^;=]+)[;\\b]?");
                    var Sonuclar = Duzenli.exec(Cerez);
                    //alert( unescape(Sonuclar[1]) );	
        var authToken = unescape(Sonuclar[1]);
        
        $scope.authToken=authToken;
        
        //Get ALL GROUPS
        var data = JSON.stringify({
                        authToken: $scope.authToken
                    });
        
        $scope.popularGroupList="";
        $http.post("http://162.243.18.170:9000/v1/group/listPopularGroups", data).success(function(data, status) {
                    
                   // alert( "There are your groups" );	
                   $scope.popularGroupList=data.result.groupList;
                   
                   
                }).error(function (data, status, headers, config) {
              alert("Error: " + data.consumerMessage);
              
            });
            
        
        $scope.toGroupDetail = function (index,name, desc, join) {
           document.cookie = "selectedGroup" + "=" + index;
           document.cookie = "selectedGroupName" + "=" + name;
           document.cookie = "selectedGroupDesc" + "=" + desc;
           document.cookie = "selectedGroupJoined" + "=" + join;
           //alert(join);
           $window.location.href = '#/group_detail';
       };
        
        /*
        $http.post("http://162.243.18.170:9000/v1/group/listAll", data).success(function(data, status) {
                    
                   // alert( "There are your groups" );	
                   $scope.groupList=data.result.groupList.slice(0,3);
                   $scope.groupListCount = data.result.groupList.length-3;
                   var b = "a";
                   
                }).error(function (data, status, headers, config) {
              alert("Error: " + data.consumerMessage);
              
            });
            
            
        $scope.myGroupList="";
        $http.post("http://162.243.18.170:9000/v1/group/listMyGroups", data).success(function(data, status) {
                    
                   // alert( "There are your groups" );	
                   $scope.myGroupList=data.result.groupList.slice(0,3);
                   var b = "a";
                   
                }).error(function (data, status, headers, config) {
              alert("Error: " + data.consumerMessage);
              
            });
        
       $scope.toGroupDetail = function (index,name, desc, join) {
           document.cookie = "selectedGroup" + "=" + index;
           document.cookie = "selectedGroupName" + "=" + name;
           document.cookie = "selectedGroupDesc" + "=" + desc;
           document.cookie = "selectedGroupJoined" + "=" + join;
           alert(join);
           $window.location.href = '#/group_detail';
       };
        */
        
    }]);
});
