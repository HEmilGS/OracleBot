package com.springboot.MyTodoList.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.MyTodoList.model.Proyecto;
import com.springboot.MyTodoList.service.ProyectService;

@RestController
public class ProyectController {
    @Autowired
    private ProyectService proyectService;

    @GetMapping(value = "/proyect")
    public List<Proyecto> getAllProyects() { 
        return proyectService.findAll();
    }

    @GetMapping(value = "/proyect/{id_Proyecto}")
    public ResponseEntity<Proyecto> getProyectById(@PathVariable int id) {
        try {
            ResponseEntity<Proyecto> responseEntity = proyectService.getProyectById(id);
            return new ResponseEntity<>(responseEntity.getBody(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping(value = "/proyect")
    public ResponseEntity addProyect(@RequestBody Proyecto proyect) throws Exception {
        Proyecto pr = proyectService.addProyectItem(proyect);
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("location", "" + pr.getIdProyecto());
        responseHeaders.set("Access-Control-Expose-Headers", "location");

        return ResponseEntity.ok().headers(responseHeaders).build();
    }

    @PutMapping(value = "proyect/{id_proyecto}")
    public ResponseEntity updateProyect(@RequestBody Proyecto proyect, @PathVariable int id) {
        try {
            Proyecto proyect1 = proyectService.updateProyect(id, proyect);
            return new ResponseEntity<>(proyect1, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

//    @DeleteMapping(value = "proyect/{id_proyecto}")
//    public ResponseEntity<Boolean> delete(@PathVariable("id") int id) {
//        Boolean flag = false;
//        try {
//            flag = toDoItemService.deleteToDoItem(id);
//            return new ResponseEntity<>(flag, HttpStatus.OK);
//        } catch (Exception e) {
//            return new ResponseEntity<>(flag, HttpStatus.NOT_FOUND);
//        }
//    }
}