package com.springboot.MyTodoList.controller;

import java.time.OffsetDateTime;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.objects.Update;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.ReplyKeyboardMarkup;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.ReplyKeyboardRemove;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.buttons.KeyboardRow;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;

import com.springboot.MyTodoList.model.Sprint;
import com.springboot.MyTodoList.model.TaskStatus;
import com.springboot.MyTodoList.model.ToDoItem;
import com.springboot.MyTodoList.service.ToDoItemService;
import com.springboot.MyTodoList.util.BotCommands;
import com.springboot.MyTodoList.util.BotHelper;
import com.springboot.MyTodoList.util.BotLabels;
import com.springboot.MyTodoList.util.BotMessages;

public class ToDoItemBotController extends TelegramLongPollingBot {

    private static final Logger logger = LoggerFactory.getLogger(ToDoItemBotController.class);
    private ToDoItemService toDoItemService;
    private String botName;
    private int currentStep = 0;
    private ToDoItem currentItem = new ToDoItem();

    public ToDoItemBotController(String botToken, String botName, ToDoItemService toDoItemService) {
        super(botToken);
        logger.info("Bot Token: " + botToken);
        logger.info("Bot name: " + botName);
        this.toDoItemService = toDoItemService;
        this.botName = botName;
    }

    @Override
    public void onUpdateReceived(Update update) {
        if (update.hasMessage() && update.getMessage().hasText()) {
            String messageTextFromTelegram = update.getMessage().getText();
            long chatId = update.getMessage().getChatId();

            if (messageTextFromTelegram.equals(BotCommands.START_COMMAND.getCommand())
                    || messageTextFromTelegram.equals(BotLabels.SHOW_MAIN_SCREEN.getLabel())) {
                // Reset current state
                currentStep = 0;
                currentItem = new ToDoItem();
                
                SendMessage messageToTelegram = new SendMessage();
                messageToTelegram.setChatId(chatId);
                messageToTelegram.setText(BotMessages.HELLO_MYTODO_BOT.getMessage());

                ReplyKeyboardMarkup keyboardMarkup = new ReplyKeyboardMarkup();
                List<KeyboardRow> keyboard = new ArrayList<>();

                // first row
                KeyboardRow row = new KeyboardRow();
                row.add(BotLabels.LIST_ALL_ITEMS.getLabel());
                row.add(BotLabels.ADD_NEW_ITEM.getLabel());
                // Add the first row to the keyboard
                keyboard.add(row);

                // second row
                row = new KeyboardRow();
                row.add(BotLabels.SHOW_MAIN_SCREEN.getLabel());
                row.add(BotLabels.HIDE_MAIN_SCREEN.getLabel());
                keyboard.add(row);

                // Set the keyboard
                keyboardMarkup.setKeyboard(keyboard);

                // Add the keyboard markup
                messageToTelegram.setReplyMarkup(keyboardMarkup);

                try {
                    execute(messageToTelegram);
                } catch (TelegramApiException e) {
                    logger.error(e.getLocalizedMessage(), e);
                }

            } else if (messageTextFromTelegram.indexOf(BotLabels.DONE.getLabel()) != -1) {

                String done = messageTextFromTelegram.substring(0,
                        messageTextFromTelegram.indexOf(BotLabels.DASH.getLabel()));
                Integer id = Integer.valueOf(done);

                try {
                    ToDoItem item = getToDoItemById(id).getBody();
                    if (item != null) {
                        item.setStatus(TaskStatus.Completada); // Assuming TaskStatus is an enum with COMPLETED
                    } else {
                        logger.error("Item not found for ID: " + id);
                    }
                    updateToDoItem(item, id);
                    BotHelper.sendMessageToTelegram(chatId, BotMessages.ITEM_DONE.getMessage(), this);

                } catch (Exception e) {
                    logger.error(e.getLocalizedMessage(), e);
                }

            } else if (messageTextFromTelegram.indexOf(BotLabels.UNDO.getLabel()) != -1) {

                String undo = messageTextFromTelegram.substring(0,
                        messageTextFromTelegram.indexOf(BotLabels.DASH.getLabel()));
                Integer id = Integer.valueOf(undo);

                try {
                    ToDoItem item = getToDoItemById(id).getBody();
                    if (item != null) {
                        item.setStatus(TaskStatus.Pendiente); // Assuming TaskStatus has a value for "undone"
                    } else {
                        logger.error("Item not found for ID: " + id);
                    }
                    updateToDoItem(item, id);
                    BotHelper.sendMessageToTelegram(chatId, BotMessages.ITEM_UNDONE.getMessage(), this);

                } catch (Exception e) {
                    logger.error(e.getLocalizedMessage(), e);
                }

            } else if (messageTextFromTelegram.indexOf(BotLabels.DELETE.getLabel()) != -1) {

                String delete = messageTextFromTelegram.substring(0,
                        messageTextFromTelegram.indexOf(BotLabels.DASH.getLabel()));
                Integer id = Integer.valueOf(delete);

                try {
                    deleteToDoItem(id).getBody();
                    BotHelper.sendMessageToTelegram(chatId, BotMessages.ITEM_DELETED.getMessage(), this);

                } catch (Exception e) {
                    logger.error(e.getLocalizedMessage(), e);
                }

            } else if (messageTextFromTelegram.equals(BotCommands.HIDE_COMMAND.getCommand())
                    || messageTextFromTelegram.equals(BotLabels.HIDE_MAIN_SCREEN.getLabel())) {

                BotHelper.sendMessageToTelegram(chatId, BotMessages.BYE.getMessage(), this);

            } else if (messageTextFromTelegram.equals(BotCommands.TODO_LIST.getCommand())
                    || messageTextFromTelegram.equals(BotLabels.LIST_ALL_ITEMS.getLabel())
                    || messageTextFromTelegram.equals(BotLabels.MY_TODO_LIST.getLabel())) {

                List<ToDoItem> allItems = getAllToDoItems();
                ReplyKeyboardMarkup keyboardMarkup = new ReplyKeyboardMarkup();
                List<KeyboardRow> keyboard = new ArrayList<>();

                // command back to main screen
                KeyboardRow mainScreenRowTop = new KeyboardRow();
                mainScreenRowTop.add(BotLabels.SHOW_MAIN_SCREEN.getLabel());
                keyboard.add(mainScreenRowTop);

                KeyboardRow firstRow = new KeyboardRow();
                firstRow.add(BotLabels.ADD_NEW_ITEM.getLabel());
                keyboard.add(firstRow);

                KeyboardRow myTodoListTitleRow = new KeyboardRow();
                myTodoListTitleRow.add(BotLabels.MY_TODO_LIST.getLabel());
                keyboard.add(myTodoListTitleRow);

                List<ToDoItem> activeItems = allItems.stream().filter(item -> !item.getStatus().equals("done"))
                        .collect(Collectors.toList());

                for (ToDoItem item : activeItems) {
                    KeyboardRow currentRow = new KeyboardRow();
                    currentRow.add(item.getTitle());
                    currentRow.add(item.getID() + BotLabels.DASH.getLabel() + BotLabels.DONE.getLabel());
                    keyboard.add(currentRow);
                }

                List<ToDoItem> doneItems = allItems.stream().filter(item -> item.getStatus().equals("done"))
                        .collect(Collectors.toList());

                for (ToDoItem item : doneItems) {
                    KeyboardRow currentRow = new KeyboardRow();
                    currentRow.add(item.getTitle());
                    currentRow.add(item.getID() + BotLabels.DASH.getLabel() + BotLabels.UNDO.getLabel());
                    currentRow.add(item.getID() + BotLabels.DASH.getLabel() + BotLabels.DELETE.getLabel());
                    keyboard.add(currentRow);
                }

                // command back to main screen
                KeyboardRow mainScreenRowBottom = new KeyboardRow();
                mainScreenRowBottom.add(BotLabels.SHOW_MAIN_SCREEN.getLabel());
                keyboard.add(mainScreenRowBottom);

                keyboardMarkup.setKeyboard(keyboard);

                SendMessage messageToTelegram = new SendMessage();
                messageToTelegram.setChatId(chatId);
                messageToTelegram.setText(BotLabels.MY_TODO_LIST.getLabel());
                messageToTelegram.setReplyMarkup(keyboardMarkup);

                try {
                    execute(messageToTelegram);
                } catch (TelegramApiException e) {
                    logger.error(e.getLocalizedMessage(), e);
                }

            } else if (messageTextFromTelegram.equals(BotCommands.ADD_ITEM.getCommand())
                    || messageTextFromTelegram.equals(BotLabels.ADD_NEW_ITEM.getLabel())) {
                try {
                    currentStep = 1;
                    currentItem = new ToDoItem();
                    SendMessage messageToTelegram = new SendMessage();
                    messageToTelegram.setChatId(chatId);
                    messageToTelegram.setText("Por favor ingresa el TÍTULO de la tarea:");
                    // hide keyboard
                    ReplyKeyboardRemove keyboardMarkup = new ReplyKeyboardRemove(true);
                    messageToTelegram.setReplyMarkup(keyboardMarkup);

                    // send message
                    execute(messageToTelegram);

                } catch (Exception e) {
                    logger.error(e.getLocalizedMessage(), e);
                }

            } else if (messageTextFromTelegram.startsWith("/tasks")) {
                try {
                    int userId = Integer.parseInt(messageTextFromTelegram.split(" ")[1]);
                    List<ToDoItem> tasks = getAllToDoItems().stream()
                            .filter(task -> task.getUser_id() == userId)
                            .collect(Collectors.toList());

                    StringBuilder response = new StringBuilder("Tareas asignadas al desarrollador:\n");
                    for (ToDoItem task : tasks) {
                        response.append("- ").append(task.getTitle()).append(" (").append(task.getStatus()).append(")\n");
                    }

                    BotHelper.sendMessageToTelegram(chatId, response.toString(), this);
                } catch (Exception e) {
                    BotHelper.sendMessageToTelegram(chatId, "Error al obtener las tareas. Asegúrate de ingresar un ID válido.", this);
                }
            } else if (messageTextFromTelegram.startsWith("/kpis")) {
                try {
                    int userId = Integer.parseInt(messageTextFromTelegram.split(" ")[1]);
                    List<ToDoItem> tasks = getAllToDoItems().stream()
                            .filter(task -> task.getUser_id() == userId)
                            .collect(Collectors.toList());

                    long completedTasks = tasks.stream().filter(task -> task.getStatus() == TaskStatus.Completada).count();
                    long pendingTasks = tasks.stream().filter(task -> task.getStatus() == TaskStatus.Pendiente).count();

                    String response = String.format("KPIs del desarrollador %d:\n- Tareas Completadas: %d\n- Tareas Pendientes: %d",
                            userId, completedTasks, pendingTasks);

                    BotHelper.sendMessageToTelegram(chatId, response, this);
                } catch (Exception e) {
                    BotHelper.sendMessageToTelegram(chatId, "Error al calcular los KPIs. Asegúrate de ingresar un ID válido.", this);
                }
            } else {
                // Handle multi-step item creation
                try {
                    switch (currentStep) {
                        case 1: // Title
                            currentItem.setTitle(messageTextFromTelegram);
                            currentStep = 2;
                            BotHelper.sendMessageToTelegram(chatId, "Ahora ingresa la DESCRIPCIÓN de la tarea:", this);
                            break;
                            
                        case 2: // Description

                            try {
                                currentItem.setDescription(messageTextFromTelegram);
                                currentStep = 3;
                                BotHelper.sendMessageToTelegram(chatId, "Ingresa la FECHA LÍMITE (formato yyy-mm-dd):", this);
                            } catch (NumberFormatException e) {
                                
                            }
                            break;
                            
                            
                        case 3: // Deadline
                            try {
                                OffsetDateTime deadline = OffsetDateTime.parse(messageTextFromTelegram + "T00:00:00Z");
                                currentItem.setDeadline(deadline);
                                currentStep = 4;
                                BotHelper.sendMessageToTelegram(chatId, "Ingresa el TIEMPO ESTIMADO para completar la tarea (en horas):", this);
                            } catch (DateTimeParseException e) {
                                BotHelper.sendMessageToTelegram(chatId, "Formato de fecha inválido. Por favor ingresa la fecha en formato yyyy-mm-dd", this);
                            }
                            break;

                        case 4: // Estimated Time
                            try {
                                int estimatedTime = Integer.parseInt(messageTextFromTelegram);
                                currentItem.setTiempoEstimado(estimatedTime);
                                currentStep = 5;
                                BotHelper.sendMessageToTelegram(chatId, "Ingresa el ID del integrante al que deseas asignar esta tarea:", this);
                            } catch (NumberFormatException e) {
                                BotHelper.sendMessageToTelegram(chatId, "Por favor ingresa un número válido para el tiempo estimado.", this);
                            }
                            break;

                        case 5: // Assign User
                            try {
                                int userId = Integer.parseInt(messageTextFromTelegram);
                                currentItem.setUser_id(userId);

                                // Save the item
                                ResponseEntity entity = addToDoItem(currentItem);

                                // Reset state
                                currentStep = 0;
                                currentItem = new ToDoItem();

                                SendMessage messageToTelegram = new SendMessage();
                                messageToTelegram.setChatId(chatId);
                                messageToTelegram.setText(BotMessages.NEW_ITEM_ADDED.getMessage());

                                // Show main screen again
                                ReplyKeyboardMarkup keyboardMarkup = new ReplyKeyboardMarkup();
                                List<KeyboardRow> keyboard = new ArrayList<>();
                                KeyboardRow row = new KeyboardRow();
                                row.add(BotLabels.LIST_ALL_ITEMS.getLabel());
                                row.add(BotLabels.ADD_NEW_ITEM.getLabel());
                                keyboard.add(row);
                                row = new KeyboardRow();
                                row.add(BotLabels.SHOW_MAIN_SCREEN.getLabel());
                                row.add(BotLabels.HIDE_MAIN_SCREEN.getLabel());
                                keyboard.add(row);
                                keyboardMarkup.setKeyboard(keyboard);
                                messageToTelegram.setReplyMarkup(keyboardMarkup);

                                execute(messageToTelegram);
                            } catch (NumberFormatException e) {
                                BotHelper.sendMessageToTelegram(chatId, "Por favor ingresa un número válido para el ID del integrante.", this);
                            }
                            break;
                            
                        default:
                            // If not in creation flow, treat as simple item
                            ToDoItem newItem = new ToDoItem();
                            newItem.setTitle(messageTextFromTelegram);
                            newItem.setCreation_ts(OffsetDateTime.now());
                            newItem.setStatus(TaskStatus.Pendiente);
                            // Set default values for other fields
                            newItem.setProject_id(2); // Assuming a default project ID
                            Sprint sprint = new Sprint();
                            sprint.setId(6L); // Assuming Sprint has a setId method
                            newItem.setSprint(sprint);
                            newItem.setUser_id(0);
                            newItem.setDescription("");
                            newItem.setDeadline(OffsetDateTime.now().plusDays(7));

                            ResponseEntity entity = addToDoItem(newItem);

                            SendMessage messageToTelegram = new SendMessage();
                            messageToTelegram.setChatId(chatId);
                            messageToTelegram.setText(BotMessages.NEW_ITEM_ADDED.getMessage());

                            execute(messageToTelegram);
                            break;
                    }
                } catch (Exception e) {
                    logger.error(e.getLocalizedMessage(), e);
                }
            }
        }
    }

