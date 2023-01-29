package com.amigoscode.service;

import com.amigoscode.model.Customer;
import com.amigoscode.model.NewCustomerRequest;
import com.amigoscode.repository.CustomerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {

    private CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public List<Customer> getCustomers() {
        return customerRepository.findAll();
    }

    public void addCustomer(NewCustomerRequest request) {
        Customer customer = new Customer();
        customer.setName(request.name());
        customer.setEmail(request.email());
        customer.setAge(request.age());
        customerRepository.save(customer);
    }

    public void deleteCustomer(Integer id) {
        customerRepository.deleteById(id);
    }

}
