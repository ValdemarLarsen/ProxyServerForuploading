//The client side where we fetch to the proxy server.

      // Prepare form data
      var formData = new FormData();
      files.forEach((file, index) => {
        formData.append('image', file, file.name);
      });

      // Add metadata (optional)
      formData.append('metadata', JSON.stringify({
        name: 'Anmeldelse Billede',
        id: document.getElementById('anmeldelsenumer').value
      }));

      // Send files to fivemanage with the API key as a query parameter
      fetch('http://localhost:3000/proxy', {
        method: 'POST',
        body: formData
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log('Upload succesfuld:', data);
        })
        .catch(error => {
          console.error('Fejl:', error);
        });
