const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export const API_BASE = API_BASE_URL;

export const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("skillsetuUser") || "null");
  } catch {
    return null;
  }
};

export const saveAuthSession = (data) => {
  if (!data) return null;

  if (data.access_token) {
    // Keep both keys for compatibility with the current Login.jsx
    // and the API helper.
    localStorage.setItem("skillsetuToken", data.access_token);
    localStorage.setItem("access_token", data.access_token);
  }

  const user = data.user || getStoredUser();

  if (user) {
    localStorage.setItem("skillsetuUser", JSON.stringify(user));
    localStorage.setItem("skillsetuProfile", JSON.stringify(user));
  }

  return user;
};

export const getAuthToken = () => {
  return (
    localStorage.getItem("skillsetuToken") ||
    localStorage.getItem("access_token")
  );
};

export const getAuthHeaders = (extra = {}) => {
  const token = getAuthToken();

  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...extra,
  };
};

export const apiRequest = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...(options.headers || {}),
    },
  });

  const contentType = response.headers.get("content-type") || "";

  const payload = contentType.includes("application/json")
    ? await response.json().catch(() => null)
    : await response.text().catch(() => null);

  if (!response.ok) {
    throw new Error(
      payload?.detail ||
        payload?.message ||
        payload ||
        response.statusText ||
        "Request failed"
    );
  }

  return payload;
};

export const postJson = (path, body) => {
  return apiRequest(path, {
    method: "POST",
    body: JSON.stringify(body),
  });
};

export const putJson = (path, body) => {
  return apiRequest(path, {
    method: "PUT",
    body: JSON.stringify(body),
  });
};

export const getJson = (path) => {
  return apiRequest(path, {
    method: "GET",
  });
};

export const saveProfileToBackend = async (profilePayload) => {
  const response = await apiRequest("/profile", {
    method: "PUT",
    body: JSON.stringify(profilePayload),
  });

  const savedProfile =
    response?.profile || response?.user || response;

  if (savedProfile) {
    localStorage.setItem(
      "skillsetuProfile",
      JSON.stringify(savedProfile)
    );

    localStorage.setItem(
      "skillsetuUser",
      JSON.stringify(savedProfile)
    );
  }

  return response;
};

export const postFormData = async (path, formData) => {
  const token = getAuthToken();
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers,
    body: formData,
  });

  const contentType = response.headers.get("content-type") || "";

  const payload = contentType.includes("application/json")
    ? await response.json().catch(() => null)
    : await response.text().catch(() => null);

  if (!response.ok) {
    throw new Error(
      payload?.detail ||
        payload?.message ||
        payload ||
        response.statusText ||
        "Request failed"
    );
  }

  return payload;
};

export const clearSession = () => {
  const keysToRemove = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith("skillsetu")) {
      keysToRemove.push(key);
    }
  }
  keysToRemove.forEach((key) => localStorage.removeItem(key));
};

export default {
  API_BASE,
  API_BASE_URL,
  apiRequest,
  getStoredUser,
  saveAuthSession,
  getAuthToken,
  getAuthHeaders,
  postJson,
  putJson,
  getJson,
  saveProfileToBackend,
  postFormData,
  clearSession,
};