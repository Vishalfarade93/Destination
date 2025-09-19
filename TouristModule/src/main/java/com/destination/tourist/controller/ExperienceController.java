package com.destination.tourist.controller;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.destination.tourist.entity.Category;
import com.destination.tourist.entity.Experience;
import com.destination.tourist.service.ExperienceService;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/experiences")
@CrossOrigin("*")
public class ExperienceController {
	@Autowired
	private ExperienceService service;

	// add experience
	@PostMapping("/add")
	public ResponseEntity<Experience> addExperience(@RequestPart("experience") String experienceJson,
			@RequestPart(value = "image", required = false) MultipartFile file) {
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			Experience experience = objectMapper.readValue(experienceJson, Experience.class);

			Path uploadDir = Paths.get("upload").toAbsolutePath();
			if (!Files.exists(uploadDir)) {
				Files.createDirectories(uploadDir);
			}
			if (file != null && !file.isEmpty()) {
				String filename = file.getOriginalFilename();
				Path filepath = uploadDir.resolve(filename);
				Files.copy(file.getInputStream(), filepath, StandardCopyOption.REPLACE_EXISTING);
				experience.setImageUrl("/upload/" + filename);
			} else {
				experience.setImageUrl("/upload/default.png");
			}

			Experience savedExperience = service.addExperience(experience);
			return ResponseEntity.status(HttpStatus.CREATED).body(savedExperience);

		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	// all experiences
	@GetMapping("/all")
	public List<Experience> getAll() {
		return service.getAllExperiences();
	}

	// category wise filteration
	@GetMapping("/category/{category}")
	public List<Experience> getByCategory(@PathVariable Category category) {
		return service.getByCategory(category);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Experience> getById(@PathVariable Long id) {
		Experience experience = service.getExperienceById(id);
		return ResponseEntity.ok(experience);
	}

	// nearby experiences
	@GetMapping("/nearby")
	public List<Experience> getNearby(@RequestParam double lat, @RequestParam double lng,
			@RequestParam(defaultValue = "10") double radiusKm) {
		return service.getNearby(lat, lng, radiusKm);
	}

	// featured experiences
	@GetMapping("/featured")
	public List<Experience> getFeatured() {
		return service.getFeaturedExperiences().stream().peek(e -> {
			if (e.getImageUrl() == null || e.getImageUrl().isEmpty())
				e.setImageUrl("/upload/default.png");
		}).toList();
	}

}
