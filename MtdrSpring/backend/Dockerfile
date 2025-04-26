FROM openjdk:22

WORKDIR /app

# Copiar el archivo JAR de la aplicación
COPY target/MyTodoList-0.0.1-SNAPSHOT.jar MyTodoList.jar

# Copiar la carpeta de la wallet al contenedor
COPY src/main/resources/Wallet_FocusDB /app/Wallet_FocusDB

# Exponer el puerto de la aplicación
EXPOSE 8081

# Configurar el punto de entrada
ENTRYPOINT ["java", "-jar", "MyTodoList.jar"]

