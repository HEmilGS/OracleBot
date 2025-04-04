package com.springboot.MyTodoList.repository;


import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.springboot.MyTodoList.model.Proyecto;

@Repository
@Transactional
@EnableTransactionManagement
public interface ProyectRepository extends JpaRepository<Proyecto,Integer> {


}

 