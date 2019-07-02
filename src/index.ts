
import registerServiceWorker from './registerServiceWorker';
import index from './pages/index';
import shapeTest from './pages/shape-test';

import './index.css';

if (window.location.pathname === '/shape-test') {
  shapeTest();
} else {
  index();
}
registerServiceWorker();
