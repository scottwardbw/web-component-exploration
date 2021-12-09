import {
    html,
    LitElement
} from 'lit';
import {
    customElement,
    property
} from 'lit/decorators.js';

@customElement('my-element')
class MyElement extends LitElement {
    @property()
    version: string = 'STARTING';

    override render() {
        return html`
            <p>Welcome to the Lit tutorial!</p>
            <p>This is the ${this.version} code.</p>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
      'my-element': MyElement;
    }
}
