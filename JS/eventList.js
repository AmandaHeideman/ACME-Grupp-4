document.addEventListener("DOMContentLoaded", (event) => {
  //skapar admingränssnitt
  let adminBtn = document.getElementById("adminBtn");
  let adminInput = document.getElementById("adminInput");

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
        storeEvent[6]
      );
      document
        .querySelectorAll(".buttons-container")
        .forEach((e) => e.classList.add("hide"));

      i = storeEvent[6] + 1;
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

  //skapar nya event genom admin-klassen
  btn.addEventListener("click", (e) => {
    let admin = new Admin();
    admin.createListItem(i);

    i++;
  });

  //skapar ett objekt i en klass som sorterar när man trycker på sortera-knappen
  let sortBtn = document.getElementById("sortId");
  sortBtn.addEventListener("click", function (e) {
    let sort = new Sort();
    sort.sortEventsByDate();
  });

  //kallar på filter-metoden när man väljer att filtrera på genre
  genreFilter.onchange = function () {
    let selectedGenre = document.getElementById("genreFilter").value;
    let sort = new Sort();
    sort.filterEventByGenre(selectedGenre);
  };
});
