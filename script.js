// **تأكد من تحديث هذا الرابط بالرابط الخاص بك**
const YOUR_WEBHOOK_URL = 'https://n8n.srv984382.hstgr.cloud/webhook/596cf419-d403-4008-bc7e-0a13cd97ac08/chat';

const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

/**
 * دالة لإضافة رسالة إلى صندوق الدردشة
 * @param {string} message - نص الرسالة
 * @param {string} sender - نوع المرسل ('user' أو 'bot')
 */
function appendMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', `${sender}-message`);
    messageElement.innerHTML = `<p>${message}</p>`;
    chatBox.appendChild(messageElement);

    // التمرير التلقائي لأسفل الشات لعرض الرسالة الجديدة
    chatBox.scrollTop = chatBox.scrollHeight;
}

/**
 * دالة لإرسال الرسالة إلى الويب هوك والحصول على الرد
 */
async function sendMessage() {
    const message = userInput.value.trim();
    if (message === '') return;

    // 1. عرض رسالة المستخدم
    appendMessage(message, 'user');
    userInput.value = ''; // مسح حقل الإدخال

    // 2. عرض رسالة 'جاري الكتابة...'
    const typingMessage = document.createElement('div');
    typingMessage.classList.add('message', 'bot-message');
    typingMessage.id = 'typing-indicator';
    typingMessage.innerHTML = `<p><i class="fas fa-spinner fa-spin"></i> جاري الكتابة...</p>`;
    chatBox.appendChild(typingMessage);
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        // 3. إرسال طلب POST إلى الويب هوك
        const response = await fetch(YOUR_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chatInput: message
            })
        });

        // 4. إزالة مؤشر 'جاري الكتابة...'
        typingMessage.remove();

        if (!response.ok) {
            throw new Error(`خطأ في استجابة الشبكة: ${response.status}`);
        }

        const data = await response.json();
        let botResponse = 'عذراً، حدث خطأ أثناء معالجة رسالتك.';

        // **تعديل هذا الجزء وفقاً لهيكلية الرد من الـ n8n workflow الخاص بك**
        // افتراضياً، يتوقع أن يكون الرد في حقل اسمه 'output'
        if (data && data.output) {
            botResponse = data.output;
        } else if (data && typeof data.text === 'string') {
            botResponse = data.text;
        }

        // 5. عرض رد البوت
        appendMessage(botResponse, 'bot');

    } catch (error) {
        console.error('حدث خطأ:', error);
        
        // إزالة مؤشر 'جاري الكتابة...' في حال حدوث خطأ
        const errorIndicator = document.getElementById('typing-indicator');
        if (errorIndicator) errorIndicator.remove();
        
        appendMessage('عذراً، حدث خطأ في الاتصال بالخادم. برجاء المحاولة لاحقاً.', 'bot');
    }
}
