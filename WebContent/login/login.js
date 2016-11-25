var loginApp = angular.module("loginApp", []);
loginApp.controller("loginController", function($scope, $http, $window){
	
	$scope.checkIfEnterKeyWasPressed = function(event){
	    if (event.charCode == 13)
	        $scope.login();
	}
	
	$scope.login = function login(){
		if(!($scope.employeeId)){
			alert("Please fill Employee Id");
			$scope.empIdError = "Please fill Employee Id";
			return false;
		}
		if(!($scope.password)){
			alert("Please fill password");
			$scope.password = "Please fill password";
			return false;
		}
		var dataObj = {};
		dataObj["employeeId"] = $scope.employeeId;
		dataObj["password"]= $scope.password;
		
		var req = {
				 method: 'POST',
				 url: '../rest/login/do-login',
				 /* headers: {
				   'Content-Type': 'application/json'
				 }, */
				 data: dataObj,
			}
		
		$http(req).success(function(data, status, headers, config) {
			$scope.message = data;
			$window.location.href = "../home/index.html#/getMyReferrals";
		}).error(function(data, status, headers, config) {
			alert(data);
			return false;
		});
	}
	
	$scope.register = function Register(){
		$window.location.href = "../registration/register.html";
	}
});