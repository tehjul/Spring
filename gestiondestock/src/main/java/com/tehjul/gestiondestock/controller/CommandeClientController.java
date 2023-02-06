package com.tehjul.gestiondestock.controller;

import com.tehjul.gestiondestock.controller.api.CommandeClientApi;
import com.tehjul.gestiondestock.dto.CommandeClientDto;
import com.tehjul.gestiondestock.services.CommandeClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CommandeClientController implements CommandeClientApi {

    private final CommandeClientService clientService;

    @Autowired
    public CommandeClientController(CommandeClientService clientService) {
        this.clientService = clientService;
    }

    @Override
    public ResponseEntity<CommandeClientDto> save(CommandeClientDto dto) {
        return ResponseEntity.ok(clientService.save(dto));
    }

    @Override
    public ResponseEntity<CommandeClientDto> findById(Integer id) {
        return ResponseEntity.ok(clientService.findById(id));
    }

    @Override
    public ResponseEntity<CommandeClientDto> findByCode(String code) {
        return ResponseEntity.ok(clientService.findByCode(code));
    }

    @Override
    public ResponseEntity<List<CommandeClientDto>> findAll() {
        return ResponseEntity.ok(clientService.findAll());
    }

    @Override
    public ResponseEntity delete(Integer id) {
        clientService.delete(id);
        return ResponseEntity.ok().build();
    }
}
