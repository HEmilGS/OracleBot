package com.springboot.MyTodoList.bot;

import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.objects.Update;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;

import org.springframework.stereotype.Component;

@Component
public class TelegramBot extends TelegramLongPollingBot {
    
    private final String BOT_TOKEN = "7075157328:AAHgeGeAA7oSzSrntasoQLMhDQht25SOwEg";
    private final String BOT_USERNAME = "MyTodoListBot";

    @Override
    public String getBotUsername() {
        return BOT_USERNAME;
    }

    @Override
    public String getBotToken() {
        return BOT_TOKEN;
    }

    @Override
    public void onUpdateReceived(Update update) {
        if (update.hasMessage() && update.getMessage().hasText()) {
            String messageText = update.getMessage().getText();
            long chatId = update.getMessage().getChatId();

            SendMessage message = new SendMessage();
            message.setChatId(String.valueOf(chatId));

            switch (messageText) {
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

            try {
                execute(message);
            } catch (TelegramApiException e) {
                e.printStackTrace();
            }
        }
    }
} 