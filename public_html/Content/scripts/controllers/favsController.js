define(['controllers/controllers',
        'services/imageService',
        'services/utilitiesService',
        'services/localStorageService'],
    function (controllers) {
        controllers.controller('FavsCtrl',
            ['$window',
            '$scope',
            '$http',
            'ImageService',
            'UtilitiesService',
            'LocalStorageService',
    function (
        $window,
        $scope,
        $http,
        ImageService,
        UtilitiesService,
        LocalStorageService) {
         
        
        /*var data = JSON.stringify({
                username: "string2",
                password: "string"
            });
        
        $http.post("http://162.243.215.160:9000/v1/user/login", data).success(function(data, status) {
            alert("success");
        });*/
        var Cerez = document.cookie;
	
        var Duzenli = new RegExp("authToken=([^;=]+)[;\\b]?");
                    var Sonuclar = Duzenli.exec(Cerez);
                    //alert( unescape(Sonuclar[1]) );	
        
        
        
        $('.date-picker').datepicker({
                rtl: App.isRTL(),
                autoclose: true
            });

        $scope.imageItemsStorageKey = 'imageItemsKey';
        $scope.favImageItems = [];
        $scope.columnCount = 5;
        $scope.favText = '';
        $scope.shouldAlert = false;

        $scope.tableItems = [];
        while ($scope.tableItems.push([]) < $scope.columnCount);

        if (!LocalStorageService.isSupported()) {
            $scope.favText = 'Local storage is not supported by your browser, so viewing favourites isn\'t possible';
            $scope.shouldAlert = true;
        } else {

            var currentStoredFavs = LocalStorageService.fetch($scope.imageItemsStorageKey);
            var currentFavs = [];
            if (currentStoredFavs != undefined) {
                currentFavs = JSON.parse(currentStoredFavs);
            }

            if (currentFavs.length == 0) {
                $scope.favText = 'There are no favourites stored at the moment';
                $scope.shouldAlert = true;
            } else {
                var maxRows = Math.ceil(currentFavs.length / $scope.columnCount);
                $scope.favText = 'These are your currently stored favourites. You can click on the images to see them a bit larger';
                if (currentFavs.length < $scope.columnCount) {
                    $scope.tableItems[0] = [];
                    for (var i = 0; i < currentFavs.length; i++) {
                        $scope.tableItems[0].push(ImageService.createFavImageItem(currentFavs[i].name));
                    }
                } else {
                    var originalIndexCounter = 0;
                    for (var r = 0; r < maxRows; r++) {
                        for (var c = 0; c < $scope.columnCount; c++) {
                            if (originalIndexCounter < currentFavs.length) {
                                $scope.tableItems[r][c] = ImageService.createFavImageItem(currentFavs[originalIndexCounter].name);
                                originalIndexCounter++;
                            }
                        }
                    }
                }
            }

            if ($scope.shouldAlert) {
                UtilitiesService.delayedAlert($scope.favText);
            }
 
        }

    }]);
});
