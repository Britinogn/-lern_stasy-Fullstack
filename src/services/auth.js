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
// export function setUser(user) {
//   //auth.user = user;
//   auth.user = response.data.user;

//   if (user) {
//     localStorage.setItem('user', JSON.stringify(user));
//   } else {
//     localStorage.removeItem('user');
//   }
// }

// export function isAuthenticated() {
//   return !!auth.token;
// }

export function setUser(user) {
  const normalizedUser = user ? { ...user, id: user.id || user._id } : null;
  auth.user = normalizedUser;

  if (normalizedUser) {
    localStorage.setItem('user', JSON.stringify(normalizedUser));
  } else {
    localStorage.removeItem('user');
  }
}