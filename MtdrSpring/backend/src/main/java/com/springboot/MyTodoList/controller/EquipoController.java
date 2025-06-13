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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.MyTodoList.model.Equipo;
import com.springboot.MyTodoList.service.EquipoService;

@RestController
@RequestMapping("/api/equipos")
public class EquipoController {

    @Autowired
    private EquipoService equipoService;

    @GetMapping
    public List<Equipo> getAllEquipos() {
        return equipoService.findAll();
    }

    @GetMapping(value = "/equipo/{idequipo}")
    public ResponseEntity<Equipo> getEquipoById(@PathVariable("idequipo") int idequipo) {
        try {
            Equipo equipo = equipoService.getEquipoById(idequipo);
            return new ResponseEntity<>(equipo, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<Equipo> addEquipo(@RequestBody Equipo equipo) {
        try {
            Equipo newEquipo = equipoService.addEquipo(equipo);
            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.set("location", "/equipos/" + newEquipo.getIdEquipo());
            responseHeaders.set("Access-Control-Expose-Headers", "location");

            return ResponseEntity.ok().headers(responseHeaders).body(newEquipo);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping(value = "/equipo/{idEquipo}")
    public ResponseEntity<Equipo> updateEquipo(@RequestBody Equipo equipo, @PathVariable("idEquipo") int idEquipo) {
        try {
            Equipo updatedEquipo = equipoService.updateEquipo(idEquipo, equipo);
            return new ResponseEntity<>(updatedEquipo, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @DeleteMapping(value = "/equipo/{idEquipo}")

    public ResponseEntity<Boolean> deleteEquipo(@PathVariable("idEquipo") int idEquipo) {
        Boolean flag = false;
        try {
            flag = equipoService.deleteEquipo(idEquipo);
            return new ResponseEntity<>(flag, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(flag, HttpStatus.NOT_FOUND);
        }
    }

    
}