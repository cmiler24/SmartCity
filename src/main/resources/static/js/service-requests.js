document.getElementById('serviceRequestForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const form = this;
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    // Clear previous messages
    successMessage.style.display = 'none';
    errorMessage.style.display = 'none';

    // Get form data
    const formData = new FormData(form);
    const data = {
        issueType: formData.get('issueType'),
        title: formData.get('title'),
        description: formData.get('description'),
        location: formData.get('location'),
        zipCode: formData.get('zipCode'),
        followUp: formData.get('followUp') === 'yes',
        submittedAt: new Date().toISOString()
    };

    // Validate required fields
    if (!data.issueType || !data.title || !data.description || !data.location || !data.zipCode) {
        errorMessage.textContent = 'Please fill in all required fields.';
        errorMessage.style.display = 'block';
        return;
    }

    // TODO: Send data to backend API
    // For now, we'll show a success message and store in local storage
    
    localStorage.setItem('lastServiceRequest', JSON.stringify(data));

    successMessage.textContent = 'Thank you! Your service request has been submitted successfully. We will review it shortly.';
    successMessage.style.display = 'block';


    // Reset form
    form.reset();

    // wait 3 seconds, then set the displays off
    setTimeout(() => {
        successMessage.style.display = 'none';
        errorMessage.style.display = 'none';
    }, 3000);
});

// Clear form button functionality
document.querySelector('.reset-button').addEventListener('click', function() {
    document.getElementById('successMessage').style.display = 'none';
    document.getElementById('errorMessage').style.display = 'none';
});

