package com.tehjul.gestiondestock.dto.auth;

import com.tehjul.gestiondestock.dto.AdresseDto;
import com.tehjul.gestiondestock.dto.EntrepriseDto;
import com.tehjul.gestiondestock.dto.RolesDto;
import lombok.Builder;
import lombok.Data;

import java.time.Instant;
import java.util.List;

@Data
@Builder
public class AuthenticationResponse {

    private String accessToken;

}
