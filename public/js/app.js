// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    // messageTwo.textContent = 'loading message...'

    fetch(`/weather?address=${location}`)
    .then((response, error) => {
    response.json()
    .then((data) => {
        if(data.error){
            messageTwo.textContent = ''
            messageOne.textContent  = data.error
            // console.log(data.error)
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
            // console.log(data.location)
            // console.log(data.forecast)
        }
        
    })
})

})