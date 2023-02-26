


const handleSignIn = async(e) =>{
  e.preventDefault()
  const form = document.querySelector('#login-form')

    const data= new FormData(form);
    console.log(data)
    const password = data.get('password')
    const email = data.get('email')

    if(!password||!email) {
        alert('Please fill in form')
        return
    }
   const response = await fetch('https://c0dinex.onrender.com/api/v1/signin', {
    method:'POST',
    headers:{
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        password: data.get('password'),
        email: data.get('email'),
    })
   })

   if(response.ok){
    const data = await response.json()
    console.log(data.data)
    localStorage.setItem('user', JSON.stringify(data.data))
    window.location.replace('/')
  } else {
    const err = await response.text()


    alert(err)
  }


}

let submitInterval = setInterval(()=>{
  const submitBtn = document.getElementById('signIn')
  if(submitBtn){
    submitBtn.addEventListener('click', handleSignIn)

  }
}, 3000)

setTimeout(() => {
  clearInterval(submitInterval)
}, 20000);