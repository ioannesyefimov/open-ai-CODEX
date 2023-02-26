
const handleRegister = async(e) =>{
  e.preventDefault()
  const form = document.querySelector('form')
  
    const data= new FormData(form);

   const response = await fetch('http://localhost:5000/api/v1/register', {
    method:'POST',
    headers:{
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        name: data.get('username'),
        password: data.get('password'),
        email: data.get('email'),
    })
   })

   if(response.ok){
    const data = await response.json()
    localStorage.setItem('user', JSON.stringify(data[1]))
    console.log(data)
    window.location.replace('/')
  } else {
    const err = await response.text()


    alert(err)
  }


}

setInterval(()=>{
  const submitBtn = document.getElementById('register')
  submitBtn.addEventListener('click', handleRegister)

}, 3000)