document.addEventListener("DOMContentLoaded", (event) => {
  let adminBtn = document.getElementById("adminBtn");
  let adminInput = document.getElementById("adminInput");
  //let listedEvent;
  //let buttonsContainer;
  
  adminBtn.addEventListener("click", (e) => {
    if (adminInput.className == "hide") {
      adminInput.classList.remove("hide");
      adminBtn.innerHTML = "ADMIN LOGOUT";
    } else {
      adminInput.classList.add("hide");
      adminBtn.innerHTML = "ADMIN LOGIN";
      
      //buttonsContainer.classList.add("hide")
      
    }
  });
  
  let sort = new Sort ();
  let sortBtn = document.getElementById("sortId");
  sortBtn.addEventListener("click", function(e){
    sort.sortEvent();
  })
  
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
  
});

class Events {
  constructor() {
    //Skapar element för varje egenskap till eventet som ska visas
    this.container = document.getElementById("container");
    this.eventList = document.createElement("div");
    this.event = document.createElement("span");
    this.date = document.createElement("span");
    this.location = document.createElement("span");
    this.genre = document.createElement("span");
    this.attend = document.createElement("span");
    this.delete = document.createElement("button");
    this.edit = document.createElement("button");
  }
  
  addEvent(event, date, location, genre, attend, maxAttend) {
    let eventList = this.eventList;
    let listHead = document.createElement("div");
    let buttonsContainer = document.createElement("div");
    this.delete.innerHTML = "Radera";
    this.edit.innerHTML = "Uppdatera";
    
    buttonsContainer.classList.add("buttons-container");
    this.delete.classList.add("listBtn");
    this.edit.classList.add("listBtn");
    
    this.event.innerHTML = event.value;
    let newEventName = this.event;
    //localStorage.setItem("event_name_" + i, event.value);
    
    this.date.innerHTML = date.value;
    let newEventDate = this.date;
    this.location.innerHTML = location.value;
    let newEventLocation = this.location;
    this.genre.innerHTML = genre.value;
    let newEventGenre = this.genre;
    this.attend.innerHTML = attend.value + "/" + maxAttend.value;
    let newEventAttend = this.attend;
    
    newEventName.classList.add("event");
    newEventDate.classList.add("date");
    newEventLocation.classList.add("location");
    newEventGenre.classList.add("genre");
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
    let updatedEventLocation = this.location;
    let updatedEventGenre = this.genre;
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
      if (updateEventLocation.value != "") {
        updatedEventLocation.innerHTML = updateEventLocation.value;
      }
      if (updateEventGenre.value != "") {
        updatedEventGenre.innerHTML = updateEventGenre.value;
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
    this.location = document.getElementById("locationInput");
    this.genre = document.getElementById("genreInput");
    this.attendInput = document.getElementById("attendInput");
    this.maxAttendInput = document.getElementById("maxAttendInput");
  }
  
  createListItem(i) {
    let listedEvent = new Events();
    listedEvent.addEvent(
      this.event,
      this.date,
      this.location,
      this.genre,
      this.attendInput,
      this.maxAttendInput,
      i
      );
      this.event.value = null;
      this.location.value = null;
      this.date.value = null;
      this.genre.value = null;
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

  }
  sortEvent(){
    let event_names = document.getElementsByClassName("listHead");
    let bigArray = [];

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
      bigArray.push(dateArray);
    }
    console.log(typeof bigArray[0][0]);

    let datesSorted = bigArray.sort((item1, item2) => {
      if(item1[1] < item2[1]) return -1;
      if(item1[1] > item2[1]) return 1;
        return 0;
    });
    //let testArray = dateArray.sort();
    console.log(datesSorted);

    for(let i = 0; i <= bigArray.length; i++){
      let listedEvent = new Events();
      let sortEvent = bigArray[i][0];
      let sortDate = bigArray[i][1];
      let sortGenre = bigArray[i][2];
      let sortLocation = bigArray[i][3];
      let sortAttendMin = bigArray[i][4];
      let sortAttendMax = bigArray[i][5];

      console.log(sortEvent);

      listedEvent.addEvent(sortEvent, sortDate, sortGenre, sortLocation, sortAttendMin, sortAttendMax);
      

      
     }
  }
}
