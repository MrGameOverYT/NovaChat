<div align="center">

# ✦ NovaChat

**Мессенджер со звонками, кружками и совместным просмотром — на бесплатных сервисах**

[![Hosting](https://img.shields.io/badge/hosting-GitHub%20Pages-FF6B4A)](#)
[![Backend](https://img.shields.io/badge/backend-Firebase%20Spark-C6F25C)](#)
[![Worker](https://img.shields.io/badge/worker-Cloudflare-B79CFF)](#)

</div>

## ✨ Возможности

| | |
|---|---|
| 💬 **Чаты** | личные и общий, ответы, пересылка, закреп, реакции, правка и удаление |
| 🔎 **Поиск** | по `@username` и имени; список чатов только с теми, с кем пишешь |
| 📞 **Звонки** | голос и видео, микрофон, камера, демонстрация экрана (с компьютера) |
| 🎤 **Голосовые** и 📹 **кружки** | запись прямо в чате |
| 🎬 **Смотрим вместе** | синхронный просмотр YouTube и видео по ссылке |
| 👤 **Профили** | аватар, имя, `@username`, «О себе», статус «в сети» |
| ✓✓ **Статусы** | отправлено, доставлено, прочитано |
| 🔔 **Push** | уведомления и звонки даже при закрытом приложении |
| 🎵 **Звуки** | выбор мелодии звонка и сигнала сообщений |
| 🔐 **Вход** | почта, Google, Telegram |

## 🗂 Структура репозитория

```
├── index.html            приложение целиком
├── sw.js                 service worker (PWA, push)
├── manifest.webmanifest
├── icon-192.png  icon-512.png  badge-96.png
├── mascot/               Нова: nova-hello / nova-watch / nova-offline.png
└── songs/                ring1-3.mp3, msg1-3.mp3
```

## 🚀 Запуск

1. **Firebase** (Spark): включи Authentication (почта, Google), создай Firestore и вставь `firestore.rules`.
2. **Cloudflare Worker**: вставь `worker.js`, добавь секреты `BOT_TOKEN`, `FB_CLIENT_EMAIL`, `FB_PRIVATE_KEY`, `VAPID_KEY`.
3. **GitHub Pages**: загрузи файлы из списка выше, включи Pages (ветка `main`, корень).
4. Впиши свои ключи в блок `CFG` вверху `index.html`.

## 🎨 Дизайн

Палитра: `#1D1628` · `#FF6B4A` · `#C6F25C` · `#B79CFF` · `#FFF6EA`.
Шрифты: Unbounded и Manrope. Пузыри «лепестком».
Талисман — **Нова**, звёздочка-помощница: встречает при регистрации и ждёт вместе с тобой в совместном просмотре.

## 📱 Android

Приложение для Android (звонки как в Telegram) — в репозитории **NovaChat-Android**.

---
<div align="center">Сделано с ✦ для друзей</div>
