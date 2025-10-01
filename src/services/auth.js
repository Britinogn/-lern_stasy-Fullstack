import { reactive } from 'vue';

export const auth = reactive({
  token: localStorage.getItem('token') || null,
  user: JSON.parse(localStorage.getItem('user')) || null   // ✅ load user from storage
});

export function setToken(token) {
  auth.token = token;
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
}

// ✅ store the user object (with role, id, etc.)
export function setUser(user) {
  auth.user = user;
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
  } else {
    localStorage.removeItem('user');
  }
}

export function isAuthenticated() {
  return !!auth.token;
}
