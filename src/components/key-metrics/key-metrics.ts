import {
    html,
    LitElement,
    svg
} from 'lit';
import {
    customElement,
    property
} from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { icons } from '@brandwatch/axiom-materials';
import viziaFormat from '@vizia/format';
import { keyMetricsStyles } from './key-metrics-styles';

interface IConfiguration {
    bwApiRootUrl: string;
    destTarget: string;
    endDate: string;
    filter: {
        queryId: number[];
    };
    locale: string;
    projectId: number;
    startDate: string;
    timezone: string;
    token: string;
}

interface IData {
    comparisonValue: number;
    currency?: boolean;
    currencySymbol?: string;
    format?: string;
    invertSentiment?: boolean;
    label: string;
    value: number;
}

interface IIcon {
    body: string;
    height: string;
    viewBox: string;
    width: string;
}

@customElement('key-metrics')
class KeyMetrics extends LitElement {
    @property({ type: Object })
    configuration: IConfiguration = {
        bwApiRootUrl: ``,
        destTarget: ``,
        endDate: ``,
        filter: {
            queryId: []
        },
        locale: ``,
        projectId: 0,
        startDate: ``,
        timezone: ``,
        token: ``
    };

    @property({ type: Object })
    data: IData = {
        comparisonValue: 0,
        label: ``,
        value: 0
    };

    /*constructor() {
        super();

        this.configuration = {
            bwApiRootUrl: "https://newapi.stage.brandwatch.net",
            destTarget: "#bundle-container",
            endDate: "2021-11-11T00:00:00+0000",
            filter: {
                queryId: [
                    161375145
                ]
            },
            locale: "en-GB",
            projectId: 161375132,
            startDate: "2021-11-01T00:00:00+0000",
            timezone: "Europe/London",
            token: "295077d6-3009-45b4-a6c0-2a097852fe4f"
        };
        this.data = {
            comparisonValue: 91967,
            label: "Total Mentions",
            value: 82028
        };
    };*/

    getModifiers(baseClass: string, modifiers: { long: boolean }): string {
        return Object.entries(modifiers)
            .filter((entry) => entry[1])
            .map((entry) => entry[0])
            .map((modifierClass) => `${baseClass}--${modifierClass}`)
            .join(` `);
    };

    getProgressValue = (value: number, comparisonValue: number): number => Math.abs((value - comparisonValue) / comparisonValue);

    getProgressSentimentModifier = (value: number, comparisonValue: number, invertSentiment = false) => {
        const a = invertSentiment ? comparisonValue : value,
            b = invertSentiment ? value : comparisonValue;

        if (a < b) {
            return `negative`;
        } else if (a > b) {
            return `positive`;
        }

        return `equal`;
    };

    getProgressChangeIcon = (value: number, comparisonValue: number): IIcon => {
        const a = value,
            b = comparisonValue;

        if (a < b) {
            return icons[`arrow-down-right`];
        } else if (a > b) {
            return icons[`arrow-up-right`];
        }

        return icons[`chevron-right`];
    };

    iconTemplate = (icon: IIcon) => svg`<svg class="icon" viewBox=${icon.viewBox}>${unsafeSVG(icon.body)}</svg>`;

    keyMetricProgressTemplate() {
        const progressChangeIcon: IIcon = this.getProgressChangeIcon(this.data.value, this.data.comparisonValue);

        const formattedProgress: string = viziaFormat(this.getProgressValue(this.data.value, this.data.comparisonValue), {
            format: `percent`,
            locale: this.configuration.locale,
            mantissa: 0,
            output: `html`
        });

        const modifiers: string = [
            this.getProgressSentimentModifier(this.data.value, this.data.comparisonValue, this.data.invertSentiment)
        ]
            .filter((modifier) => modifier)
            .map((modifier) => `progress--${modifier}`)
            .join(` `);

        return html`
            <div class="key-metric__progress">
                <span class="progress ${modifiers}">
                    <span class="progress__icon">
                        ${this.iconTemplate(progressChangeIcon)}
                    </span>
                    <span class="progress__value">
                        ${unsafeHTML(formattedProgress)}
                    </span>
                </span>
            </div>
        `;
    };

    keyMetricHeaderTemplate() {
        if (!this.data.label && this.data.comparisonValue === undefined) {
            return;
        }

        return html`
            <div class="key-metric__header">
                ${this.data.label ?? html`<div class="key-metric__label">${this.data.label}</div>`}
                ${this.data.comparisonValue !== undefined && this.data.format !== `text` ? this.keyMetricProgressTemplate() : ``}
            </div>
        `;
    };

    keyMetricValueTemplate() {
        const formattedValue: string = this.data.format === `text` ? this.data.value : viziaFormat(this.data.value, {
            format: this.data.format,
            currency: this.data.currency,
            currencySymbol: this.data.currencySymbol,
            locale: this.configuration.locale,
            output: `html`
        });

        const modifiers: string = this.getModifiers(`key-metric__value`, {
            long: this.data.format === `text` || `${formattedValue}`.replace(/<[^>]+>/g, ``).length >= 10
        });

        return html`
            <div class="key-metric__value ${modifiers}">
                ${unsafeHTML(formattedValue)}
            </div>
        `;
    };

    static override styles = [keyMetricsStyles];

    override render() {
        return html`
            <div class="key-metric-container">
                <div class="key-metric">
                    ${this.keyMetricHeaderTemplate()}
                    ${this.keyMetricValueTemplate()}
                </div>
            </div>
        `;
    };
};

declare global {
    interface HTMLElementTagNameMap {
        'key-metrics': KeyMetrics;
    }
}
