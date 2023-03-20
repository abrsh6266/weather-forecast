const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'loading...'
    messageTwo.textContent = ''
    messageThree.textContent = ''
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error)
        {
            messageOne.textContent = data.error+'!'
        }
        else
        {
            messageThree.textContent = '   Location : '+data.location
            messageOne.textContent = ' The temprature is '+data.temprature+'.'
            messageTwo.textContent = ' windspeed :'+data.windspeed
        }
    })
})
})