// ⚠️ هام: ضع رابط الويب هوك الخاص بك هنا!
const WEBHOOK_URL = 'https://n8n.srv984382.hstgr.cloud/webhook/596cf419-d403-4008-bc7e-0a13cd97ac08/chat';

const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

// دالة لإضافة رسالة إلى واجهة المحادثة
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', `${sender}-message`);
    messageDiv.innerHTML = `<p>${text}</p>`;
    chatBox.appendChild(messageDiv);
    
    // التمرير لأسفل لعرض أحدث رسالة
    chatBox.scrollTop = chatBox.scrollHeight;
}

// دالة لإرسال الرسالة إلى الويب هوك
async function sendMessage(message) {
    try {
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message }), // إرسال الرسالة في جسم JSON
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // افتراض أن الاستجابة هي نص عادي أو JSON مع حقل "text" أو "response"
        const contentType = response.headers.get("content-type");
        let botResponseText = "عذراً، حدث خطأ في معالجة الاستجابة.";

        if (contentType && contentType.includes("application/json")) {
            const data = await response.json();
            // حاول استخراج النص من الحقول الشائعة
            botResponseText = data.text || data.response || data.message || JSON.stringify(data);
        } else {
            botResponseText = await response.text();
            // قد تحتاج إلى تعديل هذا إذا كان البوت يرسل HTML
        }
        
        addMessage(botResponseText, 'bot');
    } catch (error) {
        console.error('Error:', error);
        addMessage('عذراً، حدث خطأ في الاتصال بالبوت. (راجع Console)', 'bot');
    }
}

// معالج إرسال النموذج (الرسالة)
chatForm.addEventListener('submit', function(event) {
    event.preventDefault(); // منع إعادة تحميل الصفحة

    const message = userInput.value.trim();
    if (message === '') return;

    // 1. عرض رسالة المستخدم
    addMessage(message, 'user');

    // 2. إرسال الرسالة إلى البوت
    sendMessage(message);

    // 3. مسح حقل الإدخال
    userInput.value = '';
});