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
    this.self = this;
  }

  addEvent(event, date, genre, location, attend, maxAttend, i) {
    //skriver ut skapade event på sidan
    let eventList = this.eventList;
    let listHead = document.createElement("div");
    let buttonsContainer = document.createElement("div");
    this.delete.innerHTML = "Radera";
    this.edit.innerHTML = "Uppdatera";

    buttonsContainer.classList.add("buttons-container");
    this.delete.classList.add("listBtn");
    this.delete.id = i;
    this.edit.classList.add("listBtn");
    this.edit.id = i;

    this.event.innerHTML = event;
    let newEventName = this.event;

    //sparar skapade event i local storage
    let id = i;
    let eventStorage = JSON.stringify([
      event,
      date,
      genre,
      location,
      attend,
      maxAttend,
      id,
    ]);
    localStorage.setItem("event_" + i, eventStorage);

    this.date.innerHTML = date;
    let newEventDate = this.date;
    this.genre.innerHTML = genre;
    let newEventGenre = this.genre;
    this.location.innerHTML = location;
    let newEventLocation = this.location;
    this.attend.innerHTML = attend + "/" + maxAttend;
    let newEventAttend = this.attend;

    //Lägger elementen som skapas i klasser. Så de får rätt style-egenskaper
    newEventName.classList.add("event");
    newEventDate.classList.add("date");
    newEventGenre.classList.add("genre");
    newEventLocation.classList.add("location");
    newEventAttend.classList.add("attend");

    eventList.classList.add("eventList");
    listHead.classList.add("listHead");

    //Lägger elementen i rätt div
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

    //tar bort event när man trycker på delete-knappen
    this.delete.addEventListener("click", function (e) {
      eventList.remove();
      //tar bort motsvarande från local storage
      localStorage.removeItem("event_" + i);
    });

    const self = this;
    //kallar på metod som uppdaterar när man trycker på uppdatera-knappen
    this.edit.addEventListener("click", function (e) {
      self.updateInfo(buttonsContainer, i);
    });
  }

  updateInfo(buttonsContainer, i) {
    //uppdaterar eventet
    let updatedEventName = this.event;
    let updatedEventDate = this.date;
    let updatedEventGenre = this.genre;
    let updatedEventLocation = this.location;
    let updatedEventAttendees = this.attend;

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

    let updateEventAttendees = document.createElement("input");
    updateEventAttendees.type = "number";
    updateEventAttendees.placeholder = "Deltagare";
    editButtonsDiv.appendChild(updateEventAttendees);

    let updateBtn = document.createElement("button");
    eventList.appendChild(updateBtn);
    updateBtn.innerHTML = "Update Event";
    buttonsContainer.classList.add("hide");

    updateBtn.addEventListener("click", function (e) {
      //kollar varje fält för att se vilka som ska uppdateras
      let eventStorage = localStorage.getItem("event_" + i);
      let x = JSON.parse(eventStorage);
      if (updateEventName.value != "") {
        updatedEventName.innerHTML = updateEventName.value;
        x[0] = updateEventName.value;
        console.log(x);
        eventStorage = JSON.stringify(x);
        localStorage.setItem("event_" + i, eventStorage);
      }

      if (updateEventDate.value != "") {
        updatedEventDate.innerHTML = updateEventDate.value;
        x[1] = updateEventDate.value;
        eventStorage = JSON.stringify(x);
        localStorage.setItem("event_" + i, eventStorage);
      }
      if (updateEventGenre.value != "") {
        updatedEventGenre.innerHTML = updateEventGenre.value;
        x[2] = updateEventGenre.value;
        eventStorage = JSON.stringify(x);
        localStorage.setItem("event_" + i, eventStorage);
      }
      if (updateEventLocation.value != "") {
        updatedEventLocation.innerHTML = updateEventLocation.value;
        x[3] = updateEventLocation.value;
        eventStorage = JSON.stringify(x);
        localStorage.setItem("event_" + i, eventStorage);
      }

      if (updateEventAttendees.value != "") {
        updatedEventAttendees.innerHTML = updateEventAttendees.value;
        x[4] = updateEventAttendees.value;
        eventStorage = JSON.stringify(x);
        localStorage.setItem("event_" + i, eventStorage);
      }
      //Tar bort update-knappen, för att förhindra att det blir flera update-knappar
      editButtonsDiv.remove();
      updateBtn.remove();
      buttonsContainer.classList.remove("hide");
    });
  }
}
