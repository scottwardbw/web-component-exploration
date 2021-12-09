import {
    html,
    LitElement
} from 'lit';
import {
    customElement,
    property
} from 'lit/decorators.js';

@customElement('test-web-component')
class TestWebComponent extends LitElement {
    @property({ type: Object })
    data: any = {};

    @property({ type: String })
    textValue: string = '';

    override render() {
        return html`
            <div>${this.textValue}</div>
            <div>${JSON.stringify(this.data)}</div>
        `;
    };
};

declare global {
    interface HTMLElementTagNameMap {
        'test-web-component': TestWebComponent;
    }
};
