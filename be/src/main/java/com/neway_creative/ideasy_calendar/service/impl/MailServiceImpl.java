package com.neway_creative.ideasy_calendar.service.impl;

import com.neway_creative.ideasy_calendar.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.internet.MimeMessage;
import java.nio.charset.StandardCharsets;

@Service
public class MailServiceImpl implements MailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String email;

    @Override
    public void sendMailTest() {
        try {
            MimeMessage message = mailSender.createMimeMessage();

            MimeMessageHelper helper = new MimeMessageHelper(
                    message,
                    MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, //file, mail, text
                    StandardCharsets.UTF_8.name()
            );

            helper.setFrom(email);
            helper.setText("Hello");
            helper.setCc("khoaly090141@gmail.com");
            helper.setTo("khoalndse172103@fpt.edu.vn");
            helper.setSubject("Mail test with template html");

            mailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
