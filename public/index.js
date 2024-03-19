// QUERYING THE SELECTORS
const form = document.querySelector('form');
const firstError = document.querySelector('.firstname-error');
const lastError = document.querySelector('.lastname-error');
const emailError = document.querySelector('.email-error');
const usernameError = document.querySelector('.username-error');
const mobileError = document.querySelector('.phone-error');
const passError = document.querySelector('.password-error.error');

// EVENT LISTENER
form.addEventListener('submit', async(e)=> {
    e.preventDefault();

    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const email = form.email.value;
    const userName = form.userName.value;
    const mobileNo = form.mobileNo.value;
    const password = form.password.value;

    // CLEARS ERROR MESSAGE
    firstError.textContent = '';
    lastError.textContent = '';
    emailError.textContent = '';
    usernameError.textContent = '';
    mobileError.textContent = '';
    passError.textContent = '';

    try {
        const res = await fetch('/api/users/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({firstName, lastName, email, userName, mobileNo, password})
        })
        const data = await res.json()
        // SUCCESSFUL VALIDATION & SIGNUP
        if(data.Users) {
            location.assign('/api/books')
        }
        // ERROR HANDLING MESSAGES
        if(data.errors.includes('First Name')) {
            firstError.textContent = data.errors;
        } else if(data.errors.includes('Last Name')) {
            lastError.textContent = data.errors;
        } else if(data.errors.includes('Email Address') || data.errors.includes('Already')) {
            emailError.textContent = data.errors;
        } else if(data.errors.includes('Username') || data.errors.includes('Already Exists')) {
            usernameError.textContent = data.errors;
        } else if(data.errors.includes('Mobile')) {
            mobileError.textContent = data.errors
        } else if(data.errors.includes('Weak Password')) {
            passError.textContent = data.errors
        } 

    } catch (error) {
        console.log(error)
    }
    
});