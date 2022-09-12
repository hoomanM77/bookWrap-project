/////////////// variables
const navItems=_qAll('.nav-item')
const subMenu=_qAll('.sub-menu-li')
const subMenuMobile=$('.sub-menu-li')
const changeThemeBtn=_q('.change-theme')
const circleBtn=_q('.bi-circle-fill')
const sampleForm=_id('sample-form')
const sliderContent=_q('.slider-items')
const addToCardButton=_qAll('.add-to-card')
const userRegisterModal=_q('.user-register-modal')
const windowShadow=_q('.window-shadow')
const closeModal=_q('.close-modal')
let emojiArray=['bi-emoji-dizzy-fill','bi-emoji-frown-fill','bi-emoji-expressionless-fill','bi-emoji-smile-fill','bi-emoji-heart-eyes-fill']
let commentProfileArray=[
    'images/customer/profile1.jpg',
    'images/customer/profile2.jpg',
    'images/customer/profile3.jpg',
    'images/customer/profile4.jpg',
    'images/customer/profile5.jpg',
    'images/customer/profile6.jpg',
]
const cardElements=_qAll('.card')
let isDark=false;
////////////// Catching Elements with functions////////////////////
function _id(tag) {
    return  document.getElementById(tag)
}
function _class(tag) {
    return document.getElementsByClassName(tag)
}
function _q(tag) {
    return document.querySelector(tag)
}
function _qAll(tag) {
    return document.querySelectorAll(tag)
}
//////////////////////////////////////////////

if(window.innerWidth>991){
    navItems.forEach(function (item) {
        item.addEventListener('mouseenter',function () {
            item.children[1].classList.remove('hide')
            item.children[1].classList.add('show')
        })
    })
    navItems.forEach(function (item) {
        item.addEventListener('mouseleave',function () {
            setTimeout(function () {
                item.children[1].classList.remove('show')
                item.children[1].classList.add('hide')
            },100)

        })
    })

    subMenu.forEach(function (item) {
        item.addEventListener('mouseenter',function () {
            item.children[1].classList.remove('hide')
            item.children[1].classList.add('show')
        })
    })
    subMenu.forEach(function (item) {
        item.addEventListener('mouseleave',function () {
            setTimeout(function () {
                item.children[1].classList.remove('show')
                item.children[1].classList.add('hide')
            },100)


        })
    })
}else{
    subMenuMobile.click(function () {
        $(this).find('.dropdown-menu').slideToggle(200)
    })

}
//////////////////////// wow js
new WOW().init()
//////////////////////// change theme
function changeThemeHandler() {
    if(!isDark){
        circleBtn.style.left='35px'
        localStorage.setItem('theme','dark')
        document.body.classList.add('theme-dark')
        isDark=true
    }else{
        circleBtn.style.left='3px'
        localStorage.setItem('theme','light')
        document.body.classList.remove('theme-dark')
        isDark=false
    }
}
function extractThemeInfo() {
    let themeInfo=localStorage.getItem('theme')
    if(themeInfo!==null){
        if(themeInfo==='dark'){
            circleBtn.style.left='35px'
            document.body.classList.add('theme-dark')
        }else{
            circleBtn.style.left='3px'
            document.body.classList.remove('theme-dark')
        }
    }

}
changeThemeBtn.addEventListener('click',changeThemeHandler)
window.addEventListener('load',extractThemeInfo)
/////////////////////// type it //////
{
    const typeAnimation=new TypeIt("#sample-title",{
        afterComplete: () => {
            typeAnimation.reset()
                .go()
        },
    })
        .delete()
        .type("designers.")
        .pause(1500)
        .delete()
        .type("journalists.")
        .pause(1500)
        .delete()
        .type("publishers.")
        .pause(1500)
        .delete()
        .type("founders.")
        .pause(1500)
        .go()

}
/////////////////////// sample form validation
let nameInput=_id('nameInput')
let emailInput=_id('emailInput')
let passwordInput=_id('passwordInput')
let checkArray=[];
class Form {
    constructor(nameValue,emailValue,passwordValue) {
        this.name={value:nameValue,id:0}
        this.email={value:emailValue,id:1}
        this.password={value:passwordValue,id:2}
    }
}
class Validation {
    static check(e){
        let userValue=new Form(nameInput.value,emailInput.value,passwordInput.value)
        let validation=new Validation();


        validation.nameValidation(userValue.name.value,userValue.name.id)

        validation.emailValidation(userValue.email.value,userValue.email.id)

        validation.passwordValidation(userValue.password.value,userValue.password.id)

        let isAllValid=validation.runFormAgain()

        if(isAllValid){
            validation.clearInputValue()
            return true
        }else{
            e.preventDefault()
        }

    }
    nameValidation(nameValue,id){
        if(nameValue===''){
            nameInput.parentElement.classList.add('active')
            Validation.errorMessage('Enter a Valid Name!',id)
            checkArray[id]=false

        }else{
            nameInput.parentElement.classList.remove('active')
            checkArray[id]=true
        }
    }
    emailValidation(emailValue,id){

        if(!emailValue.includes('@') || emailValue==='' ){
            emailInput.parentElement.classList.add('active')
            Validation.errorMessage('Invalid email address!',id)
            checkArray[id]=false
        }else{
            emailInput.parentElement.classList.remove('active')
            checkArray[id]=true
        }

    }
    passwordValidation(passwordValue,id){
       if(passwordValue.length<9){
           passwordInput.parentElement.classList.add('active')
           Validation.errorMessage('At least 8 characters!',id)
           checkArray[id]=false

       }else{
           passwordInput.parentElement.classList.remove('active')
           checkArray[id]=true
       }

    }
    runFormAgain(){
        let condition=checkArray.every(function (item) {
            return item===true
        })
        return !!condition;
    }
    clearInputValue(){
        nameInput.value=''
        emailInput.value=''
        passwordInput.value=''
    }
    static errorMessage(msg,id){
        if(id===0){
            nameInput.parentElement.children[4].innerHTML=`${msg}`
        }else if(id===1){
            emailInput.parentElement.children[4].innerHTML=`${msg}`
        }else{
            passwordInput.parentElement.children[4].innerHTML=`${msg}`
        }

    }
}
sampleForm.addEventListener('submit',Validation.check)
////////////////////////// slider ////////////////////////
$('.slider-items').slick({
    prevArrow:$('.bi-chevron-left'),
    nextArrow:$('.bi-chevron-right'),
    asNavFor: '.image-cards',
    dots: true,
});

