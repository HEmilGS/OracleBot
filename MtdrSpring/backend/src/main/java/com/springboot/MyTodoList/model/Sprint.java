package com.springboot.MyTodoList.model;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "SPRINTS")
public class Sprint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_SPRINT")
    private Long idSprint;

    @Column(name = "NOMBRE", nullable = false, length = 100)
    private String nombre;

    @Column(name = "FECHA_INICIO")
    private LocalDate fechaInicio;

    @Column(name = "FECHA_FIN")
    private LocalDate fechaFin;

    @Column(name = "ESTADO", nullable = false, length = 50)
    private String estado;

    @ManyToOne
    @JoinColumn(name = "ID_PROYECTO", nullable = false)
    private Proyecto proyecto;

    public Sprint() {}

    public Sprint(Long idSprint, String nombre, LocalDate fechaInicio, LocalDate fechaFin, String estado, Proyecto proyecto) {
        this.idSprint = idSprint;
        this.nombre = nombre;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.estado = estado;
        this.proyecto = proyecto;
    }

    // Getters y Setters
    public Long getIdSprint() {
        return idSprint;
    }

    public void setIdSprint(Long idSprint) {
        this.idSprint = idSprint;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public LocalDate getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(LocalDate fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public LocalDate getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(LocalDate fechaFin) {
        this.fechaFin = fechaFin;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Proyecto getProyecto() {
        return proyecto;
    }

    public void setProyecto(Proyecto proyecto) {
        this.proyecto = proyecto;
    }

    @Override
    public String toString() {
        return "Sprint{" +
                "idSprint=" + idSprint +
                ", nombre='" + nombre + '\'' +
                ", fechaInicio=" + fechaInicio +
                ", fechaFin=" + fechaFin +
                ", estado='" + estado + '\'' +
                ", proyecto=" + proyecto +
                '}';
    }

}