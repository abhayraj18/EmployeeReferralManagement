package com.employeereferral.utils;

import java.io.IOException;
import java.io.StringWriter;
import java.net.URL;
import java.util.HashMap;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.VelocityEngine;
import org.apache.velocity.exception.MethodInvocationException;
import org.apache.velocity.exception.ParseErrorException;
import org.apache.velocity.exception.ResourceNotFoundException;

import com.google.common.base.Charsets;
import com.google.common.io.Resources;

public class EmailUtils {
	public static void main(String[] args) throws IOException {
		URL url = Resources.getResource("EmailTemplates/call_letter.tpl");
        String text = Resources.toString(url, Charsets.UTF_8);
        System.out.println(text);
		Properties props = new Properties();
		props.put("mail.smtp.host", "localhost");
		props.put("mail.smtp.port", "25");
		props.put("mail.transport.protocol", "smtp");

		Session session = Session.getInstance(props);

		try {
			Message message = new MimeMessage(session);
			message.setFrom(new InternetAddress("abhayraj.18@gmail.com"));
			message.setRecipients(Message.RecipientType.TO,
					InternetAddress.parse("abhayraj.18@gmail.com"));
			message.setSubject("Testing Subject");
			message.setText("Dear Mail Crawler," +
					"\n\n No spam to my email, please!");

			Transport transport = session.getTransport();
			transport.connect("localhost", "abcd", "abcd");
			Transport.send(message, message.getAllRecipients());
			System.out.println("Done");
		} catch (MessagingException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}

	public static String getEmailBody(HashMap<String, String> mailDetail, String templateLocation) throws ParseErrorException, MethodInvocationException, ResourceNotFoundException, IOException {
		VelocityEngine ve = new VelocityEngine();
        ve.init();
        
        VelocityContext context = new VelocityContext();
        context.put("mailDetail", mailDetail);
        StringWriter emailBody = new StringWriter();
        URL url = Resources.getResource(templateLocation);
        String tplText = Resources.toString(url, Charsets.UTF_8);
        ve.evaluate(context, emailBody, "", tplText); 
		return emailBody.toString();
	}

	public static void sendEmail(String subject, String emailBody, String senderEmail, String recepientEmail) throws Exception {
		Properties props = new Properties();
		props.put("mail.smtp.host", "localhost");
		props.put("mail.smtp.port", "25");
		props.put("mail.transport.protocol", "smtp");

		Session session = Session.getInstance(props);
		try {
			Message message = new MimeMessage(session);
			message.setFrom(new InternetAddress(senderEmail));
			message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(recepientEmail));
			message.setSubject(subject);
			message.setContent(emailBody, "text/html");

			Transport transport = session.getTransport();
			transport.connect("localhost", "abcd", "abcd");
			Transport.send(message, message.getAllRecipients());
		} catch (MessagingException e) {
			e.printStackTrace();
			throw new Exception(e);
		}
	}
}