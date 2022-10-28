package com.example.test.autoconfig;

import com.example.test.ControllerDescription;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JavaControllerGenerationDefaultContributorConfiguration {
    @Bean
    ControllerDescription controllerDescription() {
        ControllerDescription cd = new ControllerDescription();
        cd.add("name1");
        cd.add("name2");
        return cd;
    }
}
