/* --- المتغيرات والألوان الأساسية --- */
:root {
    --primary-color: #4CAF50; /* أخضر جميل */
    --primary-dark: #388E3C;
    --secondary-color: #e8f5e9; /* لون فاتح جدا للخلفية */
    --background-color: #f0f2f5; /* خلفية ناعمة للجسم */
    --text-color: #333;
    --light-text-color: #eee;
    --border-color: #e0e0e0;
    --shadow-light: rgba(0, 0, 0, 0.15);
    --shadow-heavy: rgba(0, 0, 0, 0.25);
    --user-bubble: #DCF8C6; /* فقاعة المستخدم */
    --bot-bubble: #FFFFFF; /* فقاعة البوت */
}

/* --- إعادة تعيين أساسية وخطوط --- */
*, *::before, *::after {
    box-sizing: border-box;
}

body {
    font-family: 'Cairo', sans-serif;
    background-color: var(--background-color);
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin: 0;
    direction: rtl; /* لدعم اللغة العربية */
    text-align: right;
    color: var(--text-color);
    overflow: hidden; /* لمنع ظهور شريط التمرير الأفقي في بعض الحالات */
}

/* --- غلاف الشات الرئيسي (للمركزة والظلال) --- */
.chat-wrapper {
    width: 100%;
    max-width: 480px; /* أقصى عرض للشات */
    height: 95vh; /* ارتفاع تقريبي للشاشة */
    max-height: 800px;
    background-color: var(--secondary-color);
    border-radius: 20px;
    box-shadow: 0 10px 30px var(--shadow-heavy);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
    transition: all 0.3s ease-in-out;
}

/* --- تنسيقات الهاتف (جعلها بملء الشاشة تقريباً) --- */
@media (max-width: 600px) {
    .chat-wrapper {
        width: 100%;
        height: 100vh;
        max-height: unset;
        border-radius: 0;
        box-shadow: none;
    }
}

/* --- حاوية الشات الفعلية (داخل الغلاف) --- */
.chat-container {
    display: flex;
    flex-direction: column;
    height: 100%; /* تأخذ كل المساحة المتاحة من الغلاف */
}

/* --- رأس الشات --- */
.chat-header {
    background: linear-gradient(to right, var(--primary-color), var(--primary-dark));
    color: var(--light-text-color);
    padding: 15px 20px;
    text-align: center;
    box-shadow: 0 2px 8px var(--shadow-light);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.chat-header h3 {
    margin: 0;
    font-weight: 600;
    font-size: 1.2em;
}

.robot-icon {
    font-size: 1.5em;
    color: #fff;
}

/* --- صندوق المحادثات --- */
.chat-box {
    flex-grow: 1;
    padding: 20px;
    overflow-y: auto;
    background-color: #F8F9FA; /* خلفية ناعمة للمحادثات */
    scroll-behavior: smooth; /* تمرير ناعم */
}

/* شريط التمرير المخصص */
.chat-box::-webkit-scrollbar {
    width: 6px;
}
.chat-box::-webkit-scrollbar-track {
    background: var(--background-color);
}
.chat-box::-webkit-scrollbar-thumb {
    background: var(--primary-color);
    border-radius: 10px;
}
.chat-box::-webkit-scrollbar-thumb:hover {
    background: var(--primary-dark);
}

/* --- فقاعات الرسائل --- */
.message {
    margin-bottom: 12px;
    max-width: 85%;
    padding: 12px 18px;
    border-radius: 22px;
    line-height: 1.4;
    word-wrap: break-word;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    animation: fadeInMessage 0.3s ease-out forwards; /* تأثير الظهور */
}

.message p {
    margin: 0;
    font-size: 0.95em;
}

.user-message {
    background-color: var(--user-bubble);
    color: #333;
    margin-right: auto; /* يدفع إلى اليسار */
    border-bottom-right-radius: 5px; /* لمسة جمالية للزوايا */
}

.bot-message {
    background-color: var(--bot-bubble);
    color: var(--text-color);
    margin-left: auto; /* يدفع إلى اليمين */
    border-bottom-left-radius: 5px; /* لمسة جمالية للزوايا */
}

/* أنيميشن ظهور الرسالة */
@keyframes fadeInMessage {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* --- مؤشر الكتابة (Typing Indicator) --- */
.typing-indicator {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 10px 20px;
    margin-right: auto; /* يدفعه لليمين كرسالة بوت */
    margin-bottom: 10px;
    max-width: 150px;
    background-color: var(--bot-bubble);
    border-radius: 22px;
    border-bottom-left-radius: 5px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    opacity: 0; /* مخفي افتراضياً */
    transition: opacity 0.3s ease-in-out;
}

.typing-indicator.visible {
    opacity: 1;
}

.typing-indicator .dot {
    width: 8px;
    height: 8px;
    background-color: #999;
    border-radius: 50%;
    animation: bounce 1.4s infinite ease-in-out both;
}

.typing-indicator .dot:nth-child(1) { animation-delay: -0.32s; }
.typing-indicator .dot:nth-child(2) { animation-delay: -0.16s; }
.typing-indicator .dot:nth-child(3) { animation-delay: 0s; }

@keyframes bounce {
    0%, 80%, 100% {
        transform: scale(0);
    }
    40% {
        transform: scale(1);
    }
}

.typing-indicator span {
    font-size: 0.85em;
    color: #666;
}


/* --- منطقة إدخال الشات --- */
.chat-input-area {
    display: flex;
    padding: 15px;
    background-color: var(--secondary-color);
    border-top: 1px solid var(--border-color);
    gap: 10px;
}

.chat-input-area input[type="text"] {
    flex-grow: 1;
    padding: 12px 18px;
    border: 1px solid var(--border-color);
    border-radius: 25px;
    font-size: 1.0em;
    outline: none;
    transition: border-color 0.3s, box-shadow 0.3s;
    background-color: #fff;
    color: var(--text-color);
}

.chat-input-area input[type="text"]:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.2);
}

.chat-input-area button {
    background-color: var(--primary-color);
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 25px;
    cursor: pointer;
    font-size: 1.1em;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s, transform 0.2s ease-out, box-shadow 0.3s;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
}

.chat-input-area button:hover {
    background-color: var(--primary-dark);
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.chat-input-area button:active {
    transform: translateY(0);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.chat-input-area button i {
    margin: 0; /* لضمان أن تكون الأيقونة في المنتصف تماماً */
}
