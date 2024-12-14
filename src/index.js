import React from 'react'
import './css/index.scss'
import Bored from './Bored'
import * as serviceWorker from './serviceWorker'
import { createRoot } from 'react-dom/client'

const root = createRoot(document.getElementById('root'));
root.render(
  <Bored />
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
