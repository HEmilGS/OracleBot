package com.springboot.MyTodoList.service;

import com.springboot.MyTodoList.model.Sprint;
import com.springboot.MyTodoList.repository.SprintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SprintService {

    @Autowired
    private SprintRepository sprintRepository;

    public List<Sprint> findAll() {
        return sprintRepository.findAll();
    }

    public Sprint getSprintById(Long id) {
        Optional<Sprint> sprintData = sprintRepository.findById(id);
        return sprintData.orElse(null);
    }

    public Sprint addSprint(Sprint sprint) {
        return sprintRepository.save(sprint);
    }

    public boolean deleteSprint(Long id) {
        try {
            sprintRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public Sprint updateSprint(Sprint sprint) {
        Optional<Sprint> sprintData = sprintRepository.findById(sprint.getIdSprint());
        if (sprintData.isPresent()) {
            Sprint existingSprint = sprintData.get();
            existingSprint.setNombre(sprint.getNombre());
            existingSprint.setFechaInicio(sprint.getFechaInicio());
            existingSprint.setFechaFin(sprint.getFechaFin());
            existingSprint.setEstado(sprint.getEstado());
            existingSprint.setProyecto(sprint.getProyecto());
            return sprintRepository.save(existingSprint);
        } else {
            return null;
        }
    }

    // Additional method to find sprints by project ID
    public List<Sprint> findByProjectId(Long projectId) {
        return sprintRepository.findByProyectoIdProyecto(projectId);
    }
}