import AbstactView from "./AbstactView.js";
import send from '../../../assets/send.svg'

export default class extends AbstactView {
    constructor() {
        super()
        this.setTitle('Chat');
    }

    async getHtml() {
        return `
            <div id="chat_container"></div>
                <form id="bot-form" class="bot-form">
                <textarea name="prompt" id="" placeholder="Ask C0diNex..." cols="1" rows="1"></textarea>
                <button type="submit"><img alt="send" src='${send}'/></button>
            </form>
        `
    }

    async getJS(){
        return await import('../../chat.js')
    }

    async getCSS() {
        return await import('../../CSS/chat.css')
    }
    smoothRender(speed) {
        document.getElementById('chat_container').classList.add('animate', 'smooth-render', `animate--${speed}`)
    }
    smoothRemove(speed) {
         document.getElementById('chat_container').classList.remove('smooth-render',  `animate--${speed}`)
         document.getElementById('chat_container').classList.add('smooth-remove')
    }   
}
    


