import AbstactView from "./AbstactView.js";

export default class extends AbstactView {
    constructor() {
        super()
        this.setTitle('Profile');
    }

    async getHtml() {
        return `
            <div class="profile-component" id="profile-component">
                <div class="credential_wrapper" id="credential_wrapper">
                    <div id="credentials"></div>
                    <div class='searchMessage-wrapper'>
                        <label for="searchMessage" id="searchMessage-label">Search question:</label>
                        <input placeholder="type in question..." type="text" id="searchMessage" area-label="search input" name="search input" />
                    </div>
                </div>
                <div id="messages-container" class="messages_wrapper"></div>
        
            <div>
        `
    }

    async getJS(){
        return await import('../../profile.js')
    }

    async getCSS() {
        return await import('../../CSS/profile.css')
    }

        
    smoothRender(speed) {
        document.getElementById('profile-component').classList.add('animate', 'smooth-render', `animate--${speed}`)
    }
    smoothRemove(speed) {
         document.getElementById('profile-component').classList.remove('smooth-render',  `animate--${speed}`)
         document.getElementById('profile-component').classList.add('smooth-remove')
    }
}

