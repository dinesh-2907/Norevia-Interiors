var form = document.getElementById('signupForm');
var fullname = document.getElementById('fullname');
var email = document.getElementById('email');
var password = document.getElementById('password');
var confirmPassword = document.getElementById('confirmPassword');
var nameError = document.getElementById('nameError');
var nameSuccess = document.getElementById('nameSuccess');
var emailError = document.getElementById('emailError');
var emailSuccess = document.getElementById('emailSuccess');
var passwordError = document.getElementById('passwordError');
var passwordSuccess = document.getElementById('passwordSuccess');
var confirmError = document.getElementById('confirmError');
var confirmSuccess = document.getElementById('confirmSuccess');
var message = document.getElementById('message');
var strengthBar = document.getElementById('strengthBar');
var strengthFill = document.getElementById('strengthFill');
var strengthText = document.getElementById('strengthText');

function validateEmail(emailValue) {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(emailValue);
}

function checkPasswordStrength(pass) {
    var strength = 0;
    
    if (pass.length >= 6) strength++;
    if (pass.length >= 8) strength++;
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) strength++;
    if (/\d/.test(pass)) strength++;
    if (/[^a-zA-Z0-9]/.test(pass)) strength++;
    
    return strength;
}

fullname.addEventListener('input', function() {
    if (this.value.length >= 2) {
        nameError.classList.add('hidden');
        nameSuccess.classList.remove('hidden');
    } else if (this.value.length > 0) {
        nameError.classList.remove('hidden');
        nameSuccess.classList.add('hidden');
    } else {
        nameError.classList.add('hidden');
        nameSuccess.classList.add('hidden');
    }
});

email.addEventListener('input', function() {
    if (this.value.length > 0) {
        if (validateEmail(this.value)) {
            emailError.classList.add('hidden');
            emailSuccess.classList.remove('hidden');
        } else {
            emailError.classList.remove('hidden');
            emailSuccess.classList.add('hidden');
        }
    } else {
        emailError.classList.add('hidden');
        emailSuccess.classList.add('hidden');
    }
});


password.addEventListener('input', function() {
    var pass = this.value;
    
    if (pass.length > 0) {
        strengthBar.classList.remove('hidden');
        strengthText.classList.remove('hidden');
        
        var strength = checkPasswordStrength(pass);
        var width = 0;
        var color = '';
        var text = '';
        
        if (strength <= 1) {
            width = 20;
            color = 'bg-red-500';
            text = '🔴 Weak - Add more characters, numbers, symbols';
        } else if (strength <= 3) {
            width = 50;
            color = 'bg-yellow-500';
            text = '🟡 Medium - Add numbers and symbols for strong password';
        } else {
            width = 100;
            color = 'bg-green-500';
            text = '🟢 Strong - Great password!';
        }
        
        strengthFill.className = 'h-full transition-all duration-300 ' + color;
        strengthFill.style.width = width + '%';
        strengthText.textContent = text;
        
        if (strength <= 1) {
            strengthText.className = 'text-xs mt-1 text-red-500';
        } else if (strength <= 3) {
            strengthText.className = 'text-xs mt-1 text-yellow-500';
        } else {
            strengthText.className = 'text-xs mt-1 text-green-500';
        }
        
        
        if (pass.length >= 6) {
            passwordError.classList.add('hidden');
            passwordSuccess.classList.remove('hidden');
        } else {
            passwordError.classList.remove('hidden');
            passwordSuccess.classList.add('hidden');
        }
    } else {
        strengthBar.classList.add('hidden');
        strengthText.classList.add('hidden');
        passwordError.classList.add('hidden');
        passwordSuccess.classList.add('hidden');
    }
    
    
    checkConfirmPassword();
});

confirmPassword.addEventListener('input', function() {
    checkConfirmPassword();
});

function checkConfirmPassword() {
    if (confirmPassword.value.length > 0) {
        if (password.value === confirmPassword.value) {
            confirmError.classList.add('hidden');
            confirmSuccess.classList.remove('hidden');
        } else {
            confirmError.classList.remove('hidden');
            confirmSuccess.classList.add('hidden');
        }
    } else {
        confirmError.classList.add('hidden');
        confirmSuccess.classList.add('hidden');
    }
}


form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    var isValid = true;

    
    if (fullname.value.length < 2) {
        nameError.classList.remove('hidden');
        nameSuccess.classList.add('hidden');
        isValid = false;
    }

    
    if (!validateEmail(email.value)) {
        emailError.classList.remove('hidden');
        emailSuccess.classList.add('hidden');
        isValid = false;
    }

    
    if (password.value.length < 6) {
        passwordError.classList.remove('hidden');
        passwordSuccess.classList.add('hidden');
        isValid = false;
    }

    
    if (password.value !== confirmPassword.value || confirmPassword.value === '') {
        confirmError.classList.remove('hidden');
        confirmSuccess.classList.add('hidden');
        isValid = false;
    }

    
    if (isValid) {
        message.classList.remove('hidden');
        message.className = 'mb-4 p-3 rounded-lg text-sm bg-green-100 text-green-700';
        message.textContent = '✅ Account created! 🎉';
        
        setTimeout(function() {
            form.reset();
            message.classList.add('hidden');
            strengthBar.classList.add('hidden');
            strengthText.classList.add('hidden');
            nameSuccess.classList.add('hidden');
            emailSuccess.classList.add('hidden');
            passwordSuccess.classList.add('hidden');
            confirmSuccess.classList.add('hidden');
        }, 3000);
    } else {
        message.classList.remove('hidden');
        message.className = 'mb-4 p-3 rounded-lg text-sm bg-red-100 text-red-700';
        message.textContent = '❌ Please fix errors';
    }
});