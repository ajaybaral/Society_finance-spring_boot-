package com.society.society_finace.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Society Finance Management System API")
                        .description("""
                                ## Society Finance Management System
                                
                                A comprehensive REST API for managing society finances, maintenance records, 
                                flat details, fund transactions, and more.
                                
                                ### Features:
                                - **User Management** - Register, login, and manage users with role-based access
                                - **Flat Management** - Manage flat details and information
                                - **Maintenance Records** - Track maintenance payments and records
                                - **Voucher Claims** - Handle voucher claims and reimbursements
                                - **Fund Transactions** - Manage society fund transactions (CREDIT/DEBIT)
                                - **Contact Management** - Handle contact form submissions
                                
                                ### Authentication:
                                - JWT-based authentication
                                - Role-based access control (ADMIN/USER)
                                - Secure endpoints with Bearer token
                                
                                ### Usage:
                                1. Register a user: `POST /api/auth/register`
                                2. Login to get JWT token: `POST /api/auth/login`
                                3. Use the token in Authorization header: `Bearer <your-token>`
                                """)
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Society Finance Team")
                                .email("admin@societyfinance.com")
                                .url("https://societyfinance.com"))
                        .license(new License()
                                .name("MIT License")
                                .url("https://opensource.org/licenses/MIT")))
                .servers(List.of(
                        new Server()
                                .url("http://localhost:8080")
                                .description("Local Development Server"),
                        new Server()
                                .url("https://api.societyfinance.com")
                                .description("Production Server")))
                .addSecurityItem(new SecurityRequirement().addList("Bearer Authentication"))
                .components(new Components()
                        .addSecuritySchemes("Bearer Authentication", new SecurityScheme()
                                .type(SecurityScheme.Type.HTTP)
                                .scheme("bearer")
                                .bearerFormat("JWT")
                                .description("Enter your JWT token in the format: Bearer <token>")));
    }
} 