package com.tehjul.gestiondestock.controller;

import com.tehjul.gestiondestock.controller.api.AuthenticationApi;
import com.tehjul.gestiondestock.dto.auth.AuthenticationRequest;
import com.tehjul.gestiondestock.dto.auth.AuthenticationResponse;
import com.tehjul.gestiondestock.model.auth.ExtendedUser;
import com.tehjul.gestiondestock.services.auth.ApplicationUserDetailsService;
import com.tehjul.gestiondestock.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.tehjul.gestiondestock.utils.Constants.AUTHENTICATION_ENDPOINT;

@RestController
@RequestMapping(AUTHENTICATION_ENDPOINT)
public class AuthenticationController implements AuthenticationApi {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private ApplicationUserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getLogin(),
                        request.getPassword()
                )
        );

        final ExtendedUser userDetails = (ExtendedUser) userDetailsService.loadUserByUsername(request.getLogin());

        final String jwt = jwtUtil.generateToken(userDetails);

        return ResponseEntity.ok(AuthenticationResponse.builder().accessToken(jwt).build());

    }

}
