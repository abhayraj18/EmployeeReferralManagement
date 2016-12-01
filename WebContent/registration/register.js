var loginApp = angular.module("registrationApp", []);
loginApp.controller("registrationController", function($scope, $http, $window){
	
	$scope.designations = ["Select Designation", "Project Trainee", "Software Engineer", "Senior Software Engineer", "Technical Lead", "Project Manager", "HR"];
	$scope.designation = $scope.designations[0];
	$scope.checkIfEnterKeyWasPressed = function(event){
	    if (event.charCode == 13)
	        $scope.register();
	}
	
	$scope.login = function Register(){
		$window.location.href = "../login/login.html";
	}
	
	$scope.init = function init(){
		$window.document.getElementById("name").focus();
	}
	
	$scope.register = function register(){
		if(!($scope.name)){
			//alert("Please fill name");
			$scope.errorMessage = "Please fill name";
			$window.document.getElementById("name").focus();
			return;
		}
		if(!($scope.employeeId)){
			//alert("Please fill Employee Id");
			$scope.errorMessage = "Please fill Employee Id";
			$window.document.getElementById("employeeId").focus();
			return;
		}
		if(!($scope.password)){
			//alert("Please fill password");
			$scope.errorMessage = "Please fill password";
			$window.document.getElementById("password").focus();
			return;
		}
		if(!($scope.email)){
			//alert("Please fill password");
			$scope.errorMessage = "Please fill email";
			$window.document.getElementById("email").focus();
			return;
		}
		if(!($scope.designation) || $scope.designation == "Select Designation"){
			//alert("Please select your designation");
			$scope.errorMessage = "Please select your designation";
			$window.document.getElementById("designation").focus();
			return;
		}
		var dataObj = {};
		dataObj["name"] = $scope.name;
		dataObj["employeeId"] = $scope.employeeId;
		dataObj["password"] = $scope.password;
		dataObj["email"] = $scope.email;
		dataObj["phone"] = $scope.phone;
		dataObj["address"] = $scope.address;
		dataObj["designation"] = $scope.designation;
		
		var req = {
				 method: 'POST',
				 url: '../rest/register/register-employee',
				 /* headers: {
				   'Content-Type': 'application/json'
				 }, */
				 data: dataObj,
			}
		
		$http(req).success(function(data, status, headers, config) {
			$scope.message = data;
			alert(data);
			$window.location.href = "../login/login.html";
		}).error(function(data, status, headers, config) {
			//alert(data);
			$scope.errorMessage = data;
		});
	}
});