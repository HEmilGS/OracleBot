package com.springboot.MyTodoList.service;

import com.springboot.MyTodoList.model.Usuario;
import com.springboot.MyTodoList.repository.UsuarioRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Usuario> getAllUsuarios() {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> getUsuarioById(Long id) {
        return usuarioRepository.findById(id);
    }

    public Usuario createUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public Optional<Usuario> updateUsuario(Long id, Usuario usuario) {
        return usuarioRepository.findById(id)
                .map(existingUsuario -> {
                    existingUsuario.setNombre(usuario.getNombre());
                    existingUsuario.setCorreo(usuario.getCorreo());
                    existingUsuario.setRol(usuario.getRol());
                    return usuarioRepository.save(existingUsuario);
                });
    }

    public boolean deleteUsuario(Long id) {
        usuarioRepository.deleteById(id);
        return !usuarioRepository.existsById(id);
    }

    public Usuario findById(Long id) {
        return usuarioRepository.findById(id).orElse(null);
    }
}
