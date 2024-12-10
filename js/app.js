/* ##### TYPED TEXT ##### */

let typed = new Typed('#typed', {
    stringsElement: '#typed-strings',
    typeSpeed: 80,
    startDelay: 500,
    backSpeed: 50,
    loop: true	
});

/* ##### BURGER ##### */

$('.nav-burger').click(function(event) {
	$('.nav-burger,.nav-list').toggleClass('-active');
	$('.nav-burger').toggleClass('-lock')
});

$('.nav-list').click(function(event) {
    $('.nav-burger,.nav-list').removeClass('-active');
    $('body').removeClass('-lock');
});

/* ##### SCROLL LINK ##### */

$(document).on('click', 'a[href^="#"]', function (event) {
	event.preventDefault();

	var target = $($.attr(this, 'href'));
	var scrollTo = target.offset().top;

	if ($(this).hasClass('nav-link') && ($(this).attr('href') === "#services-block" || $(this).attr('href') === "#job")) {
	var targetPosition = target.offset().top;
	var windowHeight = $(window).height();
	var headerHeight = $('header').outerHeight();

	scrollTo = targetPosition - headerHeight;
	} else {
	scrollTo = scrollTo - ($(window).height() / 2) + (target.outerHeight() / 2);
	}

	$('html, body').animate({
	scrollTop: scrollTo
	}, 500);
});

/* ##### SCROLL GSAP ##### */

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

if (ScrollTrigger.isTouch !== 1) {
  
  	ScrollSmoother.create({
		wrapper: '.floating-wrapper',
		content: '.floating-content',
		smooth: 1.5,
		effects: true
  	})
  
  	gsap.fromTo('.preview', { opacity: 1 }, {
		opacity: 0,
		scrollTrigger: {
			trigger: '.preview',
			start: 'center',
			end: 'bottom',
			scrub: true
		}
	})

  	let itemsL = gsap.utils.toArray('.services-left .services-item')

	itemsL.forEach(item => {
		gsap.fromTo(item, { opacity: 0, x: -50 }, {
			opacity: 1, x: 0,
			scrollTrigger: {
				trigger: item,
				start: '-850',
				end: '-100',
				scrub: true
			}
		})
	})

  	let itemsR = gsap.utils.toArray('.services-right .services-item')

	itemsR.forEach(item => {
		gsap.fromTo(item, { opacity: 0, x: 50 }, {
			opacity: 1, x: 0,
			scrollTrigger: {
				trigger: item,
				start: '-750',
				end: 'top',
				scrub: true
			}
		})
	})

	gsap.fromTo('.connection-block', { opacity: 0 }, {
		opacity: 1,
		scrollTrigger: {
			trigger: '.connection-block',
			start: '-850',
			end: '-300',
			scrub: true
		}
	})

	gsap.fromTo('.job-wrapper', { opacity: 0 }, {
		opacity: 1,
		scrollTrigger: {
			trigger: '.job-wrapper',
			start: '-850',
			end: '-300',
			scrub: true
		}
	})
}

/* ##### CONNECTION ##### */

const forms = document.getElementById('forms');
forms.addEventListener('submit', formsSend);

async function formsSend(e) {
	e.preventDefault();
	let error = formsValidate(forms);
	let formsData = new FormData(forms);

	if (error === 0) {
		forms.classList.add('-sending');
		let response = await fetch('/php/sending.php', {
			method: 'Post',
			body: formsData
		});
		if (response.ok) {
			let result = await response.json();
			alert('Сообщение отправлено. Спасибо за заявку');
			forms.reset();
			forms.classList.remove('-sending');
		} else {
			alert('Ошибка отправки со стороны сервера');
			forms.classList.remove('-sending');
		}
	} else {
		alert('Заполните обязательные поля ввода');
	}
}

function formsValidate(forms) {
	let error = 0;
	let formsReq = document.querySelectorAll('.-req');

	for (let index = 0; index < formsReq.length; index++) {
		const input = formsReq[index];
		formsRemoveError(input);

		if (input.classList.contains('-email')) {
			if (emailTest(input)) {
				formsAddError(input);
				error++;
			}
		} else {
			if (input.value === '') {
				formsAddError(input);
				error++;
			}
		}
	}
	return error
}

function formsAddError(input) {
	input.parentElement.classList.add('-error');
	input.classList.add('-error');
}

function formsRemoveError(input) {
	input.parentElement.classList.remove('-error');
	input.classList.remove('-error');
}

function emailTest(input) {
	return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}

/* ##### AUTO EXPAND FORM ##### */

const textarea = document.getElementById('autoExpand');

textarea.addEventListener('input', function () {
    const initialHeight = this.style.height;
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
});

/* ##### ANTI SPAM ##### */

document.getElementById('forms').addEventListener('submit', function(event) {
	var spamProtectionValue = document.querySelector('input[name="spamProtection"]').value;

    if (spamProtectionValue === 'protected') {
    } else {
      event.preventDefault();
      alert('Spam protection activated! Please fill out the form correctly.');
    }
});

document.querySelector('input[name="spamProtection"]').value = 'protected';
document.querySelector('input[name="spamProtection"]').setAttribute('hidden', true);
