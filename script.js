// **هذا هو رابط الـ Webhook الخاص بك الذي يجب أن يكون صحيحاً**
const webhookUrl = 'https://n8n.srv984382.hstgr.cloud/webhook/596cf419-d403-4008-bc7e-0a13cd97ac08/chat';

const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

// دالة مساعدة لإضافة الرسائل
function appendMessage(content, type, isThinking = false) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', type);
    if (isThinking) {
        messageElement.classList.add('bot-thinking');
    }

    // هنا يجب أن تتعامل مع تنسيق الـ Markdown إذا كان n8n يرد به
    // لكن للافتراض، نستخدم فقرة بسيطة
    messageElement.innerHTML = `<p>${content}</p>`; 

    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // التمرير لأسفل
    return messageElement;
}

async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    // 1. عرض رسالة المستخدم وإفراغ حقل الإدخال
    appendMessage(message, 'outgoing');
    userInput.value = '';
    userInput.style.height = 'auto'; // إعادة ضبط حجم textarea

    // 2. عرض رسالة الانتظار
    const thinkingMessageContent = '...جاري كتابة الرد';
    const thinkingElement = appendMessage(thinkingMessageContent, 'incoming', true);
    
    try {
        // 3. إرسال الطلب إلى n8n Webhook
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // تأكد أن n8n الخاص بك يستقبل البيانات بهذا الشكل: { "message": "رسالة المستخدم" }
            body: JSON.stringify({ message: message }) 
        });

        const data = await response.json();
        
        // 4. استخراج الرد
        // يجب أن تتأكد من اسم الحقل الذي يرسله n8n في الـ JSON (افتراضياً: 'response')
        const botResponse = data.response || data.text || "عفواً، لم أتمكن من فهم الرد من الخادم (تحقق من n8n)."; 
        
        // 5. تحديث رسالة الانتظار بالرد الفعلي
        thinkingElement.querySelector('p').innerHTML = botResponse;
        thinkingElement.classList.remove('bot-thinking');

    } catch (error) {
        console.error('Fetch Error:', error);
        
        // عرض رسالة خطأ
        thinkingElement.querySelector('p').innerHTML = "آسف، حدث خطأ في الاتصال بالخادم. حاول مجدداً.";
        thinkingElement.classList.remove('bot-thinking');
        thinkingElement.style.backgroundColor = '#FFDADA'; // لون يدل على الخطأ
        thinkingElement.style.color = '#CC0000'; 
    }
}

// الاستماع للنقر على زر الإرسال
sendButton.addEventListener('click', sendMessage);

// الاستماع للضغط على Enter (بدون Shift)
userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault(); 
        sendMessage();
    }
});