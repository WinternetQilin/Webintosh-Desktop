import { closeAllMenus } from "../finderbar.js";

export function clickMenuItem(item) {
    if (item.hasAttribute("disabled")) return;

    let cmd = item.getAttribute("cmd");

    let flashCount = 0;
    const maxFlashes = 3;
    const flashInterval = 60;

    const flash = () => {
        if (flashCount < maxFlashes * 2) {
            if (flashCount % 2 === 0) {
                item.classList.add("clicked");
            } else {
                item.classList.remove("clicked");
            }
            flashCount++;
            setTimeout(flash, flashInterval);
        } else {
            closeAllMenus();
            if (cmd) {
                let func = new Function(cmd);
                func();
            }
        }
    };

    flash();
}