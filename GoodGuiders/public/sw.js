/* ================== CONFIG ================== */
const FRONTEND_BASE_URL =
  self.location.hostname === "localhost"
    ? "http://localhost:5173"
    : "https://goodguiders.onrender.com";

const BACKEND_BASE_URL =
  self.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://goodguiders-maxbrain.onrender.com";

/* ================== INSTALL ================== */
self.addEventListener("install", (event) => {
  console.log("🔧 Service Worker installing");
  self.skipWaiting();
});

/* ================== ACTIVATE ================== */
self.addEventListener("activate", (event) => {
  console.log("🚀 Service Worker activated");
  event.waitUntil(self.clients.claim());
});

/* ================== PUSH ================== */
self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : {};
  const tag = data.uniqueName;

  event.waitUntil(
    (async () => {
      /* 🔴 CLOSE if call ended / answered */
      if (data.type === "call_ended" || data.type === "call_answered") {
        const existing = await self.registration.getNotifications({ tag });
        existing.forEach((n) => n.close());
        return;
      }

      /* 🔁 Close any previous ringing notification */
      const existing = await self.registration.getNotifications({ tag });
      existing.forEach((n) => n.close());

      /* 📞 Incoming call notification */
      await self.registration.showNotification(
        data.title || "Incoming Call",
        {
          body: data.body || "Someone is calling you",
          icon: `${FRONTEND_BASE_URL}/icon-logo.png`,
          badge: `${FRONTEND_BASE_URL}/icon-logo.png`,
          tag,
          requireInteraction: true,
          // 📳 MOBILE vibration (Android / PWA)
          vibrate: [300, 150, 300, 150, 500],
          actions: [
            { action: "accept", title: "Accept" },
            { action: "reject", title: "Reject" },
          ],
          data,
        },
      );

      /* ⏱️ Auto-close after 40 seconds */
      setTimeout(async () => {
        const active = await self.registration.getNotifications({ tag });
        active.forEach((n) => n.close());
      }, 40 * 1000);
    })(),
  );
});

/* ================== CLICK ================== */
self.addEventListener("notificationclick", (event) => {
  const { uniqueName, caller, receiverId } =
    event.notification.data || {};

  event.waitUntil(
    (async () => {
      /* 🔴 Always close notification */
      const active = await self.registration.getNotifications({
        tag: event.notification.tag,
      });
      active.forEach((n) => n.close());

      /* ✅ ACCEPT → open chat with CALLER */
      if (event.action === "accept" || !event.action) {
        const chatUrl = `${FRONTEND_BASE_URL}/chat/${encodeURIComponent(
          caller,
        )}`;
        await clients.openWindow(chatUrl);
        return;
      }

      /* ❌ REJECT → notify backend */
      if (event.action === "reject") {
        await fetch(
          `${BACKEND_BASE_URL}/api/video/${uniqueName}/end-call`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              caller,
              receiverId,
              reason: "rejected",
            }),
          },
        );
      }
    })(),
  );
});