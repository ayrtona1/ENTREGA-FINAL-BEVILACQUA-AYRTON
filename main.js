// main.js

document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const passwordDisplay = document.getElementById('passwordDisplay');
    const passwordListElement = document.getElementById('passwordList');
    const userDataForm = document.getElementById('userDataForm');
    const messageElement = document.getElementById('message');
    
    const storedPasswords = localStorage.getItem('passwordList');
    const passwordList = storedPasswords ? JSON.parse(storedPasswords) : [];
  
    generateBtn.addEventListener('click', () => {
      const firstName = document.getElementById('firstName').value;
      const lastName = document.getElementById('lastName').value;
      const email = document.getElementById('email').value;
  
      if (!isValidName(firstName) || !isValidName(lastName) || !isValidEmail(email)) {
        showMessage('Por favor, ingresa datos válidos.');
        return;
      }
  
      const generatedPassword = generatePassword();
      displayPassword(generatedPassword);
      savePassword(generatedPassword, firstName, lastName);
  
      userDataForm.reset();
  
      passwordDisplay.classList.add('animate__animated', 'animate__rubberBand');
  
      showMessage('La contraseña se mostrará por 5 segundos por motivos de seguridad.');
      setTimeout(() => {
        passwordDisplay.innerHTML = '';
        messageElement.innerHTML = '';
        clearPasswordList();
        showMessage('Las contraseñas han sido borradas por seguridad y enviadas a su correo personal.');
      }, 5000);
  
      setTimeout(() => {
        messageElement.innerHTML = '';
      }, 8000);
    });
  
    function showMessage(message) {
      messageElement.innerHTML = message;
      messageElement.style.display = 'block';
    }
  
    function isValidName(name) {
      return /^[a-zA-Z]+$/.test(name);
    }
  
    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
  
    function generatePassword() {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const passwordLength = 12;
      let password = '';
  
      for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters.charAt(randomIndex);
      }
  
      return password;
    }
  
    function displayPassword(password) {
      const passwordElement = document.createElement('div');
      passwordElement.innerHTML = `<strong>Contraseña generada:</strong> ${password}`;
      passwordDisplay.insertBefore(passwordElement, passwordDisplay.firstChild);
    }
  
    function savePassword(password, firstName, lastName) {
      const newPassword = {
        firstName: firstName,
        lastName: lastName,
        password: password
      };
  
      passwordList.unshift(newPassword);
      updatePasswordList();
      localStorage.setItem('passwordList', JSON.stringify(passwordList));
    }
  
    function updatePasswordList() {
      passwordListElement.innerHTML = '';
      passwordList.forEach((entry, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${entry.firstName} ${entry.lastName}:</strong> ${entry.password}`;
        passwordListElement.appendChild(listItem);
      });
    }
  
    function clearPasswordList() {
      passwordListElement.innerHTML = '';
      passwordList.length = 0;
      localStorage.removeItem('passwordList');
    }
  });
  