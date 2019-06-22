package com.openHack;

import com.sendgrid.*;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class SendEmail {
	public static void main(String[] args) throws IOException {

		List<String> listofemails = new ArrayList<String>();
		listofemails.add("aakash.alurkar95@gmail.com");
		// listofemails.add("aakash.alurkar@sjsu.edu");

		// String url = "http://localhost:3000/payment";
		String url = Config_url.url + "/payment";

		for (String s : listofemails) {
			Email from = new Email("test@example.com");
			String subject = "Invoice from OpenHack";
			Email to = new Email(s);
			// Content content = new Content("text/plain", "email body");
			Content content = new Content();
			content.setType("text/html");
			content.setValue("<html><body><b>test</b><br><br><a href = " + url + ">test link</a></body></html>");
			Mail mail = new Mail(from, subject, to, content);
			SendGrid sg = new SendGrid("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");
			Request request = new Request();
			try {
				request.setMethod(Method.POST);
				request.setEndpoint("mail/send");
				request.setBody(mail.build());
				Response response = sg.api(request);
			} catch (IOException ex) {
				throw ex;
			}
		}

	}
}