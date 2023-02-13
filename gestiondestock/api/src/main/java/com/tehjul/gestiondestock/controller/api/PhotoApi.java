package com.tehjul.gestiondestock.controller.api;

import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

import static com.tehjul.gestiondestock.utils.Constants.APP_ROOT;

@Api("photos")
public interface PhotoApi {

    @PostMapping(APP_ROOT + "/photos/save/{id}/{title}/{context}")
    Object savePhoto(@PathVariable String context, @PathVariable Integer id, @RequestPart("file") MultipartFile photo, @PathVariable String title) throws IOException;

}
