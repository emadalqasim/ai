// ⚠️ هام: ضع رابط الويب هوك الخاص بك هنا!
const WEBHOOK_URL = 'https://n8n.srv984382.hstgr.cloud/webhook/596cf419-d403-4008-bc7e-0a13cd97ac08/chat';

const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');
const typingIndicator = document.getElementById('typing-indicator');
const sendButton = document.getElementById('send-button');

// دالة لإضافة رسالة إلى واجهة المحادثة
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    // إضافة كلاس slideIn لتفعيل الحركة
    messageDiv.classList.add('message', `${sender}-message`, 'slideIn');
    messageDiv.innerHTML = `<p>${text}</p>`;
    chatBox.appendChild(messageDiv);
    
    // التمرير لأسفل لعرض أحدث رسالة بسلاسة
    chatBox.scrollTop = chatBox.scrollHeight;
}

// دالة لإظهار مؤشر الكتابة
function showTypingIndicator() {
    typingIndicator.classList.add('visible');
    chatBox.scrollTop = chatBox.scrollHeight; 
}

// دالة لإخفاء مؤشر الكتابة
function hideTypingIndicator() {
    typingIndicator.classList.remove('visible');
}

// دالة لإرسال الرسالة إلى الويب هوك
async function sendMessage(message) {
    showTypingIndicator(); // إظهار مؤشر الكتابة
    userInput.disabled = true; // تعطيل الإدخال
    sendButton.disabled = true; // تعطيل زر الإرسال

    try {
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json' 
            },
            body: JSON.stringify({ message: message }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, Details: ${errorText}`);
        }

        const data = await response.json();
        let botResponseText = data.text || data.response || data.message || "عذراً، لم أتمكن من فهم استجابتك.";
        
        // محاكاة تأخير بسيط للرد لإضافة واقعية (تفاعل عالي الجودة)
        await new Promise(resolve => setTimeout(resolve, 800)); 

        addMessage(botResponseText, 'bot');

    } catch (error) {
        console.error('Error:', error);
        addMessage('عذراً، حدث خطأ في الاتصال بالبوت. (تأكد من رابط الويب هوك الخاص بك)', 'bot');
    } finally {
        hideTypingIndicator(); // إخفاء مؤشر الكتابة
        userInput.disabled = false; // تفعيل الإدخال
        sendButton.disabled = false; // تفعيل زر الإرسال
        userInput.focus(); // إعادة التركيز
    }
}

// معالج إرسال النموذج (الرسالة)
chatForm.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const message = userInput.value.trim();
    if (message === '') {
        userInput.focus();
        return; 
    }

    // 1. عرض رسالة المستخدم
    addMessage(message, 'user');

    // 2. إرسال الرسالة إلى البوت
    sendMessage(message);

    // 3. مسح حقل الإدخال
    userInput.value = '';
});

// التركيز التلقائي
document.addEventListener('DOMContentLoaded', () => {
    userInput.focus();
});