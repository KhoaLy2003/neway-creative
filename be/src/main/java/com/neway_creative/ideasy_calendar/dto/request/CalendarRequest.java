package com.neway_creative.ideasy_calendar.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import java.io.Serializable;
import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CalendarRequest implements Serializable {

    @NotBlank(message = "Title must not be blank")
    private String title;

    @NotBlank(message = "Description must not be blank")
    private String description;

    @NotBlank(message = "Image must not be blank")
    private String image;

    @JsonProperty("category_id")
    private int categoryId;

    @NotEmpty(message = "Package list must not be empty")
    private List<PackageRequest> packages;
}
