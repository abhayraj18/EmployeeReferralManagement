package com.employeereferral.rest.services;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;

import org.json.simple.JSONObject;
import org.springframework.stereotype.Component;

import com.employeereferral.dao.LoginDAO;
import com.employeereferral.pojo.LoginInfo;
import com.employeereferral.utils.CommonUtils;
import com.employeereferral.utils.ResponseUtils;

@Component
@Path("/login")
public class LoginService {
	
	@Context
	HttpServletRequest request;
	
	@Inject
	LoginDAO loginDAO;
	
	@SuppressWarnings("unchecked")
	@POST
	@Path("/do-login")
	public Response doLogin(LoginInfo loginInfo) throws Exception {
		try {
			boolean isAuthenticated = loginDAO.authenticateUser(loginInfo);
			if(isAuthenticated){
				JSONObject response = new JSONObject();
				response.put("empId", loginInfo.getEmployeeId());
				request.getSession().setAttribute("empId", loginInfo.getEmployeeId());
				return ResponseUtils.sendResponse(200, response.toString());
			}
			else
				return ResponseUtils.sendResponse(500, "Invalid credentials");
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseUtils.sendResponse(200, "Invalid credentials");
		}
	}
	
	@GET
	@Path("/get-logged-in-employee")
	public Response getLoggedInEmployee() throws Exception {
		try {
			String loggedInEmployeeId = CommonUtils.checkSession(request);
			return ResponseUtils.sendResponse(200, loggedInEmployeeId);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseUtils.sendResponse(500, e.getMessage());
		}
	}
	
	@GET
	@Path("/do-logout")
	public void doLogout() throws Exception {
		try {
			request.getSession().removeAttribute("empId");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}