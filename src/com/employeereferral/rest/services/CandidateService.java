package com.employeereferral.rest.services;

import java.io.InputStream;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.apache.commons.io.IOUtils;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;
import org.springframework.stereotype.Controller;

import com.employeereferral.dao.CandidateDAO;
import com.employeereferral.model.Candidate;
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
			Candidate candidate = new Gson().fromJson(candidateDetails, Candidate.class);
			boolean doesCandidateExist = candidateDAO.doesCandidateExist(candidate.getEmail());
			if(!doesCandidateExist){
				byte[] bytes = IOUtils.toByteArray(uploadedInputStream);
				candidate.setResume(bytes);
				candidate.setResumeName(fileDetail.getFileName());
				candidate = candidateDAO.addCandidate(candidate);
				String candidateId = candidate.getReferredBy() + "-" + candidate.getId();
				candidate.setCandidateId(candidateId);
				candidateDAO.updateCandidate(candidate);
			}
			else
				return ResponseUtils.sendResponse(500, "Candidate already exists with given email id : "+candidate.getEmail());
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseUtils.sendResponse(200, "Candidate details could not be saved");
		}
		return ResponseUtils.sendResponse(200, "Candidate added successfully");
	}
	
}