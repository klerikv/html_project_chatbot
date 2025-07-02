document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const clearButton = document.getElementById('clear-button');
    const themeToggle = document.getElementById('theme-toggle');
    
    // Загрузка истории чата из localStorage
    loadChatHistory();
    
    // Обработчик отправки сообщения
    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Очистка чата
    clearButton.addEventListener('click', clearChat);
    
    // Переключение темы
    themeToggle.addEventListener('click', toggleTheme);
    
    function sendMessage() {
        const message = userInput.value.trim();
        if (message === '') return;
        
        // Добавляем сообщение пользователя
        addMessage(message, 'user');
        userInput.value = '';
        
        // Имитация задержки ответа бота
        setTimeout(() => {
            const botResponse = getBotResponse(message);
            addMessage(botResponse, 'bot');
            
            // Сохраняем историю чата
            saveChatHistory();
        }, 500 + Math.random() * 1000);
    }
    
    function addMessage(text, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', `${sender}-message`);
        messageElement.textContent = text;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function getBotResponse(userMessage) {
        const lowerCaseMessage = userMessage.toLowerCase();
        
        if (lowerCaseMessage.includes('привет') || lowerCaseMessage.includes('здравствуй')) {
            const greetings = ['Привет!', 'Здравствуйте!', 'Добрый день!'];
            return greetings[Math.floor(Math.random() * greetings.length)];
        }
        
        if (lowerCaseMessage.includes('как тебя зовут') || lowerCaseMessage.includes('твое имя')) {
            return 'Меня зовут Виртуальный Ассистент. Я здесь, чтобы помочь вам!';
        }
        
        if (lowerCaseMessage.includes('что ты умеешь') || lowerCaseMessage.includes('твои функции')) {
            return 'Я могу отвечать на простые вопросы, показывать время и погоду. Спросите меня что-нибудь!';
        }
        
        if (lowerCaseMessage.includes('сколько времени') || lowerCaseMessage.includes('который час') || lowerCaseMessage.includes('время')) {
            const now = new Date();
            return `Сейчас ${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
        }
        
        if (lowerCaseMessage.includes('покажи погоду') || lowerCaseMessage.includes('какая погода') || lowerCaseMessage.includes('погода')) {
            const weatherResponses = [
                'Сегодня солнечно и тепло!',
                'Ожидается дождь, не забудьте зонт.',
                'Пасмурно, но без осадков.',
                'На улице ветрено, оденьтесь потеплее.'
            ];
            return weatherResponses[Math.floor(Math.random() * weatherResponses.length)];
        }
        
        if (lowerCaseMessage.includes('пока') || lowerCaseMessage.includes('до свидания')) {
            return 'До свидания! Возвращайтесь, если у вас будут вопросы.';
        }
        
        return 'Извините, я не понимаю. Попробуйте задать вопрос по-другому.';
    }
    
    function clearChat() {
        chatMessages.innerHTML = '';
        localStorage.removeItem('chatHistory');
    }
    
    function saveChatHistory() {
        const messages = [];
        document.querySelectorAll('.message').forEach(msg => {
            messages.push({
                text: msg.textContent,
                sender: msg.classList.contains('user-message') ? 'user' : 'bot'
            });
        });
        localStorage.setItem('chatHistory', JSON.stringify(messages));
    }
    
    function loadChatHistory() {
        const savedChat = localStorage.getItem('chatHistory');
        if (savedChat) {
            const messages = JSON.parse(savedChat);
            messages.forEach(msg => {
                addMessage(msg.text, msg.sender);
            });
        } else {
            // Приветственное сообщение при первом запуске
            addMessage('Привет! Я ваш виртуальный помощник. Чем могу помочь?', 'bot');
        }
    }
    
    function toggleTheme() {
        document.body.classList.toggle('dark-theme');
        themeToggle.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
    }
});