$('.image-cards').slick({
    asNavFor: '.slider-items',
    fade: true
});
$('.box-container').slick({
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 2,
    responsive: [
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                arrows: false
            }
        },
        {
            breakpoint: 500,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false
            }
        },
        {
            breakpoint: 991,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                arrows: true
            }
        }

    ]
})
$('.quote-container').slick({
    prevArrow:$('#subscription .fa-chevron-left'),
    nextArrow:$('#subscription .fa-chevron-right'),
    responsive: [
        {
            breakpoint: 500,
            settings: {
                arrows: false
            }
        }
    ]
})


sliderContent.addEventListener('mousedown',()=>{
    sliderContent.style.cursor='grabbing'
})
sliderContent.addEventListener('mouseenter',()=>{
    sliderContent.style.cursor='grab'
})

sliderContent.addEventListener('mouseup',()=>{
    sliderContent.style.cursor='grab'
})
/////////////////////// comments //////////////////////
const starChangeAction = (event) => {
    [...event.target.parentElement.children].forEach((star,index)=>{
        star.addEventListener('click',()=>{
            fillIconHandler(event,index)
            event.target.parentElement.nextElementSibling.className=`ms-4 fs-4 bi ${emojiArray[index]}`
        })
    })

}
const fillIconHandler=(event,i)=>{

    [...event.target.parentElement.children].forEach((star,index)=>{
        if(star.classList.contains('bi-star-fill')){
            star.classList.replace('bi-star-fill','bi-star')
        }
        if(i > index-1){
            star.classList.replace('bi-star','bi-star-fill')
            return false
        }
    })
}
///////////////////////////// catch comment from api /////////////////////////////////
class Data {
    constructor() {
        this.length=cardElements.length
        this.url='https://jsonplaceholder.typicode.com/comments'
    }
    async getData(){
        let response=await fetch(this.url)
        if(response.ok){
            return response.json()
        }else{
            throw Error(`${response.status}`)
        }
    }
}
class UI {
    constructor(card) {
        this.img=card.children[0].children[0].children[0].children[0]
        this.name=card.children[0].children[0].children[1].children[0]
        this.email=card.children[0].children[0].children[1].children[1]
        this.comment=card.children[0].children[1].children[0]
    }
    showData(comments,index){
        let {name:userName,email:userEmail,body:userComment}=comments[index]
        this.img.setAttribute('src',commentProfileArray[index])
        this.name.innerHTML=userName
        this.email.innerHTML=userEmail
        this.comment.innerHTML=userComment
    }
}

window.addEventListener('load',()=>{
    let data=new Data()
    data.getData()
        .then(commentArray=>{
        cardElements.forEach((card,index)=>{
            let ui=new UI(card)
            ui.showData(commentArray,index)
        })
    })
        .catch(err => console.log(err)
    )

})
/////////////////////////// open modal /////////////////////////
addToCardButton.forEach(btn=>{
    btn.addEventListener('click',()=>{
        if(!userRegisterModal.classList.contains('active')){
            windowShadow.classList.add('active')
            userRegisterModal.classList.add('active')
        }
    })
})
closeModal.addEventListener('click',()=>{
    windowShadow.classList.remove('active')
    userRegisterModal.classList.remove('active')
})
////////////// collapse
$('.faq-header').click(function () {
    if(!$(this).hasClass('active')){
        $(this).addClass('active')
        $(this).next().slideDown(200)
        $(this).find('.bi').css('transform', 'rotate(43deg)')

    }else{
        $(this).removeClass('active')
        $(this).next().slideUp(200)
        $(this).find('.bi').css('transform', 'rotate(0)')
    }
})
//////////////// count
window.addEventListener('scroll',scrollHandler)
function scrollHandler() {
    if(((window.scrollY)+(window.innerHeight)) > document.querySelector('.statistic_card').offsetTop){
        $('.count').each(function () {
            $(this).prop('Counter', 0).animate({
                Counter: $(this).text()
            }, {
                duration: 2000,
                easing: 'swing',
                step: function (now) {
                    $(this).text(Math.ceil(now));
                }
            });
        });
        window.removeEventListener('scroll',scrollHandler)
    }
}




