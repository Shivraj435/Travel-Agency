let signInbtn = document.querySelector("#signInButton");
let signInBody = document.querySelector("#SignInModal");

let signUpbtn = document.querySelector("#signUpButton");
let signUpBody = document.querySelector("#SignUpModal");

let closeSignIn = document.querySelector("#SignInModal .fa-xmark");
let closeSignUp = document.querySelector("#SignUpModal .fa-xmark");

let form=document.getElementById('searchForm');
let signOutButton =document.querySelector("#signOut");


// Add event listener to sign in button
signInbtn.addEventListener('click', () => {
    signInBody.classList.add('show');
    document.body.classList.add('modal-open');
});
closeSignIn.addEventListener('click',function(){
signInBody.classList.remove('show');
document.body.classList.remove('modal-open');
});


// Add event listener to sign up button
signUpbtn.addEventListener('click', () => {
   
    signUpBody.classList.add('show');
    document.body.classList.add('modal-open');
});
closeSignUp.addEventListener('click',function(){
signUpBody.classList.remove('show');
document.body.classList.remove('modal-open');
});

async function checkAuth(){
    try{
        const response= await fetch('http://localhost:8080/loginStatus');
        const data= await response.json();
         if(response.ok){
             console.log(response);
           
     
     
         }
         console.log(data);
         if (data.isLoggedIn) {
            console.log("isloggedIn:"+data.isLoggedIn)
            signInbtn.style.display = 'none';
            signUpbtn.style.display = 'none';
            signOutButton.style.display = 'block';
        } else {
            console.log("isloggedIn:"+data.isLoggedIn)
            signInbtn.style.display = 'block';
            signUpbtn.style.display = 'block';
            signOutButton.style.display = 'none';
        }
    }

    catch(err) {
        console.error('Error fetching login status:', err)}
}


document.addEventListener("DOMContentLoaded", checkAuth);


//validation in form signIn form
function signInValidateForm() {
    
   
    const fullName = document.getElementById("fullName").value.trim();
  
    const password = document.getElementById("password").value;
  
  
   
    const nameError = document.getElementById("name-error1");
  
    const passwordError = document.getElementById("password-error1");
    

    let isValid = true;

    if (fullName.length<3) {
        nameError.textContent = "Full name is required.";
       isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(fullName)) {
       nameError.textContent = "Full name must only contain letters and spaces.";
      isValid = false;
} else {
      nameError.textContent = "";
   }

    // Validate password
    if (password.length < 8) {
        passwordError.textContent = "Password must be at least 8 characters long.";
        isValid = false;
    } else {
        passwordError.textContent = "";
    }

   

    return isValid; 
}

//validation in signUp form
function signUpValidateForm() {
    
    const fullName = document.getElementById("username").value.trim();
    const email = document.getElementById("SignUpemail").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("SignUppassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

  
    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const phoneError = document.getElementById("phone-error");
    const passwordError = document.getElementById("password-error");
    const confirmPasswordError = document.getElementById("confirmPassword-error");

    let isValid = true;

    // Validate full name
      if (fullName.length<3) {
          nameError.textContent = "Full name is required.";
         isValid = false;
      } else if (!/^[a-zA-Z\s]+$/.test(fullName)) {
         nameError.textContent = "Full name must only contain letters and spaces.";
        isValid = false;
 } else {
        nameError.textContent = "";
     }

    // Validate email
    
     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        emailError.textContent = "Invalid email format.";
        isValid = false;
    } else {
        emailError.textContent = "";
    }

    // Validate phone number
   if (!/^\d{10}$/.test(phone)) {
        phoneError.textContent = "Phone number must be 10 digits.";
        isValid = false;
    } else {
        phoneError.textContent = "";
    }

    // Validate password
    if (password.length < 8) {
        passwordError.textContent = "Password must be at least 8 characters long.";
        isValid = false;
    } else {
        passwordError.textContent = "";
    }

    // Validate confirm password
    if (confirmPassword !== password) {
        confirmPasswordError.textContent = "Passwords do not match.";
        isValid = false;
    } else {
        confirmPasswordError.textContent = "";
    }

    return isValid; 
}

//Add event listner on sign Out
signOutButton.addEventListener('click', async ()=>{
    try{
        const response= await fetch("http://localhost:8080/signOut");
        if(response.ok){
            console.log(response);   
            console.log("sign Out successfully"); 
        }
     
    }catch(error){
console.log(error);
    }

});

