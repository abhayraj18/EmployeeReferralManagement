package com.employeereferral.utils;

import javax.ws.rs.core.Response;

public class ResponseUtils {

	public static Response sendResponse(int statusCode, String response) {
		return Response.status(statusCode).entity(response).header("Access-Control-Allow-Origin", "*")
	            .header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS")
	            .header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, X-Codingpedia,Authorization").build();
	}
	
}