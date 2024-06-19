package com.neway_creative.ideasy_calendar.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PackageAdminResponse extends PackageResponse implements Serializable {
    private String linkNotion;
}
