import AbstactView from "./AbstactView.js";

export default class extends AbstactView {
    constructor() {
        super()
        this.setTitle('404');
    }

    async getHtml() {
        return `
        <div id="404" class="notfound">
          <h1>PAGE ISN'T FOUND 404</h1>
        </div>
    
        `
    }

    async getJS(){
        return await import('../../404.js')
    }

    async getCSS() {
        return await import('../../CSS/404.css')
    }

    smoothRender(speed) {
        document.getElementById('404').classList.add('animate', 'smooth-render', `animate--${speed}`)
    }
    smoothRemove(speed) {
         document.getElementById('404').classList.remove('smooth-render',  `animate--${speed}`)
         document.getElementById('404').classList.add('smooth-remove')
    }
}

