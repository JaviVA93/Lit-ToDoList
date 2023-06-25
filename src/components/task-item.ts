import { html, css, LitElement } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'

@customElement('task-item')
export class taskItem extends LitElement {

    @property()
    id!: string

    @property()
    name: string = ''
    
    @property()
    completed: boolean = false

    @property()
    changeStatus!: Function

    @query('#tasksStatus')
    statusInput!: HTMLInputElement
    

    statusChange() {
        this.changeStatus(this.id, this.statusInput.checked)
    }
    
    render() {
        console.log(this.name)

        return html`
            <span>${this.name}</span>
            <span>Status: ${this.completed ? '✅' : '🧑‍💻'}</span>
            <input id="tasksStatus" type="checkbox" @change=${this.statusChange} />
        `
    }
}