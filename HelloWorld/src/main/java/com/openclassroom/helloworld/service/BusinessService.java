package com.openclassroom.helloworld.service;

import com.openclassroom.helloworld.model.HelloWorld;
import org.springframework.stereotype.Component;

@Component
public class BusinessService {

    public HelloWorld getHelloWorld(){
        HelloWorld helloWorld = new HelloWorld();
        return helloWorld;
    }
}
