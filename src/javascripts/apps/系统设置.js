let selectionIcons = document.querySelectorAll(".left .list .selection div.icon");
let selections = document.querySelectorAll(".left .list .selection");
let rightTitle = document.querySelector(".right .toolbar p");

let nowPage = document.getElementById("moonphase.last.quarter.inverse");
let nowSelection = document.querySelector(".left .list .selection.focus");

selectionIcons.forEach(icon => {
    let scale = "75%";
    if (icon.getAttribute("scale")) {
        scale = icon.getAttribute("scale");
    }
    icon.style.background = `url(${icon.getAttribute("icon")}) center center / ${scale} no-repeat,
        url(../assets/images/backgrounds/bg.${icon.classList[1]}.svg) center center / cover no-repeat`;
});

selections.forEach(selection => {
    selection.addEventListener("click", () => {
        nowSelection.classList.remove("focus");
        selection.classList.add("focus");
        nowSelection = selection;

        let pageId = selection.querySelector("div").getAttribute("icon").replace("../assets/images/", "").replace(".svg", "");
        let nextPage = document.getElementById(pageId);

        nowPage.classList.remove("focus");
        nextPage.classList.add("focus");
        nowPage = nextPage;

        rightTitle.textContent = selection.querySelector("p").textContent;
    });
});