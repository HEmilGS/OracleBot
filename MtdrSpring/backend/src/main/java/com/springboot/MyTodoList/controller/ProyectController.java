package com.springboot.MyTodoList.controller;

import java.util.List;
import java.util.Optional;

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
import com.springboot.MyTodoList.model.Usuario;
import com.springboot.MyTodoList.service.ProyectService;
import com.springboot.MyTodoList.repository.UsuarioRepository;
import com.springboot.MyTodoList.repository.ProyectoRepository;

@RestController
public class ProyectController {
    @Autowired
    private ProyectService proyectService;
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private ProyectoRepository proyectoRepository;

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

    @PutMapping("/proyect/{id_proyecto}")
    public ResponseEntity<?> updateProyect(@RequestBody Proyecto proyect, @PathVariable("id_proyecto") int id) {
        try {
            Proyecto actualizado = proyectService.updateProyect(id, proyect);
            return new ResponseEntity<>(actualizado, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace(); // <-- Esto te mostrará el error en consola
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/proyectos/usuario/{idUsuario}")
    public ResponseEntity<List<Proyecto>> getProyectosByUsuario(@PathVariable Long idUsuario) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findById(idUsuario);
        if (usuarioOpt.isPresent() && usuarioOpt.get().getEquipo() != null) {
            Long idEquipo = usuarioOpt.get().getEquipo().getIdEquipo();
            List<Proyecto> proyectos = proyectoRepository.findByEquipo_IdEquipo(idEquipo);
            return ResponseEntity.ok(proyectos);
        }
        return ResponseEntity.notFound().build();
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