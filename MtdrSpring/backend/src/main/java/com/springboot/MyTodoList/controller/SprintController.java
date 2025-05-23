package com.springboot.MyTodoList.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.MyTodoList.model.Sprint;
import com.springboot.MyTodoList.service.SprintService;

@RestController
public class SprintController {
    @Autowired
    private SprintService sprintService;

    @GetMapping(value = "/sprints")
    public ResponseEntity<List<Sprint>> getAllSprints() {
        List<Sprint> sprints = sprintService.findAll();
        return new ResponseEntity<>(sprints, HttpStatus.OK);
    }

    @GetMapping(value = "/sprints/{id}")
    public ResponseEntity<Sprint> getSprintById(@PathVariable Long id) {
        try {
            Sprint sprint = sprintService.getSprintById(id);
            return new ResponseEntity<>(sprint, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping(value = "/sprints")
    public ResponseEntity<Sprint> addSprint(@RequestBody Sprint sprint) {
        try {
            Sprint newSprint = sprintService.addSprint(sprint);
            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.set("location", "/api/sprints/" + newSprint.getId()); 
            responseHeaders.set("Access-Control-Expose-Headers", "location");
            return new ResponseEntity<>(newSprint, responseHeaders, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping(value = "/sprints/{id}")
    public ResponseEntity<Sprint> updateSprint(@RequestBody Sprint sprint, @PathVariable Long id) {
        try {
            sprint.setId(id); // Cambiado de setIdSprint() a setId()
            Sprint updatedSprint = sprintService.updateSprint(sprint);
            return new ResponseEntity<>(updatedSprint, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping(value = "/sprints/{id}")
    public ResponseEntity<Void> deleteSprint(@PathVariable Long id) {
        try {
            sprintService.deleteSprint(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Additional endpoint to get sprints by project
    @GetMapping(value = "/projects/{projectId}/sprints")
    public ResponseEntity<List<Sprint>> getSprintsByProject(@PathVariable Long projectId) {
        List<Sprint> sprints = sprintService.findByProjectId(projectId);
        return new ResponseEntity<>(sprints, HttpStatus.OK);
    }
}