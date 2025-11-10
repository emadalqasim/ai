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
    messageDiv.classList.add('message', `${sender}-message`, 'fade-in');
    messageDiv.innerHTML = `<p>${text}</p>`;
    chatBox.appendChild(messageDiv);
    
    // التمرير لأسفل لعرض أحدث رسالة بسلاسة
    chatBox.scrollTop = chatBox.scrollHeight;
}

// دالة لإظهار مؤشر الكتابة
function showTypingIndicator() {
    typingIndicator.classList.add('visible');
    chatBox.scrollTop = chatBox.scrollHeight; // تمرير لأسفل لظهوره
}

// دالة لإخفاء مؤشر الكتابة
function hideTypingIndicator() {
    typingIndicator.classList.remove('visible');
}

// دالة لإرسال الرسالة إلى الويب هوك
async function sendMessage(message) {
    showTypingIndicator(); // إظهار مؤشر الكتابة
    userInput.disabled = true; // تعطيل الإدخال أثناء الإرسال
    sendButton.disabled = true; // تعطيل زر الإرسال

    try {
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json' // طلب استجابة JSON
            },
            body: JSON.stringify({ message: message }),
        });

        if (!response.ok) {
            // إذا كان هناك خطأ في الاستجابة، حاول قراءة النص لتفاصيل أكثر
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, Details: ${errorText}`);
        }

        // افتراض أن الاستجابة هي JSON مع حقل "text" أو "response" أو "message"
        const data = await response.json();
        let botResponseText = data.text || data.response || data.message || "عذراً، لم أتمكن من فهم استجابتك.";
        
        addMessage(botResponseText, 'bot');

    } catch (error) {
        console.error('Error:', error);
        addMessage('عذراً، حدث خطأ في الاتصال بالبوت أو معالجة الاستجابة. يرجى المحاولة لاحقاً. (راجع Console للمزيد)', 'bot');
    } finally {
        hideTypingIndicator(); // إخفاء مؤشر الكتابة دائماً
        userInput.disabled = false; // تفعيل الإدخال
        sendButton.disabled = false; // تفعيل زر الإرسال
        userInput.focus(); // إعادة التركيز على حقل الإدخال
    }
}

// معالج إرسال النموذج (الرسالة)
chatForm.addEventListener('submit', function(event) {
    event.preventDefault(); // منع إعادة تحميل الصفحة

    const message = userInput.value.trim();
    if (message === '') {
        userInput.focus(); // إعادة التركيز إذا كانت الرسالة فارغة
        return; // لا ترسل رسالة فارغة
    }

    // 1. عرض رسالة المستخدم
    addMessage(message, 'user');

    // 2. إرسال الرسالة إلى البوت
    sendMessage(message);

    // 3. مسح حقل الإدخال
    userInput.value = '';
});

// لجعل حقل الإدخال يركز تلقائياً عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    userInput.focus();
});
