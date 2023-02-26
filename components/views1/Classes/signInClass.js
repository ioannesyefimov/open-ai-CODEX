import AbstactView from "./AbstactView.js";

export default class extends AbstactView {
    constructor() {
        super()
        this.setTitle('Sign In');
  

    }

    async getHtml() {
        return `
            <form type="submit" id="login-form" class="login-form">
                    <div class="login-form-wrapper">
                        <label for="username">Email</label>
                        <input type="email" placeholder="Type in email..." area-label="email" name="email" id="email" />
                    </div>
                    <div class="login-form-wrapper">
                        <label for="password">password</label>
                        <input type="password" placeholder="Type in password..." area-label="password" name="password" id="password" />
                    </div>
                    <button type="submit" class="login-submit-btn" id="signIn">Sign In</button>
            </form>
        `
    }

    async getJS(){
        return await import('../../signIn.js')
    }

    async getCSS() {
        return await import('../../CSS/login.css')
    }

    
    smoothRender(speed) {
        document.getElementById('login-form').classList.add('animate', 'smooth-render', `animate--${speed}`)
    }
    smoothRemove(speed) {
         document.getElementById('login-form').classList.remove('smooth-render',  `animate--${speed}`)
         document.getElementById('login-form').classList.add('smooth-remove', `animate--${speed}`)
    }


}

