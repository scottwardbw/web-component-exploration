import Bundle from '@vizia/bundle';
import brandwatchSource from '@vizia/source-brandwatch';
import { createDestination } from '../create-destination';
import { config } from '../bundle-config';

const bundle = new Bundle();

bundle.load(config);
bundle.use(brandwatchSource({
    path: 'chart',
    aggregate: 'volume',
    dimension1: 'queries',
    dimension2: 'days',
    useComparisonSource: true
}));
bundle.use(createDestination({
    component: {
        attributes: {
            textValue: 'Test Web Component!'
        },
        name: 'test-web-component'
    }
}));
bundle.start();
