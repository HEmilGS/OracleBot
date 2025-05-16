package com.springboot.MyTodoList.service;

import com.springboot.MyTodoList.model.*;
import com.springboot.MyTodoList.repository.ToDoItemRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ToDoItemServiceTest {

    @Mock
    private ToDoItemRepository toDoItemRepository;

    @InjectMocks
    private ToDoItemService toDoItemService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCrearTarea() {
        ToDoItem tarea = new ToDoItem();
        tarea.setTitle("Tarea de prueba");
        when(toDoItemRepository.save(any(ToDoItem.class))).thenReturn(tarea);

        ToDoItem resultado = toDoItemService.save(tarea);

        assertNotNull(resultado);
        assertEquals("Tarea de prueba", resultado.getTitle());
        verify(toDoItemRepository, times(1)).save(tarea);
    }

    @Test
    void testVerTareasCompletadasSprint() {
        Sprint sprint = new Sprint(1L);
        ToDoItem t1 = new ToDoItem(); t1.setStatus(TaskStatus.Completada);
        ToDoItem t2 = new ToDoItem(); t2.setStatus(TaskStatus.Completada);
        List<ToDoItem> tareasCompletadas = List.of(t1, t2);
        when(toDoItemRepository.findBySprintAndStatus(sprint, TaskStatus.Completada)).thenReturn(tareasCompletadas);

        List<ToDoItem> resultado = toDoItemService.findCompletedTasksBySprint(sprint);

        assertEquals(2, resultado.size());
        assertTrue(resultado.stream().allMatch(t -> t.getStatus() == TaskStatus.Completada));
    }

    @Test
    void testVerTareasCompletadasUsuarioSprint() {
        Sprint sprint = new Sprint(1L);
        Usuario usuario = new Usuario();
        ToDoItem t1 = new ToDoItem(); t1.setStatus(TaskStatus.Completada); t1.setUser(usuario);
        ToDoItem t2 = new ToDoItem(); t2.setStatus(TaskStatus.Completada); t2.setUser(usuario);
        List<ToDoItem> tareasCompletadas = List.of(t1, t2);
        when(toDoItemRepository.findBySprintAndUserAndStatus(sprint, usuario, TaskStatus.Completada)).thenReturn(tareasCompletadas);

        List<ToDoItem> resultado = toDoItemService.findCompletedTasksBySprintAndUser(sprint, usuario);

        assertEquals(2, resultado.size());
        assertTrue(resultado.stream().allMatch(t -> t.getStatus() == TaskStatus.Completada && t.getUser() == usuario));
    }
} 