package com.neway_creative.ideasy_calendar.service.impl;

import com.neway_creative.ideasy_calendar.entity.Package;
import com.neway_creative.ideasy_calendar.service.MailService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MailServiceImpl implements MailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String email;

    @Override
    public void sendVerificationEmail(String recipientEmail, String otp) {
        String subject = "Mã OTP xác thực tài khoản Ideasy";
        String text = "Mã xác thực OTP của bạn: " + otp;

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(
                    message,
                    MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                    StandardCharsets.UTF_8.name()
            );

            helper.setFrom(email);
            helper.setTo(recipientEmail);
            helper.setSubject(subject);
            helper.setText(text, true);

            mailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void sendMailTest() {
        String subject = "Test mail";
        String text = "Test mail";

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(
                    message,
                    MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                    StandardCharsets.UTF_8.name()
            );

            helper.setFrom(email);
            helper.setTo("Place your email here for testing");
            helper.setSubject(subject);
            helper.setText(text, true);

            mailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void sendMailLinkNotion(String recipientEmail, List<Package> packages) {
        String subject = "Link Notion Bộ Lịch Ý Tưởng";
        StringBuilder textBuilder = new StringBuilder();
        textBuilder.append("Cảm ơn bạn đã tin tưởng mua sản phẩm bên IDEASY. Chúng tôi xin gửi link Notion về bộ lịch bạn đã thanh toán:<br/><br/>");

        for (Package pkg : packages) {
            textBuilder.append("Bộ lịch: ").append(pkg.getCalendar().getTitle()).append("<br/>");
            textBuilder.append("Loại gói: ").append(pkg.getPackageType()).append("<br/>");
            textBuilder.append("Link Notion: <a href=\"").append(pkg.getLinkNotion()).append("\">").append(pkg.getLinkNotion()).append("</a><br/><br/>");
        }

        String text = textBuilder.toString();
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(
                    message,
                    MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                    StandardCharsets.UTF_8.name()
            );

            helper.setFrom(email);
            helper.setTo(recipientEmail);
            helper.setSubject(subject);
            helper.setText(text, true);

            mailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void sendMailNewOrderNotice(String customerEmail, String customerName) {
        String subject = "Đơn hàng mới tại IDEASY";
        String text = "Một đơn hàng mới đã được đặt của khách hàng tên: " + customerName + ", email: " + customerEmail;

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(
                    message,
                    MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                    StandardCharsets.UTF_8.name()
            );

            helper.setFrom(email);
            helper.setTo(email);
            helper.setSubject(subject);
            helper.setText(text, true);

            mailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}
