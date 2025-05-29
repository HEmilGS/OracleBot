# Etapa 1: Build con Maven y JDK 21
FROM maven:3.9.6-eclipse-temurin-21 AS builder

WORKDIR /app

COPY . .

RUN mvn clean package -DskipTests

# Etapa 2: Imagen final solo con el JAR
FROM openjdk:22

WORKDIR /app

COPY --from=builder /app/target/MyTodoList-0.0.1-SNAPSHOT.jar MyTodoList.jar
COPY --from=builder /app/src/main/resources/Wallet_FocusDB /app/Wallet_FocusDB

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "MyTodoList.jar"]
