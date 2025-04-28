package com.springboot.MyTodoList.model;

import javax.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "REGISTROS")
public class Registro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_REGISTRO")
    private Long idRegistro;

    @Column(name = "DESCRIPCION")
    private String descripcion;

    @Column(name = "FECHA_CAMBIO", nullable = false)
    private OffsetDateTime fechaCambio;

    @ManyToOne
    @JoinColumn(name = "ID_TAREA", nullable = false)
    private ToDoItem tarea;

    @ManyToOne
    @JoinColumn(name = "ID_USUARIO", nullable = false)
    private Usuario usuario;

    public Registro() {}

    public Registro(Long idRegistro, String descripcion, OffsetDateTime fechaCambio, ToDoItem tarea, Usuario usuario) {
        this.idRegistro = idRegistro;
        this.descripcion = descripcion;
        this.fechaCambio = fechaCambio;
        this.tarea = tarea;
        this.usuario = usuario;
    }

    // Getters y Setters

    public Long getIdRegistro() {
        return idRegistro;
    }

    public void setIdRegistro(Long idRegistro) {
        this.idRegistro = idRegistro;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public OffsetDateTime getFechaCambio() {
        return fechaCambio;
    }

    public void setFechaCambio(OffsetDateTime fechaCambio) {
        this.fechaCambio = fechaCambio;
    }

    public ToDoItem getTarea() {
        return tarea;
    }

    public void setTarea(ToDoItem tarea) {
        this.tarea = tarea;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    @Override
    public String toString() {
        return "Registro{" +
                "idRegistro=" + idRegistro +
                ", descripcion='" + descripcion + '\'' +
                ", fechaCambio=" + fechaCambio +
                ", tarea=" + tarea +
                ", usuario=" + usuario +
                '}';
    }

}