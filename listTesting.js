document.addEventListener('DOMContentLoaded', (event) => {

let btn = document.getElementById("submitBtn");


btn.addEventListener("click",(e)=>{
let test = new Test;
test.createListItem();


});
    
});

class Events{
    constructor(){
        this.container = document.getElementById("container");
        this.event = document.createElement("span");
        this.date = document.createElement("span");
        this.location = document.createElement("span");
        
        
    }

    addEvent(event, date, location) {
        let eventList = document.createElement("div");
        let listHead = document.createElement("div");
        
     
        this.event.innerHTML = event.value;
        this.date.innerHTML = date.value;
        this.location.innerHTML = location.value;

        this.location.classList.add("location");
        this.date.classList.add("date");
        this.event.classList.add("event");
        
        eventList.classList.add("eventList");
        listHead.classList.add("listHead");
        
        this.container.appendChild(eventList);
        eventList.appendChild(listHead);
        listHead.appendChild(this.location);
        listHead.appendChild(this.date);
        listHead.appendChild(this.event);

        console.log(this.location)
    }
}

class Test {
    constructor()
    {
        this.event = document.getElementById("eventInput");
        this.date = document.getElementById("dateInput");
        this.location = document.getElementById("locationInput");
    }

    createListItem(){
        console.log("tuttifrutti")
        let listItem = new Events;
        listItem.addEvent(this.event,this.date,this.location)
        this.event.value = null;
        this.location.value = null;
        this.date.value = null;
    }
}