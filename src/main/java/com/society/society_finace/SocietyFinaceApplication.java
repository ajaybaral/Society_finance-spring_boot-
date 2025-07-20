package com.society.society_finace;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

@SpringBootApplication
public class SocietyFinaceApplication {

	public static void main(String[] args) {
		SpringApplication.run(SocietyFinaceApplication.class, args);
	}

@Bean
public ApplicationRunner printEndpoints(RequestMappingHandlerMapping mapping) {
    return args -> mapping.getHandlerMethods().forEach((k, v) -> System.out.println(k));
	}
}