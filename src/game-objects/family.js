const LSK_COUSINS = "cousins"

const Cousins = [
  {
    name: "Weston",
    family: "Blake",
    givesTo: "GOD",
    src: "./assets/weston.png",
  }, {
    name: "Onnika",
    family: "Blake",
    givesTo: "",
    src: "./assets/onnika.png",
  }, {
    name: "Kaissa",
    family: "Blake",
    givesTo: "",
    src: "./assets/kaissa.png",
  }, {
    name: "Melia",
    family: "Blake",
    givesTo: "",
    src: "./assets/melia.png",
  }, {
    name: "Carisa",
    family: "Chrisdy",
    givesTo: "GOD",
    src: "./assets/carisa.png",
  }, {
    name: "Shannon",
    family: "Chrisdy",
    givesTo: "",
    src: "./assets/shannon.png",
  }, {
    name: "Rachel",
    family: "Chrisdy",
    givesTo: "",
    src: "./assets/rachel.png",
  }, {
    name: "Luke",
    family: "Chrisdy",
    givesTo: "",
    src: "./assets/luke.png",
  }, {
    name: "Adam",
    family: "Chrisdy",
    givesTo: "",
    src: "./assets/adam.png",
  }, {
    name: "Elizabeth",
    family: "Chrisdy",
    givesTo: "",
    src: "./assets/elizabeth.png",
  }, {
    name: "Caleb",
    family: "Andy",
    givesTo: "GOD",
    src: "./assets/caleb.png",
  }, {
    name: "MiCayla",
    family: "Andy",
    givesTo: "",
    src: "./assets/micayla.png",
  }, {
    name: "Dean",
    family: "Andy",
    givesTo: "",
    src: "./assets/dean.png",
  }, {
    name: "Hannah",
    family: "Andy",
    givesTo: "",
    src: "./assets/hannah.png",
  }, {
    name: "Emma",
    family: "Andy",
    givesTo: "",
    src: "./assets/emma.png",
  }, {
    name: "Phebe",
    family: "Andy",
    givesTo: "",
    src: "./assets/phebe.png",
  }, {
    name: "Abigale",
    family: "Andy",
    givesTo: "",
    src: "./assets/abigale.png",
  }, {
    name: "Ashley",
    family: "Fred",
    givesTo: "",
    src: "./assets/ashley.png",
  }, {
    name: "Elisa",
    family: "Fred",
    givesTo: "",
    src: "./assets/elisa.png",
  }, {
    name: "Rebecca",
    family: "Fred",
    givesTo: "",
    src: "./assets/rebecca.png",
  }, {
    name: "Ricky",
    family: "Fred",
    givesTo: "",
    src: "./assets/ricky.png",
  }, {
    name: "Olivia",
    family: "Fred",
    givesTo: "",
    src: "./assets/olivia.png",
  }, {
    name: "Ivy",
    family: "R. Jay",
    givesTo: "",
    src: "./assets/ivy.png",
  }, {
    name: "Sage",
    family: "R. Jay",
    givesTo: "",
    src: "./assets/sage.png",
  }
]

const NotParticipating = [
  "Weston",
  "Carisa",
  "Caleb",
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
  return GetCousinsNotYetReceiving().filter(cousin => {
    if (cousin.family == giver.family) return false;
    if (NotParticipating.indexOf(cousin.name) > -1) return false;
    return true;
  });
}

function GetCousinsNotYetReceiving () {
  const receivers = Cousins.map(c => c.givesTo).filter(r => r !== "");
  return Cousins
    .filter(c => receivers.indexOf(c.name) === -1)
    .filter(c => NotParticipating.indexOf(c.name) === -1);
}

function GetCousinsReceiving () {
  const receivers = Cousins.map(c => c.givesTo).filter(r => r !== "");
  return Cousins
    .filter(c => receivers.indexOf(c.name) !== -1)
    .filter(c => NotParticipating.indexOf(c.name) === -1);
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