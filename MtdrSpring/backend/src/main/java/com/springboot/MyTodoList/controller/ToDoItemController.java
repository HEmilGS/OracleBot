package com.springboot.MyTodoList.controller;

import java.util.List;
import java.util.Map;
import java.util.LinkedHashMap;
import java.util.ArrayList;

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
    
    // Agregar una nueva tarea
    @PostMapping
    public ResponseEntity addToDoItem(@RequestBody ToDoItem todoItem) throws Exception {
        ToDoItem td = toDoItemService.addToDoItem(todoItem);
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("location", "" + td.getID());
        responseHeaders.set("Access-Control-Expose-Headers", "location");

        return new ResponseEntity<>(td, responseHeaders, HttpStatus.CREATED);
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

    // Finalizar una tarea y registrar horas reales
    @PutMapping("/{id}/finalizar")
    public ResponseEntity<ToDoItem> finalizarTarea(
            @PathVariable int id,
            @RequestParam Integer TiempoReal
    ) {
        return toDoItemService.finalizarTarea(id, TiempoReal);
    }

    @GetMapping("/{id}/username")
    public ResponseEntity<String> getUserNameByToDoItemId(@PathVariable int id) {
        try {
            ToDoItem toDoItem = toDoItemService.getItemById(id).getBody();
            if (toDoItem != null && toDoItem.getUser() != null) {
                return new ResponseEntity<>(toDoItem.getUser().getNombre(), HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/horas-sprint")
    public List<Map<String, Object>> getHorasPorUsuarioYSprint() {
        List<ToDoItem> tareas = toDoItemService.findAll();
        Map<String, Map<String, Integer>> agrupado = new LinkedHashMap<>();

        for (ToDoItem tarea : tareas) {
            if (tarea.getSprint() == null || tarea.getUser() == null) continue;
            String sprint = tarea.getSprint().getNombre(); // Sprint: nombre
            String usuario = tarea.getUser().getNombre();  // Usuario: nombre
            int tiempo = tarea.getTiempoReal() != null ? tarea.getTiempoReal() : 0;

            agrupado.putIfAbsent(sprint, new LinkedHashMap<>());
            Map<String, Integer> usuarios = agrupado.get(sprint);
            usuarios.put(usuario, usuarios.getOrDefault(usuario, 0) + tiempo);
        }

        List<Map<String, Object>> resultado = new ArrayList<>();
        for (Map.Entry<String, Map<String, Integer>> entry : agrupado.entrySet()) {
            String sprint = entry.getKey();
            for (Map.Entry<String, Integer> userEntry : entry.getValue().entrySet()) {
                Map<String, Object> fila = new LinkedHashMap<>();
                fila.put("sprint", sprint);
                fila.put("usuario", userEntry.getKey());
                fila.put("tiempoReal", userEntry.getValue());
                resultado.add(fila);
            }
        }
        return resultado;
    }

    @GetMapping("/tareas-sprint")
    public List<Map<String, Object>> getTareasCompletadasPorUsuarioYSprint() {
        List<ToDoItem> tareas = toDoItemService.findAll();
        Map<String, Map<String, Integer>> agrupado = new LinkedHashMap<>();

        for (ToDoItem tarea : tareas) {
            // Solo contar tareas completadas
            if (tarea.getSprint() == null || tarea.getUser() == null) continue;
            if (tarea.getStatus() == null || !tarea.getStatus().name().equalsIgnoreCase("Completada")) continue;
            String sprint = tarea.getSprint().getNombre();
            String usuario = tarea.getUser().getNombre();

            agrupado.putIfAbsent(sprint, new LinkedHashMap<>());
            Map<String, Integer> usuarios = agrupado.get(sprint);
            usuarios.put(usuario, usuarios.getOrDefault(usuario, 0) + 1);
        }

        List<Map<String, Object>> resultado = new ArrayList<>();
        for (Map.Entry<String, Map<String, Integer>> entry : agrupado.entrySet()) {
            String sprint = entry.getKey();
            for (Map.Entry<String, Integer> userEntry : entry.getValue().entrySet()) {
                Map<String, Object> fila = new LinkedHashMap<>();
                fila.put("sprint", sprint);
                fila.put("usuario", userEntry.getKey());
                fila.put("tareasCompletadas", userEntry.getValue());
                resultado.add(fila);
            }
        }
        return resultado;
    }

    @GetMapping("/horas-totales-sprint")
    public List<Map<String, Object>> getHorasTotalesPorSprint() {
        List<ToDoItem> tareas = toDoItemService.findAll();
        Map<String, Integer> horasPorSprint = new LinkedHashMap<>();

        for (ToDoItem tarea : tareas) {
            if (tarea.getSprint() == null) continue;
            String sprint = tarea.getSprint().getNombre();
            int tiempo = tarea.getTiempoReal() != null ? tarea.getTiempoReal() : 0;
            horasPorSprint.put(sprint, horasPorSprint.getOrDefault(sprint, 0) + tiempo);
        }

        List<Map<String, Object>> resultado = new ArrayList<>();
        for (Map.Entry<String, Integer> entry : horasPorSprint.entrySet()) {
            Map<String, Object> fila = new LinkedHashMap<>();
            fila.put("sprint", entry.getKey());
            fila.put("horas", entry.getValue());
            resultado.add(fila);
        }
        return resultado;
    }
}