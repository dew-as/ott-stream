document.addEventListener('DOMContentLoaded', () => {
    // Login Form Submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent default form submission

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await axios.post('/admin/login', { email, password });

                if (response.status === 200) {
                    alert('Login successful!');
                    window.location.href = '/movies';
                }
            } catch (error) {
                console.error(error);
                alert(error.response?.data?.error || 'Login failed. Please try again.');
            }
        });
    }

    // Movie Form Submission
    const movieForm = document.getElementById('movieForm');
    const formAction = document.getElementById('formAction');

    if (movieForm) {
        movieForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent default form submission

            // Collect necessary data based on the Movie schema
            const movieData = {
                title: document.getElementById('title').value.trim(),
                description: document.getElementById('description').value.trim(),
                thumbnail: document.getElementById('thumbnail').value.trim(),
                video: document.getElementById('vdo').value.trim(),
            };

            console.log('Collected Movie Data:', movieData);

            // Determine if the form is in edit mode or add mode
            const apiUrl = new URL(formAction.value, window.location.origin).href;
            const isEditMode = apiUrl.includes('editmovie');

            try {
                // Make API call to the backend
                const response = isEditMode
                    ? await axios.put(apiUrl, movieData)
                    : await axios.post(apiUrl, movieData);

                if (response.status === 200 || response.status === 201) {
                    alert(isEditMode ? 'Movie updated successfully!' : 'Movie added successfully!');
                    window.location.href = '/movies'; // Redirect to the movies list
                }
            } catch (error) {
                console.error(error);
                alert(error.response?.data?.error || 'Failed to submit the form. Please try again.');
            }
        });
    }

    // Handle Delete Movie
    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`/admin/deletemovie/${id}`);
            if (response.status === 200) {
                alert('Movie deleted successfully!');
                window.location.href = '/movies'; // Redirect to the movies list
            }
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.error || 'Failed to delete the movie. Please try again.');
        }
    };

    // Event listener for confirm delete buttons
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('confirm-delete-btn')) {
            const movieId = event.target.getAttribute('data-movie-id');
            handleDelete(movieId);
        }
    });
});