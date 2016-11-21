package com.employeereferral.rest.services;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.apache.commons.io.IOUtils;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Controller;

import com.employeereferral.dao.CandidateDAO;
import com.employeereferral.model.Candidate;
import com.employeereferral.utils.CommonUtils;
import com.employeereferral.utils.ResponseUtils;
import com.google.gson.Gson;

@Controller
@Path("/candidate")
public class CandidateService {

	@Context
	HttpServletRequest request;
	
	@Inject
	CandidateDAO candidateDAO;
	
	@POST
	@Path("/add")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	public Response addCandidate(@FormDataParam("candidate") String candidateDetails,
			@FormDataParam("resume") InputStream uploadedInputStream,
			@FormDataParam("resume") FormDataContentDisposition fileDetail) throws Exception {
		try {
			CommonUtils.checkSession(request);
			Candidate candidate = new Gson().fromJson(candidateDetails, Candidate.class);
			boolean doesCandidateExist = candidateDAO.doesCandidateExist(candidate.getEmail());
			if(!doesCandidateExist){
				byte[] bytes = IOUtils.toByteArray(uploadedInputStream);
				candidate.setResume(bytes);
				candidate.setResumeName(fileDetail.getFileName());
				candidate.setStatus("Submitted");
				candidate = candidateDAO.addCandidate(candidate);
				String candidateId = candidate.getReferredBy().toUpperCase() + "-" + candidate.getId();
				candidate.setCandidateId(candidateId);
				candidateDAO.updateCandidate(candidate);
			}
			else
				return ResponseUtils.sendResponse(500, "Candidate already exists with given email id : "+candidate.getEmail());
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseUtils.sendResponse(500, e.getMessage());
		}
		return ResponseUtils.sendResponse(200, "Candidate added successfully");
	}
	
	@SuppressWarnings("unchecked")
	@GET
	@Path("/get-my-referrals/{employeeId}")
	public Response getMyReferrals(@PathParam("employeeId") String employeeId) throws Exception {
		try {
			String loggedInEmployeeId = CommonUtils.checkSession(request);
			if(employeeId == null || employeeId.equals(""))
				return ResponseUtils.sendResponse(500, "Please send Employee ID");
			
			if(!employeeId.equalsIgnoreCase(loggedInEmployeeId))
				return ResponseUtils.sendResponse(500, "Invalid Employee ID");
			
			List<Candidate> candidateList = candidateDAO.getMyReferrals(employeeId);
			
			List<JSONObject> responseList = new ArrayList<JSONObject>();
			for(Candidate candidate : candidateList){
				JSONObject candidateJson = new JSONObject();
				candidateJson.put("id", candidate.getId());
				candidateJson.put("name", candidate.getName());
				candidateJson.put("email", candidate.getEmail());
				candidateJson.put("phone", candidate.getPhone());
				candidateJson.put("alternateNumber", candidate.getAlternateNumber() != null ? candidate.getAlternateNumber() : "");
				candidateJson.put("experience", candidate.getExperience());
				candidateJson.put("skills", candidate.getSkills() != null ? candidate.getSkills() : "");
				candidateJson.put("role", candidate.getRole()!= null ? candidate.getRole() : "");
				candidateJson.put("candidateId", candidate.getCandidateId());
				candidateJson.put("status", candidate.getStatus());
				candidateJson.put("description", candidate.getDescription() != null ? candidate.getDescription() : "");
				candidateJson.put("resume", candidate.getResumeName());
				responseList.add(candidateJson);
			}
			return ResponseUtils.sendResponse(200, new Gson().toJson(responseList));
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseUtils.sendResponse(500, e.getMessage());
		}
	}
	
	@GET
	@Path("/download-candidate-resume/{id}")
	@Produces(MediaType.APPLICATION_OCTET_STREAM)
	public Response downloadCandidateResume(@PathParam("id") String id) throws Exception {
		try {
			CommonUtils.checkSession(request);
			if(id == null || id.equals(""))
				return ResponseUtils.sendResponse(500, "Please send Employee ID");

			Candidate candidate = candidateDAO.getCandidateById(id);
			if(candidate != null){
				byte[] resume = candidate.getResume();
				File f = new File(System.getProperty("java.io.tmpdir") + File.separator + candidate.getResumeName());
				OutputStream os = new FileOutputStream(f);
				os.write(resume);
				os.close();
				/*ResponseBuilder response = Response.ok(f);
	            response.header("Content-Disposition", "attachment; filename="+f.getName().replace(' ', '_'));
	            response.header("filename", candidate.getResumeName());
	            return response.build();*/

				return Response.ok(f, MediaType.APPLICATION_OCTET_STREAM)
					      .header("Content-Disposition", "attachment; filename=" + candidate.getResumeName())
					      .header("filename", candidate.getResumeName())
					      .build();
			}
			return ResponseUtils.sendResponse(500, "Candidate does not exist");
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseUtils.sendResponse(500, e.getMessage());
		}
	}
	
}