package com.neway_creative.ideasy_calendar.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.context.annotation.Configuration;

@OpenAPIDefinition(
        info = @Info(
                title = "The nomads",
                version = "1.0.0",
                description = "IDEASY Calendar by The Nomads"
        ),
        servers = {
                @Server(url = "http://localhost:8080", description = "Local Development Server"),
                @Server(url = "http://45.117.179.16:8088", description = "Production Server"),
        }
)

@SecurityScheme(
        name = "bearer-key",
        type = SecuritySchemeType.HTTP,
        scheme = "bearer",
        bearerFormat = "JWT",
        in = SecuritySchemeIn.HEADER
)
@Configuration
public class OpenApiConfig {

//    @Bean
//    public GroupedOpenApi publicApi(@Value("${openapi.service.api-docs}") String apiDocs) {
//        return GroupedOpenApi.builder()
//                .group(apiDocs)
//                .packagesToScan("dev.the_nomads.content_digital_calendar.controller")
//                .build();
//    }
}
