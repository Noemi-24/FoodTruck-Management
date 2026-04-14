package com.foodtruck.foodtruckapi.repository;

import com.foodtruck.foodtruckapi.entity.PopularItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PopularItemsRepository extends JpaRepository<PopularItem,Integer> {
}
