package com.employeereferral.utils;

import javax.servlet.http.HttpServletRequest;

public class CommonUtils {

	public static String checkSession(HttpServletRequest request) throws Exception {
		String loggedInEmployeeId = (String) request.getSession().getAttribute("empId");
		if(loggedInEmployeeId == null)
			throw new Exception("Session Expired");
		return loggedInEmployeeId;
	}

}