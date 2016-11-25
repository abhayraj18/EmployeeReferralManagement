package com.employeereferral.utils;

import java.text.SimpleDateFormat;
import java.util.Calendar;

import javax.servlet.http.HttpServletRequest;

import com.employeereferral.model.Employee;

public class CommonUtils {

	public static Employee checkSession(HttpServletRequest request) throws Exception {
		Employee loggedInEmployee = (Employee) request.getSession().getAttribute("employee");
		if(loggedInEmployee == null)
			throw new Exception("Session Expired");
		return loggedInEmployee;
	}

	public static String getNextSaturday() {
		Calendar date = Calendar.getInstance();
        date.set(Calendar.AM_PM, Calendar.AM);
		while (date.get(Calendar.DAY_OF_WEEK) != Calendar.SATURDAY) {
		    date.add(Calendar.DATE, 1);
		}
		date.set(Calendar.HOUR, 11);
		date.set(Calendar.MINUTE, 0);
		date.set(Calendar.SECOND, 0);
		SimpleDateFormat dateFormat = new SimpleDateFormat("E dd/MM/yyyy, hh:mm a");
		String dateString = dateFormat.format(date.getTime());
		return dateString;
	}

	public static String getLocation() {
		String location = "Tavant Technologies India Pvt. Ltd.<br/>" +
						"#12, CSRIE-II, Guava Garden, 5th Block, Koramangala<br/>" +
						"Bangalore 560 095<br/>";
		return location;
	}

	public static String getPhoneNumber() {
		String phone = "+91-80-4119-0300"; 	
		return phone;
	}

}