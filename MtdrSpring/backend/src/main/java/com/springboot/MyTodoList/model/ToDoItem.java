package com.springboot.MyTodoList.model;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity; // Asegúrate de que la ruta sea correcta
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "TAREAS")
public class ToDoItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ID;

    @Column(name = "id_proyecto")
    private int project_id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "creation_ts")
    private LocalDate creation_ts;

    @Column(name = "deadline")
    private LocalDate deadline;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private TaskStatus status = TaskStatus.Pendiente;

    @ManyToOne
    @JoinColumn(name = "id_sprint") // Relación con Sprint
    private Sprint sprint;

    @ManyToOne
    @JoinColumn(name = "id_usuario") // Relación con User
    private Usuario user;

    @Column(name = "TIEMPO_ESTIMADO")
    private Integer tiempoEstimado; // Cambiado de int a Integer

    @Column(name = "TIEMPO_REAL")
    private Integer tiempoReal; // Puede ser null hasta que se finalice la tarea

    @Column(name = "PRIORIDAD")
    private String prioridad;


    public ToDoItem() {
        this.creation_ts = LocalDate.now();
    }

    // Getters y Setters
    public int getID() {
        return ID;
    }

    public void setID(int ID) {
        this.ID = ID;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getCreation_ts() {
        return creation_ts;
    }

    public void setCreation_ts(LocalDate creation_ts) {
        this.creation_ts = creation_ts;
    }

    public LocalDate getDeadline() {
        return deadline;
    }

    public void setDeadline(LocalDate deadline) {
        this.deadline = deadline;
    }

    public TaskStatus getStatus() {
        return status;
    }

    public void setStatus(TaskStatus status) {
        this.status = status;
    }

    public Sprint getSprint() {
        return sprint;
    }

    public void setSprint(Sprint sprint) {
        this.sprint = sprint;
    }

    public int getProject_id() {
        return project_id;
    }

    public void setProject_id(int project_id) {
        this.project_id = project_id;
    }

    public Integer getTiempoEstimado() {
        return tiempoEstimado;
    }

    public void setTiempoEstimado(Integer tiempoEstimado) {
        this.tiempoEstimado = tiempoEstimado;
    }

    public Long getUser_id() {
        return user != null ? user.getIdUsuario() : null;
    }

    public void setUser_id(long user_id) {
        if (this.user == null) {
            this.user = new Usuario(); // Inicializa el objeto user si es null
        }
        this.user.setIdUsuario(user_id);
    }

    public Usuario getUser() {
        return user;
    }

    public void setUser(Usuario user) {
        this.user = user;
    }

    public Integer getTiempoReal() {
        return tiempoReal;
    }

    public void setTiempoReal(Integer tiempoReal) {
        this.tiempoReal = tiempoReal;
    }

    public String getPrioridad() {
        return prioridad;
    }

    public void setPrioridad(String prioridad) {
        this.prioridad = prioridad;
    }

    @Override
    public String toString() {
        return "ToDoItem{" +
                "ID=" + ID +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", creation_ts=" + creation_ts +
                ", deadline=" + deadline +
                ", status=" + status +
                ", sprint=" + (sprint != null ? sprint.getId() : null) +
                ", prioridad='" + prioridad + '\'' +
                ", tiempoEstimado=" + tiempoEstimado +
                ", tiempoReal=" + tiempoReal +
                '}';
    }
}