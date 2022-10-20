package com.web.trackingtest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

@SpringBootApplication
public class TrackingtestApplication {

    public static void main(String[] args) throws IOException {
        SpringApplication.run(TrackingtestApplication.class, args);
//        List<String> lines = Files.readAllLines(Paths.get("C:/S07P22B309/backend/billow/src/main/java/com/billow/controller/program/ProgramController.java"));
//        for (String line :
//                lines) {
//            System.out.println(line);
//        }
    }
}