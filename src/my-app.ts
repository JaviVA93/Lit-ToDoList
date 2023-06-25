
import { html, css, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import './components/todo-list'

@customElement('my-app')
export class MyApp extends LitElement {

    static styles = css`
        section {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        h1 {
            font-size: 2rem;
        }
    `

    render() {
        return html`
            <section>
                <h1>Made with Lit</h1>
                <todo-list></todo-list>
            </section>
        `
    }
}