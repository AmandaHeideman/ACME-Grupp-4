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
    this.event = document.createElement("span");
    this.date = document.createElement("span");
    this.location = document.createElement("span");
    this.delete = document.createElement("button");
    this.edit = document.createElement("button");
    this.break = document.createElement("br");
  }

  addEvent(event, date, location) {
    let eventList = document.createElement("div");
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

    newEventName.classList.add("event");
    newEventDate.classList.add("date");
    newEventLocation.classList.add("location");

    eventList.classList.add("eventList");
    listHead.classList.add("listHead");

    this.container.appendChild(eventList);
    eventList.appendChild(listHead);
    eventList.appendChild(buttonsContainer);
    listHead.appendChild(newEventName);
    listHead.appendChild(newEventDate);
    listHead.appendChild(newEventLocation);
    listHead.appendChild(this.break);
    buttonsContainer.appendChild(this.delete);
    buttonsContainer.appendChild(this.edit);

    //console.log(this.location)

    this.delete.addEventListener("click", function (e) {
      eventList.remove();
    });

    this.edit.addEventListener("click", function (e) {
      let updateEventName = document.createElement("input");
      updateEventName.placeholder = "Uppdatera event";
      updateEventName.classList.add("event");
      eventList.appendChild(updateEventName);
      let updateEventDate = document.createElement("input");
      updateEventDate.type = "date";
      updateEventDate.classList.add("date");
      eventList.appendChild(updateEventDate);
      let updateEventLocation = document.createElement("input");
      updateEventLocation.placeholder = "Uppdatera plats";
      updateEventLocation.classList.add("location");
      eventList.appendChild(updateEventLocation);
      let updateBtn = document.createElement("button");
      eventList.appendChild(updateBtn);
      updateBtn.innerHTML = "Update Event";
      buttonsContainer.classList.add("hide");


      updateBtn.addEventListener("click", function (e) {
        if (updateEventName.value != "") {
          newEventName.innerHTML = updateEventName.value;
        }

        if (updateEventDate.value != "") {
          newEventDate.innerHTML = updateEventDate.value;
        }
        if (updateEventLocation.value != "") {
          newEventLocation.innerHTML = updateEventLocation.value;
        }
        updateEventName.remove();
        updateEventDate.remove();
        updateEventLocation.remove();
        updateBtn.remove();
        buttonsContainer.classList.remove("hide");
      });
      // let updateBtn = document.createElement("button");
      //console.log(this.event.innerHTML);
      //this.event = document.createElement("input");
      //eventList.appendChild(eventEdit);
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
  }

  createListItem() {
    console.log("tuttifrutti");
    let listItem = new Events();
    listItem.addEvent(this.event, this.date, this.location);
    this.event.value = null;
    this.location.value = null;
    this.date.value = null;
  }
}
