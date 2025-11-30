import { createAlert } from "./ui/alert.js";

function isMobileDevice() {
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    const mobileRegex = /android|iphone|ipod|blackberry|iemobile|opera mini|mobile|windows phone|phone|webos|kindle|tablet/i;
    return mobileRegex.test(ua.toLowerCase());
}

function clientCheck() {
    if (isMobileDevice()) {
        let overlay = document.createElement("div");
        overlay.classList.add("overlay");
        document.body.appendChild(overlay);
        document.body.style.overflow = "hidden";
        createAlert("./assets/icons/访达.svg", "客户端不兼容", "请使用电脑端访问 Webintosh", "好", "closepage", true);
    }
}

window.onload = clientCheck