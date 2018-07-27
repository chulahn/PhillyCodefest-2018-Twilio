(function(angular) {
    
    angular.module('app',[])
		.controller("dataController", [ '$scope' , function ($scope) {

			var config = {
				apiKey: "AIzaSyDMx6n2ycqajZm-AtdgyJG8yxHSSGPAr88",
				authDomain: "activeshooteralert.firebaseapp.com",
				databaseURL: "https://activeshooteralert.firebaseio.com",
				projectId: "activeshooteralert",
				storageBucket: "activeshooteralert.appspot.com",
				messagingSenderId: "887225643974"
			};
			firebase.initializeApp(config);
			var database = firebase.database();

			var a = database.ref('users/').once('value').then(function(snapshot) {
				console.log(snapshot.val());
				$scope.$apply(function() {
					$scope.users = snapshot.val();
				});
			});

			$scope.users = {};

    	}])
})(window.angular);