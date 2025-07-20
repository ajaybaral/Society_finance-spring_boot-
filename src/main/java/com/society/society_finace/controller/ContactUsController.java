package com.society.society_finace.controller;

import com.society.society_finace.entity.ContactUs;
import com.society.society_finace.service.ContactUsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
@Tag(name = "Contact Management", description = "Contact form management APIs")
public class ContactUsController {

    private final ContactUsService contactService;

    @Autowired
    public ContactUsController(ContactUsService contactService) {
        this.contactService = contactService;
    }

    @Operation(summary = "Submit contact message", description = "Submit a new contact form message (Public access)")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @PostMapping
    public ResponseEntity<ContactUs> saveMessage(@RequestBody ContactUs message) {
        return ResponseEntity.ok(contactService.saveMessage(message));
    }

    @Operation(summary = "Get all contact messages", description = "Retrieve all contact form messages (Admin only)")
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<List<ContactUs>> getAllMessages() {
        return ResponseEntity.ok(contactService.getAllMessages());
    }

    @Operation(summary = "Get contact message by ID", description = "Retrieve a specific contact message by ID (Admin only)")
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<ContactUs> getMessage(@PathVariable Long id) {
        return contactService.getMessageById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Delete contact message", description = "Delete a contact message by ID (Admin only)")
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMessage(@PathVariable Long id) {
        contactService.deleteMessage(id);
        return ResponseEntity.noContent().build();
    }
} 