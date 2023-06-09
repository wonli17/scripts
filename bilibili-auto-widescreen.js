// ==UserScript==
// @name         bilibili - 自动宽屏
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.bilibili.com/video/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bilibili.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    const remove = (p_node) => {
        if(p_node.tagName === 'LI'){
            p_node.remove();
            return;
        }
        remove(p_node.parentNode);
        console.log("#remove");
    }

    const removeBlacklist = () => {
        var blocklist = [
            'right-entry-item--upload',
            'right-entry-item',
            'right-entry--message',
            'follow-btn',
            'right-entry--vip',
            'adblock-tips',
            'recommended-swipe',
            'channel-items__right'
        ];

        blocklist.forEach((d, i) => {
            const dom = document.getElementsByClassName(d);
            if(dom.length !== 0){
                if(dom.length !== 1) {
                    dom.forEach((dd, ii) => {
                        dd.remove();
                    });
                }else {
                    dom[0].remove();
                }
            }
        });

        document.getElementsByClassName('right-entry-text').forEach((d,i) => {
            if(['动态', '收藏', '历史'].indexOf(d.innerHTML) === -1){
                remove(d.parentNode);
            }
        });
    }

    async function ctrlWideLoop() {
        const ctrlWideBtn = document.getElementsByClassName('bpx-player-ctrl-wide')[0];
        if(!ctrlWideBtn){
            await sleep(200);
            ctrlWideLoop();
        }else if([...ctrlWideBtn.classList].indexOf('bpx-state-entered') === -1) {
            ctrlWideBtn.click();
            removeBlacklist();
            return;
        }
    }


    window.addEventListener('load', () => {
        ctrlWideLoop();
    });
})();
