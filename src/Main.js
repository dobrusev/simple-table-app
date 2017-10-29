import * as app from "./App.js";

document.onreadystatechange = function () {
    if (document.readyState != 'complete') 
        return;
    app.start();
}