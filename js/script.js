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
    /* formAvbokaRef.addEventListener("submit", (event) => {
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
 */

    bookings.forEach(Booking)
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
        console.log($(this).find('h5').text().toLowerCase().indexOf(value) > -1);
        $(this).toggle($(this).find('h5').text().toLowerCase().indexOf(value) > -1);
        
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
function addBord(bord){
    ledigaBord.push(bord);
    UppdateraBord();
}



//Uppdatera bokningar
function updateBookings(){
    let bookingList = document.querySelector("#bokningsLista");

    //Rensa listan
    bookingList.innerHTML = "";

    //Lägg till bokningar i listan
    bookings.forEach(booking => {

        //Hämtar bokningens tid i minuter
        let bookingHours = parseInt(booking.time.split(":")[0]);
        let bookingMinutes = parseInt(booking.time.split(":")[1]);
        let bookingTotalMinutes = bookingHours * 60 + bookingMinutes;

        //rensar bord
        taBortBord(booking.bord);

        //Skapar list item
        const li = document.createElement("li");
        li.classList.add("list-group-item");

        //Lägger till data-time attribut
        li.setAttribute("data-time", bookingTotalMinutes);

        //skapar en wrapper för allt innehåll i li, filter toggle fungerade ej på d-flex
        const liWrapper = document.createElement("div");
        liWrapper.classList.add("d-flex", "justify-content-between", "align-items-center");


        //#region Lägger till text
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
        liWrapper.appendChild(flexDiv);
        li.appendChild(liWrapper);
        //#endregion

        //#region Lägger till knapper

        //Skapar div för knappar
        const knapparDiv = document.createElement("div");
        knapparDiv.classList.add("d-flex", 'flex-column', 'gap-2');

        //Avboka-knapp
        const avbokaButton = document.createElement("button");
        avbokaButton.classList.add("btn", "btn-danger");
        avbokaButton.innerHTML = "Avboka";
        avbokaButton.addEventListener("click", () => {
            let index = bookings.indexOf(booking);
            if(index > -1){
                bookings.splice(index, 1);
                addBord(booking.bord);
                updateBookings();
            }
        });
        knapparDiv.appendChild(avbokaButton);

        //Omboka-knapp
        const ombokaButton = document.createElement("button");
        ombokaButton.classList.add("btn", "btn-warning");
        ombokaButton.setAttribute("data-bs-toggle", "modal");
        ombokaButton.setAttribute("data-bs-target", "#OmbokaModal");
        ombokaButton.innerHTML = "Omboka";
        knapparDiv.appendChild(ombokaButton);

        liWrapper.appendChild(knapparDiv);
        //#endregion

        bookingList.appendChild(li);
        
        
        ombokaButton.addEventListener("click", () => {
            let ombokaNameRef = document.querySelector("#ombokaName");
            let ombokaPhoneRef = document.querySelector("#ombokaPhone");
            let ombokaTidRef = document.querySelector("#ombokaTid");
            let ombokaTableRef = document.querySelector("#ombokaTable");
            let ombokaOvrigtRef = document.querySelector("#ombokaOvrigt");

            ombokaNameRef.value = booking.name;
            ombokaPhoneRef.value = booking.phone;
            ombokaTidRef.value = booking.time;
            ombokaTableRef.value = booking.bord;
            ombokaOvrigtRef.value = booking.otherInfo;
        })
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


//Filtera bokningar på tid
$(document).ready(function(){

    //Hämtar aktuell tid i minuter
    var hours = new Date().getHours();
    var minutes = new Date().getMinutes();
    var totalMinutes = hours * 60 + minutes;

    //Lyssnare för att filtrera bokningar på tid
    $("#aktivaCheckbox").on("change", function(){
        console.log(totalMinutes);
        bookings.forEach(booking => {
            $("#bokningsLista li").filter(function() {

                //Hämtar li elementets data-time attribut
                if($("#aktivaCheckbox").prop("checked")){
                    $(this).toggle($(this).data("time") <= totalMinutes);
                }
                //Visar alla bokningar
                else{
                    $(this).toggle(true);
                }
            });
        });
    });
});

