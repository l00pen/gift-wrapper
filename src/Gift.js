/* global TimelineMax, Elastic, Back, Bounce */
import React, { Component } from 'react';

import Confetti from './Confetti';

import './Gift.css';

class Gift extends Component {
  constructor() {
    super();

    this.state = {
      isOpen: false,
    };

    this.boxLeft = React.createRef();
    this.boxRight = React.createRef();
    this.lidLeft = React.createRef();
    this.lidRight = React.createRef();
    this.boxShade = React.createRef();
    this.boxWrapping = React.createRef();
    this.lidWrapping = React.createRef();
    this.bowRight = React.createRef();
    this.bowLeft = React.createRef();

    this.tl = new TimelineMax({ paused: true });

    this.handleOpenGift = this.handleOpenGift.bind(this);
  }

  componentDidMount() {
    this.tl
      .from(this.boxLeft.current, 1.0, { scaleY: 0, transformOrigin: "bottom", ease: Elastic.easeOut })       
      .from(this.boxRight.current, 1.0, { scaleY: 0, transformOrigin: "bottom", ease: Elastic.easeOut }, 0)   
      .from(this.lidLeft.current, 0.5, { scaleX: 0, transformOrigin: "right", ease: Back.easeOut }, 0.3)        
      .from(this.lidRight.current, 0.5, { scaleX: 0, transformOrigin: "left", ease: Back.easeOut }, 0.3)         
      .from(this.boxShade.current, 0.5, { scaleX: 0, transformOrigin: "center", ease: Back.easeOut }, 0.3)
      .from(this.boxWrapping.current, 1, { scaleY: 0, transformOrigin: "bottom", ease: Elastic.easeOut }, 0.6)
      .from(this.lidWrapping.current, 1, { scaleY: 0, transformOrigin: "bottom", ease: Elastic.easeOut }, 0.6)
      .from(this.bowLeft.current, 0.3, { scaleX: 0, transformOrigin: "right", ease: Bounce.easeOut }, 0.8)
      .from(this.bowRight.current, 0.3, { scaleX: 0, transformOrigin: "left", ease: Bounce.easeOut }, 0.9)
      .play();
  }

  handleOpenGift() {
    console.log('hej hej')
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    const lidClasses = this.state.isOpen ? 'gift-lid open' : 'gift-lid';

    return (
      <svg id="gift" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
        <path
          id="box-left"
          ref={this.boxLeft}
          d="M176.047 195.098h-152v240c0 17.672 14.328 32 32 32h136v-272zm0 0"
          fill="#ffcd00"
        />
        <path
          id="box-right"
          ref={this.boxRight}
          d="M408.047 435.098v-240h-240v272h208c17.676 0 32-14.328 32-32zm0 0"
          fill="#ffcd00"
        />
        <g className={lidClasses} onClick={this.handleOpenGift}>
          <path
            id="lid-left"
            ref={this.lidLeft}
            d="m216.046875 115.097656h-216v80h216zm0 0"
            fill="#ed539d"
          />
          <path
            id="lid-right"
            ref={this.lidRight}
            d="m216.046875 195.097656h216v-80h-216zm0 0"
            fill="#f17fb5"
          />
          <path
            id="bow-left"
            ref={this.bowLeft}
            d="m220.128906 115.097656c1.5-11.578125.097656-23.34375-4.082031-34.242187-6.9375-22.054688-18.503906-42.371094-33.917969-59.601563-25.042968-24.957031-63.601562-26.878906-79.199218-11.277344-15.601563 15.597657-13.683594 54.160157 11.277343 79.199219 11.613281 10.738281 24.910157 19.496094 39.359375 25.921875zm-83.28125-48.5625c-9.144531-8.667968-13.324218-21.351562-11.121094-33.757812 12.410157-2.207032 25.09375 1.972656 33.761719 11.117187 12.433594 14.457031 21.652344 31.390625 27.039063 49.679688-18.289063-5.386719-35.226563-14.601563-49.679688-27.039063zm0 0"
            fill="#bf243d"
          />
          <path
            id="bow-right"
            ref={this.bowRight}
            d="m220.128906 115.097656h58.398438c14.453125-6.425781 27.75-15.183594 39.359375-25.921875 24.960937-25.039062 26.882812-63.601562 11.28125-79.199219-15.601563-15.601562-54.160157-13.679687-79.199219 11.277344-15.417969 17.230469-26.980469 37.546875-33.921875 59.601563 4.179687 10.898437 5.582031 22.664062 4.082031 34.242187zm52.488282-71.203125c8.675781-9.140625 21.359374-13.324219 33.773437-11.144531 2.183594 12.417969-2 25.097656-11.144531 33.777344-14.445313 12.46875-31.390625 21.703125-49.703125 27.082031 5.378906-18.3125 14.609375-35.261719 27.074219-49.714844zm0 0"
            fill="#df2a47"
          />
          <path
            id="lid-wrapping"
            ref={this.lidWrapping}
            d="m220.128906 115.097656h-44.082031v80h80v-80zm0 0"
            fill="#ff3051"
          />
        </g>
        <path
          id="box-shade"
          ref={this.boxShade}
          d="m24.046875 195.097656h384v16h-384zm0 0"
          fill="#e5b800"
        />
        <path
          id="box-wrapping"
          ref={this.boxWrapping}
          d="m192.046875 195.097656h48v272h-48zm0 0"
          fill="#ff4764"
        />
        { this.state.isOpen &&
          <Confetti />
        }
      </svg>
    );
  }
}

export default Gift;
