var URL = "http://www.goodreads.com/book/review_counts.json?key=nG8gflbnH8mieOShnlnpow&format=json&isbns=";

function handleSuccessfulResponse(titleElement, jsonResponse) {

	var ratings = jsonResponse.books[0].ratings_count;
	var averageRating = jsonResponse.books[0].average_rating;

	titleElement	
}

function getRatings(titleElement, isbn) {

	var xhr = new XMLHttpRequest();
	xhr.open("GET", URL + isbn, true);
	xhr.onreadystatechange = function() {

		if ((xhr.readyState == 4) && (xhr.status == 200)) {
		
			handleSuccessfulResponse(titleElement, JSON.parse(xhr.responseText));
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
