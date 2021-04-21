import { emitEvent } from './'
import combobox from '../components/combobox'

const icon = `
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24">
    <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" fill="#fff" />
  </svg>
`

export function createInput (container) {
  const wrapper = container.appendChild(document.createElement('div'))
  wrapper.style = `
    position: absolute;
    top: 8%;
    left: 50%;
    width: 90%;
    max-width: 640px;
    height: 62px;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    border-radius: 4px;
    /* border: 4px transparent; */
    background: rgb(255, 255, 255);
    box-shadow: rgb(0 0 0 / 58%) 0px 0px 8px;
    font-size: 16px;
    font-family: Arial, monospace;
    outline: none;
    user-select: none;
  `
  const input = wrapper.appendChild(document.createElement('combo-box'))
  input.style = `
    width: 80%;
    display: inline-block;
  `

  const button = wrapper.appendChild(document.createElement('button'))
  button.innerHTML = window.innerWidth >= 690 ? 'SUBMIT' : icon
  button.style = `
    width: 20%;
    height: 62px;
    background: rgb(136, 31, 26);
    color: rgb(255, 255, 255);
    padding: ${window.innerWidth < 690 ? '16px 8px' : '16px'};
    border-radius: 8px;
    border: 4px solid rgb(255, 255, 255);
    box-sizing: border-box;
    font-size: 16px;
    font-family: Arial, monospace;
    outline: none;
    cursor: pointer;
    user-select: none;
  `
  button.onmouseover = function (event) {
    event.target.style.background = '#E82F37'
  }
  button.onmouseout = function (event) {
    event.target.style.background = '#881F1A'
  }
  button.onclick = function (event) {
    const result = window[Symbol.for('map.searchResult')]
    console.log(result.address, result.status)
    if (!result.address || result.status === 'N/A') return
    emitEvent ('submit-address', result)
  }

  window.addEventListener('resize', function (event) {
    this.innerHTML = window.innerWidth >= 690 ? 'SUBMIT' : icon
    this.style.padding = '16px 8px'
  }.bind(button))

  return input
}
