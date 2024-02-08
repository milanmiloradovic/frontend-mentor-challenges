window.onload = () => {
  let preferredTheme = localStorage.getItem("preferred-theme") || "";

  if (preferredTheme) {
    document.querySelector(".app").setAttribute("data-theme", preferredTheme);
    if (preferredTheme === "dark") {
      document
        .querySelector(".theme-icon")
        .setAttribute("src", "./assets/icon-sun.svg");
      document.querySelector(".theme-name").innerHTML = "Light";
      document.querySelector(".app").setAttribute("data-theme", "dark");
    } else {
      document
        .querySelector(".theme-icon")
        .setAttribute("src", "./assets/icon-moon.svg");
      document.querySelector(".theme-name").innerHTML = "Dark";
      document.querySelector(".app").setAttribute("data-theme", "light");
    }
  }
  fetchData();
};

var months = [
  "Jan",
  "Feb",
  "March",
  "April",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

function fetchData(username = "milanmiloradovic") {
  fetch(`https://api.github.com/users/${username}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        console.log("User not found!");
        toggleError("No results");
        return;
      }
      document.querySelector(".avatar-img").src = data.avatar_url;
      document.querySelector(".username").innerHTML = data.login;
      document.querySelector(".joined").innerHTML = `Joined ${new Date(
        data.created_at
      ).getDay()} ${months[new Date(data.created_at).getMonth() - 1]}  ${
        data.created_at.split("-")[0]
      }`;
      document.querySelector(".tag").innerHTML = "@" + data.login;
      document.querySelector(".bio").innerHTML = data.bio;

      document.querySelector("#repos").innerHTML = data.public_repos;
      document.querySelector("#followers").innerHTML = data.followers;
      document.querySelector("#following").innerHTML = data.following;

      document.querySelector("#location").innerHTML = data.location
        ? data.location
        : "Not available";
      document.querySelector("#twitter").innerHTML = data.twitter_username
        ? data.twitter_username
        : "Not available";
      document.querySelector("#website").innerHTML = data.blog
        ? data.blog
        : "Not available";
      document.querySelector("#company").innerHTML = data.company
        ? data.company
        : "Not available";
    });
}

function toggleError(message) {
  document.querySelector(".error").innerHTML = message;
  setTimeout(() => (document.querySelector(".error").innerHTML = ""), 2000);
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".search-btn").onclick = () => {
    let username = document.querySelector("input[name='search-input']").value;
    fetchData(username);

    document.querySelector("input[name='search-input']").innerHTML = "";
  };

  document.querySelector(".toggle").onclick = () => {
    let currentTheme = document
      .querySelector(".app")
      .getAttribute("data-theme");

    if (currentTheme == "light") {
      document
        .querySelector(".theme-icon")
        .setAttribute("src", "./assets/icon-sun.svg");
      document.querySelector(".theme-name").innerHTML = "Light";
      document.querySelector(".app").setAttribute("data-theme", "dark");
    } else {
      document
        .querySelector(".theme-icon")
        .setAttribute("src", "./assets/icon-moon.svg");
      document.querySelector(".theme-name").innerHTML = "Dark";
      document.querySelector(".app").setAttribute("data-theme", "light");
    }

    localStorage.setItem(
      "preferred-theme",
      currentTheme === "light" ? "dark" : "light"
    );
  };
});
