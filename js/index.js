var siteName = document.getElementById("bookmarkName");
var siteURL = document.getElementById("bookmarkURL");
var tableContent = document.getElementById("tableContent");
var submitBtn = document.getElementById("submitBtn");
var modal = document.getElementById("modal");
var closeBtn = document.getElementById("closeBtn");
var searchInput = document.getElementById("searchInput");


var Bookmarks = [];

if (localStorage.getItem("bookmarks") !== null) {
  Bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  displayBookmarks();
}



submitBtn.addEventListener("click", function() {
  if(validationSiteName() && validateURL()){
 // create
      var bookmark = {
        name: capitalize(siteName.value).trim(),
        url: siteURL.value,
      };
      Bookmarks.push(bookmark);
      localStorage.setItem("bookmarks", JSON.stringify(Bookmarks));
      displayBookmarks();
      clearForm();
    
  }else {
    modal.style.display ="block";
  }
});

window.addEventListener('click', function (e) {
  if (e.target === modal) {
      modal.style.display = 'none';
  }
});

closeBtn.addEventListener('click', function () {
  modal.style.display = 'none';
});

document.addEventListener("keydown", function (e) {
  if (e.key == "Escape") {
    modal.style.display = 'none';
  }
});


function capitalize(fLetter) {
  let strArr = fLetter.split("");
  strArr[0] = strArr[0].toUpperCase();
  return strArr.join("");
}

function displayBookmarks() {
  var carton = "";
  for (var i = 0; i < Bookmarks.length; i++) {
    carton += `
         <tr>
             <td class="py-3">${[i + 1]}</td>
             <td>${Bookmarks[i].name}</td>
              <td>
      <a
        href="${Bookmarks[i].url}"
        class="text-white text-decoration-none"
        target="_blank"
      >
        <button class="btn btn-success px-2">
          <i class="fa-regular fa-eye pe-2"></i> Visit
        </button>
      </a>
    </td>
             <td><button onclick="deleteItem(${i})" class="btn btn-danger px-2"><i class="fa-solid fa-trash-can pe-2"></i> Delete</button></td>
        </tr>
        
        `;
  }
  document.getElementById("tableContent").innerHTML = carton;
}


// search
function searchBookmarks(){
  var searchText = searchInput.value.toLowerCase();
  
  var carton = "";
  for (var i = 0; i < Bookmarks.length; i++) {
    if(Bookmarks[i].name.toLowerCase().includes(searchText)){
      carton += `
         <tr>
             <td class="py-3">${[i + 1]}</td>
             <td>${Bookmarks[i].name}</td>
              <td>
      <a
        href="${Bookmarks[i].url}"
        class="text-white text-decoration-none"
        target="_blank"
      >
        <button class="btn btn-success px-2">
          <i class="fa-regular fa-eye pe-2"></i> Visit
        </button>
      </a>
    </td>
             <td><button onclick="deleteItem(${i})" class="btn btn-danger px-2"><i class="fa-solid fa-trash-can pe-2"></i> Delete</button></td>
        </tr>
        
        `;
    }
  }
  document.getElementById("tableContent").innerHTML = carton;

}


function clearForm() {
  siteName.value = null;
  siteURL.value = null;

  bookmarkName.classList.remove("is-valid");
  bookmarkURL.classList.remove("is-valid");
}

function deleteItem(index) {
  Bookmarks.splice(index, 1);
  localStorage.setItem("bookmarks", JSON.stringify(Bookmarks));
  displayBookmarks();
}
// validation of dataName
function validationSiteName() {
  var regex = /^\w{3,}(\s+\w+)*$/;

  if (regex.test(siteName.value)) {
    bookmarkName.classList.add("is-valid");
    bookmarkName.classList.remove("is-invalid");
    return true;
  } else {
    bookmarkName.classList.remove("is-valid");
    bookmarkName.classList.add("is-invalid");
    return false;
  }
}
// validation of URL 

function validateURL() {
  var regex = /^https:\/\/[a-zA-Z0-9.-]+(?:\.[a-zA-Z]{2,})+(?:\/[^\s]*)?$/;
  if (regex.test(siteURL.value)) {
    bookmarkURL.classList.add("is-valid");
    bookmarkURL.classList.remove("is-invalid");
    return true;
  } else {
    bookmarkURL.classList.remove("is-valid");
    bookmarkURL.classList.add("is-invalid");
    return false;
  }
}