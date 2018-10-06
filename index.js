import React from 'react'
import ReactDOM from 'react-dom'

class Box extends React.Component {
	render() {
		const style = {
			position: 'absolute',
			background: 'green',
			height: '50px',
			width: '50px',
			transform: `translate3D(${this.props.xPos - 25}px, ${this.props.yPos -
				25}px, 0)`,
			// top: this.props.yPos - 25 + 'px'
			// transition: '1000ms'
		}
		return <div style={style} id="Box" />
	}
}

class App extends React.Component {
	constructor(props) {
		super(props)

		this.velocity = 0
		this.startPos = 0
		this.endPos = 0

		this.state = {
			xPos: 25,
			yPos: 25,
			dragging: false,
			distTraveled: this.endPos - this.startPos,
		}
		this.handleMouseDown = this.handleMouseDown.bind(this)
		this.handleMouseMove = this.handleMouseMove.bind(this)
		this.handleMouseUp = this.handleMouseDown.bind(this)
	}

	forceOfGravity(sec) {
		return 37039.37007874 / (sec * sec)
	}

	handleMouseDown(event) {
		this.startPos = event.clientX
		if (event.target.id === 'Box') {
			this.setState({ dragging: true })
		}
	}

	handleMouseUp(event) {
		this.endPos = event.clientX
		this.calcDistTraveled()
		this.setState({ dragging: false })
		this.applyGravity()
	}

	handleMouseMove(event) {
		// console.log(event.clientX + "," + event.clientY);

		if (this.state.dragging) {
			this.setState({
				xPos: event.clientX,
				yPos: event.clientY,
			})
		}
	}

	calcDistTraveled() {
		this.setState({
			distTraveled: this.endPos - this.startPos,
		})
	}

	applyGravity() {
		const applyGravity = setInterval(() => {
			if (this.state.yPos > 460) {
				clearInterval(applyGravity)
				this.velocity = 0
			}
			const newY = this.state.yPos + this.velocity * 10

			this.velocity += 0.009 * 10

			this.setState({ yPos: newY })
		}, 10)
	}
	componentDidMount() {
		this.applyGravity()
	}

	render() {
		const style = {
			position: 'relative',
			background: 'black',
			height: '500px',
			width: '500px',
		}
		return (
			<div
				style={style}
				onMouseUp={this.handleMouseUp}
				onMouseDown={this.handleMouseDown}
				onMouseMove={this.handleMouseMove}
			>
				<Box xPos={this.state.xPos} yPos={this.state.yPos} />

				<p style={{ color: 'white' }}>
					Distance Carried: {this.state.distTraveled}
				</p>
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'))
