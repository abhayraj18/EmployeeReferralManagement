package com.employeereferral.rest.services;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.HashMap;
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

import com.employeereferral.dao.EmployeeDAO;
import com.employeereferral.model.Candidate;
import com.employeereferral.model.Employee;
import com.employeereferral.utils.CommonUtils;
import com.employeereferral.utils.EmailUtils;
import com.employeereferral.utils.ResponseUtils;
import com.google.gson.Gson;

@Controller
@Path("/employee")
public class EmployeeService {

	@Context
	HttpServletRequest request;
	
	@Inject
	EmployeeDAO employeeDAO;
	
	@POST
	@Path("/add-candidate")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	public Response addCandidate(@FormDataParam("candidate") String candidateDetails,
			@FormDataParam("resume") InputStream uploadedInputStream,
			@FormDataParam("resume") FormDataContentDisposition fileDetail) throws Exception {
		try {
			//CommonUtils.checkSession(request);
			Candidate candidate = new Gson().fromJson(candidateDetails, Candidate.class);
			boolean doesCandidateExist = employeeDAO.doesCandidateExist(candidate.getEmail());
			if(!doesCandidateExist){
				byte[] bytes = IOUtils.toByteArray(uploadedInputStream);
				candidate.setResume(bytes);
				candidate.setResumeName(fileDetail.getFileName());
				candidate.setStatus("Submitted");
				candidate = employeeDAO.addCandidate(candidate);
				String candidateId = candidate.getReferredBy().toUpperCase() + "-" + candidate.getId();
				candidate.setCandidateId(candidateId);
				employeeDAO.updateCandidate(candidate);
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
	@Path("/get-my-referrals/{pageNumber}/{employeeId}")
	public Response getMyReferrals(@PathParam("pageNumber") String pageNumber, @PathParam("employeeId") String employeeId) throws Exception {
		try {
			//Employee loggedInEmployee = CommonUtils.checkSession(request);
//			//Employee loggedInEmployee = employeeDAO.getEmployeebyEmployeeId(employeeId);
			if(employeeId == null || employeeId.equals(""))
				return ResponseUtils.sendResponse(500, "Please send Employee ID");
			
			/*if(!employeeId.equalsIgnoreCase(loggedInEmployee.getEmployeeId()))
				return ResponseUtils.sendResponse(500, "Invalid Employee ID");*/
			
			if(pageNumber == null || pageNumber.equals(""))
				return ResponseUtils.sendResponse(500, "Please send page number");
			
			List<Candidate> candidateList = employeeDAO.getMyReferrals(employeeId, pageNumber);
			JSONObject responseJson = new JSONObject();
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
				candidateJson.put("isChecked", candidate.isChecked());
				candidateJson.put("checkedBy", candidate.getCheckedBy());
				responseList.add(candidateJson);
			}
			responseJson.put("totalSize", employeeDAO.getAllMyReferralSize(employeeId));
			responseJson.put("referrals", responseList);
			return ResponseUtils.sendResponse(200, responseJson.toString());
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseUtils.sendResponse(500, e.getMessage());
		}
	}
	
	@SuppressWarnings("unchecked")
	@GET
	@Path("/get-all-referrals/{pageNumber}")
	public Response getAllReferrals(@PathParam("pageNumber") String pageNumber) throws Exception {
		try {
			//CommonUtils.checkSession(request);
			if(pageNumber == null || pageNumber.equals(""))
				return ResponseUtils.sendResponse(500, "Please send page number");
			
			List<Candidate> candidateList = employeeDAO.getAllReferrals(pageNumber);
			List<JSONObject> responseList = new ArrayList<JSONObject>();
			JSONObject responseJson = new JSONObject();
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
				candidateJson.put("isChecked", candidate.isChecked());
				candidateJson.put("checkedBy", candidate.getCheckedBy());
				responseList.add(candidateJson);
			}
			responseJson.put("totalSize", employeeDAO.getAllReferralSize());
			responseJson.put("referrals", responseList);
			return ResponseUtils.sendResponse(200, responseJson.toString());
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
			//CommonUtils.checkSession(request);
			if(id == null || id.equals(""))
				return ResponseUtils.sendResponse(500, "Please send Candidate ID");
			
			Candidate candidate = employeeDAO.getCandidateById(id);
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
	
	@GET
	@Path("/send-call-letter/{id}/{employeeId}")
	public Response sendCallLetter(@PathParam("id") String id, @PathParam("employeeId") String employeeId) throws Exception {
		try {
			//Employee loggedInEmployee = CommonUtils.checkSession(request);
			Employee loggedInEmployee = employeeDAO.getEmployeebyEmployeeId(employeeId);
			if(id == null || id.equals(""))
				return ResponseUtils.sendResponse(500, "Please send Candidate ID");
			
			Candidate candidate = employeeDAO.getCandidateById(id);
			if(candidate != null){
				HashMap<String, String> mailDetail = new HashMap<String, String>();
				mailDetail.put("candidateName", candidate.getName());
				mailDetail.put("role", candidate.getRole());
				String date = CommonUtils.getNextSaturday();
				mailDetail.put("date", date);
				mailDetail.put("location", CommonUtils.getLocation());
				mailDetail.put("senderName", loggedInEmployee.getName());
				mailDetail.put("senderDesignation", loggedInEmployee.getDesignation());
				mailDetail.put("phone", CommonUtils.getPhoneNumber());
				String emailBody = EmailUtils.getEmailBody(mailDetail, "EmailTemplates/call_letter.tpl");
				String subject = "Interview call letter for the position of "+candidate.getRole();
				EmailUtils.sendEmail(subject, emailBody, loggedInEmployee.getEmail(), candidate.getEmail());
				candidate.setStatus("Call letter sent");
				candidate.setChecked(true);
				candidate.setCheckedBy(loggedInEmployee.getName() + " - " + loggedInEmployee.getEmployeeId());
				employeeDAO.updateCandidate(candidate);
				return ResponseUtils.sendResponse(200, "Call letter sent successfully");
			}
			return ResponseUtils.sendResponse(500, "Candidate does not exist");
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseUtils.sendResponse(500, e.getMessage());
		}
	}
	
	@GET
	@Path("/reject/{id}/{employeeId}")
	public Response rejectCandidate(@PathParam("id") String id, @PathParam("employeeId") String employeeId) throws Exception {
		try {
			//Employee loggedInEmployee = CommonUtils.checkSession(request);
			Employee loggedInEmployee = employeeDAO.getEmployeebyEmployeeId(employeeId);
			if(id == null || id.equals(""))
				return ResponseUtils.sendResponse(500, "Please send Candidate ID");
			
			Candidate candidate = employeeDAO.getCandidateById(id);
			if(candidate != null){
				candidate.setStatus("Rejected");
				candidate.setChecked(true);
				candidate.setCheckedBy(loggedInEmployee.getName() + " - " + loggedInEmployee.getEmployeeId());
				employeeDAO.updateCandidate(candidate);
				return ResponseUtils.sendResponse(200, "Rejected");
			}
			return ResponseUtils.sendResponse(500, "Candidate does not exist");
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseUtils.sendResponse(500, e.getMessage());
		}
	}
	
	@SuppressWarnings("unchecked")
	@GET
	@Path("/get-candidate-details/{id}")
	public Response getCandidateDetails(@PathParam("id") String id) throws Exception {
		try {
			if(id == null || id.equals(""))
				return ResponseUtils.sendResponse(500, "Please send Candidate ID");
			
			Candidate candidate = employeeDAO.getCandidateById(id);
			if(candidate != null){
				JSONObject candidateJson = new JSONObject();
				candidateJson.put("id", candidate.getId());
				candidateJson.put("name", candidate.getName());
				candidateJson.put("email", candidate.getEmail());
				candidateJson.put("phone", candidate.getPhone());
				candidateJson.put("alternateNumber", candidate.getAlternateNumber() != null ? candidate.getAlternateNumber() : "");
				candidateJson.put("experience", candidate.getExperience());
				candidateJson.put("role", candidate.getRole()!= null ? candidate.getRole() : "");
				candidateJson.put("candidateId", candidate.getCandidateId());
				candidateJson.put("status", candidate.getStatus());
				candidateJson.put("description", candidate.getDescription() != null ? candidate.getDescription() : "");
				candidateJson.put("resume", candidate.getResumeName());
				candidateJson.put("isChecked", candidate.isChecked());
				candidateJson.put("checkedBy", candidate.getCheckedBy());
				return ResponseUtils.sendResponse(200, candidateJson.toString());
			}
			return ResponseUtils.sendResponse(500, "Candidate does not exist");
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseUtils.sendResponse(500, e.getMessage());
		}
	}
	
}