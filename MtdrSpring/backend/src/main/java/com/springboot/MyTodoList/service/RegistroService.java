
package com.springboot.MyTodoList.service;

import com.springboot.MyTodoList.model.Registro;
import com.springboot.MyTodoList.repository.RegistroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RegistroService {

    @Autowired
    private RegistroRepository registroRepository;

    public List<Registro> findAll() {
        return registroRepository.findAll();
    }

    public Registro getRegistroById(Long id) throws Exception {
        Optional<Registro> registro = registroRepository.findById(id);
        if (registro.isPresent()) {
            return registro.get();
        } else {
            throw new Exception("Registro not found");
        }
    }

    public Registro addRegistro(Registro registro) {
        return registroRepository.save(registro);
    }

    public Registro updateRegistro(Long id, Registro updatedRegistro) throws Exception {
        if (registroRepository.existsById(id)) {
            updatedRegistro.setIdRegistro(id);
            return registroRepository.save(updatedRegistro);
        } else {
            throw new Exception("Registro not found");
        }
    }

    public boolean deleteRegistro(Long id) throws Exception {
        if (registroRepository.existsById(id)) {
            registroRepository.deleteById(id);
            return true;
        } else {
            throw new Exception("Registro not found");
        }
    }
}