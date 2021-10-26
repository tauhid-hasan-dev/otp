const containerContent = document.getElementsByClassName('container-content')[0];
console.log(containerContent);

// VARIABLE FOT DIVS 

const mobileVerify = document.querySelector('.mobile-verify');
const otpContainer = document.querySelector('.otp-container');
const boxVerify = document.querySelector('.box-verify');
const timerBox = document.querySelector('.timer-box');


// VARIABLE FOR BUTTONS

const buttonOne = document.querySelector('.button-1');
const buttonResend = document.querySelector('.btn-resend');
const buttonTwo = document.querySelector('.button-2');
const buttonBack = document.querySelector('.btn-back');
const newDirectory = document.querySelector('.new-directory');


// VARIABLE FOR INPUTS
const phoneNumber = document.getElementById("newID");
const otpInput = document.querySelectorAll('.otp-input .input');

// VARIABLE FOR EXPIRE 
const expireEle = document.querySelector('.expire');

//VARIABLES

let countdowntimer = 3;
let OTP;
let countdown;
let yourInputNumber = 0;

buttonOne.addEventListener('click', () => {
    resetStateOTP();
    // PHONE NUMBER SHOULD BE 10 DIGIT
    const phoneNumberExits = phoneNumber.value.match(/\(?(?<areacode>\d{3})\)?[ -]?(\d{3})[ -]?(\d{4})/g);
    // HANDLE PHONE NUMBER
    if (phoneNumberExits) {
        // HANDLE ANIMATE 
        mobileVerify.classList.add('go-right');
        //SET PHONE NUMBER TO DOM 
        document.querySelector('.phone').textContent = formatPhoneNumber(phoneNumberExits);
        //HANDLE OTP
        OTP = randomOTP();
        handleCountDown();
        alert(`Kodunuz: ${OTP}`);
        console.log(OTP);
    } else {
        alert('Numaranız hatalı!! tekrar giriniz');
    }
});

//BACK TO SET NUMBER SCREEN

buttonBack.addEventListener('click', () => {
    mobileVerify.classList.remove('go-right');
});

buttonTwo.addEventListener('click', () => {
    clearInterval(countdown);
});

//HANDLE OTP INPUT

otpInput.forEach((input) => {
    input.addEventListener('keyup', (e) => {
            const element = e.target;
            // console.log(element);
            if (element.value.match(/\d/)) {
                yourInputNumber += element.value
                if (element.nextElementSibling) {
                    element.nextElementSibling.focus();
                }
            } else {
                alert('Lütfen Her Boş Alanda Numara Giriniz')
            }

        }

    )
});

//HANDLE TRY AGAIN BUTTON

containerContent.addEventListener('click', (e) => {
    const element = e.target;
    if (element.classList.contains('btn-return')) {
        otpContainer.classList.add('go-back-otp');
        boxVerify.classList.remove('evaluate');
        timerBox.classList.add('timer-visible');
        activeStateOTP();
    }
});

//HANDLE VERIFY BUTTON 

buttonTwo.addEventListener('click', () => {
    const icon = boxVerify.querySelector('.fas')

    if (OTP === yourInputNumber) {

        boxVerify.querySelector('p').innerHTML = `<span class= 'text-success'>Hesabınız Başarıyla Doğrulandı</span> <br/> <button class= 'btn-directory'>
        Yölendirin </button>`

    } else {

        boxVerify.querySelector('p').innerHTML = `<span class= 'text-danger'>Kodunuz Hatalı!</span> <br/> <span class= 'text-muted'> Lütfen </span> <span class= 'text-primary'>
        Tekrar Giriniz</span>`
    }
    boxVerify.classList.add('evaluate');
});


//HANDLE COUNTDOWN 

function handleCountDown() {
    let timeleft = 3;
    countdown = setInterval(function() {
        timeleft--;
        document.getElementById("countdowntimer").textContent = timeleft;
        console.log(timeleft)
        if (timeleft <= 0) {
            buttonTwo.disabled = true;
            clearInterval(countdown);
            boxVerify.classList.add('evaluate');
            timerBox.classList.add('timer-invisible');
        }
    }, 1000);
}

//PRODUCING 4 DIGIT OTP 

function randomOTP() {
    let random = '';
    Array.from({ length: 6 }, () => {
        random += Math.floor(Math.random() * 10).toString();
    });
    return random;
}

function resetStateOTP() {
    clearInterval(countdown)
    countdowntimer = 10;
    OTP = null;
    yourInputNumber = '';

    otpInput.forEach(input => {
        input.value = '';
    })
}

function formatPhoneNumber(number) {
    return number.toString().slice(0, 7) + '***';
}

function activeStateOTP() {
    resetStateOTP()
    OTP = randomOTP();
    handleCountDown();
    alert(`Your Code: ${OTP}`);
    console.log(OTP);
}