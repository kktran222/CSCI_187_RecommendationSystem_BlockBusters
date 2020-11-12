import { extendObservable } from 'mobx';

// User Store
class UserStore{
    constructor(){
        extendObservable(this, {
            loading: true,
            isLoggedIn: false,
            username: ''
        });
    }
}

export default new UserStore();