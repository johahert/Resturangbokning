"use strict";

window.addEventListener("load", () => {

    let otherInfoRef = document.querySelector("#otherInfo");
    let otherInfoRemoveRef = document.querySelector("#otherInfoRemove");

    otherInfoRef.addEventListener("mouseover", () => {
        let infoRef = document.querySelector("#info");
        infoRef.innerHTML = "Alergier, specialkost m.m";
    });

    otherInfoRef.addEventListener("mouseleave", () => {
        let infoRef = document.querySelector("#info");
        infoRef.innerHTML = "";
    });

    otherInfoRemoveRef.addEventListener("mouseover", () => {
        let infoRef = document.querySelector("#infoRemove");
        infoRef.innerHTML = "Alergier, specialkost m.m";
    });

    otherInfoRemoveRef.addEventListener("mouseleave", () => {
        let infoRef = document.querySelector("#infoRemove");
        infoRef.innerHTML = "";
    });

    let formAvbokaRef = document.querySelector("#avbokaForm");
    let containerRemoveRef = document.querySelector("#containerRemove");

    formAvbokaRef.addEventListener("submit", (event) => {
        event.preventDefault();
        console.log("submit");
       let searchNameRef = document.querySelector("#searchName");

       if(searchNameRef.value === "Daniel"){
        console.log("Hej Daniel!");
        containerRemoveRef.classList.remove("d-none");
       }
       else{
        containerRemoveRef.classList.add("d-none");
        alert("Hittade inga bokningar")

       }
    });

    /*Globaltobjekt som håller värden för timer som uppdaterar värdet i
    bokningsformulärets timer*/
    window.oGlobalobject = {
        timer : null,
        houers : new Date().getHours(),
        min : new Date().getMinutes(),
        sec : new Date().getSeconds()
    }

    oGlobalobject.timer = setInterval(() => {
        UpTime(oGlobalobject.houers, oGlobalobject.min, oGlobalobject.sec)
    }, 1000);
    
})

//Funktion som uppdaterar klockslaget varje secund när timern körs
function UpTime(houers, min, sec){
    sec += 1;
    if(sec == 60){
        min += 1;
        sec = 0;
    }
    else if(min == 60){
        min = 0;
        houers += 1;
    }
    else if(houers == 24){
        houers = 0;
    }

    let timRef = document.querySelector("#Time");
    timRef.value = houers + ":" + min;

   return oGlobalobject.houers = houers, oGlobalobject.min = min, oGlobalobject.sec = sec;
}

//#region jquery //TODO - filter för checkboxes

//sökfilter för lista
$(document).ready(function(){
    $("#myInput").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#myList li").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });
//Rensa sökfält och återställ lista
$(document).ready(function(){
    var $myInput = document.querySelector('#myInput');
    $("#clearButton").on('click', function(){
      $myInput.value = '';
      var value = $myInput.value.toLowerCase();
      $("#myList li").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
});



//#endregion