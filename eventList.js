document.addEventListener("DOMContentLoaded", (event) => {
  //skapar admingränssnitt
  let adminBtn = document.getElementById("adminBtn");
  let adminInput = document.getElementById("adminInput");
  //let listedEvent;
  //let buttonsContainer;
  
  adminBtn.addEventListener("click", (e) => {
    //visar/gömmer admin tools när man trycker på admin login/admin logout
    if (adminInput.className == "hide") {
      adminInput.classList.remove("hide");
      adminBtn.innerHTML = "ADMIN LOGOUT";
    } else {
      adminInput.classList.add("hide");
      adminBtn.innerHTML = "ADMIN LOGIN";
      
      //buttonsContainer.classList.add("hide")
      
    }
  });
  
  event.preventDefault();
  let btn = document.getElementById("submitBtn");
  let i = 0; //index för vilket event det är

  btn.addEventListener("click", (e) => {
    let admin = new Admin();
    admin.createListItem(i);
    
    /* let storeEvent = localStorage.getItem("event_name_" + i);
    admin.event.innerHTML = storeEvent; */
    i++;
  });
  
  //skapar en klass som sorterar när man rycker på sortera-knappen
  let sortBtn = document.getElementById("sortId");
  sortBtn.addEventListener("click", function(e){
    let sort = new Sort ();
    sort.sortEventsByDate();
  })

  /*let genreFilter = document.getElementById("genreFilter");
  genreFilter.addEventListener("select", function(e) {
    let sort = new Sort ();
    sort.filterEventByGenre(e);
    console.log(e);
  })*/

  genreFilter.onchange = function () {
    let selectedGenre = document.getElementById("genreFilter").value;
    let sort = new Sort();
    sort.filterEventByGenre(selectedGenre);
  };
  
});

class Events {
  constructor() {
    //Skapar element för varje egenskap till eventet som ska visas
    this.container = document.getElementById("container");
    this.eventList = document.createElement("div");
    this.event = document.createElement("span");
    this.date = document.createElement("span");
    this.genre = document.createElement("span");
    this.location = document.createElement("span");
    this.attend = document.createElement("span");
    this.delete = document.createElement("button");
    this.edit = document.createElement("button");
  }
  
  addEvent(event, date, genre, location, attend, maxAttend) {
    let eventList = this.eventList;
    let listHead = document.createElement("div");
    let buttonsContainer = document.createElement("div");
    this.delete.innerHTML = "Radera";
    this.edit.innerHTML = "Uppdatera";
    
    buttonsContainer.classList.add("buttons-container");
    this.delete.classList.add("listBtn");
    this.edit.classList.add("listBtn");
    
    this.event.innerHTML = event;
    let newEventName = this.event;
    //localStorage.setItem("event_name_" + i, event.value);
    
    this.date.innerHTML = date;
    let newEventDate = this.date;
    this.genre.innerHTML = genre;
    let newEventGenre = this.genre;
    this.location.innerHTML = location;
    let newEventLocation = this.location;
    this.attend.innerHTML = attend + "/" + maxAttend;
    let newEventAttend = this.attend;
    
    newEventName.classList.add("event");
    newEventDate.classList.add("date");
    newEventGenre.classList.add("genre");
    newEventLocation.classList.add("location");
    newEventAttend.classList.add("attend");
    
    eventList.classList.add("eventList");
    listHead.classList.add("listHead");
    
    this.container.appendChild(eventList);
    eventList.appendChild(listHead);
    eventList.appendChild(buttonsContainer);
    listHead.appendChild(newEventName);
    listHead.appendChild(newEventDate);
    listHead.appendChild(newEventGenre);
    listHead.appendChild(newEventLocation);
    listHead.appendChild(newEventAttend);
    
    buttonsContainer.appendChild(this.delete);
    buttonsContainer.appendChild(this.edit);
    
    this.delete.addEventListener("click", function (e) {
      eventList.remove();
    });
    
    const self = this;
    this.edit.addEventListener("click", function (e) {
      self.updateInfo(buttonsContainer);
    });

    
  }
  
  updateInfo(buttonsContainer) {
    let updatedEventName = this.event;
    let updatedEventDate = this.date;
    let updatedEventGenre = this.genre;
    let updatedEventLocation = this.location;
    let eventList = this.eventList;
    let editButtonsDiv = document.createElement("div");
    
    editButtonsDiv.classList.add("editButtonsDiv");
    eventList.appendChild(editButtonsDiv);

    let updateEventName = document.createElement("input");
    updateEventName.placeholder = "Uppdatera event";
    updateEventName.classList.add("event");
    editButtonsDiv.appendChild(updateEventName);
    
    let updateEventDate = document.createElement("input");
    updateEventDate.type = "date";
    updateEventDate.classList.add("date");
    editButtonsDiv.appendChild(updateEventDate);
    
    //Clonar genre-inputen så man kan ändra genre på specifikt event
    let genreNode = document.getElementById("genreInput");
    let updateEventGenre = genreNode.cloneNode(true);
    editButtonsDiv.appendChild(updateEventGenre);
    
    let updateEventLocation = document.createElement("input");
    updateEventLocation.placeholder = "Uppdatera plats";
    updateEventLocation.classList.add("location");
    editButtonsDiv.appendChild(updateEventLocation);
    
    let updateBtn = document.createElement("button");
    eventList.appendChild(updateBtn);
    updateBtn.innerHTML = "Update Event";
    buttonsContainer.classList.add("hide");
    
    updateBtn.addEventListener("click", function (e) {
      if (updateEventName.value != "") {
        updatedEventName.innerHTML = updateEventName.value;
      }

      if (updateEventDate.value != "") {
        updatedEventDate.innerHTML = updateEventDate.value;
      }
      if (updateEventGenre.value != "") {
        updatedEventGenre.innerHTML = updateEventGenre.value;
      }
      if (updateEventLocation.value != "") {
        updatedEventLocation.innerHTML = updateEventLocation.value;
      }
      editButtonsDiv.remove();
      updateBtn.remove();
      buttonsContainer.classList.remove("hide");
    });
  }
}

