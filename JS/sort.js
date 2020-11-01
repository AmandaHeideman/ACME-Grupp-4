class Sort {
  constructor() {
    let event_names = document.getElementsByClassName("listHead");
    this.sortArray = []; //innehåller alla event i form av arrayer

    for (let i = 0; i < event_names.length; i++) {
      //lägger till all info från varje event i valueArray
      let valueArray = [];
      
      valueArray.push(event_names[i].childNodes[0].innerHTML); //event
      valueArray.push(event_names[i].childNodes[1].innerHTML); //datum
      valueArray.push(event_names[i].childNodes[2].innerHTML); //genre
      valueArray.push(event_names[i].childNodes[3].innerHTML); //plats
      let attendString = event_names[i].childNodes[4].innerHTML; //Antal besökare/Max antal besökare
      let attendArray = attendString.split("/"); //Splittar besökare till två egna värden
      valueArray.push(attendArray[0]); //Pushar Attendees till huvudarrayen
      valueArray.push(attendArray[1]); // Pushar MaxAttendees till huvudarrayen

      // Pushar valueArray till sortArray
      this.sortArray.push(valueArray);
    }
  }

  sortEventsByDate() {
    //Sorterar alla event i sortArray till tidigast datum ([1]) först
    this.sortArray.sort((item1, item2) => {
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
    //Gömmer alla events när användaren klickar på en genre, de hamnar i hide-klassen*
    document
      .querySelectorAll(".eventList")
      .forEach((e) => e.classList.add("hide"));
    //Om samma genre som eventet är vald, så tas eventet bort från hide-klassen
    for (let i = 0; i < this.sortArray.length; i++) {
      if (this.sortArray[i][2] == selectedGenre) {
        document.querySelectorAll(".eventList")[i].classList.remove("hide");

        //När "Visa Alla" är vald, så tas alla event bort från hide-klassen
      } else if (selectedGenre == "ShowAll") {
        document
          .querySelectorAll(".eventList")
          .forEach((e) => e.classList.remove("hide"));
      }
    }
  }
}

// *hide-klassen är en klass i css där display = none
