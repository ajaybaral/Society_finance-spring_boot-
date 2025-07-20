package com.society.society_finace.service;

import com.society.society_finace.entity.FlatDetails;
import com.society.society_finace.repository.FlatDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FlatDetailsService {

    private final FlatDetailsRepository flatDetailsRepository;

    @Autowired
    public FlatDetailsService(FlatDetailsRepository flatDetailsRepository) {
        this.flatDetailsRepository = flatDetailsRepository;
    }

    public FlatDetails saveFlatDetails(FlatDetails flatDetails) {
        return flatDetailsRepository.save(flatDetails);
    }

    public List<FlatDetails> getAllFlats() {
        return flatDetailsRepository.findAll();
    }

    public Optional<FlatDetails> getFlatById(String flatNo) {
        return flatDetailsRepository.findById(flatNo);
    }

    public void deleteFlat(String flatNo) {
        flatDetailsRepository.deleteById(flatNo);
    }
} 