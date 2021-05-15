// ==UserScript==
// @name         sharepoint online debug switch
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  A button that switch on/off the debug mode on sharepoint sites
// @author       Bnz-0 <matteo.benzi97@gmail.com>
// @match        https://*.sharepoint.com/*
// ==/UserScript==

(function() {
    'use strict';
    var debugItemKey = 'spfx-debug';
    var debugItemVal = '{"liveReload":false,"manifestsFileUrl":"https://localhost:4321/temp/manifests.js"}';

    var btn = document.createElement('DIV');
    btn.style.position = 'fixed';
    btn.style.height = '48px';
    btn.style.width = '48px';
    btn.style.top = '0px';
    btn.style.left = '0px';
    btn.style['background-color'] = 'white';
    btn.style['text-align'] = 'center';
    btn.style['font-family'] = 'monospace';
    btn.style['font-weight'] = 'bolder';
    btn.style['z-index'] = '999';
    btn.style.cursor = 'pointer';

    function isOn() {
        return !!window.sessionStorage.getItem(debugItemKey);
    }

    function turnOn() {
        if(!isOn()) {
            window.sessionStorage.setItem(debugItemKey, debugItemVal);
        }
        btn.innerHTML = 'Debug On';
        btn.style.color = 'red';
        btn.onclick = turnOff;
    }

    function turnOff() {
        if(isOn()) {
            window.sessionStorage.removeItem(debugItemKey);
        }
        btn.innerHTML = 'Debug Off';
        btn.style.color = 'black';
        btn.onclick = turnOn;
    }

    if(isOn()) turnOn();
    else turnOff();
    document.body.appendChild(btn);
})();
