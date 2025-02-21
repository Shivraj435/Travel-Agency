let button=document.getElementById("button");
let container=document.querySelector(".container");


button.addEventListener('click',readData) ;
async function readData(){
    try{
        const response= await fetch("http://localhost:8080/packages");
        if(response.ok){
            console.log(response);    
        }
        const data= await response.json();
        data.forEach(packageData => {
            container.innerHTML += displayData(packageData);
        });
     
    }catch(error){
console.log(error);
    }
}
function displayData(data){
    return `
    <div class="card">
        <div class="card-img-container">
            <img src="${data.image}" class="card-img-top" alt="${data.location}">
        </div>
        <div class="card-body">
            <h5><i class="fas fa-map-marker-alt"></i> ${data.location}</h5>
            <p>${data.description}</p>
           
            <p style="font-weight: 600; font-size: 1rem; color:grey">Rs:${data.price}/Person</p>
            <a href="/HTML/Book.html" class="btn btn-primary" 
               style="background-color: #007bff; border: none; border-radius: 5px; padding: 10px 20px; font-size: 1rem;">
               Book Now
            </a>
        </div>
    </div>`;
}