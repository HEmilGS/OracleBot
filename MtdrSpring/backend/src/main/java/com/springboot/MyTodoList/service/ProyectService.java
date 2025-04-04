package com.springboot.MyTodoList.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.springboot.MyTodoList.model.Proyecto;
import com.springboot.MyTodoList.repository.ProyectRepository;

@Service
public class ProyectService {

    @Autowired
    private ProyectRepository proyectRepository;

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

    public Proyecto updateProyect(int id, Proyecto td) {
        Optional<Proyecto> proyectItemData = proyectRepository.findById(id);
        if (proyectItemData.isPresent()) {
            Proyecto toDoItem = proyectItemData.get();
            toDoItem.setIdProyecto(id);
            toDoItem.setNombre(td.getNombre());
            toDoItem.setDescripcion(td.getDescripcion());
            toDoItem.setFechaInicio(td.getFechaInicio());
            toDoItem.setFechaFin(td.getFechaFin());
            toDoItem.setEstado(td.getEstado());
            return proyectRepository.save(toDoItem);
        } else {
            return null;
        }
    }
}