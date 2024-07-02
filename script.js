window.addEventListener("DOMContentLoaded", () => {
  const checklist = new Checklist("form")
})

class Checklist {
  constructor(qs) {
    this.el = document.querySelector(qs)
    this.el?.addEventListener("change", this.checkForSelected.bind(this))
    this.init()
  }
  init() {
    const inputs = this.el.querySelectorAll("input")
    Array.from(inputs).forEach((el) => {
      el.checked = false
    })
  }
  checkForSelected(e) {
    const tar = e.target
    const isTop = tar.hasAttribute("data-top")

    this.updateChecks(tar.name, isTop)
  }
  updateChecks(name, isTop) {
    if (name) {
      const topCheck = this.el.querySelector(`[name="${name}"][data-top]`)
      const checkItems = this.el.querySelectorAll(
        `[name="${name}"]:not([data-top])`
      )
      const checked = Array.from(checkItems).filter((el) => el.checked)
      const notAllChecked = checked.length < checkItems.length

      if (isTop) {
        Array.from(checkItems).forEach((el) => {
          el.checked = notAllChecked
        })
      } else {
        topCheck.checked = !notAllChecked
        topCheck.indeterminate = checked.length > 0 && notAllChecked
      }
    }
  }
}

const dadosFormulario = {
  titulo: "Check",
  itens: ["1", "2", "3", "4"],
}

const checkboxGroup = document.querySelector(".checkbox-group")

// Cria o elemento <label> para o título
const titleLabel = document.createElement("label")
titleLabel.classList.add("checkbox-label")

// Cria o elemento <input> para o título
const titleInput = document.createElement("input")
titleInput.classList.add("checkbox")
titleInput.setAttribute("type", "checkbox")
titleInput.setAttribute("name", "desktop")
titleInput.setAttribute("value", "desktop")
titleInput.setAttribute("data-top", "")

// Cria o elemento <svg> para o ícone de marcação
const titleSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
titleSvg.classList.add("check-icon")
titleSvg.setAttribute("width", "24px")
titleSvg.setAttribute("height", "24px")
titleSvg.setAttribute("viewBox", "0 0 24 24")
titleSvg.innerHTML = `
      <g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
        <rect class="check-icon__box" x="1" y="1" width="22" height="22"/>
        <polyline class="check-icon__box-worm" points="23,1 1,1 1,23 23,23 23,4" stroke-dasharray="30 146" stroke-dashoffset="30"/>
        <polyline class="check-icon__check-worm" points="23,4 10,17 5,12 18,12" stroke-dasharray="17.38 149.68" stroke-dashoffset="103.38"/>
      </g>
    `

// Cria o elemento <strong> para o texto do título
const titleStrong = document.createElement("strong")
titleStrong.classList.add("checkbox-text")
titleStrong.textContent = dadosFormulario.titulo

// Adiciona todos os elementos ao <label> do título
titleLabel.appendChild(titleInput)
titleLabel.appendChild(titleSvg)
titleLabel.appendChild(titleStrong)

// Adiciona o <label> do título ao <div class="checkbox-group">
checkboxGroup.appendChild(titleLabel)

// Loop para criar os elementos <label> e <input> para cada item
dadosFormulario.itens.forEach((item, index) => {
  const itemLabel = document.createElement("label")
  itemLabel.classList.add("checkbox-label")

  const itemInput = document.createElement("input")
  itemInput.classList.add("checkbox")
  itemInput.setAttribute("type", "checkbox")
  itemInput.setAttribute("name", "desktop")
  itemInput.setAttribute("value", "item_" + index) // Define um valor único para cada item

  const itemSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
  itemSvg.classList.add("check-icon")
  itemSvg.setAttribute("width", "24px")
  itemSvg.setAttribute("height", "24px")
  itemSvg.setAttribute("viewBox", "0 0 24 24")
  itemSvg.innerHTML = `
        <g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
          <rect class="check-icon__box" x="1" y="1" width="22" height="22"/>
          <polyline class="check-icon__box-worm" points="23,1 1,1 1,23 23,23 23,4" stroke-dasharray="30 146" stroke-dashoffset="30"/>
          <polyline class="check-icon__check-worm" points="23,4 10,17 5,12 18,12" stroke-dasharray="17.38 149.68" stroke-dashoffset="103.38"/>
        </g>
      `

  const itemSpan = document.createElement("span")
  itemSpan.classList.add("checkbox-text")
  itemSpan.textContent = item

  itemLabel.appendChild(itemInput)
  itemLabel.appendChild(itemSvg)
  itemLabel.appendChild(itemSpan)

  // Adiciona o evento para exibir o próximo item ao ser marcado
  if (index > 0) {
    itemLabel.style.display = "none" // Inicialmente esconde todos os itens
    const previousInput = checkboxGroup.querySelector(
      `input[value="item_${index - 1}"]`
    )
    previousInput.addEventListener("change", () => {
      if (previousInput.checked) {
        itemLabel.style.display = "" // Exibe o próximo item quando o anterior é marcado
      }
    })
  }

  checkboxGroup.appendChild(itemLabel)
})
