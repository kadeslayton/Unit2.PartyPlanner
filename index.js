const COHORT = "2310-FSA-ET-WEB-PT-SF-B-kade-slayton";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;
const state = {
  parties: [],
};

const partyList = document.querySelector("#Parties")
const addPartyForm = document.querySelector("#addParty");
addPartyForm.addEventListener("submit", addParty);

async function render(){
  await getParty();
  renderParty();
}
render();

async function getParty(){
  try{
    const response = await fetch(API_URL);
    const json = await response.json();
    console.log(json);
    state.parties = json.data;
    console.log(state.parties)
  }
  catch(err){
    console.error(err);
  }
}

async function renderParty(){
  if (!state.parties.length){
    partyList.innerHTML = "<li>No Parties.<li>"
    return;
  }
  const partyCard = state.parties.map((party)=>{
    const li = document.createElement(`li`);
    li.innerHTML = `Name: ${party.name}</br></br>Date: ${party.date}</br></br>Location: ${party.location}</br></br>Description: ${party.description}</br></br><button class="delete">Delete</button>`;
    
    return li;
  });
  partyList.replaceChildren(...partyCard)
  
}
const deleteBtn = document.querySelector(`delete`);
deleteBtn.addEventListener("delete", deleteParty);
async function deleteParty(){
  event.preventDefault();
  try{
    const response = await fetch (API_URL, {
      method: "DELETE"
      });
      if(response.length>1){
        throw new Error("Failed to delete Party");
      }
    render();
  }
  catch(err){
    console.error(err);
  }
}

async function addParty(){
  event.preventDefault();
  try{
      const response = await fetch (API_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          name: addPartyForm.name.value,
          date: new Date(addPartyForm.date.value).toISOString(),
          location: addPartyForm.location.value,
          description: addPartyForm.description.value,
          })
        });
      if(!response.ok){
        throw new Error("Failed to create Party");
      }
      render();
  }
  catch(err){
    console.error(err);
  }
}