package com.springboot.MyTodoList.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.MyTodoList.model.Equipo;
import com.springboot.MyTodoList.repository.EquipoRepository;

@Service
public class EquipoService {

    @Autowired
    private EquipoRepository equipoRepository;

    public List<Equipo> findAll() {
        return equipoRepository.findAll();
    }

    public Equipo getEquipoById(int id) throws Exception {
        return equipoRepository.findById(id)
                .orElseThrow(() -> new Exception("Equipo not found"));
    }

    public Equipo addEquipo(Equipo equipo) {
        return equipoRepository.save(equipo);
    }

    public Equipo updateEquipo(int id, Equipo updatedEquipo) throws Exception {
        if (!equipoRepository.existsById(id)) {
            throw new Exception("Equipo not found");
        }
        updatedEquipo.setIdEquipo(Long.valueOf(id));
        return equipoRepository.save(updatedEquipo);
    }

    public boolean deleteEquipo(int id) throws Exception {
        if (!equipoRepository.existsById(id)) {
            throw new Exception("Equipo not found");
        }
        equipoRepository.deleteById(id);
        return true;
    }
}
