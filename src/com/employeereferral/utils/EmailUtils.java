package com.employeereferral.utils;

import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class EmailUtils {
	public static void main(String[] args) {
		Properties props = new Properties();
		props.put("mail.smtp.host", "smtp.gmail.com");
		props.put("mail.smtp.socketFactory.port", "465");
		props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.port", "465");
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

			Transport transport = session.getTransport("smtps");
			transport.connect("smtp.gmail.com", "abhayraj.18@gmail.com", "Mahaveer@24");
			transport.sendMessage(message, message.getAllRecipients());
			System.out.println("Done");
		} catch (MessagingException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}
}