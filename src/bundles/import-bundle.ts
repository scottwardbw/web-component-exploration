import bundle from '@vizia-apps/bundle-total-mentions';
import { config } from '../bundle-config';

bundle.load(config);

setTimeout(() => bundle.start(), 1000);
