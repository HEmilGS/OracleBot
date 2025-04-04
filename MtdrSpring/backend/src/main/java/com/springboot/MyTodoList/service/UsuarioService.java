package com.springboot.MyTodoList.service;

import com.springboot.MyTodoList.model.Usuario;

import java.util.List;
import java.util.Optional;

public interface UsuarioService {
    List<Usuario> getAllUsuarios();
    Optional<Usuario> getUsuarioById(Long id);
    Usuario createUsuario(Usuario usuario);
    Optional<Usuario> updateUsuario(Long id, Usuario usuario);
    boolean deleteUsuario(Long id);
}
