var loginApp = angular.module("homePageApp", ['ngRoute', 'referralApp']);
loginApp.config(['$routeProvider', function ($routeProvider) {
	$routeProvider.when('/getMyReferrals/:employeeId', {
		templateUrl: '../referral/getReferral.html',
		controller: 'getReferralController'
	}).
	when('/addNewReferral/:employeeId', {
		templateUrl: '../referral/addReferral.html',
		controller: 'addReferralController'
	}).
	otherwise({
		//redirectTo: '/login'
	});
}
]);

loginApp.controller("homePageController", function($scope, $http, $window){
	$scope.employeeId = "";
	$scope.init = function init(){
		var req = {
				 method: 'GET',
				 url: '../rest/login/get-logged-in-employee',
				 /* headers: {
				   'Content-Type': 'application/json'
				 }, */
				 //data: dataObj,
			}
		$http(req).success(function(data, status, headers, config) {
			$scope.employeeId = data;
		}).error(function(data, status, headers, config) {
			alert(data);
			if(data == "Session Expired")
				$window.location.href = "../login/login.html";
		});
	}
	
	$scope.logout = function logout(){
		var req = {
				 method: 'GET',
				 url: '../rest/login/do-logout',
				 /* headers: {
				   'Content-Type': 'application/json'
				 }, */
				 //data: dataObj,
			}
		$http(req).success(function(data, status, headers, config) {
			$window.location.href = "../login/login.html";
		}).error(function(data, status, headers, config) {
			alert(data);
		});
	}
	
	$scope.getMyReferrals = function getMyReferrals(){
		var req = {
				 method: 'GET',
				 url: '../rest/candidate/get-my-referrals/'+$scope.employeeId,
			}
		
		$http(req).success(function(data, status, headers, config) {
			$scope.message = data;
			$scope.showMe = false;
			if(data.size > 0){
				$scope.showMe = true;
			}
			alert(data);
		}).error(function(data, status, headers, config) {
			alert(data);
			if(data == "Session Expired")
				$window.location.href = "../login/login.html";
		});
	}
	
	$scope.register = function Register(){
		$window.location.href = "../registration/register.html";
	}
});