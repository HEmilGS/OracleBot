package com.springboot.MyTodoList.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.springboot.MyTodoList.model.Proyecto;
import com.springboot.MyTodoList.repository.ProyectoRepository;

@Service
public class ProyectService {

    @Autowired
    private ProyectoRepository proyectRepository;

    public List<Proyecto> findAll() {
        return proyectRepository.findAll();
    }

    public ResponseEntity<Proyecto> getProyectById(int id) {
        Optional<Proyecto> proyectData = proyectRepository.findById(id);
        if (proyectData.isPresent()) {
            return new ResponseEntity<>(proyectData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public Proyecto addProyectItem(Proyecto toDoItem) {
        return proyectRepository.save(toDoItem);
    }
 
    // public boolean deleteToDoItem(int id) {
    //     try {
    //         toDoItemRepository.deleteById(id);
    //         return true;
    //     } catch (Exception e) {
    //         return false;
    //     }
    // }

    public Proyecto updateProyect(int id, Proyecto proyect) {
        Proyecto existente = proyectRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Proyecto no encontrado"));
        existente.setEstado(proyect.getEstado());
        // Si solo quieres cambiar el estado, no actualices otros campos aquí
        return proyectRepository.save(existente);
    }

    public List<Proyecto> findByEquipo_IdEquipo(Long idEquipo) {
        return proyectRepository.findByEquipo_IdEquipo(idEquipo);
    }
}