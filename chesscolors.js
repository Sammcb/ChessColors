let timeoutId = null
let themeSymbol = ""

function loadBoard() {
	const board = document.getElementById('board')
	const url = new URL(window.location.href)
	const symbol = url.searchParams.get('symbol')
	const pieceLight = url.searchParams.get('pieceLight')
	const pieceDark = url.searchParams.get('pieceDark')
	const squareLight = url.searchParams.get('squareLight')
	const squareDark = url.searchParams.get('squareDark')

	if (symbol) {
		themeSymbol = symbol
	}

	if (pieceLight && pieceDark && squareLight && squareDark) {
		document.getElementById('pieceLight').value = `#${pieceLight}`
		document.getElementById('pieceDark').value = `#${pieceDark}`
		document.getElementById('squareLight').value = `#${squareLight}`
		document.getElementById('squareDark').value = `#${squareDark}`
	}

	let html = ''

	for (let rank = 7; rank >= 0; rank--) {
		html += `<div class="row">`
		for (let file = 0; file < 8; file++) {
			const squareClass = (file + rank) % 2 === 0 ? 'dark-square' : 'light-square' 
			html += `<div class="square ${squareClass}">`
			if (rank === 0) {
				switch (file) {
					case 0:
					case 7:
						html += `<p class="piece light-piece">&#9814;</p>`
						break
					case 1:
					case 6:
						html += `<p class="piece light-piece">&#9816;</p>`
						break
					case 2:
					case 5:
						html += `<p class="piece light-piece">&#9815;</p>`
						break
					case 3:
						html += `<p class="piece light-piece">&#9813;</p>`
						break
					case 4:
						html += `<p class="piece light-piece">&#9812;</p>`
						break
					default:
						break
				}
			} else if (rank === 1) {
				html += `<p class="piece light-piece">&#9817;</p>`
			} else if (rank === 6) {
				html += `<p class="piece dark-piece">&#9823;</p>`
			} else if (rank === 7) {
				switch (file) {
					case 0:
					case 7:
						html += `<p class="piece dark-piece">&#9820;</p>`
						break
					case 1:
					case 6:
						html += `<p class="piece dark-piece">&#9822;</p>`
						break
					case 2:
					case 5:
						html += `<p class="piece dark-piece">&#9821;</p>`
						break
					case 3:
						html += `<p class="piece dark-piece">&#9819;</p>`
						break
					case 4:
						html += `<p class="piece dark-piece">&#9818;</p>`
						break
					default:
						break
				}
			}
			html += `</div>`
		}
		html += `</div>`
	}

	board.innerHTML = html

	resizeBoard()
	theme()
}

function resizeBoard() {
	const board = document.getElementById('board')
	const squares = document.getElementsByClassName('square')
	const pieces = document.getElementsByClassName('piece')

	const squareWidth = Math.floor(board.offsetWidth / 8)
	for (square of squares) {
		square.style.width = `${squareWidth}px`
		square.style.height = `${squareWidth}px`
	}

	const pieceSize = `${Math.floor(100 * squareWidth / 159)}px`
	for (piece of pieces) {
		piece.style.fontSize = pieceSize
	}
}

function updateURL() {
	const pieceLight = document.getElementById('pieceLight').value.slice(1)
	const pieceDark = document.getElementById('pieceDark').value.slice(1)
	const squareLight = document.getElementById('squareLight').value.slice(1)
	const squareDark = document.getElementById('squareDark').value.slice(1)
	const url = new URL(window.location.origin + window.location.pathname)
	url.searchParams.append('symbol', themeSymbol)
	url.searchParams.append('pieceLight', pieceLight)
	url.searchParams.append('pieceDark', pieceDark)
	url.searchParams.append('squareLight', squareLight)
	url.searchParams.append('squareDark', squareDark)
	window.history.replaceState({href: window.location.href}, document.title, url)
}

function theme() {
	const board = document.getElementById('board')
	const lightSquares = document.getElementsByClassName('light-square')
	const lightPieces = document.getElementsByClassName('light-piece')
	const darkSquares = document.getElementsByClassName('dark-square')
	const darkPieces = document.getElementsByClassName('dark-piece')
	const pieceLight = document.getElementById('pieceLight').value
	const pieceDark = document.getElementById('pieceDark').value
	const squareLight = document.getElementById('squareLight').value
	const squareDark = document.getElementById('squareDark').value

	clearTimeout(timeoutId)
	timeoutId = setTimeout(updateURL, 100)

	document.getElementById('board-container').style.backgroundImage = `linear-gradient(${squareLight}, ${squareDark})`
	document.getElementById('pieceLightColor').innerHTML = pieceLight
	document.getElementById('pieceDarkColor').innerHTML = pieceDark
	document.getElementById('squareLightColor').innerHTML = squareLight
	document.getElementById('squareDarkColor').innerHTML = squareDark

	for (square of lightSquares) {
		square.style.backgroundColor = squareLight
	}

	for (square of darkSquares) {
		square.style.backgroundColor = squareDark
	}

	for (piece of lightPieces) {
		piece.style.color = pieceLight
	}

	for (piece of darkPieces) {
		piece.style.color = pieceDark
	}
}
