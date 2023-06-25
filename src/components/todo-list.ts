import { html, css, LitElement } from 'lit'
import { customElement, query, state } from 'lit/decorators.js'

import './task-item'

type Ttask = {
    id: string,
    name: string,
    completed: boolean
}

@customElement('todo-list')
export class TodoList extends LitElement {

    static localTasks = localStorage.getItem('todos')

    @state()
    tasks: Ttask[] = (TodoList.localTasks) ? JSON.parse(TodoList.localTasks) : []

    @query('#newTask')
    newTaskInput: HTMLInputElement | undefined

    updateTasks(tasks: Ttask[]) {
        localStorage.setItem('todos', JSON.stringify(tasks))
        this.tasks = tasks
    }

    addTodo() {
        if (!this.newTaskInput || this.newTaskInput.value === '')
            return

        const tasksCopy = [...this.tasks]
        const id = Date.now().toString()
        tasksCopy.push({ id, name: this.newTaskInput.value, completed: false })
        this.updateTasks(tasksCopy)

        this.newTaskInput.value = ''
    }

    changeStatus(taskId: string, completed: boolean) {
        console.log(this)
        const index = this.tasks.findIndex(i => i.id === taskId)
        if (index === -1) {
            console.error('task ID not found on list')
            return
        }

        const tasksCopy = [...this.tasks]
        tasksCopy[index].completed = completed

        this.updateTasks(tasksCopy)
    }

    static styles = css`
        .tasksList {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
        }
    `

    render() {
        return html`
            <h1>TODO List 😀</h1>
            <div class="tasksList">
                ${this.tasks.map(t => html`
                    <task-item 
                        .id=${t.id}
                        .name=${t.name} 
                        .completed=${t.completed} 
                        .changeStatus=${() => this.changeStatus(t.id, t.completed)}>
                    </task-item>
                `)}
            </div>
            <form>
                <input id="newTask" placeholder="Task title..." />
                <button type="button" @click=${this.addTodo}>Add Todo</button>
            </form>
        `
    }
}