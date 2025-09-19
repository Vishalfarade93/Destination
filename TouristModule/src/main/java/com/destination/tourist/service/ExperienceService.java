package com.destination.tourist.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.destination.tourist.entity.Category;
import com.destination.tourist.entity.Experience;
import com.destination.tourist.repository.ExperienceRepository;

@Service
public class ExperienceService {

	@Autowired
	private ExperienceRepository repository;

	public Experience addExperience(Experience experience) {
		return repository.save(experience);
	}

	public Experience getExperienceById(Long id) {
		return repository.findById(id).orElse(null);
	}

	public List<Experience> getAllExperiences() {
		return repository.findAll();
	}

	public List<Experience> getByCategory(Category category) {
		return repository.findByCategory(category);
	}

	public List<Experience> getNearby(double lat, double lng, double radiusKm) {
		return repository.findNearby(lat, lng, radiusKm);
	}

	public List<Experience> getFeaturedExperiences() {
		return repository.findByRatingGreaterThan(4.4);
	}

}
