
// ...existing code...

// Delete attendance record
function deleteRecord(id) {
    fetch(`/api/attendance/${id}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        if(data.success){
            location.reload();
        } else {
            alert('Failed to delete record.');
        }
    })
    .catch(err => console.error(err));
}

// Create attendance record
document.getElementById('createForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const data = {
        eventName: document.getElementById('eventName').value,
        venue: document.getElementById('venue').value,
        date: document.getElementById('date').value,
        status: document.getElementById('status').value
    };
    
    fetch('/api/attendance', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if(data.success){
            location.reload();
        } else {
            alert('Failed to add record.');
        }
    })
    .catch(err => console.error(err));
});

// Edit attendance record
function editRecord(id) {
    fetch(`/api/attendance/${id}`)
    .then(response => response.json())
    .then(record => {
        document.getElementById('updateId').value = record._id;
        document.getElementById('updateEventName').value = record.eventName;
        document.getElementById('updateVenue').value = record.venue;
        document.getElementById('updateDate').value = new Date(record.date).toISOString().split('T')[0]; // Corrected date formatting
        document.getElementById('updateStatus').value = record.status;
        document.getElementById('updateModal').style.display = 'block';
    })
    .catch(err => console.error(err));
}

function closeUpdateModal() {
    document.getElementById('updateModal').style.display = 'none';
}

// Update attendance record
document.getElementById('updateForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const id = document.getElementById('updateId').value;
    const data = {
        eventName: document.getElementById('updateEventName').value,
        venue: document.getElementById('updateVenue').value,
        date: document.getElementById('updateDate').value,
        status: document.getElementById('updateStatus').value
    };
    
    fetch(`/api/attendance/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if(data.success){
            location.reload();
        } else {
            alert('Failed to update record.');
        }
    })
    .catch(err => console.error(err));
});