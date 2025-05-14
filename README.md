# OracleBot


![image](https://user-images.githubusercontent.com/7783295/116454396-cbfb7a00-a814-11eb-8196-ba2113858e8b.png)
  
Repositorio para una aplicación full-stack basada en React y Spring Boot, desplegada y probada localmente con una base de datos Oracle en contenedor Docker.

## Tecnologías Utilizadas
### Backend

* Java + Spring Boot: Framework robusto y ampliamente adoptado en la industria, ideal para construir APIs REST.

* Spring Data JPA: Facilita el acceso a la base de datos.

* Spring Security: Para autenticación y autorización.

* Maven: Gestión de dependencias y build.

* Docker: Para desplegar la base de datos Oracle localmente.


### Frontend

* React + TypeScript: Biblioteca moderna con tipado fuerte.

* Vite: Herramienta rápida de construcción.

* Tailwind CSS: Estilos con clases utilitarias.

* Axios: Cliente HTTP para llamadas a la API.

* React Router: Enrutamiento entre vistas.

* Lucide React: Íconos SVG modernos y ligeros.

### Requisitos Previos
* Docker

* Node.js (v18+)

* Maven

* Oracle SQL Developer

* Git

## Scripts en OCI Cloud Shell  
El laboratorio ejecuta scripts que requieren el siguiente software para funcionar correctamente: (Estos ya están instalados y disponibles en el entorno de OCI Cloud Shell)

- oci-cli

- python 2.7^

- terraform

- kubectl

- mvn (maven)

## Cómo ejecutar el proyecto localmente
### 1. Clona el repositorio
    git clone https://github.com/HEmilGS/OracleBot.git 
    cd OracleBot

### 2. Base de datos
    docker run -d -p 1521:1521 -e ORACLE_PASSWORD=TuContraseña gvenzl/oracle-free:slim-faststart

### 3. Backend (Spring Boot)

    cd MtdrSpring/backend
    mvn clean install
    mvn spring-boot:run

Por defecto corre en: http://localhost:8080

### 4. Frontend (React + Vite)

    cd ../frontend
    npm install
    npm run dev

Por defecto corre en: http://localhost:5173

## Notas adicionales
- El backend y frontend están separados en carpetas (/backend y /frontend).

- Puedes editar las variables de entorno o configurar conexiones en los archivos .env si lo deseas.