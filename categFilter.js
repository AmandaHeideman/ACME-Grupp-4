filterByGenre()

// need to give all our genre span a class of allGenres 


function filterByGenre() {
    let filterButtons = document.querySelectorAll('.kateg')
    filterButtons.forEach((btn) => {
        // console.log(btn.innerHTML);
        btn.addEventListener("click", (event) => {
            if (btn.classList.contains("clicked")) {
                btn.classList.remove("clicked")
            } else {
                btn.classList.add("clicked")
                let clickedBtn = event.target.innerHTML
                // console.log(clickedBtn);
                //* get the event genres
                // select all genres
                let allGenres = Array.from(document.querySelectorAll('.genre'));

                // loop through all genres, and see which matches the clicked btn text, 
                // then hide the parent parent element of the genres that don't match the clicked btn innerHTML
                allGenres.forEach(e => {
                    if (e.innerHTML !== clickedBtn) {
                        e.parentElement.parentElement.classList.add("hide")
                        console.log(e.innerHTML + " hidden");

                    } 
                    else if (e.clickedBtn === "Show All") {
                        console.log("alllllllllllllllllllllllll");
                        e.parentElement.parentElement.classList.remove("hide")
                        location.reload()

                        // show all
                        e.innerHTML=""

                    } 
                    else {
                        // display only the selected event genre 
                        e.parentElement.parentElement.classList.remove("hide")
                        console.log(e.innerHTML + " shown");

                    }

                })
            }
        });


    });
}