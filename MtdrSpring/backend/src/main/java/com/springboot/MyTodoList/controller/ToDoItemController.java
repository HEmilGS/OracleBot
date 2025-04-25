package com.springboot.MyTodoList.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.MyTodoList.model.TaskStatus;
import com.springboot.MyTodoList.model.ToDoItem;
import com.springboot.MyTodoList.service.ToDoItemService;

@RestController
@RequestMapping("/api/todo")
public class ToDoItemController {
    @Autowired
    private ToDoItemService toDoItemService;

    // Obtener todas las tareas
    @GetMapping
    public List<ToDoItem> getAllToDoItems() {
        return toDoItemService.findAll();
    }

    // Obtener una tarea por ID
    @GetMapping("/{id}")
    public ResponseEntity<ToDoItem> getToDoItemById(@PathVariable int id) {
        try {
            ResponseEntity<ToDoItem> responseEntity = toDoItemService.getItemById(id);
            return new ResponseEntity<>(responseEntity.getBody(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/status/{status}")
    public List<ToDoItem> getTasksByStatus(@PathVariable TaskStatus status) {
        return toDoItemService.getTasksByStatus(status);
    }

    // Agregar una nueva tarea
    @PostMapping
    public ResponseEntity addToDoItem(@RequestBody ToDoItem todoItem) throws Exception {
        ToDoItem td = toDoItemService.addToDoItem(todoItem);
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("location", "" + td.getID());
        responseHeaders.set("Access-Control-Expose-Headers", "location");

        return ResponseEntity.ok().headers(responseHeaders).build();
    }

    // Actualizar una tarea existente
    @PutMapping("/{id}")
    public ResponseEntity updateToDoItem(@RequestBody ToDoItem toDoItem, @PathVariable int id) {
        try {
            ToDoItem toDoItem1 = toDoItemService.updateToDoItem(id, toDoItem);
            return new ResponseEntity<>(toDoItem1, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    // Eliminar una tarea por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteToDoItem(@PathVariable("id") int id) {
        Boolean flag = false;
        try {
            flag = toDoItemService.deleteToDoItem(id);
            return new ResponseEntity<>(flag, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(flag, HttpStatus.NOT_FOUND);
        }
    }

    // Obtener tareas por sprint
    @GetMapping("/sprint/{sprintId}")
    public List<ToDoItem> getTasksBySprint(@PathVariable int sprintId) {
        return toDoItemService.getTasksBySprint(sprintId);
    }

    // Obtener tareas por estado
    @GetMapping("/status/{status}")
    public List<ToDoItem> getTasksByStatus(@PathVariable TaskStatus status) {
        return toDoItemService.getTasksByStatus(status);
    }

    // Obtener tareas por sprint y estado
    @GetMapping("/sprint/{sprintId}/status/{status}")
    public List<ToDoItem> getTasksBySprintAndStatus(@PathVariable int sprintId, @PathVariable TaskStatus status) {
        return toDoItemService.getTasksBySprintAndStatus(sprintId, status);
    }

    // Actualizar el estado de una tarea
    @PutMapping("/{taskId}/status")
    public ResponseEntity updateTaskStatus(@PathVariable int taskId, @RequestParam TaskStatus status) {
        try {
            ResponseEntity<ToDoItem> responseEntity = toDoItemService.updateTaskStatus(taskId, status);
            return new ResponseEntity<>(responseEntity.getBody(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}