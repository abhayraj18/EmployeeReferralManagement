var referralApp = angular.module("referralApp", []);
referralApp.controller("getReferralController", function($scope, $rootScope, $http, $window){
	$scope.employeeId = $rootScope.employeeId;
	$scope.designation = $rootScope.designation;
	if(!$scope.employeeId){
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
			getMyReferrals(0);
		}).error(function(data, status, headers, config) {
			alert(data);
			if(data == "Session Expired")
				$window.location.href = "../login/login.html";
		});
	}else
		getMyReferrals(0);
	
	function getMyReferrals(pageNo){
		$scope.getMyReferrals(pageNo);
	}
	
	$scope.getMyReferrals = function getMyReferrals(pageNo){
		var req = {
				 method: 'GET',
				 url: '../rest/candidate/get-my-referrals/'+pageNo+'/'+$scope.employeeId,
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
	
	$scope.downloadCandidateResume = function downloadCandidateResume(id){
		var req = {
				 method: 'GET',
				 url: '../rest/candidate/download-candidate-resume/'+id,
			}
		/*url = '../rest/candidate/download-candidate-resume/'+id;
		$window.location.href = url;*/
		$http(req).success(function(data, status, headers, config) {
			var headers = headers();
			var filename = headers['filename'];
			var contentType = headers['content-type'];
			var blob = new Blob([data], { type: contentType });
			var url = URL.createObjectURL(blob);
			var a = document.createElement('a');
			a.href = url;
			a.download = filename;
			a.target = '_blank';
			a.click();
		}).error(function(data, status, headers, config) {
			alert(data);
			if(data == "Session Expired")
				$window.location.href = "../login/login.html";
		});
	}
	
	$scope.sendCallLetter = function sendCallLetter(id){
		var req = {
				 method: 'GET',
				 url: '../rest/candidate/send-call-letter/'+id,
			}
		$http(req).success(function(data, status, headers, config) {
			alert(data);
			$window.location.href = "index.html#/getMyReferrals";
		}).error(function(data, status, headers, config) {
			alert(data);
			if(data == "Session Expired")
				$window.location.href = "../login/login.html";
		});
	}
	
	$scope.rejectCandidate = function rejectCandidate(id){
		var req = {
				 method: 'GET',
				 url: '../rest/candidate/reject/'+id,
			}
		$http(req).success(function(data, status, headers, config) {
			//alert(data);
			$window.location.href = "index.html#/getMyReferrals";
		}).error(function(data, status, headers, config) {
			alert(data);
			if(data == "Session Expired")
				$window.location.href = "../login/login.html";
		});
	}
});

referralApp.controller("getAllReferralController", function($scope, $rootScope, $http, $window){
	$scope.employeeId = $rootScope.employeeId;
	$scope.designation = $rootScope.designation;
	if(!$scope.employeeId){
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
			getAllReferrals(0);
		}).error(function(data, status, headers, config) {
			alert(data);
			if(data == "Session Expired")
				$window.location.href = "../login/login.html";
		});
	}else
		getAllReferrals(0);
	
	$scope.getAllReferrals = function getAllReferrals(pageNo){
		var req = {
				 method: 'GET',
				 url: '../rest/candidate/get-all-referrals/'+pageNo,
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
	
	function getAllReferrals(pageNo){
		$scope.getAllReferrals(pageNo);
	}
	
	$scope.getNumber = function(num) {
		return new Array(num);   
	}
	
	$scope.downloadCandidateResume = function downloadCandidateResume(id){
		var req = {
				 method: 'GET',
				 url: '../rest/candidate/download-candidate-resume/'+id,
			}
		/*url = '../rest/candidate/download-candidate-resume/'+id;
		$window.location.href = url;*/
		$http(req).success(function(data, status, headers, config) {
			var headers = headers();
			var filename = headers['filename'];
			var contentType = headers['content-type'];
			var blob = new Blob([data], { type: contentType });
			var url = URL.createObjectURL(blob);
			var a = document.createElement('a');
			a.href = url;
			a.download = filename;
			a.target = '_blank';
			a.click();
		}).error(function(data, status, headers, config) {
			alert(data);
			if(data == "Session Expired")
				$window.location.href = "../login/login.html";
		});
	}
	
	$scope.sendCallLetter = function sendCallLetter(id){
		var req = {
				 method: 'GET',
				 url: '../rest/candidate/send-call-letter/'+id,
			}
		$http(req).success(function(data, status, headers, config) {
			alert(data);
			$window.location.href = "index.html#/getAllReferrals";
		}).error(function(data, status, headers, config) {
			alert(data);
			if(data == "Session Expired")
				$window.location.href = "../login/login.html";
		});
	}
	
	$scope.rejectCandidate = function rejectCandidate(id){
		var req = {
				 method: 'GET',
				 url: '../rest/candidate/reject/'+id,
			}
		$http(req).success(function(data, status, headers, config) {
			//alert(data);
			$window.location.href = "index.html#/getAllReferrals";
		}).error(function(data, status, headers, config) {
			alert(data);
			if(data == "Session Expired")
				$window.location.href = "../login/login.html";
		});
	}
});

referralApp.directive('ngFiles', ['$parse', function ($parse) {

    function fn_link(scope, element, attrs) {
        var onChange = $parse(attrs.ngFiles);
        element.on('change', function (event) {
            onChange(scope, { $files: event.target.files });
        });
    };

    return {
        link: fn_link
    }
} ]);

referralApp.controller("addReferralController", function($scope, $rootScope, $http, $window){
	$scope.experiences = ["Select Experience", "Fresher", "1-2 Years", "2-3 Years", "3-5 Years", "5-8 Years", "8-10 Years", ">10 Years"];
	$scope.experience = $scope.experiences[0];
	
	/*$scope.languages = ["Java", ".NET", "AngularJS"];
	$scope.referredFor = $scope.languages[0];*/
	
	$scope.employeeId = $rootScope.employeeId;
	if(!$scope.employeeId){
		var req = {
				 method: 'GET',
				 url: '../rest/login/get-logged-in-employee'
			}
		$http(req).success(function(data, status, headers, config) {
			$scope.employeeId = data.employeeId;
		}).error(function(data, status, headers, config) {
			alert(data);
			if(data == "Session Expired")
				$window.location.href = "../login/login.html";
		});
	}
	
	var formdata = new FormData();
    $scope.getTheFiles = function ($files) {
        angular.forEach($files, function (value, key) {
            formdata.append("resume", value);
            $scope.resume = value;
        });
    };
    
	$scope.submitDetails = function submitDetails(){
		if(!$scope.resume){
			alert("Please select resume");
			return;
		}
		formdata.delete('candidate');
		var dataObj = {};
		dataObj["name"] = $scope.name;
		dataObj["email"]= $scope.email;
		dataObj["phone"] = $scope.phone;
		dataObj["alternateNumber"]= $scope.alternateNumber;
		dataObj["experience"] = $scope.experience;
		dataObj["skills"]= $scope.skills;
		dataObj["role"] = $scope.role;
		dataObj["referredBy"] = $scope.employeeId;
		formdata.append("candidate", angular.toJson(dataObj));
        var req = {
            method: 'POST',
            url: '../rest/candidate/add',
            data: formdata,
            headers: {
                'Content-Type': undefined
            }
        };
		
        $http(req).success(function(data, status, headers, config) {
			$scope.message = data;
			alert(data);
			$window.location.href = "index.html#/getMyReferrals";
		}).error(function(data, status, headers, config) {
			alert(data);
		});
	}
});