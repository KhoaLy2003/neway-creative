package com.neway_creative.ideasy_calendar.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import java.io.Serializable;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PackageRequest implements Serializable {
    @JsonProperty("package_price")
    @Min(value = 0L, message = "Package price must be greater than or equal to 0")
    private long packagePrice;

    @JsonProperty("package_duration_value")
    @NotEmpty(message = "Package duration value must not be empty")
    private int packageDurationValue;

    @JsonProperty("package_duration_unit")
    @NotBlank(message = "Package duration unit must not be blank")
    private String packageDurationUnit;

    @JsonProperty("package_type")
    @NotBlank(message = "Package type must not be blank")
    private String packageType;

    @JsonProperty("link_notion")
    @NotBlank(message = "Link notion must not be blank")
    private String linkNotion;
}
