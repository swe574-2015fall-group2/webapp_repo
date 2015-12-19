define(['controllers/controllers'],
    function (controllers) {
        controllers.controller('DiscussionDetailContr',
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
        
        var Duzenli2 = new RegExp("selectedDiscussionName=([^;=]+)[;\\b]?");
                    var Sonuclar2 = Duzenli2.exec(Cerez);
                    //alert( unescape(Sonuclar[1]) );	
        var selectedDiscussionName = unescape(Sonuclar2[1]);
        
        var Duzenli3 = new RegExp("selectedDiscussionDesc=([^;=]+)[;\\b]?");
                    var Sonuclar3 = Duzenli3.exec(Cerez);
                    //alert( unescape(Sonuclar[1]) );	
        var selectedDiscussionDesc = unescape(Sonuclar3[1]);
        
        var Duzenli4 = new RegExp("selectedDiscussion=([^;=]+)[;\\b]?");
                    var Sonuclar4 = Duzenli4.exec(Cerez);
                    //alert( unescape(Sonuclar[1]) );	
        var selectedDiscussion = unescape(Sonuclar4[1]);
        
        $scope.selectedDiscussionName=selectedDiscussionName;
        $scope.selectedDiscussionDesc=selectedDiscussionDesc;
        $scope.selectedDiscussion=selectedDiscussion;
        
       getComments();
       
       //get the comments
       function getComments(){
       var data = JSON.stringify({
                        authToken: authToken,
                        id: $scope.selectedDiscussion
                    });
        $http.post("http://162.243.215.160:9000/v1/discussion/query", data).success(function(data, status) {
              
                    getUserDetails(data.result.commentList);
                }).error(function (data, status, headers, config) {
              //alert("Error: " + data.consumerMessage);
              
            });
            
       }
       
         //get the commenters user details   
        function getUserDetails(commentList){
                $scope.commentList = [];
                var com;
                var sayac = 0;
                for (com in commentList) { 
            
                //GET USER INFO
                var data = JSON.stringify({
                        authToken: authToken,
                        id: commentList[sayac].creatorId
                    });
                    
                    
                    $http.post("http://162.243.215.160:9000/v1/user/get", data).success(function(data, status) {
      
                        var tempName =  (data.result.firstname +" "+ data.result.lastname);

                        var createdTime=commentList[sayac].creationTime;
                        var comment=commentList[sayac].comment;

                           $scope.commentList.push({name:tempName, createdTime:createdTime, comment:comment});
                        var aggw= 0
                        sayac++;

                        }).error(function (data, status, headers, config) {
                        alert("Error: " + data.consumerMessage);

                 });

             }
            }
            
            
            $scope.addComment = function () {

                                var data = JSON.stringify({
                                    authToken: authToken,
                                    discussionId: $scope.selectedDiscussion,
                                    comment: $scope.commentText
                                });

                                $http.post("http://162.243.215.160:9000/v1/discussion/addComment", data).success(function (data, status) {
                                getComments();
                                $scope.commentText="";
                                   // alert("Note is created successfully!");
//                                    $window.location.href = "#/my_groups";
                                }).error(function (data, status, headers, config) {
                                    alert("Error: " + data.consumerMessage);

                                });

                            };
        
        
    }]);
});
