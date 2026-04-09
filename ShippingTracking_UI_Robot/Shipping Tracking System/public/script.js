function trackShipment() {
    const trackingId = document.getElementById('trackingId').value;
    const password = document.getElementById('password').value;

    fetch('/track', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ trackingId, password })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                displayStages(data.stages);
                showMessage('Shipment stages loaded successfully!', 'success');
            } else {
                clearStages(); // Clear the stages if tracking ID or password is invalid
                showMessage('Invalid Tracking ID or Password', 'error');
            }
        });
}

function displayStages(stages) {
    const stagesContainer = document.getElementById('stages');
    stagesContainer.innerHTML = '';

    stages.forEach((stage, index) => {
        const isPreviousDone = index === 0 || stages[index - 1].status === 'done'; // Check if previous stage is done or if it's the first stage

        const stageElement = document.createElement('div');
        stageElement.className = 'stage';
        stageElement.innerHTML = `
            <h3>Stage ${index + 1}: ${stage.name}</h3>
            <div class="buttons">
                <button class="done" onclick="updateStage(${index}, 'done')" ${stage.status === 'done' || !isPreviousDone ? 'disabled' : ''}>Done</button>
                <button class="pending" onclick="updateStage(${index}, 'pending')" ${stage.status === 'done' || stage.status === 'pending' || !isPreviousDone ? 'disabled' : ''}>Pending</button>
                <button class="rejected" onclick="showRejectionCause(${index})" ${stage.status === 'done' || stage.status === 'rejected' || !isPreviousDone ? 'disabled' : ''}>Rejected</button>
            </div>
            <div class="rejection-cause" id="rejection-cause-${index}" style="display: ${stage.status === 'rejected' ? 'block' : 'none'};">
                <input type="text" placeholder="Reason for rejection" id="cause-${index}" value="${stage.status === 'rejected' ? stage.cause : ''}" ${stage.status === 'rejected' ? 'disabled' : ''}>
                <button onclick="submitRejectionCause(${index})" ${stage.status === 'rejected' ? 'disabled' : ''}>Submit</button>
            </div>
        `;
        stagesContainer.appendChild(stageElement);
    });
}

function clearStages() {
    const stagesContainer = document.getElementById('stages');
    stagesContainer.innerHTML = ''; // Clear the stages container
}

function showRejectionCause(stageIndex) {
    document.getElementById(`rejection-cause-${stageIndex}`).style.display = 'block';
}

function submitRejectionCause(stageIndex) {
    const cause = document.getElementById(`cause-${stageIndex}`).value;
    if (!cause) {
        showMessage('Please provide a reason for rejection', 'error');
        return;
    }
    updateStage(stageIndex, 'rejected', cause);
}

function updateStage(stageIndex, status, cause = '') {
    const trackingId = document.getElementById('trackingId').value;

    fetch('/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ trackingId, stageIndex, status, cause })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                displayStages(data.stages);
                showMessage(`Stage ${stageIndex + 1} marked as ${status}`, 'success');
            } else {
                showMessage('Error updating stage', 'error');
            }
        });
}

function showMessage(message, type) {
    // Check if a message container already exists, if so, update its content
    let messageContainer = document.querySelector('.message');
    if (!messageContainer) {
        messageContainer = document.createElement('div');
        messageContainer.className = `message ${type}`;
        document.body.appendChild(messageContainer);
    }

    // Update the message content and class
    messageContainer.textContent = message;
    messageContainer.className = `message ${type}`;
}
