package com.tehjul.gestiondestock.controller;

import com.tehjul.gestiondestock.controller.api.ClientApi;
import com.tehjul.gestiondestock.dto.ClientDto;
import com.tehjul.gestiondestock.services.ClientService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class ClientController implements ClientApi {

    private final ClientService clientService;

    @Autowired
    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @Override
    public ClientDto save(ClientDto dto) {
        return clientService.save(dto);
    }

    @Override
    public ClientDto findById(Integer id) {
        return clientService.findById(id);
    }

    @Override
    public List<ClientDto> findAll() {
        return clientService.findAll();
    }

    @Override
    public void delete(Integer id) {
        clientService.delete(id);
    }
}
