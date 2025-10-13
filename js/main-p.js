const photoDiv = document.getElementById('profilePhoto');
    const photoInput = document.getElementById('photoInput');

    photoDiv.addEventListener('click', () => {
      photoInput.click();
    });

    photoInput.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          photoDiv.innerHTML = `<img src="${e.target.result}" alt="Foto de perfil">`;
        };
        reader.readAsDataURL(file);
      }
    });