class Admin {
  constructor() {
    this.event = document.getElementById("eventInput");
    this.date = document.getElementById("dateInput");
    this.genre = document.getElementById("genreInput");
    this.location = document.getElementById("locationInput");
    this.attendInput = document.getElementById("attendInput");
    this.maxAttendInput = document.getElementById("maxAttendInput");
  }
  
  createListItem(i) {
    let listedEvent = new Events();
    listedEvent.addEvent(
      this.event.value,
      this.date.value,
      this.genre.value,
      this.location.value,
      this.attendInput.value,
      this.maxAttendInput.value,
      i
      );
      this.event.value = null;
      this.date.value = null;
      this.genre.value = null;
      this.location.value = null;
      this.attendInput.value = null;
      this.maxAttendInput.value = null;

       //adminInput.classList.add("hide");

       /* if(adminInput.className=="hide"){
        console.log("hiding");
        listedEvent.btncont.classList.add("hide");
      }
      else{
        console.log("not hiding");
      } */
    }
  }

class Sort{
  constructor(){
    let event_names = document.getElementsByClassName("listHead");
    this.bigArray = [];
  
    for(let i = 0; i<event_names.length; i++){
      let dateArray = [];
      dateArray.push(event_names[i].childNodes[0].innerHTML); //event
      dateArray.push(event_names[i].childNodes[1].innerHTML); //datum
      dateArray.push(event_names[i].childNodes[2].innerHTML); //genre
      dateArray.push(event_names[i].childNodes[3].innerHTML); //plats
      let attendString = event_names[i].childNodes[4].innerHTML;
      let attendArray = attendString.split("/");
      dateArray.push(attendArray[0]);
      dateArray.push(attendArray[1]);
      //let testArray = attendString.split("");
      
      //dateArray.push; //deltagare / max deltagare
      this.bigArray.push(dateArray);
        
    }
  }

  sortEventsByDate(){
    console.log(this.bigArray[0][0]); 

    let datesSorted = this.bigArray.sort((item1, item2) => {
      if(item1[1] < item2[1]) return -1;
      if(item1[1] > item2[1]) return 1;
        return 0;
    });
    //let testArray = dateArray.sort();
    console.log(datesSorted);
    document.querySelectorAll('.eventList').forEach(e => e.remove());


    for(let i = 0; i < this.bigArray.length; i++){
      let sortEvent = this.bigArray[i][0];
      let sortDate = this.bigArray[i][1];
      let sortGenre = this.bigArray[i][2];
      let sortLocation = this.bigArray[i][3];
      let sortAttendMin = this.bigArray[i][4];
      let sortAttendMax = this.bigArray[i][5];
      let listedEvent = new Events();

      console.log(sortEvent);

      listedEvent.addEvent(sortEvent, sortDate, sortGenre, sortLocation, sortAttendMin, sortAttendMax);
     }

  } 
  filterEventByGenre(selectedGenre){
    document.querySelectorAll('.eventList').forEach(e => e.classList.add("hide"));

    for(let i = 0; i < this.bigArray.length; i++){
      if(this.bigArray[i][2] == selectedGenre) {
        // let sortEvent = this.bigArray[i][0];
        // let sortDate = this.bigArray[i][1];
        // let sortGenre = this.bigArray[i][2];
        // let sortLocation = this.bigArray[i][3];
        // let sortAttendMin = this.bigArray[i][4];
        // let sortAttendMax = this.bigArray[i][5];
        // let listedEvent = new Events();
        /*console.log(sortEvent);
        listedEvent.addEvent(sortEvent, sortDate, sortGenre, sortLocation, sortAttendMin, sortAttendMax);*/
        document.querySelectorAll('.eventList').forEach(e => e.classList.remove("hide"));

       }
      }
      
    }

    //let userGenre = document.getElementById("genreFilter").input.value;
    
    //words.filter(word => word.length > 6)

    // console.log(this.bigArray); 
    // this.bigArray.filter(curr_value => {
    //   if (curr_value[2] == selectedGenre){  

    //     console.log("current value = selected Genre");

    //   }
    //   else{
    //     //this.bigArray[curr_value].classList.add("hide");

    //   }
    // })
    
  //}

}

