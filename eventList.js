document.addEventListener("DOMContentLoaded", (event) => {
  //skapar admingränssnitt
  let adminBtn = document.getElementById("adminBtn");
  let adminInput = document.getElementById("adminInput");
  //let listedEvent;
  //let buttonsContainer;

  //hämtar från local storage och skriver ut event på sidan

  let container_div = document.getElementById("container");

  //skriver ut alla event sparade i local storage
  let i = 0;
  for (let j = 0; j <= i; j++) {
    let storeEvent = JSON.parse(localStorage.getItem("event_" + j));

    if (storeEvent != null) {
      let storedEvent = new Events();
      storedEvent.addEvent(
        storeEvent[0],
        storeEvent[1],
        storeEvent[2],
        storeEvent[3],
        storeEvent[4],
        storeEvent[5],
        storeEvent[6],
        storeEvent[7]
      );
      document
        .querySelectorAll(".buttons-container")
        .forEach((e) => e.classList.add("hide"));

      i = storeEvent[6] + 1;
      console.log(storeEvent[6]);
    } else {
      eventList.classList.add("hide");
    }
  }

  adminBtn.addEventListener("click", (e) => {
    //visar/gömmer admin tools när man trycker på admin login/admin logout
    if (adminInput.className == "hide") {
      adminInput.classList.remove("hide");
      adminBtn.innerHTML = "ADMIN LOGOUT";
      document
        .querySelectorAll(".buttons-container")
        .forEach((e) => e.classList.remove("hide"));
    } else {
      adminInput.classList.add("hide");
      adminBtn.innerHTML = "ADMIN LOGIN";
      document
        .querySelectorAll(".buttons-container")
        .forEach((e) => e.classList.add("hide"));
    }
  });

  event.preventDefault();
  let btn = document.getElementById("submitBtn");

  btn.addEventListener("click", (e) => {
    let admin = new Admin();
    admin.createListItem(i);

    i++;
  });

  //skapar en klass som sorterar när man trycker på sortera-knappen
  let sortBtn = document.getElementById("sortId");
  sortBtn.addEventListener("click", function (e) {
    let sort = new Sort();
    sort.sortEventsByDate();
  });

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
    this.label = document.createElement("label");
    this.showOnFirstPage = document.createElement("input");
    this.self = this;
  }

  addEvent(event, date, genre, location, attend, maxAttend, i, check) {
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
    this.label.innerHTML = "Visa på förstasidan";
    this.showOnFirstPage.setAttribute("type", "checkbox");

    this.event.innerHTML = event;
    let newEventName = this.event;

    let id = i;
    let eventStorage = JSON.stringify([
      event,
      date,
      genre,
      location,
      attend,
      maxAttend,
      id,
      check,
    ]);
    localStorage.setItem("event_" + i, eventStorage);

    let checkIfChecked = JSON.parse(localStorage.getItem("event_" + i));

    if (checkIfChecked[7]) {
      this.showOnFirstPage.checked = true;
    }

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
    buttonsContainer.appendChild(this.label);
    buttonsContainer.appendChild(this.showOnFirstPage);

    //att fixa: det som är sparat i local storage ska också kunna raderas/uppdateras
    this.delete.addEventListener("click", function (e) {
      eventList.remove();
      //ta bort motsvarande från local storage
      localStorage.removeItem("event_" + i); //window.localStorage.removeItem('name');

      console.log(e.target);
    });

    const self = this;
    this.edit.addEventListener("click", function (e) {
      self.updateInfo(buttonsContainer, i);
    });

    this.showOnFirstPage.addEventListener("click", function (e) {
      let x = JSON.parse(eventStorage);
      x[7] = e.target.checked;
      eventStorage = JSON.stringify(x);
      console.log(x);
      localStorage.setItem("event_" + i, eventStorage);
      // if (e.target.checked) {
      //   console.log(e.target.checked);
      //   //localstorage[7] = true
      // } else {
      //   console.log(e.target.checked);
      //   //localstorage[7] = false
      // }
    });
  }

  updateInfo(buttonsContainer, i) {
    let updatedEventName = this.event;
    let updatedEventDate = this.date;
    let updatedEventGenre = this.genre;
    let updatedEventLocation = this.location;
    let updatedEventAttendees = this.attend;

    //let updatedEvent = [updatedEventName, updatedEventDate, updatedEventGenre, updatedEventLocation, updatedEventAttendees]
    /*let updatedEventMaxAttendees = this.attend.innerHTML.split("/");
    let updatedEventMaxAttendees2 = updatedEventMaxAttendees[1];

    console.log(updatedEventMaxAttendees[1]);*/

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
    updateEventAttendees.placeholder = "Besökare";
    editButtonsDiv.appendChild(updateEventAttendees);

    /*let updateEventMaxAttendees = document.createElement("input");
    updateEventMaxAttendees.type = "number";
    updateEventMaxAttendees.placeholder = "Max antal besökare"
    editButtonsDiv.appendChild(updateEventMaxAttendees);*/

    let updateBtn = document.createElement("button");
    eventList.appendChild(updateBtn);
    updateBtn.innerHTML = "Update Event";
    buttonsContainer.classList.add("hide");

    updateBtn.addEventListener("click", function (e) {
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
      /*if (updateEventMaxAttendees.value != ""){
        updatedEventMaxAttendees2.innerHTML = updateEventMaxAttendees.value;
      }*/

      //localStorage.setItem("event_"+i, updatedEvent)

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
    // Rensar inputs inför nästa event
    this.event.value = null;
    this.date.value = null;
    this.genre.value = null;
    this.location.value = null;
    this.attendInput.value = null;
    this.maxAttendInput.value = null;
  }
}

class Sort {
  constructor() {
    let event_names = document.getElementsByClassName("listHead");
    this.sortArray = [];
    console.log(event_names);

    for (let i = 0; i < event_names.length; i++) {
      // i = 1 eftersom första listhead-elementet är tomt by default
      let dateArray = [];
      console.log(event_names);
      dateArray.push(event_names[i].childNodes[0].innerHTML); //event
      dateArray.push(event_names[i].childNodes[1].innerHTML); //datum
      dateArray.push(event_names[i].childNodes[2].innerHTML); //genre
      dateArray.push(event_names[i].childNodes[3].innerHTML); //plats
      let attendString = event_names[i].childNodes[4].innerHTML; //Antal besökare/Max antal besökare
      let attendArray = attendString.split("/"); //Splittar besökare till två egna värden
      dateArray.push(attendArray[0]); //Pushar Attendees till huvudarrayen
      dateArray.push(attendArray[1]); // Pushar MaxAttendees till huvudarrayen

      // Pushar datesArray till sortArray
      this.sortArray.push(dateArray);
    }
  }

  sortEventsByDate() {
    //Sorterar alla event i sortArray till tidigast datum först
    let datesSorted = this.sortArray.sort((item1, item2) => {
      if (item1[1] < item2[1]) return -1;
      if (item1[1] > item2[1]) return 1;
      return 0;
    });
    //Tar bort alla events på listan för att göra plats för de sorterade eventen
    document.querySelectorAll(".eventList").forEach((e) => e.remove());

    //En loop som skapar nya events med den sorterade ordningen
    for (let i = 0; i < this.sortArray.length; i++) {
      let sortEvent = this.sortArray[i][0];
      let sortDate = this.sortArray[i][1];
      let sortGenre = this.sortArray[i][2];
      let sortLocation = this.sortArray[i][3];
      let sortAttendMin = this.sortArray[i][4];
      let sortAttendMax = this.sortArray[i][5];
      let listedEvent = new Events();

      console.log(sortEvent);

      //Använder samma metod som när vi skapar event i början
      listedEvent.addEvent(
        sortEvent,
        sortDate,
        sortGenre,
        sortLocation,
        sortAttendMin,
        sortAttendMax
      );
    }
  }
  //Filterfunktionen för genres
  filterEventByGenre(selectedGenre) {
    //Gömmer alla events när användaren klickar på en genre
    document
      .querySelectorAll(".eventList")
      .forEach((e) => e.classList.add("hide"));
    //Om samma genre som eventet är vald, så tas eventet bort från hide-klassen
    for (let i = 0; i < this.sortArray.length; i++) {
      if (this.sortArray[i][2] == selectedGenre) {
        document.querySelectorAll(".eventList")[i].classList.remove("hide");

        //När "show all" är vald, så tas alla event bort från hide-klassen
      } else if (selectedGenre == "ShowAll") {
        document
          .querySelectorAll(".eventList")
          .forEach((e) => e.classList.remove("hide"));
      }
    }
  }
}
