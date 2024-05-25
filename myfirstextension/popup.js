let currentPage = 1; // Keep track of the current page

document.getElementById('searchButton').addEventListener('click', () => {
    currentPage = 1; // Reset to page 1 on a new search
    performSearch();
});

document.getElementById('prevPage').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        performSearch();
    }
});

document.getElementById('nextPage').addEventListener('click', () => {
    currentPage++;
    performSearch();
});

function performSearch() {
    const query = document.getElementById('jobQuery').value;
    if (!query) {
        alert('Please enter a job title to search for.');
        return;
    }

    const app_id = '34ca15c8';
    const app_key = '5cb64e6fea47c7df02fa4e94037f665f';
    const url = `https://api.adzuna.com/v1/api/jobs/us/search/${currentPage}?app_id=${app_id}&app_key=${app_key}&results_per_page=10&what=${encodeURIComponent(query)}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const resultsContainer = document.getElementById('results');
            resultsContainer.innerHTML = ''; // Clear previous results

            data.results.forEach(job => {
                const jobElement = document.createElement('div');
                jobElement.className = 'job-item';

                const titleElement = document.createElement('a');
                titleElement.className = 'job-title';
                titleElement.textContent = job.title;
                titleElement.href = job.redirect_url; // Assuming 'redirect_url' is provided
                titleElement.target = '_blank';

                jobElement.appendChild(titleElement);

                const locationElement = document.createElement('div');
                locationElement.className = 'job-location';
                locationElement.textContent = ` - ${job.location.display_name}`;

                jobElement.appendChild(locationElement);
                resultsContainer.appendChild(jobElement);
            });

            // Handle pagination visibility
            document.getElementById('prevPage').style.visibility = currentPage > 1 ? 'visible' : 'hidden';
            document.getElementById('nextPage').style.visibility = data.results.length === 10 ? 'visible' : 'hidden';
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

// This is assuming that you have 'prevPage' and 'nextPage' buttons in your popup.html
