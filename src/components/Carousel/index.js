import React, { Component } from "react";
import "./style.css";

const IMG_WIDTH = 700;
const IMG_HEIGHT = 400;

class Carousel extends Component {
  lastTouch = 0;
  constructor(props) {
    super(props)
    this.state = {
      currentIndex: 0,
      movement: 0,
      clickOn: false,
    };
  }

  clickEventStart = (e) => {
    this.clickOn = true
    this.lastTouch = e.nativeEvent.clientX;
    console.log(this.lastTouch);
  }

  clickEventMove = (e) => {
    if(this.clickOn) {
      const delta = this.lastTouch - e.clientX;
      this.lastTouch = e.clientX;
      this.handleMovement(delta);
    }
  }

  clickEventEnd = (e)=> {
    this.clickOn = false
    this.handleMovementEnd();
    this.lastTouch = 0;
  }

  handleTouchStart = (e) => {
    this.lastTouch = e.nativeEvent.touches[0].clientX;
  };

  handleTouchMove = (e) => {
    const delta = this.lastTouch - e.nativeEvent.touches[0].clientX;
    this.lastTouch = e.nativeEvent.touches[0].clientX;
    this.handleMovement(delta);
  };

  handleTouchEnd = () => {
    this.handleMovementEnd();
    this.lastTouch = 0;
  };
  

  handleMovement = (delta) => {
    this.setState((state) => {
      const maxLength = this.props.imgs.length - 1;
      let nextMovement = state.movement + delta;

      if (nextMovement < 0) {
        nextMovement = maxLength * IMG_WIDTH;
      }

      if (nextMovement > maxLength * IMG_WIDTH) {
        nextMovement = 0;
      }

      return {
        movement: nextMovement,
      };
    });
  };


  handleMovementEnd = () => {
    const { movement, currentIndex } = this.state;
    const endPosition = movement / IMG_WIDTH;
    const endPartial = endPosition % 1;
    const endingIndex = endPosition - endPartial;
    const deltaInteger = endingIndex - currentIndex;

    let nextIndex = endingIndex;
    if (deltaInteger >= 0) {
      if (endPartial >= 0.1) {
        nextIndex += 1;
      }
    } else if (deltaInteger < 0) {
      nextIndex = currentIndex - Math.abs(deltaInteger);
      if (endPartial > 0.9) {
        nextIndex += 1;
      }
    }

    this.transitionTo(nextIndex);
  };


  transitionTo = (index) => {
    this.setState({
      currentIndex: index,
      movement: index * IMG_WIDTH,
    });
  };

  

  render() {
    const { currentIndex, movement } = this.state;
    const maxLength = this.props.imgs.length - 1;
    const maxMovement = maxLength * IMG_WIDTH;
    return (
      <div className="App">
        <div
          className="main"
          style={{
            width: `${IMG_WIDTH}px`,
            height: `${IMG_HEIGHT}px`,
          }}
          onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleTouchMove}
          onTouchEnd={this.handleTouchEnd}
          onMouseDown ={this.clickEventStart}
          onMouseMove ={this.clickEventMove}
          onMouseUp  ={this.clickEventEnd}
        >
          <div
            className="swiper"
            style={{
              transform: `translateX(${movement * -1}px)`,
            }}
          >
            {this.props.imgs.map((src) => {
              return <img key={src} src={src} width="100%" height="100%" />;
            })}
          </div>

          {
            <button
              className="back move"
              onClick={() => {
                if (movement === 0) {
                  this.transitionTo(currentIndex + 4, 0.5);
                } else {
                  this.transitionTo(currentIndex - 1, 0.5);
                }
              }}
            >
              ←
            </button>
          }
          {
            <button
              className="next move"
              onClick={() => {
                if (movement >= maxLength * IMG_WIDTH) {
                  this.transitionTo(currentIndex - 4, 0.5);
                } else {
                  this.transitionTo(currentIndex + 1, 0.5);
                }
              }}
            >
              →
            </button>
          }
        </div>
        <div className="dots">
          {this.props.imgs.map((src, index) => {
            return (
              <div
                key={index}
                className="dot"
                onClick={() => {
                  console.log(index);
                  this.transitionTo(index, 0.5);
                }}
              ></div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Carousel;