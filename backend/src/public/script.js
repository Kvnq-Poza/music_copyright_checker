const searchButton = document.getElementById('SearchSubmit');
const BASE_URL = '/youtube/video';

function showPreloader() {
  document.querySelector('.preloader').classList.remove('hidden');
}

function hidePreloader() {
  document.querySelector('.preloader').classList.add('hidden');
}

searchButton.addEventListener('click', function() {
    event.preventDefault(); // Prevent default form submission


    const searchINput = document.getElementById('SearchBy');
    const searchValue = searchINput.value;

    const SearchBy = document.getElementById('searchByName');
    const searchValueName = SearchBy.value;

    const SearchByLink = document.getElementById('searchByLink');
    const searchValueLink = SearchByLink.value;

    console.log(SearchBy.checked);
    console.log(SearchByLink.checked);

    console.log(searchValue);
    const searchResultCard = document.getElementById('searchResultCard');
    searchResultCard.classList.add('hidden');
    showPreloader();


    
      // Update card content based on search result
    //   searchResultCard.classList.remove('hidden');
    //   searchResultCard.innerHTML = `
    //     <h2>${searchResult.title}</h2>
    //     <p>${searchResult.description}</p>
    //     <img src="${searchResult.thumbnailUrl}" alt="${searchResult.title} thumbnail">
    //     <a href="${searchResult.link}">Watch on YouTube</a>
    //   `;

      // Send Request to the API
      // Build the URL

      if (SearchByLink.checked) {
        console.log(searchValueLink);
        const video_id = getYouTubeVideoId(searchValue);
        console.log(video_id);
        const url = BASE_URL + '?video_id=' + video_id;
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(response => {
        return response.json();
      }).then(data => {
        console.log(data);
        hidePreloader();
        searchResultCard.classList.remove('hidden');
        searchResultCard.innerHTML = `
          <h2>${data.data}</h2>
        `;
        if (data.data) {
          searchResultCard.innerHTML = `
              <h2 class="search__title" id="SearchTitle"><span class="search__title--shadow">Search result</span></h2>
              <div class="search__list">
                  <div class="search__list_item">
                      
                      <div class="song__permission">
                          <div class="permission__list blur">
                              <span class="material-icons free" title="No copyright">verified</span>
                              <span class="material-icons free" title="Creative Commons">closed_caption</span>
                              <span class="material-icons close money__off" title="Find a copyright free">money_off</span>
                          </div>
                          <div class="permission__caption">Checked successfully. Subscribe to know the license</div>
                      </div>
                      <ul class="song__params">
                          <li class="song__params_item"><b>The song from the video:</b> 
                              <span id="TitleYoutube">${data.name}</span>
                          </li>
                          <li class="song__params_item"><b>License:</b> ${data.data}</li>
                          <li class="song__params_item"><b>Checked on the site:</b> <a href="https://ab.com">ab.com</a></li>
                      </ul>
                      <iframe width="100%" height="auto" src="${data.url}" id="iframeYoutube" data-youtube-id="LgI7_0K3Si4" data-youtube-title="Haymanot Girma - Yemalkeyrew - ሃይማኖት ግርማ - የማልቀይረዉ - Ethiopian Music" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
                  </div>
                  <div class="search__animation" id="SearchAnimation">
                      <img src="/images/icons/logotype_loading.png" alt="eprove logotype animation">
                  </div>
              </div>
          `;
          searchResultCard.classList.remove('hidden');
      } else {
        hidePreloader();
          searchResultCard.innerHTML = `
          
              <h2>No license found</h2>
              <p>Try another search or subscribe for more details.</p>
          `;
          searchResultCard.classList.remove('hidden');
      }
      }).catch(error => {
        console.error('Error:', error);
        hidePreloader();
        searchResultCard.innerHTML = `
          <h2>Something went wrong</h2>
          <p>Try again later</p>
        `;
        searchResultCard.classList.remove('hidden');
      });
      }
      
});

function getYouTubeVideoId(url) {
  let videoId = '';
  
  // Check if the URL is a shortened youtu.be URL
  if (url.includes('youtu.be/')) {
    const parts = url.split('youtu.be/');
    if (parts.length > 1) {
      videoId = parts[1];
    }
  }
  // Check if the URL is a standard youtube.com URL
  else if (url.includes('youtube.com/watch')) {
    const parts = url.split('v=');
    if (parts.length > 1) {
      videoId = parts[1].split('&')[0]; // Handle additional query parameters
    }
  }

  return videoId;
}




window.onload = function() {
  const token = localStorage.getItem('authToken');
  const library = document.getElementById('library');

  if (token) {
    library.classList.remove('hidden');
  } else {
    library.classList.add('hidden');
  }
}