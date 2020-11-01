class Admin {
  constructor() {
    //Hämtar elementen för varje input i admin-gränssnittet
    this.event = document.getElementById("eventInput");
    this.date = document.getElementById("dateInput");
    this.genre = document.getElementById("genreInput");
    this.location = document.getElementById("locationInput");
    this.attendInput = document.getElementById("attendInput");
    this.maxAttendInput = document.getElementById("maxAttendInput");
  }

  createListItem(i) {
    let listedEvent = new Events();
    //Hämtar input-values från Adminfälten
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
