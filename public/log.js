// QUERYING THE SELECTORS
const form = document.querySelector('form');
const usernameError = document.querySelector('.username-error');
const mobileError = document.querySelector('.phone-error');
const passError = document.querySelector('.password-error.error');

// EVENT LISTENER
form.addEventListener('submit', async(e)=> {
    e.preventDefault();

    // const name = mix.value;
    const userName = form.userName.value;
    const password = form.password.value;

    // CLEARS ERROR MESSAGE
    usernameError.textContent = '';
    passError.textContent = '';

    try {
        const res = await fetch('/api/users/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({userName, password})
        })
        const data = await res.json()
        console.log(data.errors)
        // SUCCESSFUL VALIDATION & SIGNUP
        if(data.User) {
            location.assign('/api/books')
        }
        // ERROR HANDLING MESSAGES
        if(data.errors.includes('Incorrect Username')) {
            usernameError.textContent = data.errors;
        } else if(data.errors.includes('Incorrect Password')) {
            passError.textContent = data.errors;
        }

    } catch (error) {
        console.log(error)
    }
    
});