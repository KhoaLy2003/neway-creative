package com.neway_creative.ideasy_calendar.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CreatePostRequest implements Serializable {

    private String content;

    private String thumbnail;

}
