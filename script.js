const apiKey = 'df07c7d9';
const apiUrl = 'http://www.omdbapi.com/';

async function fetchMovieInfo() {
  const title = document.getElementById('titleInput').value.trim();
  const year = document.getElementById('yearInput').value.trim();
  const type = document.getElementById('typeInput').value.trim();
  const id = document.getElementById('idInput').value.trim();

  let query = `apikey=${apiKey}`;

  if (title !== '') {
    query += `&t=${title}`;
  }

  if (year !== '') {
    query += `&y=${year}`;
  }

  if (type !== '') {
    query += `&type=${type}`;
  }

  if (id !== '') {
    query += `&i=${id}`;
  }

  const apiUrlWithQuery = `${apiUrl}?${query}`;
  console.log('API URL:', apiUrlWithQuery);

  try {
    const response = await fetch(apiUrlWithQuery);
    const data = await response.json();
    console.log('API Response:', data);

    if (data.Response === 'True') {
      displayMovieInfo(data);
      clearError();
    } else {
      displayError('Movie information not found or incomplete. Please try again with different criteria.');
    }
  } catch (error) {
    console.error('Error fetching movie information:', error);
    displayError('An error occurred. Please try again later.');
  }
}

function displayMovieInfo(movieInfo) {
  const infoContainer = document.getElementById('movieInfo');
  infoContainer.classList.remove('hidden');
  infoContainer.innerHTML = `
    <h2>${movieInfo.Title}</h2>
    <p><strong>Released:</strong> ${movieInfo.Released}</p>
    <p><strong>Runtime:</strong> ${movieInfo.Runtime}</p>
    <p><strong>Genre:</strong> ${movieInfo.Genre}</p>
    <p><strong>Plot:</strong> ${movieInfo.Plot}</p>
    <p><strong>Director:</strong> ${movieInfo.Director}</p>
    <p><strong>Actors:</strong> ${movieInfo.Actors}</p>
    <img src="${movieInfo.Poster}" alt="${movieInfo.Title} Poster">
  `;

  clearInputFields();
}

function clearInputFields() {
  document.getElementById('titleInput').value = '';
  document.getElementById('yearInput').value = '';
  document.getElementById('typeInput').value = '';
  document.getElementById('idInput').value = '';
}

function displayError(message) {
  const errorContainer = document.getElementById('errorMessage');
  errorContainer.classList.remove('hidden');
  errorContainer.textContent = message;
}

function clearError() {
  const errorContainer = document.getElementById('errorMessage');
  errorContainer.classList.add('hidden');
  errorContainer.textContent = '';
}





