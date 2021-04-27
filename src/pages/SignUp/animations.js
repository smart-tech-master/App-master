import anime from 'animejs/lib/anime.es'

export function runSignUpWaitAnimation() {
  anime({
    targets  : ['.step1 .green-circle', '.step1 .title'],
    opacity  : [0, 1],
    duration : 1200,
    delay    : 0,
    easing   : 'easeInOutQuad',
    complete() {
      document.querySelector('.step1 .green-wave-circle').style.borderColor = '#00d1c155'
      anime({
        targets  : '.step1 .green-wave-circle',
        opacity  : [0.6, 0],
        duration : 800,
        loop     : true,
        scale    : [1, 1.8],
        delay    : 0,
        easing   : 'easeInOutQuad',
      })
      anime({
        targets  : '.step1 .green-bg-circle',
        opacity  : [0, 0.6],
        duration : 800,
        loop     : true,
        delay    : 0,
        easing   : 'easeInOutQuad',
      })
    }
  })
  anime({
    targets  : '.step1 .desc',
    opacity  : [0, 1],
    duration : 500,
    delay    : 1200,
    easing   : 'easeInOutQuad',
  })
}
export function runWalletCreateAnimation(callback) {
  anime.remove(['.step1 .green-bg-circle', '.step1 .green-wave-circle'])
  document.querySelector('.step1 .green-wave-circle').style.opacity = 0
  document.querySelector('.step1 .green-bg-circle').style.opacity = 1
  anime({
    targets  : '.progressbar .progressbar-bg',
    width    : [0, '100%'],
    duration : 1200,
    delay    : 0,
    easing   : 'easeInOutQuad',
  })
  anime({
    targets  : '.progressbar .progressbar-fg1',
    width    : [0, '50%'],
    duration : 3000,
    delay    : 800,
    easing   : 'easeInOutQuad',
  })
  anime({
    targets  : ['.step2 .green-circle', '.step2 .title'],
    opacity  : [0, 1],
    duration : 1200,
    delay    : 2000,
    easing   : 'easeInOutQuad',
    complete() {
      document.querySelector('.step2 .green-wave-circle').style.borderColor = '#00d1c155'
      anime({
        targets  : '.step2 .green-wave-circle',
        opacity  : [0.6, 0],
        duration : 800,
        loop     : true,
        scale    : [1, 1.8],
        delay    : 0,
        easing   : 'easeInOutQuad',
      })
      anime({
        targets  : '.step2 .green-bg-circle',
        opacity  : [0, 0.6],
        duration : 800,
        loop     : true,
        delay    : 0,
        easing   : 'easeInOutQuad',
      })
      callback()
    }
  })
  anime({
    targets  : '.step2 .desc',
    opacity  : [0, 1],
    duration : 500,
    delay    : 3200,
    easing   : 'easeInOutQuad',
  })
}
export function runReviewAnimation(callback) {
  anime.remove(['.step2 .green-bg-circle', '.step2 .green-wave-circle'])
  document.querySelector('.step2 .green-wave-circle').style.opacity = 0
  document.querySelector('.step2 .green-bg-circle').style.opacity = 1
  anime({
    targets  : '.progressbar .progressbar-fg2',
    width    : [0, '50%'],
    duration : 1500,
    delay    : 0,
    easing   : 'easeInOutQuad',
  })
  anime({
    targets  : ['.step3 .green-circle', '.step3 .title'],
    opacity  : [0, 1],
    duration : 700,
    delay    : 1000,
    easing   : 'easeInOutQuad',
    complete() {
      const waveCircle = document.querySelector('.step3 .green-wave-circle')
      const waveCirclestyle = waveCircle ? waveCircle.style : { borderColor: '' }
      waveCirclestyle.borderColor = '#00d1c155'
      anime({
        targets  : '.step3 .green-wave-circle',
        opacity  : [0.6, 0],
        duration : 400,
        loop     : 2,
        scale    : [1, 1.8],
        delay    : 0,
        easing   : 'easeInOutQuad',
      })
      anime({
        targets  : '.step3 .green-bg-circle',
        opacity  : [0, 0.4],
        duration : 400,
        loop     : 2,
        delay    : 0,
        easing   : 'easeInOutQuad',
      })
    }
  })
  anime({
    targets  : '.step3 .desc',
    opacity  : [0, 1],
    duration : 300,
    delay    : 1700,
    easing   : 'easeInOutQuad',
    complete() {
      setTimeout(() => showSuccessAnime(callback), 500)
    }
  })
}

export function showSuccessAnime(callback) {
  anime({
    targets  : ['.curtain .top-half', '.curtain .bottom-half'],
    height   : [0, '50%'],
    duration : 1500,
    delay    : 500,
    easing   : 'easeInOutQuad',
    complete() {
      anime({
        targets    : ['.curtain .top-half', '.curtain .bottom-half'],
        background : '#fff',
        duration   : 800,
        endDelay   : 200,
        easing     : 'easeInOutQuad',
        complete() {
          callback()
        }
      })
    }
  })
}

export function runSignUpStartAnim(callback) {
  anime({
    targets    : '.ui.grid.signup-page',
    translateX : '-100%',
    duration   : 1600,
    easing     : 'easeInOutQuad',
    complete() {
      anime({
        targets     : '.step .grey-circle',
        borderWidth : [20, 0],
        opacity     : [0, 0.9],
        translateX  : ['-25vw', 0],
        delay(el, i) { return i * 600 },
        duration    : 600,
        easing      : 'easeInOutQuad',
        changeComplete() {
          callback()
        }
      })
    }
  })
}

export function removeAnimation() {
  anime.remove(['.green-wave-circle', '.green-bg-circle'])
  document.querySelector('.ui.grid.signup-page').style.transform = 'none'
  document.querySelectorAll('.green-circle').forEach((el) => { el.style.opacity = 0 })
  document.querySelectorAll('.grey-circle').forEach((el) => { el.style.opacity = 0 })
  document.querySelectorAll('.green-wave-circle').forEach((el) => { el.style.opacity = 0 })
  document.querySelectorAll('.green-bg-circle').forEach((el) => { el.style.opacity = 0 })
  document.querySelectorAll('.steps-desc-page .desc').forEach((el) => { el.style.opacity = 0 })
  document.querySelectorAll('.steps-desc-page .title').forEach((el) => { el.style.opacity = 0 })
  document.querySelector('.progressbar-bg').style.width = 0
  document.querySelector('.progressbar-fg1').style.width = 0
  document.querySelector('.progressbar-fg2').style.width = 0
}
