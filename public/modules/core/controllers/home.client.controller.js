'use strict';


angular.module('core')
	.service('usersService', ['$q',
		function($q) {


			/**
			 * Users DataService
			 * Uses embedded, hard-coded data model; acts asynchronously to simulate
			 * remote data service call(s).
			 *
			 * @returns {{loadAll: Function}}
			 * @constructor
			 */

			var users = [
				{
					name: 'Lia Lugo',
					avatar: 'svg-1',
					content: 'I love cheese, especially airedale queso. Cheese and biscuits halloumi cauliflower cheese cottage cheese swiss boursin fondue caerphilly. Cow port-salut camembert de normandie macaroni cheese feta who moved my cheese babybel boursin. Red leicester roquefort boursin squirty cheese jarlsberg blue castello caerphilly chalk and cheese. Lancashire.'
				},
				{
					name: 'George Duke',
					avatar: 'svg-2',
					content: 'Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit??, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris.'
				},
				{
					name: 'Gener Delosreyes',
					avatar: 'svg-3',
					content: 'Raw denim pour-over readymade Etsy Pitchfork. Four dollar toast pickled locavore bitters McSweeneys blog. Try-hard art party Shoreditch selfies. Odd Future butcher VHS, disrupt pop-up Thundercats chillwave vinyl jean shorts taxidermy master cleanse letterpress Wes Anderson mustache Helvetica. Schlitz bicycle rights chillwave irony lumberhungry Kickstarter next level sriracha typewriter Intelligentsia, migas kogi heirloom tousled. Disrupt 3 wolf moon lomo four loko. Pug mlkshk fanny pack literally hoodie bespoke, put a bird on it Marfa messenger bag kogi VHS.'
				},
				{
					name: 'Lawrence Ray',
					avatar: 'svg-4',
					content: 'Scratch the furniture spit up on light gray carpet instead of adjacent linoleum so eat a plant, kill a hand pelt around the house and up and down stairs chasing phantoms run in circles, or claw drapes. Always hungry pelt around the house and up and down stairs chasing phantoms.'
				},
				{
					name: 'Ernesto Urbina',
					avatar: 'svg-5',
					content: 'Webtwo ipsum dolor sit amet, eskobo chumby doostang bebo. Bubbli greplin stypi prezi mzinga heroku wakoopa, shopify airbnb dogster dopplr gooru jumo, reddit plickers edmodo stypi zillow etsy.'
				},
				{
					name: 'Gani Ferrer',
					avatar: 'svg-6',
					content: 'Lebowski ipsum yeah? What do you think happens when you get rad? You turn in your library card? Get a new drivers license? Stop being awesome? Dolor sit amet, consectetur adipiscing elit praesent ac magna justo pellentesque ac lectus. You dont go out and make a living dressed like that in the middle of a weekday. Quis elit blandit fringilla a ut turpis praesent felis ligula, malesuada suscipit malesuada.'
				}
			];

			// Promise-based API
			return {
				loadAll : function() {
					// Simulate async nature of real remote calls
					return $q.when(users);
				}
			};
		}])
	.controller('HomeController',
	['$scope', 'Authentication', 'usersService', '$mdSidenav', '$mdBottomSheet', '$log',
	function($scope, Authentication, usersService, $mdSidenav, $mdBottomSheet, $log) {
		// This provides Authentication context.
		$scope.selected     = null;
		$scope.users        = [ ];

		$scope.authentication = Authentication;

		usersService
			.loadAll()
			.then( function( users ) {
				$scope.users    = [].concat(users);
				$scope.selected = users[0];
			});

		$scope.toggleUsersList = function toggleUsersList() {
			$mdSidenav('left').toggle();
		};

		$scope.selectUser = function selectUser ( user ) {
			$scope.selected = angular.isNumber(user) ? $scope.users[user] : user;
			$scope.toggleUsersList();
		};

		$scope.share = function share($event) {
			var user = $scope.selected;

			/**
			 * Bottom Sheet controller for the Avatar Actions
			 */
			function UserSheetController( $mdBottomSheet ) {
				this.user = user;
				this.items = [
					{ name: 'Phone'       , icon: 'phone'       },
					{ name: 'Twitter'     , icon: 'twitter'     },
					{ name: 'Google+'     , icon: 'google_plus' },
					{ name: 'Hangout'     , icon: 'hangouts'    }
				];
				this.performAction = function(action) {
					$mdBottomSheet.hide(action);
				};
			}

			$mdBottomSheet.show({
				parent: angular.element(document.getElementById('content')),
				templateUrl: 'modules/core/views/contactSheet.html',
				controller: [ '$mdBottomSheet', UserSheetController],
				controllerAs: 'vm',
				bindToController : true,
				targetEvent: $event
			}).then(function(clickedItem) {
				$log.debug( clickedItem.name + ' clicked!');
			});


			//$scope.selected     = null;
			//$scope.users        = [ ];
			//$scope.selectUser   = selectUser;
			//$scope.toggleUsersList   = toggleUsersList;
			//$scope.share        = share;
		};
	}
]);
