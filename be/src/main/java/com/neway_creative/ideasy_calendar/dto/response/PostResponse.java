package com.neway_creative.ideasy_calendar.dto.response;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostResponse implements Serializable {
    private String content;

    private String thumbnail;
}
