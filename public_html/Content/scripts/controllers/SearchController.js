define(['controllers/controllers'],
    function (controllers) {
        controllers.controller('SearchContr',
            ['$window',
            '$scope',
            '$http',
    function (
        $window,
        $scope,
        $http) {
         
        //alert("welcome to latest groups")
        
        //alert(" all groups");
        var Cerez = document.cookie;
	
        var Duzenli = new RegExp("authToken=([^;=]+)[;\\b]?");
                    var Sonuclar = Duzenli.exec(Cerez);
                    //alert( unescape(Sonuclar[1]) );	
        var authToken = unescape(Sonuclar[1]);
        
        var Duzenli2 = new RegExp("searchQuery=([^;=]+)[;\\b]?");
                    var Sonuclar2 = Duzenli2.exec(Cerez);
                    //alert( unescape(Sonuclar[1]) );	
        var searchQuery = unescape(Sonuclar2[1]);
        //alert(searchQuery);
        $scope.searchQuery=searchQuery;
        $scope.authToken=authToken;
        //alert(authToken);
        
        //Get ALL GROUPS
        var data = JSON.stringify({
                        authToken: $scope.authToken,
                        queryString: searchQuery
                    });
        
        $scope.groupList="";
        
        $http.post("http://162.243.18.170:9000/v1/semantic/querySearchString", data).success(function(data, status) {
                    
                 //alert( "There are your groups" );	
                   $scope.dataList=data.result.dataList;
                   
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
