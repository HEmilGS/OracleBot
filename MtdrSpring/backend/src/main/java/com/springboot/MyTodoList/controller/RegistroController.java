package com.springboot.MyTodoList.controller;

import com.springboot.MyTodoList.model.Registro;
import com.springboot.MyTodoList.service.RegistroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/registros")
public class RegistroController {

    @Autowired
    private RegistroService registroService;

    @GetMapping
    public List<Registro> getAllRegistros() {
        return registroService.findAll();
    }

    @GetMapping("/registro/{idRegistro}")
    public ResponseEntity<Registro> getRegistroById(@PathVariable("idRegistro") Long idRegistro) {
        try {
            Registro registro = registroService.getRegistroById(idRegistro);
            return new ResponseEntity<>(registro, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
   

    @PostMapping
    public ResponseEntity<Registro> addRegistro(@RequestBody Registro registro) {
        try {
            Registro newRegistro = registroService.addRegistro(registro);
            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.set("location", "/registros/" + newRegistro.getIdRegistro());
            responseHeaders.set("Access-Control-Expose-Headers", "location");

            return ResponseEntity.ok().headers(responseHeaders).body(newRegistro);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/registro/{idRegistro}")
    public ResponseEntity<Registro> updateRegistro(@RequestBody Registro registro, @PathVariable("idRegistro") Long idRegistro) {
        try {
            Registro updatedRegistro = registroService.updateRegistro(idRegistro, registro);
            return new ResponseEntity<>(updatedRegistro, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    

    @DeleteMapping("/registro/{idRegistro}")
    public ResponseEntity<Boolean> deleteRegistro(@PathVariable("idRegistro") Long idRegistro) {
        try {
            boolean deleted = registroService.deleteRegistro(idRegistro);
            return new ResponseEntity<>(deleted, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
        }
    }

}