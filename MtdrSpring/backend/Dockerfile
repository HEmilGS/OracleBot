# Etapa 1: Build con Maven
FROM maven:3.9.3-eclipse-temurin-22 AS builder

WORKDIR /app

# Copiar todo el proyecto al contenedor
COPY . .

# Construir el archivo JAR
RUN mvn clean package -DskipTests

# Etapa 2: Imagen final con solo el JAR y Java runtime
FROM openjdk:22

WORKDIR /app

# Copiar el JAR construido desde el stage anterior
COPY --from=builder /app/target/MyTodoList-0.0.1-SNAPSHOT.jar MyTodoList.jar

# Copiar la carpeta de la wallet
COPY --from=builder /app/src/main/resources/Wallet_FocusDB /app/Wallet_FocusDB

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "MyTodoList.jar"]
