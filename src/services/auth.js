import {reactive} from 'vue';

export const auth = reactive({
    token: localStorage.getItem('token') || null,
    user: null
});

export function setToken(token){
    auth.token = token;
    if(token){
        localStorage.setItem('token', token);
    } else{
        localStorage.removeItem('token');
    }
};

export function isAuthenticated(){
    return !!auth.token;
}