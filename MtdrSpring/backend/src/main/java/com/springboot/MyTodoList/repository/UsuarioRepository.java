package com.springboot.MyTodoList.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.springboot.MyTodoList.model.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByCorreo(String correo); // Ya existente
    boolean existsByCorreo(String correo); // Ya existente

    // Nuevo método para buscar usuarios por equipo
    List<Usuario> findByEquipo_IdEquipo(Long idEquipo);

    // Nuevo método para buscar usuarios por nombre
    List<Usuario> findByNombre(String nombre);
}
