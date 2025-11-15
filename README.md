# ПриватБанк WooCommerce Plugin Landing Page

Сучасна landing page для продажу плагіну "Оплата частинами та Миттєва розстрочка ПриватБанк" для WooCommerce WordPress.

## Функціонал

- ✅ Темна тема з неоновими акцентами
- ✅ Повністю адаптивний дизайн
- ✅ Плавні анімації при наведенні
- ✅ Інтеграція з MonoBank для оплати через Supabase
- ✅ Валідація email
- ✅ Українська мова

## Налаштування Supabase

### 1. Змінні оточення (Environment Variables)

Вам потрібно налаштувати наступні секрети в Supabase (Dashboard -> Project Settings -> Edge Functions):

- `MONOBANK_TOKEN`: Ваш секретний ключ API від MonoBank.
- `YOUR_EMAIL_SERVICE_URL`: URL вашого сервісу для відправки email (наприклад, Resend, SendGrid). Це необов'язково; якщо не вказано, посилання для завантаження буде виведено в логах функції.

### 2. Завантаження файлу продукту

Завантажте ZIP-архів вашого плагіна в Supabase Storage:
- Створіть новий bucket з назвою `products`.
- Завантажте файл з назвою `privatbank-plugin.zip`.

### 3. Таблиця для замовлень

Виконайте наступний SQL-запит у вашому Supabase SQL Editor для створення таблиці `orders`: