// the app/scripts/main.js file, which defines our RequireJS config
require.config({
    paths: {
        angular: 'vendor/angular.min',
        jqueryUI: 'vendor/jquery-ui',
        jqueryColorbox: 'vendor/jquery-colorbox',
        jquery: 'vendor/jquery',
        domReady: 'vendor/domReady',
        reactive: 'vendor/rx'
    },
    shim: {
        angular: {
            deps: ['jquery', 'jqueryUI', 'jqueryColorbox'],
            exports: 'angular'
        },
        jqueryUI: {
            deps: ['jquery']
        },
        jqueryColorbox: {
            deps: ['jquery']
        }
    }
});

require([
  'angular',
  'app',
  'domReady',
  'reactive',
  'services/liveUpdatesService',
  'services/imageService',
  'services/localStorageService',
  'controllers/rootController',
  'controllers/favsController',
  'controllers/createGroupController',
  'controllers/GroupController',
  'controllers/GroupDetailController',
  'controllers/NewMeetingController',
  'controllers/MeetingDetailController',
  'controllers/AllGroupsController',
  'controllers/LatestGroupsController',
  'controllers/MyGroupsController',
  'controllers/PopularGroupsController',
  'controllers/ProfileController',
  'directives/ngbkFocus',
  'directives/draggable',
  'directives/resizable',
  'directives/tooltip',
  'directives/colorbox'
  // Any individual controller, service, directive or filter file
  // that you add will need to be pulled in here.
],
  function (angular, app, domReady) {
      'use strict';
      app.config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .when('#/', {
                    templateUrl: 'views/groups.html',
                    controller: 'RootCtrl'
                })
                
                .when('/groups', {
                    templateUrl: 'views/groups/groups.html',
                    controller: 'GroupContr'
                })
                
                .when('/create_new_group', {
                    templateUrl: 'views/groups/new_group.html',
                    controller: 'CreateGroupContr'
                })
                
                .when('/my_groups_detail', {
                    templateUrl: 'views/groups/my_groups_detail.html',
                    controller: 'MyGroupsContr'
                })
                .when('/popular_groups_detail', {
                    templateUrl: 'views/groups/popular_groups_detail.html',
                    controller: 'PopularGroupsContr'
                })
                .when('/latest_groups_detail', {
                    templateUrl: 'views/groups/latest_groups_detail.html',
                    controller: 'LatestGroupsContr'
                })
                .when('/recommended_groups_detail', {
                    templateUrl: 'views/groups/recommended_groups_detail.html',
                    controller: 'FavsCtrl'
                })
                .when('/all_groups_detail', {
                    templateUrl: 'views/groups/all_groups_detail.html',
                    controller: 'AllGroupsContr'
                })
                .when('/group_detail', {
                    templateUrl: 'views/groups/group_detail.html',
                    controller: 'GroupDetailContr'
                })
                .when('/new_meeting', {
                    templateUrl: 'views/meeting/new_meeting.html',
                    controller: 'NewMeetingCont'
                })
                .when('/discussion_detail', {
                    templateUrl: 'views/discussion/discussion_detail.html',
                    controller: 'FavsCtrl'
                })
                .when('/new_discussion', {
                    templateUrl: 'views/discussion/new_discussion.html',
                    controller: 'FavsCtrl'
                })
                .when('/meeting_detail', {
                    templateUrl: 'views/meeting/meeting_detail.html',
                    controller: 'MeetingDetailContr'
                })
                .when('/my_profile', {
                    templateUrl: 'views/my_profile.html',
                    controller: 'ProfileContr'
                }).otherwise({ redirectTo: '/groups' });;
        }
      ]);
      domReady(function () {
          angular.bootstrap(document, ['MyApp']);

          // The following is required if you want AngularJS Scenario tests to work
          $('html').addClass('ng-app: MyApp');
      });
  }
);
