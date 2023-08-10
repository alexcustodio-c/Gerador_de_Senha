const inputEl = document.querySelector("#password")
const upercaseCheckEl = document.querySelector("#upercase-check")
const numbersCheckEl = document.querySelector("#numbers-check")
const symbolCheckEl = document.querySelector("#symbol-check")
const securityIndicatorBarEl = document.querySelector("#security-indicator-bar")

let passwordLength = 16

function generatePassword() {
    let chars = "abcdefghjklmnpqrstuvwxyz"

    const upperCaseChars = "ABCDEFGHJKMNPQRSTUWVXZ"
    const numberChars = "123456789"
    const symbolChars = "?!@#$&()[]"

    if (upercaseCheckEl.checked) {
        chars += upperCaseChars
    }

    if (numbersCheckEl.checked) {
        chars += numberChars
    }

    if (symbolCheckEl.checked) {
        chars += symbolChars
    }

    let password = ""

    for (let i = 0; i < passwordLength; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length)
        password += chars.substring(randomNumber, randomNumber + 1)
    }

    inputEl.value = password
    calculeteQuality()
    calculeteFontSize()
}

// calculo da força da senha
function calculeteQuality() {
    const percent = Math.round(
        (passwordLength / 64) * 100 * 0.25 + (upercaseCheckEl.checked ? 15 : 0) + (numbersCheckEl.checked ? 25 : 0) + (symbolCheckEl.checked ? 35 : 0))
    console.log(percent)
    securityIndicatorBarEl.style.width = `${percent}%`

    if (percent > 69) {
        securityIndicatorBarEl.classList.remove('critical')
        securityIndicatorBarEl.classList.remove('warning')
        securityIndicatorBarEl.classList.add('safe')
    } else if (percent > 50) {
        securityIndicatorBarEl.classList.remove('critical')
        securityIndicatorBarEl.classList.add('warning')
        securityIndicatorBarEl.classList.remove('safe')
    } else {
        securityIndicatorBarEl.classList.add('critical')
        securityIndicatorBarEl.classList.remove('warning')
        securityIndicatorBarEl.classList.remove('safe')
    }

    if (percent >= 100) {
        securityIndicatorBarEl.classList.add("completed")
    } else {
        securityIndicatorBarEl.classList.add("completed")
    }
}

//reduzindo fonte de acordo com o tamanho da senha
function calculeteFontSize() {
    if (passwordLength > 45) {
        inputEl.classList.remove("font-sm")
        inputEl.classList.remove("font-xs")
        inputEl.classList.add("font-xxs")
    } else if (passwordLength > 32) {
        inputEl.classList.remove("font-sm")
        inputEl.classList.add("font-xs")
        inputEl.classList.remove("font-xxs") 
    } else if (passwordLength > 22) {
        inputEl.classList.add("font-sm")
        inputEl.classList.remove("font-xs")
        inputEl.classList.remove("font-xxs")
    } else {
        inputEl.classList.remove("font-sm")
        inputEl.classList.remove("font-xs")
        inputEl.classList.remove("font-xxs")
    }
}

function copy() {
    navigator.clipboard.writeText(inputEl.value)
}
// barra de tamanho da senha
const passwordLengthEl = document.querySelector("#password-length")
passwordLengthEl.addEventListener("input", function () {
    passwordLength = passwordLengthEl.value
    document.querySelector("#password-length-text").innerText = passwordLength
    generatePassword()
})

upercaseCheckEl.addEventListener("click", generatePassword)
numbersCheckEl.addEventListener("click", generatePassword)
symbolCheckEl.addEventListener("click", generatePassword)

document.querySelector("#copy-1").addEventListener("click", copy)
document.querySelector("#copy-2").addEventListener("click", copy)
document.querySelector("renew")
addEventListener('click', generatePassword)

generatePassword()
