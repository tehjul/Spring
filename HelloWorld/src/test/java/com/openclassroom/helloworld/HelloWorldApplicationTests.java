package com.openclassroom.helloworld;

import com.openclassroom.helloworld.service.BusinessService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class HelloWorldApplicationTests {
    @Autowired
    BusinessService bs;
    @Test
    void contextLoads() {
    }

    @Test
    void testGetHelloWorld() {
        String expected = "Hello World!";
        String result = bs.getHelloWorld().getValue();
        assertEquals(expected, result);
    }

}
