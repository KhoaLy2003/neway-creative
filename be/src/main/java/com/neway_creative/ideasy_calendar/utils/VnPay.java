package com.neway_creative.ideasy_calendar.utils;


import com.neway_creative.ideasy_calendar.constant.VnPayConstant;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.TimeZone;

public class VnPay {
    public static String generateDate(boolean forExpire) {

        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");

        if (!forExpire) {

            return formatter.format(cld.getTime());
        }

        cld.add(Calendar.MINUTE, 15);
        return formatter.format(cld.getTime());
    }

    public static String md5(String message) {

        String digest = null;
        try {

            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] hash = md.digest(message.getBytes("UTF-8"));
            StringBuilder sb = new StringBuilder(2 * hash.length);
            for (byte b : hash) {

                sb.append(String.format("%02x", b & 0xff));
            }
            digest = sb.toString();
        } catch (UnsupportedEncodingException | NoSuchAlgorithmException ex) {

            digest = "";
        }

        return digest;

    }

    public static String Sha256(String message) {

        String digest = null;
        try {

            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] hash = md.digest(message.getBytes("UTF-8"));
            StringBuilder sb = new StringBuilder(2 * hash.length);
            for (byte b : hash) {

                sb.append(String.format("%02x", b & 0xff));
            }
            digest = sb.toString();
        } catch (UnsupportedEncodingException | NoSuchAlgorithmException ex) {

            digest = "";
        }

        return digest;

    }

    //Util for VNPAY
    public static String hashAllFields(Map fields) {

        List fieldNames = new ArrayList(fields.keySet());
        Collections.sort(fieldNames);
        StringBuilder sb = new StringBuilder();
        Iterator itr = fieldNames.iterator();
        while (itr.hasNext()) {

            String fieldName = (String) itr.next();
            String fieldValue = (String) fields.get(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {

                sb.append(fieldName);
                sb.append("=");
                sb.append(fieldValue);
            }
            if (itr.hasNext()) {

                sb.append("&");
            }
        }

        return hmacSHA512(VnPayConstant.SECRET_KEY, sb.toString());
    }

    public static String hmacSHA512(final String key, final String data) {

        try {

            if (key == null || data == null) {
                throw new NullPointerException();
            }

            final Mac hmac512 = Mac.getInstance("HmacSHA512");
            byte[] hmacKeyBytes = key.getBytes();
            final SecretKeySpec secretKey = new SecretKeySpec(hmacKeyBytes, "HmacSHA512");
            hmac512.init(secretKey);
            byte[] dataBytes = data.getBytes(StandardCharsets.UTF_8);
            byte[] result = hmac512.doFinal(dataBytes);
            StringBuilder sb = new StringBuilder(2 * result.length);
            for (byte b : result) {
                sb.append(String.format("%02x", b & 0xff));
            }
            return sb.toString();

        } catch (Exception ex) {

            return "";
        }

    }

    public static String getIpAddress(HttpServletRequest request) {

        String ipAdress;
        try {

            ipAdress = request.getHeader("X-FORWARDED-FOR");
            if (ipAdress == null) {

                ipAdress = request.getRemoteAddr();
            }
        } catch (Exception e) {

            ipAdress = "Invalid IP:" + e.getMessage();
        }

        return ipAdress;

    }

    public static String getRandomNumber(int len) {

        Random rnd = new Random();
        String chars = "0123456789";
        StringBuilder sb = new StringBuilder(len);
        for (int i = 0; i < len; i++) {

            sb.append(chars.charAt(rnd.nextInt(chars.length())));
        }

        return sb.toString();

    }

    public static String generateRefundHashData(Map<String, String> payload) {
        return String.join("|",
                payload.get("vnp_RequestId"),
                payload.get("vnp_Version"),
                payload.get("vnp_Command"),
                payload.get("vnp_TmnCode"),
                payload.get("vnp_TransactionType"),
                payload.get("vnp_TxnRef"),
                payload.get("vnp_Amount"),
                payload.get("vnp_TransactionNo"),
                payload.get("vnp_TransactionDate"),
                payload.get("vnp_CreateBy"),
                payload.get("vnp_CreateDate"),
                payload.get("vnp_IpAddr"),
                payload.get("vnp_OrderInfo")
        );
    }
}
