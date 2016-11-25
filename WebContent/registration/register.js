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
	
	$scope.register = function register(){
		if(!($scope.name)){
			alert("Please fill name");
			return;
		}
		if(!($scope.employeeId)){
			alert("Please fill employeeId");
			return;
		}
		if(!($scope.password)){
			alert("Please fill password");
			return;
		}
		if(!($scope.designation) || $scope.designation == "Select Designation"){
			alert("Please select your designation");
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
			alert(data);
		});
	}
});