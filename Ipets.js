window.onload = function() {
    const petTable = document.getElementById('pet-table');
    const tbody = petTable.querySelector('tbody');
    const getPetsButton = document.getElementById('get-pets');
  
    getPetsButton.addEventListener('click', async () => {
      try {
        const response = await fetch('http://localhost:8000/');
        const pets = await response.json();
        console.log(pets);
        displayPets(pets);
      } catch (error) {
        console.error('Error fetching pets:', error);
      }
    });
  
    function displayPets(pets) {
      tbody.innerHTML = ''; // Clear previous content
  
      pets.forEach(pet => {
        const tableRow = document.createElement('tr');
  
        const nameCell = document.createElement('td');
        nameCell.textContent = pet[0];
        tableRow.appendChild(nameCell);
  
        const detailsCell = document.createElement('td');
        detailsCell.textContent = 'Click for Details';
        detailsCell.addEventListener('click', () => {
          showDetails(pet);
        });
        tableRow.appendChild(detailsCell);
  
        const adoptCell = document.createElement('td');
        const adoptButton = document.createElement('button');
        adoptButton.textContent = 'Adopt';
        adoptButton.addEventListener('click', async () => {
          await adoptPet(pet);
          removePetFromTable(pet);
        });
        adoptCell.appendChild(adoptButton);
        tableRow.appendChild(adoptCell);
        
        const editCell = document.createElement('td');
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Update Details';
        editBtn.addEventListener('click',async()=>{
           window.location.href = "updateDetails.html?json=" + pet[0];
        })
        editCell.appendChild(editBtn);
        tableRow.appendChild(editCell);
        tbody.appendChild(tableRow);
      });
    }
  
    function showDetails(pet) {
      // Implement logic to fetch details from server or display existing data
      alert(`Details of ${pet[0]}:
      Species: ${pet[1].species}
      Breed: ${pet[1].breed}
      Age: ${pet[1].age}`
      );
    }
  
    async function adoptPet(petName) {
      // Implement logic to send an adoption request to the server
      // This might involve a DELETE request to remove the pet
  
      const response = await fetch(`http://localhost:8000/${petName}`, {
        method: 'DELETE'
      });
  
      if (response.ok) {
        console.log('Pet adopted successfully!');
      } else {
        console.error('Error adopting pet:', await response.text());
      }
    }
  

    async function editDetails(pet) {
      await showDetails(pet);
      prompt(`New details:`)
    }
    function removePetFromTable(petName) {
      const rows = tbody.querySelectorAll('tr');
      for (const row of rows) {
        if (row.querySelector('td').textContent === petName) {
          tbody.removeChild(row);
          break;
        }
      }
    }
  };
  