package com.employeereferral.rest.services;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;

import org.springframework.stereotype.Controller;

import com.employeereferral.dao.RegistrationDAO;
import com.employeereferral.model.Employee;
import com.employeereferral.utils.ResponseUtils;

@Controller
@Path("/register")
public class RegistrationService {

	@Context
	HttpServletRequest request;
	
	@Inject
	RegistrationDAO registrationDAO;
	
	@POST
	@Path("/register-employee")
	public Response registerEmployee(Employee employee) throws Exception {
		try {
			if(employee == null)
				throw new Exception("Please send details");
			
			boolean doesUserExist = registrationDAO.doesEmployeeExist(employee.getEmployeeId());
			if(!doesUserExist){
				if(employee.getName() == null)
					throw new Exception("Employee name is mandatory");
				
				if(employee.getEmployeeId() == null)
					throw new Exception("Employee ID is mandatory");
				
				if(employee.getEmail() == null)
					throw new Exception("Employee email id is mandatory");
				
				if(employee.getPassword() == null)
					throw new Exception("Password is mandatory");
				
				registrationDAO.registerEmployee(employee);
			}
			else
				return ResponseUtils.sendResponse(500, "Employee already exists with Employee ID : "+employee.getEmployeeId());
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseUtils.sendResponse(500, e.getMessage());
		}
		return ResponseUtils.sendResponse(200, "Registered successfully");
	}
	
}