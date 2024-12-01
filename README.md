# LeakyGram

Sample SPA app for memory leak debugging workshop

### Getting started

```
$ npm install
$ npm run dev
```

### Debugging

In Chrome navigate to `chrome://inspect`

Find the correct remote to debug. If not present add it: 

![Add the node inspector url](./devices-chrome.png)

**The application's debugger url is the one running on port 9230**

Attach to it and go to the *Memory* tab.
