import store from './index';
import axios from 'axios';

store.subscribe((mutation) =>{
    switch (mutation.type){
        case 'auth/SET_TOKEN':
            if(mutation.payload){
                axios.defaults.headers['Authorization'] = `Bearer ${mutation.payload}`
                localStorage.setItem('token', mutation.payload)
            }else{
                axios.defaults.headers['Authorization'] = null
                localStorage.removeItem('token')
            }
        break;
    }
})