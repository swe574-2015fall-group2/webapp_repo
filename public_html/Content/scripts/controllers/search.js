define(['controllers/controllers'],
        function (controllers) {
            controllers.controller('SearchContr2',
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
                            var authToken = unescape(Sonuclar[1]);

                            $scope.authToken = authToken;
                            $scope.groupList = "";

                            $scope.ngSearch = "";
                            $scope.yeniTagList = "";


                            $scope.search = function () {
                                var i = 0;
                            };


                            $scope.getTag = function () {

                                var data2 = JSON.stringify({
                                    authToken: $scope.authToken,
                                    queryString: $scope.ngSearch
                                });

                                $http.post("http://162.243.18.170:9000/v1/semantic/querySearchString", data2).success(function (data, status) {

                                    $scope.yeniTagList = data.result.dataList;

                                }).error(function (data, status, headers, config) {

                                });
                            };

                        }]);
        });
