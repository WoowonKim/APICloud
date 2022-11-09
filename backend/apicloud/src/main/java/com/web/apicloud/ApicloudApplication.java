package com.web.apicloud;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.web.apicloud.config.AppProperties;
import io.spring.initializr.web.support.SaganInitializrMetadataUpdateStrategy;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
@EnableCaching
@EnableAsync
public class ApicloudApplication {
    public static void main(String[] args) {
        SpringApplication.run(ApicloudApplication.class, args);
    }

    @Bean
    SaganInitializrMetadataUpdateStrategy saganInitializrMetadataUpdateStrategy(RestTemplateBuilder restTemplateBuilder,
                                                                                ObjectMapper objectMapper) {
        return new SaganInitializrMetadataUpdateStrategy(restTemplateBuilder.build(), objectMapper);
    }
}
