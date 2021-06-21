import './style/copy.styl'
const isMobile = () => (navigator ? /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/iu.test(navigator.userAgent) : false)
export default {
  mounted() {
    this.generateCopyButton()
    console.log('end')
  },
  updated() {
    if (!isMobile() || showInMobile) this.generateCopyButton()
  },
  methods: {
    createCopyBtn(parentNode) {
      if (parentNode.classList.contains('code-copy-registered')) return
      parentNode.copyCode = {
        transition: parentNode.style.transition,
        background: parentNode.style.background,
        copySuccessTimeout: 0
      }
      const containerElement = document.createElement('div')
      containerElement.className = 'code-copy'

      const successElement = document.createElement('span')
      successElement.className = 'code-copy-success'
      successElement.textContent = successText

      const copyElement = document.createElement('span')
      copyElement.className = 'code-copy-button'
      copyElement.innerHTML =
        '<svg t="1624246837088" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5943" width="500" height="500"><path d="M170.666667 981.333333c-46.933333 0-85.333333-38.4-85.333334-85.333333V298.666667c0-46.933333 38.4-85.333333 85.333334-85.333334h512c46.933333 0 85.333333 38.4 85.333333 85.333334v597.333333c0 46.933333-38.4 85.333333-85.333333 85.333333H170.666667z m64-213.333333c0 25.6 17.066667 42.666667 42.666666 42.666667h298.666667c25.6 0 42.666667-17.066667 42.666667-42.666667s-17.066667-42.666667-42.666667-42.666667h-298.666667c-25.6 0-42.666667 17.066667-42.666666 42.666667z m0-170.666667c0 25.6 17.066667 42.666667 42.666666 42.666667h298.666667c25.6 0 42.666667-17.066667 42.666667-42.666667s-17.066667-42.666667-42.666667-42.666666h-298.666667c-25.6 0-42.666667 17.066667-42.666666 42.666666z m0-170.666666c0 25.6 17.066667 42.666667 42.666666 42.666666h298.666667c25.6 0 42.666667-17.066667 42.666667-42.666666s-17.066667-42.666667-42.666667-42.666667h-298.666667c-25.6 0-42.666667 17.066667-42.666666 42.666667zM810.666667 810.666667V256c0-46.933333-38.4-85.333333-85.333334-85.333333H256V128c0-46.933333 38.4-85.333333 85.333333-85.333333h512c46.933333 0 85.333333 38.4 85.333334 85.333333v597.333333c0 46.933333-38.4 85.333333-85.333334 85.333334h-42.666666z" p-id="5944" ></path></svg>'

      if (color) {
        copyElement.style.fill = color
        successElement.style.color = color
      }
      if (iconVisible) containerElement.style.opacity = 0.75
      if (align) {
        if (align.top) containerElement.style.top = align.top
        if (align.bottom) containerElement.style.bottom = align.bottom
        if (align.left) containerElement.style.left = align.left
        if (align.right) containerElement.style.right = align.right
        if (align.dir) containerElement.style['flex-direction'] = align.dir
      }

      copyElement.addEventListener('click', () => {
        this.copyToClipboard(parentNode.textContent, parentNode)
      })

      containerElement.appendChild(successElement)
      containerElement.appendChild(copyElement)
      parentNode.appendChild(containerElement)
      parentNode.classList.add('code-copy-registered')
    },
    generateCopyButton() {
      if (!isMobile() || showInMobile) {
        setTimeout(() => {
          if (typeof selector === 'string') {
            document.querySelectorAll(selector).forEach(this.createCopyBtn)
          } else if (Array.isArray(selector) || Array.isArray(selector)) {
            selector.forEach((item) => {
              document.querySelectorAll(item).forEach(this.createCopyBtn)
            })
          }
        }, 1000)
      }
    },
    copyToClipboard(code, parentNode) {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(code).then(
          () => {
            this.triggerCopySuccess(parentNode)
          },
          () => {}
        )
      } else {
        const selection = document.getSelection()
        const range = selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : false

        const textarea = document.createElement('textarea')
        textarea.value = code
        textarea.setAttribute('readonly', '')
        textarea.style.position = 'absolute'
        textarea.style.top = '-9999px'
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textAreaElement)
        if (range && selection) {
          selection.removeAllRanges()
          selection.addRange(range)
        }

        this.triggerCopySuccess(parentNode)
      }
    },
    // From: https://stackoverflow.com/a/5624139
    hexToRgb(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
          }
        : null
    },
    triggerCopySuccess(parentNode) {
      clearTimeout(parentNode.copySuccessTimeout)

      if (backgroundTransition) {
        parentNode.style.transition = 'background 350ms'

        const color = this.hexToRgb(backgroundColor)
        parentNode.style.background = `rgba(${color.r}, ${color.g}, ${color.b}, 0.1)`
      }

      const successElement = parentNode.querySelector('.code-copy-success')
      successElement.style.display = 'inline'

      parentNode.copySuccessTimeout = setTimeout(() => {
        if (backgroundTransition) {
          parentNode.style.background = parentNode.copyCode.background
          parentNode.style.transition = parentNode.copyCode.transition
        }
        successElement.style.display = 'none'
      }, duration)
    }
  }
}
