"use strict";

window.addEventListener("load", () => {

    let otherInfoRef = document.querySelector("#otherInfo");

    otherInfoRef.addEventListener("mouseover", () => {
        let infoRef = document.querySelector("#info");
        infoRef.innerHTML = "Alergier, specialkost med mera";
    })

    otherInfoRef.addEventListener("mouseleave", () => {
        let infoRef = document.querySelector("#info");
        infoRef.innerHTML = "";
    })
})