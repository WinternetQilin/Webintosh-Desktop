import { createAlert } from "./ui/alert.js";

export function create(file) {
    fetch(file)
        .then(response => {
            if (response.status !== 200) {
                createAlert("/assets/icons/访达.svg", "加载 App 时遇到错误", `服务器返回状态码: ${response.status}`, "好", "close");
                return;
            }
            response.text()
                .then((content) => {
                    let cleanFile = file.split("/").pop().split(".")[0];
                    document.querySelector(".container").innerHTML += content;
                    let script = document.createElement("script");
                    script.src = `./src/javascripts/apps/${cleanFile}.js`;
                    document.body.appendChild(script);
                    let link = document.createElement("link");
                    link.rel = "stylesheet";
                    link.href = `../../assets/stylesheets/apps/${cleanFile}/index.css`;
                    document.querySelector("head").appendChild(link);
                });
        })
        .catch(error => {
            console.error('Error opening app:', error);
        });
    resetWindowListeners();
}

function resetWindowListeners() {
    let windows = document.querySelectorAll(".window");
    windows.forEach(window => {
        let closeBtn = window.querySelector(".wintools .red");
        let miniBtn = window.querySelector(".wintools .yellow");
        let zoomBtn = window.querySelector(".wintools .green");

        closeBtn.addEventListener("click", () => {
            console.log("Clicked close");
        });
        miniBtn.addEventListener("click", () => {
            console.log("Clicked close");
        });
        zoomBtn.addEventListener("click", () => {
            console.log("Clicked close");
        });
    });
}

resetWindowListeners();