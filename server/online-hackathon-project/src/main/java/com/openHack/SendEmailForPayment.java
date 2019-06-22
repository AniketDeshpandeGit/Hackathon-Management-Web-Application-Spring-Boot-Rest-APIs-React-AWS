package com.openHack;

import java.io.IOException;

import com.sendgrid.Content;
import com.sendgrid.Email;
import com.sendgrid.Mail;
import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;

public class SendEmailForPayment {
	public boolean sendMail(String email, String subject, String body) throws IOException
	{
		//String url = "http://localhost:3000/results";
		String url = Config_url.url + "/payment";
		
		
		Email from = new Email("results@hackathon.com");
	    Email to = new Email(email);

		Content content = new Content();
		content.setType("text/html");
		content.setValue("<html><body><b>"+body+" : "+"</b><a href = "+url+">here</a></body></html>");
		Mail mail = new Mail(from, subject, to, content);
		SendGrid sg = new SendGrid("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");
		Request request = new Request();
		try 
		{
		    request.setMethod(Method.POST);
			request.setEndpoint("mail/send");
			request.setBody(mail.build());
			Response response = sg.api(request);
			} catch (IOException ex) {throw ex;}
		  
		return false;
	}
}
