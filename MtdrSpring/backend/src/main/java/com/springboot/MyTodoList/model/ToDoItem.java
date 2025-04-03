package com.springboot.MyTodoList.model;

import javax.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "tasks")
public class ToDoItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int ID;

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