/**
 * 3D models of Royal Sussex County Hospital showing results from
 * Accident and Emergency, Level 14, Renal, Pickford Ward and Courtyard.
 * Fetch data from the backend and process it to update the 3D model.
 */
function fetchData() {
    return fetch('https://jo435.brighton.domains/ci601/get-locations.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

/**
 * Update the 3D model with data specific to the ward.
 */
function update3DModelWithData(data) {
    const raeData = data.filter(item => item.Source.trim() === "RAE");
    const rcourData = data.filter(item => item.Source.trim() === "RCOUR7");
    const rl14Data = data.filter(item => item.Source.trim() === "RL14");
    const sehData = data.filter(item => item.Source.trim() === "IPICK");
    const rrenuData = data.filter(item => item.Source.trim() === "RRENU");



    raeData.forEach(record => {
        const raePointElement = document.getElementById('rae-point');
        if (raePointElement) {
            // Update the label with the Name
            raePointElement.querySelector('.label').textContent = record.Name || 'A&E Department';

            // Update the text content with Isolate
            raePointElement.querySelector('.text').innerHTML = `
            <p><strong>Lab No:</strong> ${record.LabNo.trim()}</p>
                <p><strong>Isolate:</strong> ${record.Isolate}</p>
            `;

            // Ensure the point is visible only after the loading bar overlay has disappeared
            const loadingContainer = document.querySelector('.loading-container');
            if (!loadingContainer.classList.contains('hidden')) {
                // If the loading overlay is still visible, wait for it to disappear
                setTimeout(() => {
                    // Ensure the point is visible
                    raePointElement.classList.add('visible');
                }, 5000); // Adjust the delay as needed
            } else {
                // If the loading overlay is already hidden, ensure the point is visible immediately
                raePointElement.classList.add('visible');
            }
        }
    });

    rcourData.forEach(record => {
        const rcourPointElement = document.getElementById('rcour-point');
        if (rcourPointElement) {
            // Update the label with the Name
            rcourPointElement.querySelector('.label').textContent = 'Courtyard'; // Change label to "Courtyard"
    
            // Update the text content with additional information
            rcourPointElement.querySelector('.text').innerHTML = `
                <p><strong>Isolate:</strong> ${record.Isolate}</p>
                <p><strong>Lab No:</strong> ${record.LabNo.trim()}</p>
            `;
    
            // Ensure the point is visible only after the loading bar overlay has disappeared
            const loadingContainer = document.querySelector('.loading-container');
            if (!loadingContainer.classList.contains('hidden')) {
                // If the loading overlay is still visible, wait for it to disappear
                setTimeout(() => {
                    // Ensure the point is visible
                    rcourPointElement.classList.add('visible');
                }, 5000); // Adjust the delay as needed
            } else {
                // If the loading overlay is already hidden, ensure the point is visible immediately
                rcourPointElement.classList.add('visible');
            }
        }
    });
    

    rl14Data.forEach(record => {
        const rl14PointElement = document.getElementById('rl14-point');
        if (rl14PointElement) {
            // Update the label with the Name
            rl14PointElement.querySelector('.label').textContent = 'Level 14';
    
            // Update the text content with Isolate
            rl14PointElement.querySelector('.text').innerHTML = `
            <p><strong>Lab No:</strong> ${record.LabNo.trim()}</p>
                <p><strong>Isolate:</strong> ${record.Isolate}</p>
            `;
    
            // Ensure the point is visible only after the loading bar overlay has disappeared
            const loadingContainer = document.querySelector('.loading-container');
            if (!loadingContainer.classList.contains('hidden')) {
                // If the loading overlay is still visible, wait for it to disappear
                setTimeout(() => {
                    // Ensure the point is visible
                    rl14PointElement.classList.add('visible');
                }, 5000); // Adjust the delay as needed
            } else {
                // If the loading overlay is already hidden, ensure the point is visible immediately
                rl14PointElement.classList.add('visible');
            }
        }
    });
    
    sehData.forEach(record => {
        const sehPointElement = document.getElementById('seh-point');
        if (sehPointElement) {
            // Update the label with the Name
            sehPointElement.querySelector('.label').textContent = 'SEH Ward';
    
            // Update the text content with Isolate and Lab No
            sehPointElement.querySelector('.text').innerHTML = `
            <p><strong>Lab No:</strong> ${record.LabNo.trim()}</p>
            <p><strong>Isolate:</strong> ${record.Isolate}</p>
            `;
    
            // Ensure the point is visible only after the loading bar overlay has disappeared
            const loadingContainer = document.querySelector('.loading-container');
            if (!loadingContainer.classList.contains('hidden')) {
                // If the loading overlay is still visible, wait for it to disappear
                setTimeout(() => {
                    // Ensure the point is visible
                    sehPointElement.classList.add('visible');
                }, 5000); // Adjust the delay as needed
            } else {
                // If the loading overlay is already hidden, ensure the point is visible immediately
                sehPointElement.classList.add('visible');
            }
        }
    });

    rrenuData.forEach(record => {
        const rrenuPointElement = document.getElementById('rrenu-point');
        if (rrenuPointElement) {
            // Update the label with the Name
            rrenuPointElement.querySelector('.label').textContent = 'Renal Unit';
    
            // Update the text content with Lab No and Isolate
            rrenuPointElement.querySelector('.text').innerHTML = `
                <p><strong>Lab No:</strong> ${record.LabNo.trim()}</p>
                <p><strong>Isolate:</strong> ${record.Isolate}</p>
            `;
    
            // Ensure the point is visible only after the loading bar overlay has disappeared
            const loadingContainer = document.querySelector('.loading-container');
            if (!loadingContainer.classList.contains('hidden')) {
                // If the loading overlay is still visible, wait for it to disappear
                setTimeout(() => {
                    // Ensure the point is visible
                    rrenuPointElement.classList.add('visible');
                }, 5000); // Adjust the delay as needed
            } else {
                // If the loading overlay is already hidden, ensure the point is visible immediately
                rrenuPointElement.classList.add('visible');
            }
        }
    });
    
    
    
}


/**
 * Initiate the data fetch and update the model upon successful data retrieval.
 */
document.addEventListener('DOMContentLoaded', function() {
    // Your JavaScript code here
    fetchData().then(data => {
        if (data) {
            update3DModelWithData(data);
        } else {
            console.error('Failed to fetch data or data is empty');
        }
    });
});
