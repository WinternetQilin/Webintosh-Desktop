import { updateMenu } from "./finderbar.js";
import { create, bringToFront } from "./window.js";

const tip = document.querySelector("body > div.tip");

const defaultApps = [
    "访达", "启动台", "Safari浏览器", "信息", "邮件", "地图", "照片", "FaceTime通话",
    "日历", "通讯录", "提醒事项", "备忘录", "音乐", "视频", "播客", "News", "系统设置",
    "hr", "Download_Folder", "废纸篓"
];
let noAnimation = [
    "启动台",
    "访达",
    // "系统设置" 
];
let noMenuChanging = [
    "启动台"
];
let doClose = [
    "启动台"
];
let appStatus = {
    "访达": true
};

window.appStatus = appStatus;

export const dock = document.getElementById("dock");
const imgs = dock.querySelectorAll(".container img");

function init() {
    defaultApps.forEach((app, index) => {
        let container = document.createElement("div");
        container.classList.add("container");
        if (app != "hr") {
            let img = document.createElement("img");
            img.src = `./assets/icons/${app}.svg`;
            img.alt = app; 
            if (app.endsWith("Folder")) {
                img.src = "./assets/icons/folder.svg";
            }
            container.appendChild(img);
            let light = document.createElement("div");
            light.classList.add("light");
            if (index == 0) {
                light.classList.add("on");
            }
            container.appendChild(light);

            img.addEventListener("mouseup", () => {
                    if (appStatus[img.alt] == true) {
                    if (!doClose.includes(img.alt)) {
                        bringToFront(document.getElementById(img.alt), img.alt);
                    } else {
                        window.specialCloses[img.alt]();
                        light.classList.remove("on");
                    }
                } else {
                    if (!noAnimation.includes(img.alt)) {
                        img.classList.add("opening");
                        setTimeout(() => {
                            img.classList.remove("opening");
                            light.classList.add("on");
                            create("./assets/apps/"+app+".html", img.alt, light);
                            appStatus[img.alt] = true;
                            if (!noMenuChanging.includes(img.alt))
                                updateMenu(app);
                        }, 2980);
                    } else {
                        create("./assets/apps/"+app+".html", img.alt, light);
                        appStatus[img.alt] = true;
                        // light.classList.add("on");
                        if (!noMenuChanging.includes(img.alt))
                            updateMenu(app);
                    }
                }
            });
        } else {
            let hr = document.createElement("hr");
            container.appendChild(hr);
        }
        dock.appendChild(container);
    })
}

function tipSetup() {
    imgs.forEach(img => {
        img.addEventListener("mouseover", () => {
            tip.style.display = "block";
        });
        img.addEventListener("mouseout", () => {
            tip.style.display = "none";
        });
    });
}

function DockAnimation(){
    const baseWidth = 50;
    const mouseRange = 200;
    const maxScale = 1.8;
    const lerpSpeed = 0.3;
    const images = dock.querySelectorAll(".container img");

    images.forEach(img => {
        img.currentWidth = baseWidth;
        img.targetWidth = baseWidth;
    });

    dock.addEventListener("mousemove", (e) => {
        const mouseX = e.clientX;
        images.forEach((img) => {
            const rect = img.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const distance = Math.abs(mouseX - centerX);
            if (distance < mouseRange) {
                const distanceRatio = distance / mouseRange;
                const scale = 1 + (maxScale - 1) * Math.sin((1 - distanceRatio) * Math.PI / 2);
                img.targetWidth = baseWidth * scale;
            } else {
                img.targetWidth = baseWidth;
            }
        });
    });

    dock.addEventListener("mouseleave", () => {
        images.forEach((img) => {
            img.targetWidth = baseWidth;
        });
    });

    function animation() {
        images.forEach(img => {
            const diff = img.targetWidth - img.currentWidth;
            if(Math.abs(diff) > 0.1) {
                img.currentWidth += diff * lerpSpeed;
                img.style.width = `${img.currentWidth}px`;
                img.style.height = `${img.currentWidth}px`;
            }
        });
        requestAnimationFrame(animation);
    }
    animation();
}

init();
DockAnimation();
setTimeout(tipSetup, 500);