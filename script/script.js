//! Variables
let newsData = [];
const newsDiv = document.querySelector(".news");
const links = document.querySelectorAll("header ul li button");

//! Custom Attribute Variables
let countryCode;
let category;

//! Fetching the API and Displaying the Data in HTML
const getNews = (countryCode, category) => {
  newsData = [];
  if (!category) category = "health"; //* if the user didn't choose a category it's gonna be "health" as default
  fetch(`https://newsapi.org/v2/top-headlines?country=${countryCode}&category=${category}&apiKey=0fb7dc41d309403bacd4bfcf8c8b854d`)
    .then((response) => response.json())
    //* Adding the Promise Result to a Global Array
    .then((data) => {
      data.articles?.forEach((element) => newsData.push(element));
    })
    //* Generating the New Data as a HTML Code and Adding it to the News Div inside the News Section
    .then(() => {
      newsData.forEach((ele) => {
        newsDiv.innerHTML += `<div>
        <a href="${ele.url}" target="_blank">
        <h4>${ele.title}</h4>
        <div><img src="${ele.urlToImage ? ele.urlToImage : "../assets/1.jpg"}" alt="${ele.author} Article" /></div>
        <p>${ele.description || "There's no Description"}</p></a>
      </div>`;
      });
    });
};

//! After Clicking on Any Button it Will Get the Custom Attribute in it and Call the Fetch Function Again to Display the New Data
links.forEach((link) =>
  link.addEventListener("click", (e) => {
    newsDiv.innerHTML = ""; //* Clearing the News Content to Display the New Data
    if (e.target.hasAttribute("country-code")) {
      countryCode = e.target.getAttribute("country-code");
    } else if (e.target.hasAttribute("category")) {
      category = e.target.getAttribute("category");
    }

    //* if => if there is a country code pass it to the function with the category
    if (countryCode) getNews(countryCode, category);
    //* else => if there is no country code pass "us" as a default value so it doesn't trigger an error
    else getNews("us", category);
  }),
);

//! Displaying the Data
getNews("us", "health");
