
//Step 1

//This code does NOT create any global variables.
//Promises can be chained together, with the previous promise
// passing its results to the next one in the chain.
// the format is: fetch().then().then().catch()
//it's easier to read if we put each step in its own line,
//that's why the periods start the then lines.

fetch("houses.json")
    .then((response) => response.json())
    .then((data) => {
        //create a temp holder to append all the html generated inside the forEach iterator
        let html = "";

        //the argument "house" passed to the arrow function
        //holds each item in the array in turn.
        data.forEach((house) => {
            let family = house.members.join(" | ");
            const houses = document.getElementById("houses")
            const option = document.createElement("OPTION");
            option.value = house.code;
            option.innerText = house.name;
            houses.append(option);
            

            // generate the html snippet for one array item
            //to be added to the "html" temp holder.
            let objInfo = `<p class="house">${house.name}</p>
        <p class="folks">${family}</p>`;
            html += objInfo;
        });

        let house = document.getElementById("houses");

        house.addEventListener("change", (e) => {
            const code = e.target.value;
            let members = [];

            data.forEach((house) => {
                if(house.code === code) {
                    members = house.members;
                }
            })

            const container = document.getElementById("container");
            container.innerHTML = "";

            if (members.length === 0) {
                let item = document.createElement("LI");
                item.innerText = "No House Selected";
                container.appendChild(item);
              } else {
                
                members.forEach((person) => {
                  let item = document.createElement("LI");
                  item.innerText = person;
                  container.appendChild(item);
                });
              }
        })

        //make a reference to the html container where
        //the info will be displayed.
        

    })
    .catch((err) => console.log("Oops!", err));
    //this only runs if there is an error during the above process

    //Step 2

    //Color Change API

    const changeBackground = document.getElementById("changeBackground");

    changeBackground.addEventListener("click", (e) => {
        fetch("https://www.colr.org/json/color/random")
            .then(response => response.json())
            .then((data) => {
                let newColor = data.new_color;
                document.body.style.backgroundColor = "#" + newColor;
                console.log(data)
            })
            .catch((err) => console.log("Oops!", err));
        
    });