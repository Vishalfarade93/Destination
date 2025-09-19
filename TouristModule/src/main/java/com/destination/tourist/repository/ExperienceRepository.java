package com.destination.tourist.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.destination.tourist.entity.Category;
import com.destination.tourist.entity.Experience;

public interface ExperienceRepository extends JpaRepository<Experience, Long> {
	List<Experience> findByCategory(Category category);

	@Query(value = "SELECT *,(6371 * acos(cos(radians(?1)) * cos(radians(lat)) * cos(radians(lng) - radians(?2)) + sin(radians(?1)) * sin(radians(lat)))) AS distance "
			+ "FROM experiences " + "HAVING distance < ?3 " + "ORDER BY distance", nativeQuery = true)
	List<Experience> findNearby(double lat, double lng, double radiusKm);

	List<Experience> findByRatingGreaterThan(double rating);
}
