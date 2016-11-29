var loginApp = angular.module("loginApp", []);
loginApp.controller("loginController", function($scope, $http, $window){
	
	$scope.checkIfEnterKeyWasPressed = function(event){
	    if (event.charCode == 13)
	        $scope.login();
	}
	
	$scope.init = function init(){
		$window.document.getElementById("employeeId").focus();
	}
	
	$scope.login = function login(){
		if(!($scope.employeeId)){
			//alert("Please fill Employee Id");
			$scope.errorMessage = "Please fill Employee Id";
			$window.document.getElementById("employeeId").focus();
			return false;
		}
		if(!($scope.password)){
			//alert("Please fill password");
			$scope.errorMessage = "Please fill password";
			$window.document.getElementById("password").focus();
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
			//alert(data);
			$scope.errorMessage = data;
			return false;
		});
	}
	
	$scope.register = function Register(){
		$window.location.href = "../registration/register.html";
	}
});