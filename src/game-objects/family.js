const LSK_COUSINS = "cousins"

const Cousins = [
  {
    name: "Weston",
    family: "Blake",
    givesTo: "GOD",
    src: "./assets/weston.png",
    disabled: false
  }, {
    name: "Onnika",
    family: "Blake",
    givesTo: "",
    src: "./assets/onnika.png",
    disabled: false
  }, {
    name: "Kaissa",
    family: "Blake",
    givesTo: "",
    src: "./assets/kaissa.png",
    disabled: false
  }, {
    name: "Melia",
    family: "Blake",
    givesTo: "",
    src: "./assets/melia.png",
    disabled: false
  }, {
    name: "Carisa",
    family: "Chrisdy",
    givesTo: "GOD",
    src: "./assets/carisa.png",
    disabled: false
  }, {
    name: "Shannon",
    family: "Chrisdy",
    givesTo: "",
    src: "./assets/shannon.png",
    disabled: false
  }, {
    name: "Rachel",
    family: "Chrisdy",
    givesTo: "",
    src: "./assets/rachel.png",
    disabled: false
  }, {
    name: "Luke",
    family: "Chrisdy",
    givesTo: "",
    src: "./assets/luke.png",
    disabled: false
  }, {
    name: "Adam",
    family: "Chrisdy",
    givesTo: "",
    src: "./assets/adam.png",
    disabled: false
  }, {
    name: "Elizabeth",
    family: "Chrisdy",
    givesTo: "",
    src: "./assets/elizabeth.png",
    disabled: false
  }, {
    name: "Caleb",
    family: "Andy",
    givesTo: "GOD",
    src: "./assets/caleb.png",
    disabled: false
  }, {
    name: "MiCayla",
    family: "Andy",
    givesTo: "",
    src: "./assets/micayla.png",
    disabled: false
  }, {
    name: "Dean",
    family: "Andy",
    givesTo: "",
    src: "./assets/dean.png",
    disabled: false
  }, {
    name: "Hannah",
    family: "Andy",
    givesTo: "",
    src: "./assets/hannah.png",
    disabled: false
  }, {
    name: "Emma",
    family: "Andy",
    givesTo: "",
    src: "./assets/emma.png",
    disabled: false
  }, {
    name: "Phebe",
    family: "Andy",
    givesTo: "",
    src: "./assets/phebe.png",
    disabled: false
  }, {
    name: "Abigale",
    family: "Andy",
    givesTo: "",
    src: "./assets/abigale.png",
    disabled: false
  }, {
    name: "Ashley",
    family: "Fred",
    givesTo: "",
    src: "./assets/ashley.png",
    disabled: false
  }, {
    name: "Elisa",
    family: "Fred",
    givesTo: "",
    src: "./assets/elisa.png",
    disabled: false
  }, {
    name: "Rebecca",
    family: "Fred",
    givesTo: "",
    src: "./assets/rebecca.png",
    disabled: false
  }, {
    name: "Ricky",
    family: "Fred",
    givesTo: "",
    src: "./assets/ricky.png",
    disabled: false
  }, {
    name: "Olivia",
    family: "Fred",
    givesTo: "",
    src: "./assets/olivia.png",
    disabled: false
  }, {
    name: "Ivy",
    family: "R. Jay",
    givesTo: "",
    src: "./assets/ivy.png",
    disabled: false
  }, {
    name: "Sage",
    family: "R. Jay",
    givesTo: "",
    src: "./assets/sage.png",
    disabled: false
  }
]

const NotParticipating = [
  // "Weston",
  // "Carisa",
  // "Caleb",
]

function SetGiverChoice (giver, receiver) {
  giver.givesTo, receiver.name;
  localStorage.setItem(giver.name, receiver.name);
}

function RemoveGiverChoice (giver) {
  giver.givesTo = ""
  localStorage.removeItem(giver.name);
}

function GetCousin(name) {
  return Cousins.filter(c => c.name === name)[0];
}

function GetPossibleRecipients (giver) {
  return Cousins.filter(cousin => {
    if (cousin.disabled == true) return false;
    if (cousin.family == giver.family) return false;
    if (NotParticipating.indexOf(cousin.name) > -1) return false;
    return true;
  });
}

function GetCousinsNotYetGiving() {
  return Cousins.filter(cousin => {
    if (NotParticipating.indexOf(cousin.name) > -1) return false;
    if (cousin.givesTo !== "") return false
    return true;
  });
}

function GetCousinsGiving() {
  return Cousins.filter(cousin => {
    if (NotParticipating.indexOf(cousin.name) > -1) return false;
    if (cousin.givesTo === "") return false
    return true;
  });
}

function SetRightColumn () {
  const cousins = GetCousinsGiving();
  const list = cousins.map(c => {
    return CreateListItem(c.name, c.givesTo);
  })
  let ul = document.getElementById("cousins-done");
  ul.innerHTML = "";
  for (const li of list) {
    ul.appendChild(li);
  }
}

function SetLeftColumn () {
  const cousins = GetCousinsNotYetGiving();
  const list = cousins.map(c => {
    return CreateListItem(c.name);
  })
  let ul = document.getElementById("cousins-todo");
  ul.innerHTML = "";
  for (const li of list) {
    ul.appendChild(li);
  }
}

function CreateListItem (giver, receiver) {
  if (receiver) {
    const li = document.createElement('li');
    li.className = "w3-container w3-green w3-center"
    li.textContent = `${giver} gives to ${receiver}`
      return li
  }
  const btn = document.createElement('button');
  btn.textContent = giver;
  btn.className = "w3-button w3-green"
  btn.onclick = () => {
    GAME.startWith(giver);
  }
  return btn
}