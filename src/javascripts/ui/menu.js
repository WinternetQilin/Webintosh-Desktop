import { parentMenuStates } from "../finderbar.js";

export function clickMenuItem(item) {
    let cmd = item.getAttribute("cmd");
    let parentMenu = item.parentNode;
    let activeMenu = document.querySelector(`#finderbar p.${parentMenu.getAttribute("menu")}`);
    parentMenuStates[activeMenu] = false;
    parentMenu.classList.remove("visible");
    activeMenu.classList.remove("active");
    let func = new Function(cmd);
    func();
}