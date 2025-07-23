// Search functionality for finding users by public key
import { currentUserPublicKey } from "./chat.js";
import { publicKey } from "./connectWallet.js";

//get components;

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const searchBar = document.getElementById("seacrh-bar-id");
var uiContainer = [];
//
const buildUserContainer = async (address, last_seen, last_msg) => {
    //build a container for each similar user
    //create upper limit dash holder
    //reset the containers
    uiContainer = [];
    var upperDash = document.createElement("div");
    upperDash.classList.add("dsh-items-upper");
    upperDash.classList.add("offsetmod");
    //create contact item
    var contactItem = document.createElement("div");
    contactItem.classList.add("names-disp");
    contactItem.classList.add("contact-item");
    //add contactItem to upperDash as a child
    upperDash.appendChild(contactItem);
    //
    var namesdisp_ul = document.createElement("ul");
    namesdisp_ul.classList.add("namesdisp-ul");
    contactItem.appendChild(namesdisp_ul);
    var userimg_disp = document.createElement("img");
    userimg_disp.classList.add("userimg-disp");
    namesdisp_ul.appendChild(userimg_disp);
    //
    var screen_li = document.createElement("div");
    namesdisp_ul.appendChild(screen_li);
    var disp_items = document.createElement("li");
    screen_li.appendChild(disp_items);
    var disp_items2 = document.createElement("li");
    screen_li.appendChild(disp_items2);
    //
    var msg_timer_text = document.createElement("p");
    //child this to the name-disp component
    contactItem.appendChild(msg_timer_text);
    uiContainer.push(upperDash);
    //
};
//
const doRountineSearch = async () => {
    if (searchBar.value.length > 1) {
        var bodyJson = {
            searchedPub: searchBar.value,
        };
        const response = await fetch("/search-users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bodyJson),
        });
        var results = await response.json();

        if (results._res == "success") {
            console.log(results);
            //
            var fetchedData = results.data;
            if (fetchedData != null) {
                if (fetchedData.length > 0) {
                    for (let i = 0; i < fetchedData.length; ++i) {
                        ///code here 
                        
                    }
                }
            }
        }
    } else {
        //go to sleep moda fucker
    }
    //
};
const searchUpdates = async () => {
    await doRountineSearch();
    //retweets every 6hours
    //await delay(120000);
    await delay(2000);
    await searchUpdates();
};

const UpdateCurrentChatBuddy = async () => {};

searchBar.addEventListener("change", async () => {
    await doRountineSearch();
});
//
//keep serach alive :)
//searchUpdates();

//just for test purposes
//staff short inherit trumpet party amount labor mistake teach shoulder phrase build
