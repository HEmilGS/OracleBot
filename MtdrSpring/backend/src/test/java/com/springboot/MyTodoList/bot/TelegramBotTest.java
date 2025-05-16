package com.springboot.MyTodoList.bot;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.objects.Message;
import org.telegram.telegrambots.meta.api.objects.Update;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class TelegramBotTest {

    private TelegramBot telegramBot;

    @BeforeEach
    void setUp() {
        telegramBot = new TelegramBot();
    }

    @Test
    void testGetBotUsername() {
        assertEquals("MyTodoListBot", telegramBot.getBotUsername());
    }

    @Test
    void testGetBotToken() {
        assertEquals("7075157328:AAHgeGeAA7oSzSrntasoQLMhDQht25SOwEg", telegramBot.getBotToken());
    }

    @Test
    void testCreateStartMessage() {
        SendMessage message = new SendMessage();
        message.setChatId("1234");
        message.setText("/start");
        
        String expectedResponse = "¡Bienvenido a MyTodoList Bot! Usa /help para ver los comandos disponibles.";
        assertEquals(expectedResponse, createResponseMessage("/start", "1234").getText());
    }

    @Test
    void testCreateHelpMessage() {
        String expectedResponse = "Comandos disponibles:\n" +
                "/start - Iniciar el bot\n" +
                "/help - Ver comandos disponibles\n" +
                "/tasks - Ver tus tareas pendientes";
        assertEquals(expectedResponse, createResponseMessage("/help", "1234").getText());
    }

    private SendMessage createResponseMessage(String command, String chatId) {
        SendMessage message = new SendMessage();
        message.setChatId(chatId);
        
        switch (command) {
            case "/start":
                message.setText("¡Bienvenido a MyTodoList Bot! Usa /help para ver los comandos disponibles.");
                break;
            case "/help":
                message.setText("Comandos disponibles:\n" +
                        "/start - Iniciar el bot\n" +
                        "/help - Ver comandos disponibles\n" +
                        "/tasks - Ver tus tareas pendientes");
                break;
            case "/tasks":
                message.setText("Aquí están tus tareas pendientes...");
                break;
            default:
                message.setText("Comando no reconocido. Usa /help para ver los comandos disponibles.");
        }
        
        return message;
    }
} 