


define(['controllers/controllers',
    'services/liveUpdatesService',
    'services/utilitiesService',
    'services/imageService',
    'services/localStorageService'],
        function (controllers) {
            controllers.controller('RegisterCtrl',
                    ['$window',
                        '$scope',
                        '$http',
                        '$location',
                        function (
                                $window,
                                $scope,
                                $http,
                                $location
                                //LiveUpdatesService,
                                //UtilitiesService,
                                //ImageService,
                                //LocalStorageService
                                ) {

                            $scope.username = ""; //email
                            $scope.firstname = "";
                            $scope.lastname = "";
                            $scope.password = "";
                            $scope.password2 = "";


                            $scope.sendPost = function () {



                                if (!ValidateEmail($scope.username))
                                {
                                    $scope.popUpHeader = "Warning";
                                    $scope.popUpBody = "You have entered an invalid email address!";
                                    $scope.popUpVisible = true;
                                    return;
                                }

                                if ($scope.password2 != $scope.password)
                                {
                                    $scope.popUpHeader = "Warning";
                                    $scope.popUpBody = "Check you passwords. They are not equal.";
                                    $scope.popUpVisible = true;
                                    return;
                                }


                                var data = JSON.stringify({
                                    username: $scope.username,
                                    firstname: $scope.firstname,
                                    lastname: $scope.lastname,
                                    password: $scope.password
                                });

                                $http.post("http://162.243.18.170:9000/v1/user/create", data).success(function (data, status) {
                                    //alert(data.result.token);
                                    //document.cookie = "authToken" + "=" + data.result.token;
                                    //$location.path( "~/Content/" );

                                    alert("user created, proceeding to login")



                                    $window.location.href = '#/login';
                                }).error(function (data, status, headers, config) {
                                    alert("Error! Check your info2");
                                });

                            };

                            function ValidateEmail(email)
                            {
                                var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                return re.test(email);
                            }

                            function isEmpty(MyVariable)
                            {
                                if (
                                        (MyVariable.length == 0)
                                        ||
                                        (MyVariable == "")
                                        ||
                                        (MyVariable.replace(/\s/g, "") == "")
                                        ||
                                        (!/[^\s]/.test(MyVariable))
                                        ||
                                        (/^\s*$/.test(MyVariable))
                                        )
                                {
                                    return true;
                                } else
                                {
                                    return false;
                                }
                            }
                            $scope.userIsCreated = false;
                            $scope.popUpHeader = "Header";
                            $scope.popUpBody = "Body";
                            $scope.popUpVisible = false;

                            $scope.closePopUp = function () {
                                $scope.popUpVisible = false;

                                if ($scope.userIsCreated)
                                {
                                    $window.location.href = "#/my_groups";
                                }
                            };




                        }]);
        });
