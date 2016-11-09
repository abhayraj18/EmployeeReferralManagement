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
			boolean doesUserExist = registrationDAO.doesEmployeeExist(employee.getEmployeeId());
			if(!doesUserExist)
				registrationDAO.registerEmployee(employee);
			else
				return ResponseUtils.sendResponse(500, "Employee already exists with Employee ID : "+employee.getEmployeeId());
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseUtils.sendResponse(200, "Employee could not be registered");
		}
		return ResponseUtils.sendResponse(200, "Registered successfully");
	}
	
}