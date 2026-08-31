const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

async function request(path, opts = {}) {
  const url = `${API_BASE}${path}`;

  const token = localStorage.getItem("skillsetuToken");
  const headers = opts.headers || {};
  if (!headers["Content-Type"] && opts.body) headers["Content-Type"] = "application/json";
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(url, { ...opts, headers });

  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch (e) {
    data = text;
  }

  if (!res.ok) {
    const err = (data && data.detail) || data || res.statusText;
    const e = new Error(err);
    e.status = res.status;
    throw e;
  }

  return data;
}

export function postJson(path, body) {
  return request(path, { method: "POST", body: JSON.stringify(body) });
}

export function putJson(path, body) {
  return request(path, { method: "PUT", body: JSON.stringify(body) });
}

export function getJson(path) {
  return request(path, { method: "GET" });
}

export default { API_BASE, request, postJson, putJson, getJson };
