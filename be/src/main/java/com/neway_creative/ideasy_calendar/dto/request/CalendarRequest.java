package com.neway_creative.ideasy_calendar.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CalendarRequest implements Serializable {

    @NotBlank(message = "Title must not blank")
    private String title;

    @NotBlank(message = "Description must not blank")
    private String description;

    @Min(value = 0L, message = "Price must be greater than or equal to 0")
    private long price;

    @NotBlank(message = "Image must not blank")
    private String image;

    @NotBlank(message = "Link notion must not blank")
    private String linkNotion;

    @JsonProperty("category_id")
    private int categoryId;
}
