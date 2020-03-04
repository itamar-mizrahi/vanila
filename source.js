import { users } from "./users.js";

const URL = "https://maps.googleapis.com/maps/api/geocode/json?address=";
const KEY = "&key=AIzaSyDKvvBgAkSCugEbXckutuAFuqPzthsCnJ8";

window.onload = function() {
  startUsers(users);
  let addsUser = document.querySelector("#addUser");
  addsUser.onclick = () => addsUsers();
};

function startUsers(users) {
  let targerContainer = document.getElementById("users-container");
  let template = document.getElementById("card");

  for (let user of users) {
    let clonedContainer = template.cloneNode(true);
    let { the_image, name, location, address, phone, del, edit } = values(
      clonedContainer
    );

    del.onclick = e => delFunc(e);

    the_image.src = user.imgUrl;
    name.innerHTML = user.name;
    address.innerHTML = user.address;
    phone.innerHTML = user.phone;
    location.innerHTML = setLocation(user.address);

    targerContainer.appendChild(clonedContainer);
    clonedContainer.removeAttribute("hidden");
  }
}

function delFunc(e) {
  const node = e.target.parentElement.parentElement.parentElement;
  node.parentNode.removeChild(node);
}

function values(clonedContainer) {
  let obj = {
    the_image: clonedContainer.querySelector("#image"),
    name: clonedContainer.querySelector("#name"),
    location: clonedContainer.querySelector("#location"),
    address: clonedContainer.querySelector("#address"),
    phone: clonedContainer.querySelector("#phone"),
    del: clonedContainer.querySelector("#del"),
    edit: document.querySelector("#edit")
  };

  return obj;
}

async function setLocation(address) {
  const results = await fetch(`${URL + address + KEY}`);
  const resJson = await results.json();
  // console.log(resJson);
}

function addsUsers() {
  let name = document.getElementById("nameAddUser").value;
  let address = document.getElementById("addressAddUser").value;
  let job = document.getElementById("jobAddUser").value;
  let phone = document.getElementById("phoneAddUser").value;

  if (name && address && job && checkPhone(phone)) {
    let arr = [
      {
        name,
        address,
        job,
        phone,
        imgUrl: "Assets/john-smith.jpg"
      }
    ];
    startUsers(arr);
  } else setError();
}

function checkPhone(phone) {
  var phoneRe = /^[+]?(1\-|1\s|1|\d{3}\-|\d{3}\s|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/g;
  var digits = phone.replace(/\D/g, "");
  return phoneRe.test(digits);
}

function setError() {
  let error = document.getElementById("error");
  error.innerHTML = "check inputs again";
}
