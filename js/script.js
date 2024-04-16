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

    //Lyssnare för att hämta en bokning i listan
    formAvbokaRef.addEventListener("submit", (event) => {
        event.preventDefault();
        console.log("submit");
       let searchNameRef = document.querySelector("#searchName");

        bookings.forEach((Booking) => {
            let searchNameValue = searchNameRef.value;

            if(searchNameValue ==  Booking.name){
                console.log("hej!");
                containerRemoveRef.classList.remove("d-none");
                let timeRef = document.querySelector("#timeRemove");
                let tableRef = document.querySelector("#selectRemove");
                let ovrigtRemoveRef = document.querySelector("#OvrigtRemove");

                timeRef.value = Booking.time;
                tableRef.value = Booking.bord;
                ovrigtRemoveRef.value = Booking.otherInfo;
            }
            else{
                containerRemoveRef.classList.add("d-none");
            }  
       });
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
      $("#bokningsLista li").filter(function() {
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
      $("#bokningsLista li").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
});



//#endregion

//Klass för att skapa bokningar
class Booking{
    constructor(name, phone, bord, time, guests, otherInfo){
        this.name = name;
        this.phone = phone;
        this.bord = bord;
        this.time = time;
        this.guests = guests;
        this.otherInfo = otherInfo;
    }
}
//array för att lagra bokningar
let bookings = [];
let ledigaBord = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
$(document).ready(function(){
    //Lägg till bord i select
    UppdateraBord();
});


//Uppdatera lediga bord
function UppdateraBord(){
    let select = document.querySelector("#bokaBord");
    select.innerHTML = "";
    ledigaBord.forEach(bord => {
        let option = document.createElement("option");
        option.value = bord;
        option.text = `Bord ${bord}`;
        select.appendChild(option);
    });
}

//Ta bort bord från lediga bord
function taBortBord(bord){
    console.log(bord);
    let index = ledigaBord.indexOf(parseInt(bord));
    if(index > -1){
        ledigaBord.splice(index, 1);
    }
    console.log(ledigaBord);
    UppdateraBord();
}



//Uppdatera bokningar
function updateBookings(bord){
    let bookingList = document.querySelector("#bokningsLista");

    //Rensa listan
    bookingList.innerHTML = "";

    //Lägg till bokningar i listan
    bookings.forEach(booking => {
        taBortBord(booking.bord);
        const li = document.createElement("li");
        
        li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
        const flexDiv = document.createElement("div");
        const h4 = document.createElement("h4");
        h4.innerHTML = `Bord : ${booking.bord}`;
        flexDiv.appendChild(h4);
        const h5 = document.createElement("h5");
        h5.innerHTML = `Namn : ${booking.name}`;
        flexDiv.appendChild(h5);
        const p1 = document.createElement("p");
        p1.innerHTML = `Telefon : ${booking.phone}`;
        flexDiv.appendChild(p1);
        const p2 = document.createElement("p");
        p2.innerHTML = `Tid : ${booking.time}`;
        flexDiv.appendChild(p2);
        const p3 = document.createElement("p");
        p3.innerHTML = `Antal gäster : ${booking.guests}`;
        flexDiv.appendChild(p3);
        flexDiv.childNodes.forEach(child => {
            child.style.margin = "0px";
            child.style.padding = "0px";
        });
        li.appendChild(flexDiv);
        const button = document.createElement("button");
        button.classList.add("btn", "btn-danger");
        button.innerHTML = "Ta bort";
        li.appendChild(button);
        bookingList.appendChild(li);
    });
}

//Skicka bokning
$("#bookingForm").submit(function(event){
    event.preventDefault();
    let name = $("#bokaNamn").val();
    let phone = $("#bokaTelefon").val();
    let bord = $("#bokaBord").val();
    let time = $("#bokaTid").val();
    let guests = $("#bokaGaster").val();
    let otherInfo = $("#bokaOvrigt").val();

    //Skapa ny bokning
    let booking = new Booking(name, phone, bord, time, guests, otherInfo);
    console.log(booking);
    
    //Rensa formulär
    $("#bookingForm").trigger("reset");

    //Lägg till bokning i array
    bookings.push(booking);

    //Uppdatera bokningar
    updateBookings(bord);
});

