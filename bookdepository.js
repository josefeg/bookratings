var QUERY_URL = "http://www.goodreads.com/book/review_counts.json?key=nG8gflbnH8mieOShnlnpow&format=json&isbns=";
var REVIEWS_URL = "http://www.goodreads.com/book/isbn?isbn=";

function displayStars(rating) {

	var element = document.querySelector("div.bre_stars_container");
	
	var fullStarUrl = chrome.extension.getURL("full.png");
	var halfStarUrl = chrome.extension.getURL("half.png");
	var emptyStarUrl = chrome.extension.getURL("empty.png");

	for (var i = 0; i < 5; i++) {

		if (rating >= (i + 1)) {

			element.innerHTML += "<img style='width: 8px; height:8px;' src='" + fullStarUrl + "'/>";

		} else if (rating >= (i + 0.5)) {

			element.innerHTML += "<img style='width: 8px; height:8px;' src='" + halfStarUrl + "'/>";

		} else {

			element.innerHTML += "<img style='width: 8px; height:8px;' src='" + emptyStarUrl + "'/>";
		}
	}
}

function addPopup(element, isbn, jsonResponse) {

	var ratings = jsonResponse.books[0].ratings_count;
	var averageRating = jsonResponse.books[0].average_rating;
	var reviews = jsonResponse.books[0].reviews_count;

	var goodreadsLogoUrl = chrome.extension.getURL("goodreads.png");

	var tooltip = document.createElement("span");
	tooltip.setAttribute("id", "tooltip_span");
	tooltip.innerHTML += "<img src='" + goodreadsLogoUrl + "' style='width: 150px; height: 32px; padding-bottom: 5px;'/><br/>";
	tooltip.innerHTML += "<div class='bre_stars_container' style='display:inline;'></div>";
	tooltip.innerHTML += "&nbsp;" + averageRating + " (" + ratings + " ratings)<br/>";
	tooltip.innerHTML += "<a href='" + REVIEWS_URL + isbn + "' target='_blank'>" + reviews + " reviews</a>";

	var parent = element.parentNode.parentNode;
	parent.appendChild(tooltip);
	parent.setAttribute("class", "bre_tooltip");

	displayStars(averageRating);
}

function handleSuccessfulResponse(titleElement, isbn, jsonResponse) {

	addPopup(titleElement, isbn, jsonResponse);
}

function getRatings(titleElement, isbn) {

	var xhr = new XMLHttpRequest();
	xhr.open("GET", QUERY_URL + isbn, true);
	xhr.onreadystatechange = function() {

		if ((xhr.readyState == 4) && (xhr.status == 200)) {
		
			handleSuccessfulResponse(titleElement, isbn, JSON.parse(xhr.responseText));
		}
	};
	xhr.send();
}

var titleElement = document.querySelector("span[property='dc:title']");  
var isbnElement = document.querySelector("span.isbn13 > span");

if ((titleElement != null) && (isbnElement != null)) {

	var isbn = isbnElement.innerHTML.trim();
	getRatings(titleElement, isbn);
}
