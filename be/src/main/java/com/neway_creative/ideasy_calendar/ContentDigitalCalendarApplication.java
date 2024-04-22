package com.neway_creative.ideasy_calendar;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

/**
 * ContentDigitalCalendarApplication
 *
 * @author khoaly
 */
@SpringBootApplication
@EnableJpaAuditing
public class ContentDigitalCalendarApplication {

	public static void main(String[] args) {
		SpringApplication.run(ContentDigitalCalendarApplication.class, args);
	}

}
