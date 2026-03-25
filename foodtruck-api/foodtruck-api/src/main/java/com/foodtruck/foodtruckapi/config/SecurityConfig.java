package com.foodtruck.foodtruckapi.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    protected SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable());
//        http
//                .authorizeHttpRequests(
//                        (auth) -> auth
//                                .requestMatchers("/", "/login*",
//                                        "/css/*", "/js/*", "/sign-up", "/signup-process").permitAll()
//                                .requestMatchers("/home").hasAnyRole("USER", "ADMIN")
//                                .anyRequest().authenticated()
//                )
//
//                .formLogin(form -> form
//                        .loginPage("/login")
//                        .loginProcessingUrl("/login") // should point to login page
//                        .successForwardUrl("/home") // must be in order thymeleaf security extras work
//                        .permitAll()
//                )
//                .logout(
//                        logout -> logout
//                                .invalidateHttpSession(true)
//                                .clearAuthentication(true)
//                                .logoutUrl("/logout")
//                                .permitAll()
//                );
        return http.build();

    }
}
