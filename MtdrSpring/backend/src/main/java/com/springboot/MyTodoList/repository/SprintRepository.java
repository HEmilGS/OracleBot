package com.springboot.MyTodoList.repository;

import com.springboot.MyTodoList.model.Sprint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
@EnableTransactionManagement
public interface SprintRepository extends JpaRepository<Sprint, Long> {
    
    // Find all sprints by project ID
    List<Sprint> findByProyectoIdProyecto(Long idProyecto);
    
    // Find active sprints (optional)
    List<Sprint> findByEstado(String estado);
    
}