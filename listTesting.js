document.addEventListener("DOMContentLoaded", (event) => {
  event.preventDefault();
  let btn = document.getElementById("submitBtn");

  btn.addEventListener("click", (e) => {
    let test = new Test();
    test.createListItem();
  });
});

class Events {
  constructor() {
    this.container = document.getElementById("container");
    this.eventList1 = document.createElement("div");
    this.event = document.createElement("span");
    this.date = document.createElement("span");
    this.location = document.createElement("span");
    this.genre = document.createElement("span");
    this.delete = document.createElement("button");
    this.edit = document.createElement("button");
    this.break = document.createElement("br");
  }



  addEvent(event, date, location, genre) {
    let eventList = this.eventList1
    let listHead = document.createElement("div");
    let buttonsContainer = document.createElement("div");
    this.delete.innerHTML = "Radera";
    this.edit.innerHTML = "Uppdatera";

    buttonsContainer.classList.add("buttons-container")
    this.delete.classList.add("listBtn");
    this.edit.classList.add("listBtn");

    this.event.innerHTML = event.value;
    let newEventName = this.event;
    this.date.innerHTML = date.value;
    let newEventDate = this.date;
    this.location.innerHTML = location.value;
    let newEventLocation = this.location;
    this.genre.innerHTML = genre.value;
    let newEventGenre = this.genre;

    newEventName.classList.add("event");
    newEventDate.classList.add("date");
    newEventLocation.classList.add("location");
    newEventGenre.classList.add("genre");

    eventList.classList.add("eventList");
    listHead.classList.add("listHead");

    this.container.appendChild(eventList);
    eventList.appendChild(listHead);
    eventList.appendChild(buttonsContainer);
    listHead.appendChild(newEventName);
    listHead.appendChild(newEventDate);
    listHead.appendChild(newEventLocation);
    listHead.appendChild(newEventGenre);
    listHead.appendChild(this.break);
    buttonsContainer.appendChild(this.delete);
    buttonsContainer.appendChild(this.edit);

    //console.log(this.location)

    this.delete.addEventListener("click", function (e) {
      eventList.remove();
    });
    
    const self = this;
    this.edit.addEventListener("click", function(e) {
      self.updateInfo();
      buttonsContainer.classList.add("hide");
      // let updateBtn = document.createElement("button");
      //console.log(this.event.innerHTML);
      //this.event = document.createElement("input");
      //eventList.appendChild(eventEdit);
    });
  }
  updateInfo(){
    let updatedEventName = this.event;
    let updatedEventDate = this.date;
    let updatedEventLocation = this.location;
    let updatedEventGenre = this.genre;
    let eventList = this.eventList1;
    let editButtonsDiv = document.createElement("div");
    editButtonsDiv.classList.add("editButtonsDiv")
    eventList.appendChild(editButtonsDiv);
    let updateEventName = document.createElement("input");
    updateEventName.placeholder = "Uppdatera event";
    updateEventName.classList.add("event");
    editButtonsDiv.appendChild(updateEventName);
    let updateEventDate = document.createElement("input");
    updateEventDate.type = "date";
    updateEventDate.classList.add("date");
    editButtonsDiv.appendChild(updateEventDate);
    let updateEventLocation = document.createElement("input");
    updateEventLocation.placeholder = "Uppdatera plats";
    updateEventLocation.classList.add("location");
    editButtonsDiv.appendChild(updateEventLocation);
    let p = document.getElementById("genreInput");
    let updateEventGenre = p.cloneNode(true);
    editButtonsDiv.appendChild(updateEventGenre);
    let updateBtn = document.createElement("button");
    editButtonsDiv.appendChild(updateBtn);
    updateBtn.innerHTML = "Update Event";
    //buttonsContainer.classList.add("hide");


    updateBtn.addEventListener("click", function (e) {
      let buttonsContainer = document.getElementsByClassName("buttons-container");
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
      buttonsContainer.classList.remove("hide");
    }); 
  }
  // deleteEvent() {
  //     delete this.container;
  // }


}

class Test {
  constructor() {
    this.event = document.getElementById("eventInput");
    this.date = document.getElementById("dateInput");
    this.location = document.getElementById("locationInput");
    this.genre = document.getElementById("genreInput")
  }

  createListItem() {
    
    let listItem = new Events();
    listItem.addEvent(this.event, this.date, this.location, this.genre);
    this.event.value = null;
    this.location.value = null;
    this.date.value = null;
  }
}
