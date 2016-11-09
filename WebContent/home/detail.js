var loginApp = angular.module("myPageApp", []);
loginApp.controller("myPageController", function($scope, $http, $window){
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
			$scope.message = data;
			alert(data);
		}).error(function(data, status, headers, config) {
			alert(data);
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
		if(!($scope.username)){
			alert("Please fill username");
			return;
		}
		if(!($scope.password)){
			alert("Please fill password");
			return;
		}
		
		var dataObj = {};
		dataObj["userName"] = $scope.username;
		dataObj["password"]= $scope.password;
		
		var req = {
				 method: 'POST',
				 url: '../rest/login/get-logged-in-employee',
				 /* headers: {
				   'Content-Type': 'application/json'
				 }, */
				 data: dataObj,
			}
		
		$http(req).success(function(data, status, headers, config) {
			$scope.message = data.message;
			alert(data.message);
		}).error(function(data, status, headers, config) {
			alert(data.message);
			$window.location.href = "../login/login.html";
		});
	}
	
	$scope.register = function Register(){
		$window.location.href = "../registration/register.html";
	}
});