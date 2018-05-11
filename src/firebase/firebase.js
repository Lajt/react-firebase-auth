import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyDwTZjDdaspoa_mkOZJaXk8Su6dOmk7u9Y',
  authDomain: 'bot-panel.firebaseapp.com',
  databaseURL: 'https://bot-panel.firebaseio.com',
  projectId: 'bot-panel',
  storageBucket: 'bot-panel.appspot.com',
  messagingSenderId: '253826964325'
};

if(!firebase.apps.length){
  firebase.initializeApp(config);
}

const auth = firebase.auth();

export{
  auth
};