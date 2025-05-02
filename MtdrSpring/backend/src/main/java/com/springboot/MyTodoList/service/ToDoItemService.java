package com.springboot.MyTodoList.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.springboot.MyTodoList.model.TaskStatus;
import com.springboot.MyTodoList.model.ToDoItem;
import com.springboot.MyTodoList.repository.ToDoItemRepository;

@Service
public class ToDoItemService {

    @Autowired
    private ToDoItemRepository toDoItemRepository;

    // Obtener todas las tareas
    public List<ToDoItem> findAll() {
        return toDoItemRepository.findAll();
    }

    // Obtener una tarea por ID
    public ResponseEntity<ToDoItem> getItemById(int id) {
        Optional<ToDoItem> todoData = toDoItemRepository.findById(id);
        if (todoData.isPresent()) {
            return new ResponseEntity<>(todoData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Agregar una nueva tarea
    public ToDoItem addToDoItem(ToDoItem toDoItem) {
        return toDoItemRepository.save(toDoItem);
    }

    // Eliminar una tarea por ID
    public boolean deleteToDoItem(int id) {
        try {
            toDoItemRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    // Actualizar una tarea existente
    public ToDoItem updateToDoItem(int id, ToDoItem td) {
        Optional<ToDoItem> toDoItemData = toDoItemRepository.findById(id);
        if (toDoItemData.isPresent()) {
            ToDoItem toDoItem = toDoItemData.get();
            toDoItem.setID(id);
            toDoItem.setTitle(td.getTitle());
            toDoItem.setDescription(td.getDescription());
            toDoItem.setCreation_ts(td.getCreation_ts());
            toDoItem.setDeadline(td.getDeadline());
            toDoItem.setStatus(td.getStatus());
            return toDoItemRepository.save(toDoItem);
        } else {
            return null;
        }
    }

    // Obtener tareas por estado
    public List<ToDoItem> getTasksByStatus(TaskStatus status) {
        return toDoItemRepository.findByStatus(status);
    }

    // Obtener tareas por sprint y estado
    public List<ToDoItem> getTasksBySprintAndStatus(int sprintId, TaskStatus status) {
        return toDoItemRepository.findBySprint_idAndStatus(sprintId, status);
    }

    // Actualizar el estado de una tarea
    public ResponseEntity<ToDoItem> updateTaskStatus(int id, TaskStatus status) {
        Optional<ToDoItem> toDoItemData = toDoItemRepository.findById(id);
        if (toDoItemData.isPresent()) {
            ToDoItem toDoItem = toDoItemData.get();
            toDoItem.setStatus(status);
            toDoItemRepository.save(toDoItem);
            return new ResponseEntity<>(toDoItem, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Obtener tareas por sprint
    public List<ToDoItem> getTasksBySprint(int sprintId) {
        return toDoItemRepository.findBySprint_id(sprintId);
    }

    // Obtener tareas por usuario
    public List<ToDoItem> getTasksByUserId(Long userId) {
        return toDoItemRepository.findByUser_IdUsuario(userId);
    }

    // Actualizar horas estimadas de una tarea
    public ToDoItem updateEstimatedHours(int id, int estimatedHours) {
        Optional<ToDoItem> toDoItemData = toDoItemRepository.findById(id);
        if (toDoItemData.isPresent()) {
            ToDoItem toDoItem = toDoItemData.get();
            toDoItem.setTiempoEstimado(estimatedHours);
            return toDoItemRepository.save(toDoItem);
        }
        return null;
    }
}