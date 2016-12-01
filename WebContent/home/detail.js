var loginApp = angular.module("homePageApp", ['ngRoute', 'referralApp']);
loginApp.config(['$routeProvider', function ($routeProvider) {
	$routeProvider.when('/getMyReferrals', {
		templateUrl: '../referral/getReferral.html',
		controller: 'getReferralController'
	}).
	when('/addNewReferral', {
		templateUrl: '../referral/addReferral.html',
		controller: 'addReferralController'
	}).
	when('/getAllReferrals', {
		templateUrl: '../referral/getAllReferral.html',
		controller: 'getAllReferralController'
	}).
	when('/logout', {
		
	}).
	otherwise({
		templateUrl: '../referral/getReferral.html',
		controller: 'getReferralController'
	});
}
]);

loginApp.controller("homePageController", function($scope, $rootScope, $http, $window){
	$scope.employeeId = "";
	$rootScope.employeeId = "";
	$rootScope.designation = "";
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
			$scope.employeeId = data.employeeId;
			$rootScope.employeeId = data.employeeId;
			$rootScope.designation = data.designation;
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
			//alert(data);
		});
	}
	
	$scope.getMyReferrals = function getMyReferrals(pageNo){
		var req = {
				 method: 'GET',
				 url: '../rest/employee/get-my-referrals/'+pageNo+'/'+$scope.employeeId,
			}
		
		$http(req).success(function(data, status, headers, config) {
			$scope.referralList = data.referrals;
			$scope.total = data.totalSize;
			$scope.Math = window.Math;
			$scope.noOfPages = Math.ceil($scope.total/10);
		}).error(function(data, status, headers, config) {
			alert(data);
			if(data == "Session Expired")
				$window.location.href = "../login/login.html";
		});
	}
	
	$scope.getAllReferrals = function getAllReferrals(pageNo){
		var req = {
				 method: 'GET',
				 url: '../rest/employee/get-all-referrals/'+pageNo,
			}
		
		$http(req).success(function(data, status, headers, config) {
			$scope.referralList = data.referrals;
			$scope.total = data.totalSize;
			$scope.Math = window.Math;
			$scope.noOfPages = Math.ceil($scope.total/10);
		}).error(function(data, status, headers, config) {
			alert(data);
			if(data == "Session Expired")
				$window.location.href = "../login/login.html";
		});
	}
	
	$scope.getNumber = function(num) {
		return new Array(num);   
	}
	
	$scope.register = function Register(){
		$window.location.href = "../registration/register.html";
	}
});