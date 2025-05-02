package com.springboot.MyTodoList.repository;


import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.springboot.MyTodoList.model.TaskStatus; // Ensure TaskStatus is imported
import com.springboot.MyTodoList.model.ToDoItem; // Import List from java.util

@Repository
@Transactional
@EnableTransactionManagement
public interface ToDoItemRepository extends JpaRepository<ToDoItem,Integer> {
    List<ToDoItem> findByStatus(TaskStatus status);
    List<ToDoItem> findBySprint_idAndStatus(int sprintId, TaskStatus status);
    List<ToDoItem> findBySprint_id(int sprintId);
    List<ToDoItem> findByUser_IdUsuario(Long userId);
}


