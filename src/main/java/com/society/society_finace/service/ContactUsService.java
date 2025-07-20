package com.society.society_finace.service;

import com.society.society_finace.entity.ContactUs;
import com.society.society_finace.repository.ContactUsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContactUsService {

    private final ContactUsRepository contactUsRepository;

    @Autowired
    public ContactUsService(ContactUsRepository contactUsRepository) {
        this.contactUsRepository = contactUsRepository;
    }

    public ContactUs saveMessage(ContactUs message) {
        return contactUsRepository.save(message);
    }

    public List<ContactUs> getAllMessages() {
        return contactUsRepository.findAll();
    }

    public Optional<ContactUs> getMessageById(Long id) {
        return contactUsRepository.findById(id);
    }

    public void deleteMessage(Long id) {
        contactUsRepository.deleteById(id);
    }
} 