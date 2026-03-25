package com.foodtruck.foodtruckapi.util;

import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.Jwts;
import java.util.Date;

import javax.crypto.SecretKey;

@Component
public class JwtUtil {

   @Value("${jwt.secret}")
   private String secretKey;

   @Value("${jwt.expiration}")
   private long expirationTime;

   public String generateToken(String email){
       SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes());

       return Jwts.builder()
               .subject(email)
               .issuedAt(new Date())
               .expiration(new Date(System.currentTimeMillis() + expirationTime))
               .signWith(key)
               .compact();
   }

   public boolean validateToken(String token){
        SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes());

        try {
            Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token);

            return true;

        }catch (Exception e){
            return false;
        }
   }

   public String getEmailFromToken(String token){
       SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes());

       return Jwts.parser()
               .verifyWith(key)
               .build()
               .parseSignedClaims(token)
               .getPayload().getSubject();
   }

}
