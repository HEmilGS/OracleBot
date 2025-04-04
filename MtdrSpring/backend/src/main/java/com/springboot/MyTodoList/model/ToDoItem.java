package com.springboot.MyTodoList.model;

import java.time.OffsetDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "tareas")
public class ToDoItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int ID;

    @Column(name = "id_proyecto")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int project_id;

    @Column(name = "id_sprint")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int sprint_id;

    @Column(name = "id_usuario")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int user_id;

    @Column(name = "title")
    String title;

    @Column(name = "description")
    String description;

    @Column(name = "creation_ts")
    OffsetDateTime creation_ts;

    @Column(name = "deadline")
    OffsetDateTime deadline;

    @Column(name = "status")
    String status;

    public ToDoItem() {
        this.creation_ts = OffsetDateTime.now();
    }

    public ToDoItem(int ID, String title, String description, OffsetDateTime creation_ts, OffsetDateTime deadline, String status) {
        this.ID = ID;
        this.title = title;
        this.description = description;
        this.creation_ts = creation_ts != null ? creation_ts : OffsetDateTime.now();
        this.deadline = deadline;
        this.status = status;
    }

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

    public OffsetDateTime getCreation_ts() {
        return creation_ts;
    }

    public void setCreation_ts(OffsetDateTime creation_ts) {
        this.creation_ts = creation_ts;
    }

    public OffsetDateTime getDeadline() {
        return deadline;
    }

    public void setDeadline(OffsetDateTime deadline) {
        this.deadline = deadline;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getSprint_id() {
        return sprint_id;
    }

    public void setSprint_id(int sprint_id) {
        this.sprint_id = sprint_id;
    }

    public int getProject_id() {
        return project_id;
    }   

    public void setProject_id(int project_id) {
        this.project_id = project_id;
    }
    public int getUser_id() {
        return user_id;
    }
    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    @Override
    public String toString() {
        return "ToDoItem{" +
                "ID=" + ID +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", creation_ts=" + creation_ts +
                ", deadline=" + deadline +
                ", status='" + status + '\'' +
                '}';
    }
}