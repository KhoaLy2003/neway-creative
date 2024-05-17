package com.neway_creative.ideasy_calendar.constant;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class VnPayConstant {
    public static final String VNP_PAY_URL = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    public static final String VNP_RETURN_URL = "http://localhost:8080/api/testing/result";

//    public static final String VNP_TMN_CODE = "I5KQIAXB";
//    public static final String SECRET_KEY = "TBBRHMODHEETYDDLMFQFGIJHDZGXQTZF";
    public static final String VNP_TMN_CODE = "2GMZ7QLL";
    public static final String SECRET_KEY = "JHDDAZZ5AKJ2WACZX0IC6SB34IEE7ZNI";
    public static final String VNP_API_URL = "https://sandbox.vnpayment.vn/merchant_webapi/api/transaction";
    public static final String VNP_VERSION = "2.1.0";
    public static final String VNP_COMMAND_ORDER = "pay";
    public static final String VNP_COMMAND_STATUS = "querydr";
    public static final String ORDER_TYPE = "other";
    public static final String VNP_CURRENCY_CODE = "VND";
    public static final String VNP_LOCALE = "vn";
    public static final String VNP_IP_ADDR = "192.168.1.252";
    public static final String VNP_BANK_CODE = "NCB";
    public static final String VNP_RESPONSE_CODE = "00";
    public static final String VNP_TRANSACTION_STATUS = "00";
}
