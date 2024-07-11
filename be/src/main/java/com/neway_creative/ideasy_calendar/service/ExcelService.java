package com.neway_creative.ideasy_calendar.service;

import org.springframework.web.multipart.MultipartFile;

public interface ExcelService {
    boolean isValidExcelFile(MultipartFile file);

    void saveOrderFromExcel(MultipartFile file);
}
