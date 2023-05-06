import { redirect } from "react-router-dom";

export function isLogin() {

    const auth = localStorage.getItem('token');

    if (!auth) {
        return redirect('/login')
    }

    return null;
}
