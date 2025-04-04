package com.springboot.MyTodoList.service;

import com.springboot.MyTodoList.model.Equipo;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EquipoService {

    private final List<Equipo> equipos = new ArrayList<>();

    public List<Equipo> findAll() {
        return equipos;
    }

    public Equipo getEquipoById(int id) throws Exception {
        Optional<Equipo> equipo = equipos.stream().filter(e -> e.getIdEquipo() == id).findFirst();
        if (equipo.isPresent()) {
            return equipo.get();
        } else {
            throw new Exception("Equipo not found");
        }
    }

    public Equipo addEquipo(Equipo equipo) {
        equipos.add(equipo);
        return equipo;
    }

    public Equipo updateEquipo(int id, Equipo updatedEquipo) throws Exception {
        for (int i = 0; i < equipos.size(); i++) {
            if (equipos.get(i).getIdEquipo() == id) {
                equipos.set(i, updatedEquipo);
                return updatedEquipo;
            }
        }
        throw new Exception("Equipo not found");
    }

    public boolean deleteEquipo(int id) throws Exception {
        Optional<Equipo> equipo = equipos.stream().filter(e -> e.getIdEquipo() == id).findFirst();
        if (equipo.isPresent()) {
            equipos.remove(equipo.get());
            return true;
        } else {
            throw new Exception("Equipo not found");
        }
    }
}
