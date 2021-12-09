import { css } from 'lit';

export const keyMetricsStyles = css`
    :host {
        --viz-type-leading-base: calc(var(--viz-measure-base) * 9);
        --viz-type-size-base: calc(var(--viz-type-leading-base) * var(--viz-type-ratio-tight));

        font-family: var(--viz-type-face-base);
        font-weight: var(--viz-type-weight-regular);
    }

    /**
    * Breakpoints
    */

    @media only screen and (min-width: 650px) and (min-height: 250px) {
        :host {
            --viz-type-leading-base: calc(var(--viz-measure-base) * 12);
        }
    }

    @media only screen and (min-width: 900px) and (min-height: 400px) {
        :host {
            --viz-type-leading-base: calc(var(--viz-measure-base) * 18);
        }
    }

    @media only screen and (min-width: 1350px) and (min-height: 500px) {
        :host {
            --viz-type-leading-base: calc(var(--viz-measure-base) * 24);
        }
    }

    /**
    * Key metric
    */

    .key-metric-container {
        align-items: flex-end;
        display: flex;
        height: 100%;
        justify-content: start;
        padding: var(--viz-measure-gutter);
    }

    .key-metric {
        flex: 1;
        padding-bottom: calc(var(--viz-measure-base) * 9);
        padding-top: calc(var(--viz-measure-base) * 9);
        width: 100%;
    }

    .key-metric__header {
        font-size: var(--viz-type-size-base);
        line-height: var(--viz-type-leading-base);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .key-metric__label {
        display: inline;
    }

    .key-metric__progress {
        display: inline;
    }

    .key-metric__label + .key-metric__progress {
        margin-left: 0.25em;
    }

    .key-metric__value {
        font-size: calc(var(--viz-type-size-base) * var(--type-scale-multiplier));
        font-weight: var(--viz-type-weight-regular);
        letter-spacing: -.02em;
        line-height: calc(var(--viz-type-leading-base) * var(--type-scale-multiplier));
        margin-bottom: calc((var(--viz-type-leading-base) * (var(--viz-type-ratio-tight) * -0.25)) * var(--type-scale-multiplier));
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        --type-scale-multiplier: 4;
    }

    .key-metric__value--long {
        --type-scale-multiplier: 2;
    }

    .key-metric__header + .key-metric__value {
        margin-top: calc((var(--viz-type-leading-base) * (var(--viz-type-ratio-tight) * -0.066666)) * var(--type-scale-multiplier));
    }

    /**
    * Progress
    */

    .progress:before {
        display: inline-block;
        vertical-align: top;
    }

    .progress--positive {
        color: var(--viz-color-positive);
    }

    .progress--negative {
        color: var(--viz-color-negative);
    }

    .progress--equal {
        color: var(--viz-color-neutral);
    }

    .progress__icon {
        margin-right: -0.25em;
    }

    /**
    * Icon
    */

    .icon {
        display: inline-block;
        fill: currentColor;
        height: 1em;
        position: relative;
        top: calc((1 - var(--viz-type-ratio-tight)) * 0.5em);
        vertical-align: top;
        width: 1em;
    }
`;
