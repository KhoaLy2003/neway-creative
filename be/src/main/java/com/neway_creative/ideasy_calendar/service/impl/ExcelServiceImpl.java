package com.neway_creative.ideasy_calendar.service.impl;

import com.neway_creative.ideasy_calendar.dto.OrderExcelDto;
import com.neway_creative.ideasy_calendar.entity.Customer;
import com.neway_creative.ideasy_calendar.entity.Order;
import com.neway_creative.ideasy_calendar.entity.Package;
import com.neway_creative.ideasy_calendar.enumeration.OrderEnum;
import com.neway_creative.ideasy_calendar.enumeration.RoleEnum;
import com.neway_creative.ideasy_calendar.enumeration.StatusEnum;
import com.neway_creative.ideasy_calendar.repository.CustomerRepository;
import com.neway_creative.ideasy_calendar.repository.OrderRepository;
import com.neway_creative.ideasy_calendar.repository.PackageRepository;
import com.neway_creative.ideasy_calendar.service.ExcelService;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ExcelServiceImpl implements ExcelService {

    private static final Logger LOGGER = LoggerFactory.getLogger(ExcelServiceImpl.class);
    private final CustomerRepository customerRepository;
    private final OrderRepository orderRepository;
    private final PackageRepository packageRepository;

    @Override
    public boolean isValidExcelFile(MultipartFile file) {
        return Objects.equals(file.getContentType(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    }

    @Override
    public void saveOrderFromExcel(MultipartFile file) {
        List<Integer> packageColumns = new ArrayList<>();

        try {
            XSSFWorkbook workbook = new XSSFWorkbook(file.getInputStream());
            XSSFSheet sheet = workbook.getSheet("orders");
            int rowIndex = 0;
            for (Row row : sheet) {
                if (rowIndex == 0) {
                    for (Cell cell : row) {
                        if (cell.getStringCellValue().equalsIgnoreCase("Package")) {
                            packageColumns.add(cell.getColumnIndex());
                        }
                    }
                    rowIndex++;
                    continue;
                }
                Iterator<Cell> cellIterator = row.iterator();
                int cellIndex = 0;

                OrderExcelDto orderExcelDto = new OrderExcelDto();
                List<Integer> packageIds = new ArrayList<>();
                while (cellIterator.hasNext()) {
                    Cell cell = cellIterator.next();
                    switch (cellIndex) {
                        case 0 -> orderExcelDto.setName(cell.getStringCellValue());
                        case 1 -> orderExcelDto.setFacebookUrl(cell.getStringCellValue());
                        case 2 -> orderExcelDto.setOrderDate(cell.getLocalDateTimeCellValue().toLocalDate());
                        default -> {
                            if (packageColumns.contains(cellIndex) && (cell.getCellType() == CellType.NUMERIC)) {
                                packageIds.add((int) cell.getNumericCellValue());
                            }
                        }
                    }
                    cellIndex++;
                }

                orderExcelDto.setPackageIds(packageIds);
                Optional<Customer> existingCustomer = customerRepository.findByFacebookUrlAndName(orderExcelDto.getFacebookUrl(), orderExcelDto.getName());
                if (existingCustomer.isPresent()) {
                    createNewOrderFromRow(existingCustomer.get(), orderExcelDto);
                } else {
                    Customer newCustomer = createNewCustomerFromRow(orderExcelDto);
                    createNewOrderFromRow(newCustomer, orderExcelDto);
                }
            }
        } catch (IOException e) {
            e.getStackTrace();
        }
    }

    private Customer createNewCustomerFromRow(OrderExcelDto orderExcelDto) {
        Customer newCustomer = Customer
                .builder()
                .name(orderExcelDto.getName())
                .facebookUrl(orderExcelDto.getFacebookUrl())
                .status(StatusEnum.ACTIVE)
                .role(RoleEnum.CUSTOMER)
                .build();
        return customerRepository.save(newCustomer);
    }

    private void createNewOrderFromRow(Customer customer, OrderExcelDto orderExcelDto) {
        Optional<Order> existingOrder = orderRepository.findByCustomerAndOrderDate(customer, orderExcelDto.getOrderDate().atStartOfDay());

        if (existingOrder.isPresent()) {
            LOGGER.info("Order already exists for customer: {} on date: {}", customer.getName(), orderExcelDto.getOrderDate());
            return;
        }

        Set<Package> packages = new HashSet<>(packageRepository.findAllById(orderExcelDto.getPackageIds()));
        long orderPrice = packages.stream().mapToLong(Package::getPrice).sum();

        Order order = new Order();
        order.setOrderDate(orderExcelDto.getOrderDate().atStartOfDay());
        order.setPrice(orderPrice);
        order.setStatus(OrderEnum.COMPLETED);
        order.setPackages(packages);
        order.setCustomer(customer);
        order.setCreatedAt(orderExcelDto.getOrderDate().atStartOfDay());
        order.setUpdatedAt(orderExcelDto.getOrderDate().atStartOfDay());

        orderRepository.save(order);
    }
}
