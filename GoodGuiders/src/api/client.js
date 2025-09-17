import axios from "axios";

const API_URL = import.meta.env?.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // if you use cookies/sessions
});

/* ---------------- Current-user discovery (no hardcoding) ---------------- */

let cachedUser = null;
let inflight = null;

function readUserFromStorage() {
  // Try common keys your app might be using already
  const keys = [
    "auth:user",
    "user",
    "currentUser",
    "gg:user",
    "profile",
  ];
  for (const k of keys) {
    const raw =
      localStorage.getItem(k) ||
      sessionStorage.getItem(k);
    if (!raw) continue;
    try {
      const u = JSON.parse(raw);
      if (u && (u._id || u.id || u.email)) return u;
    } catch {/* ignore */}
  }
  return null;
}

async function fetchUserFromAPI() {
  // Try typical “me” endpoints your backend might expose
  const candidates = ["/profile/me", "/auth/me", "/profile", "/auth", "/users/me"];
  for (const path of candidates) {
    try {
      const { data } = await axios.get(`${API_URL}${path}`, { withCredentials: true });
      const u = data?.user ?? data?.data ?? data;
      if (u && (u._id || u.id || u.email)) return u;
    } catch {/* ignore and try next */}
  }
  return null;
}

async function ensureUser() {
  if (cachedUser) return cachedUser;
  if (inflight) return inflight;

  inflight = (async () => {
    const local = readUserFromStorage();
    if (local) return local;
    const remote = await fetchUserFromAPI();
    return remote;
  })();

  cachedUser = await inflight;
  inflight = null;

  // Prime defaults so future requests get the headers automatically
  if (cachedUser) {
    const id = String(cachedUser._id || cachedUser.id || "");
    const email = (cachedUser.email || "").toLowerCase();
    if (id) api.defaults.headers.common["x-user-id"] = id;
    if (email) api.defaults.headers.common["x-user-email"] = email;
  }
  return cachedUser;
}

/* ---------------- Request interceptor ---------------- */

api.interceptors.request.use(async (config) => {
  // Keep any headers the caller already set
  config.headers = config.headers ?? {};

  // If we already have identity in headers/defaults, proceed
  if (config.headers["x-user-id"] || config.headers["x-user-email"]) {
    return config;
  }

  // Otherwise, resolve the current user (from storage or a /me endpoint)
  const u = await ensureUser();
  if (u) {
    if (!config.headers["x-user-id"] && (u._id || u.id)) {
      config.headers["x-user-id"] = String(u._id || u.id);
    }
    if (!config.headers["x-user-email"] && u.email) {
      config.headers["x-user-email"] = String(u.email).toLowerCase();
    }
  }

  // If still no identity, the backend will return 401 (as intended)
  return config;
});

export default api;
