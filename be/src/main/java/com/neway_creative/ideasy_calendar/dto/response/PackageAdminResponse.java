package com.neway_creative.ideasy_calendar.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Setter
@Getter
public class PackageAdminResponse extends PackageResponse implements Serializable {
    private String linkNotion;
}
