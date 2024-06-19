package com.neway_creative.ideasy_calendar.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.io.Serializable;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CreatePostRequest implements Serializable {

    @NotBlank
    private String title;

    private String description;

    @NotBlank
    private String content;

    private String thumbnail;

}