    @Override
    public String getBotUsername() {
        return botName;
    }

    // GET /todolist
    public List<ToDoItem> getAllToDoItems() {
        return toDoItemService.findAll();
    }

    // GET BY ID /todolist/{id}
    public ResponseEntity<ToDoItem> getToDoItemById(@PathVariable int id) {
        try {
            ResponseEntity<ToDoItem> responseEntity = toDoItemService.getItemById(id);
            return new ResponseEntity<>(responseEntity.getBody(), HttpStatus.OK);
        } catch (Exception e) {
            logger.error(e.getLocalizedMessage(), e);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // PUT /todolist
    public ResponseEntity addToDoItem(@RequestBody ToDoItem todoItem) throws Exception {
        ToDoItem td = toDoItemService.addToDoItem(todoItem);
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("location", "" + td.getID());
        responseHeaders.set("Access-Control-Expose-Headers", "location");

        return ResponseEntity.ok().headers(responseHeaders).build();
    }

    // UPDATE /todolist/{id}
    public ResponseEntity updateToDoItem(@RequestBody ToDoItem toDoItem, @PathVariable int id) {
        try {
            // Set status to "Completado"
            toDoItem.setStatus(TaskStatus.Completada);
            ToDoItem updatedToDoItem = toDoItemService.updateToDoItem(id, toDoItem);
            return new ResponseEntity<>(updatedToDoItem, HttpStatus.OK);
        } catch (Exception e) {
            logger.error(e.getLocalizedMessage(), e);
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    // DELETE todolist/{id}
    public ResponseEntity<Boolean> deleteToDoItem(@PathVariable("id") int id) {
        Boolean flag = false;
        try {
            flag = toDoItemService.deleteToDoItem(id);
            return new ResponseEntity<>(flag, HttpStatus.OK);
        } catch (Exception e) {
            logger.error(e.getLocalizedMessage(), e);
            return new ResponseEntity<>(flag, HttpStatus.NOT_FOUND);
        }
    }
}