import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app'
import Smaf from './smaf';

ReactDOM.render(<App Smaf={Smaf}/>, document.getElementById('main'));