define(['controllers/controllers'],
  function(controllers) {
    controllers.controller('MainContr', ['$window',
      '$scope',
      '$http',
      function(
        $window,
        $scope,
        $http) {


        var Cerez = document.cookie;

        var Duzenli = new RegExp("authToken=([^;=]+)[;\\b]?");
        var Sonuclar = Duzenli.exec(Cerez);
        //alert( unescape(Sonuclar[1]) );
        var authToken = unescape(Sonuclar[1]);


        //get the group detail
        var data = JSON.stringify({
          authToken: authToken
        });
        $http.post("http://162.243.18.170:9000/v1/messagebox/getByReceiver", data).success(function(data, status) {
          $scope.unreadMessageCount = (data.result.unreadCount);
        }).error(function(data, status, headers, config) {
          //alert("Error: " + data.consumerMessage);

        });



      }
    ]);
  });
