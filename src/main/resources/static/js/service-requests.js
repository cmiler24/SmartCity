document.getElementById('serviceRequestForm').addEventListener('submit', async function(e) {
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

    try {
        // Send data to backend API
        const response = await fetch('/api/request-service', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            // Show alert notification
            alert('Service request sent successfully! Thank you for reporting this issue.');

            // Hide form and show success message with action buttons
            form.style.display = 'none';

            successMessage.innerHTML = `
                <div class="success-content">
                    <h2>Service Request Sent!</h2>
                    <p>Thank you for reporting this issue. Our team will review it shortly.</p>
                    <div class="success-actions">
                        <button class="action-button request-another" onclick="requestAnother()">Request Another Service</button>
                        <a href="/index.html" class="action-button go-home">Go to Home Page</a>
                    </div>
                </div>
            `;
            successMessage.style.display = 'block';

            // Reset form
            form.reset();
        } else {
            const errorData = await response.json();
            errorMessage.textContent = errorData.message || 'There was an error submitting your service request. Please try again later.';
            errorMessage.style.display = 'block';
        }
    } catch (error) {
        console.error('Error:', error);
        errorMessage.textContent = 'Network error: Unable to submit your request. Please check your connection and try again.';
        errorMessage.style.display = 'block';
    }
});

// Function to reset the form and show it again for another request
function requestAnother() {
    const form = document.getElementById('serviceRequestForm');
    const successMessage = document.getElementById('successMessage');

    form.style.display = 'block';
    successMessage.style.display = 'none';
    form.reset();
    form.scrollIntoView({ behavior: 'smooth' });
}

