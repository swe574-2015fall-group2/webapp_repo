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
  'controllers/groups/createGroupController',
  'controllers/groups/GroupController',
  'controllers/groups/GroupDetailController',
  'controllers/groups/AllGroupsController',
  'controllers/groups/LatestGroupsController',
  'controllers/groups/MyGroupsController',
  'controllers/groups/PopularGroupsController',
  'controllers/groups/UpdateGroupController',
  'controllers/discussion/NewDiscussionController',
  'controllers/discussion/DiscussionDetailController',
  'controllers/discussion/UpdateDiscussionController',
  'controllers/meeting/NewMeetingController',
  'controllers/meeting/UpdateMeetingController',
  'controllers/meeting/MeetingDetailController',
  'controllers/message/InboxController',
  'controllers/message/InboxDetailController',
  'controllers/message/InboxNewMessageController',
  'controllers/notes/NewNoteController',
  'controllers/notes/UpdateNoteController',
  'controllers/notes/NoteDetailController',
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
                .when('/update_group', {
                    templateUrl: 'views/groups/update_group.html',
                    controller: 'UpdateGroupContr'
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
                    controller: 'DiscussionDetailContr'
                })
                .when('/new_discussion', {
                    templateUrl: 'views/discussion/new_discussion.html',
                    controller: 'NewDiscussionCont'
                })
                .when('/update_discussion', {
                    templateUrl: 'views/discussion/update_discussion.html',
                    controller: 'UpdateDiscussionCont'
                })
                .when('/meeting_detail', {
                    templateUrl: 'views/meeting/meeting_detail.html',
                    controller: 'MeetingDetailContr'
                })
                .when('/update_meeting', {
                    templateUrl: 'views/meeting/update_meeting.html',
                     controller: 'UpdateMeetingCont'
                })
                .when('/new_note', {
                    templateUrl: 'views/notes/new_note.html',
                    controller: 'NewNoteContr'
                })
                .when('/note_detail', {
                    templateUrl: 'views/notes/note_detail.html',
                    controller: 'NoteDetailContr'
                })
                .when('/update_note', {
                    templateUrl: 'views/notes/update_note.html',
                    controller: 'UpdateNoteContr'
                })
                .when('/new_message', {
                    templateUrl: 'views/message/new_message.html',
                    controller: 'InboxNewMessageContr'
                })
                .when('/inbox', {
                    templateUrl: 'views/message/inbox.html',
                    controller: 'InboxContr'
                })
                
                .when('/inbox_detail', {
                    templateUrl: 'views/message/inbox_detail.html',
                    controller: 'InboxDetailContr'
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
