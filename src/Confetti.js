/* global TweenLite, Power4 */
import React, { Component } from 'react';
import uniqueId from 'lodash.uniqueid';

import './Confetti.css';

// utilities
function getLength(x0, y0, x1, y1) {
    // returns the length of a line segment
    const x = x1 - x0;
    const y = y1 - y0;
    return Math.sqrt(x * x + y * y);
}

function getDegAngle(x0, y0, x1, y1) {
  const y = y1 - y0;
  const x = x1 - x0;
  return Math.atan2(y, x) * (180 / Math.PI);
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

const DECAY = 8;        // confetti decay in seconds
const SPREAD = 60;      // degrees to spread from the angle of the cannon

const DPR = window.devicePixelRatio || 1;

class ConfettiParticle extends Component {
  constructor() {
    super();

    this.confettiParticle = React.createRef();
  }

  componentDidMount() {
    const sprite = this.props;
    const d = 0;

    TweenLite.to(this.confettiParticle.current, DECAY, {
      d,
      ease: Power4.easeIn,
    });
  }

  componentWillUnmount() {
    TweenLite.killTweensOf(this);
  }

  render() {
    const { sprite } = this.props;
    const startPoint = sprite.x + sprite.tilt + sprite.r;
    const endPoint = sprite.y + sprite.tilt + sprite.r;
    return (
      <path
        ref={this.confettiParticle}
        key={`confetti-${sprite.color}`}
        d={`M ${startPoint} ${sprite.y}
            L ${sprite.x + sprite.tilt} ${endPoint}`}
        stroke={sprite.color}
        fill={sprite.color}
        strokeWidth={sprite.d / 2}
      />
    );
  }
}

class Confetti extends Component {
  constructor() {
    super();
    const { confettiSpritesIds, confettiSprites } = this.confettiCanon();

    this.CONFETTI_SPRITES = confettiSprites;
    this.CONFETTI_SPRITES_IDS = confettiSpritesIds;
  }

  confettiCanon() {
    const x0 = 467 / 2;
    const y0 = 467 / 2 * 0.7;
    const x1 = 467 / 2;
    const y1 = 467 / 2 * 0.7;
    
    const length = getLength(x0, y0, x1, y1);
    const angle = getDegAngle(x0, y0, x1, y1) + 180;

    const particles = length / 5 + 5;
    const velocity = length * 10;

    return this.addConfettiParticles(particles, angle, velocity, x0, y0);
  }

  addConfettiParticles(amount, angle, velocity, x, y) {
    let i = 0;
    const confettiSpritesIds = [];
    const confettiSprites = {};
    while (i < amount) {
      // sprite
      const r = getRandomArbitrary(4, 6) * DPR;
      const d = getRandomArbitrary(15, 25) * DPR;
      
      const cr = getRandomArbitrary(30, 255);
      const cg = getRandomArbitrary(30, 230);
      const cb = getRandomArbitrary(30, 230);
      const color = `rgb(${cr}, ${cg}, ${cb})`;
      
      const tilt = getRandomArbitrary(10, -10);
      const tiltAngleIncremental = getRandomArbitrary(0.07, 0.05);
      const tiltAngle = 0;

      const id = uniqueId();
      const sprite = {
        [id]: {
          angle,
          velocity,
          x,
          y,
          r,
          d,
          color,
          tilt,
          tiltAngleIncremental,
          tiltAngle,
        },
      };

      Object.assign(confettiSprites, sprite);
      confettiSpritesIds.push(id);
      i++;
    }
    return { confettiSpritesIds, confettiSprites };
  }

  componentDidMount() {
    TweenLite.ticker.addEventListener('tick', () => {
      this.updateConfettiParticle.call(this);
    });   
  }

  componentWillUnmount() {
    TweenLite.ticker.removeEventListener('tick');
  }

  updateConfettiParticle() {
    this.CONFETTI_SPRITES_IDS.forEach((id) => {
      const sprite = this.CONFETTI_SPRITES[id];
      const tiltAngle = 0.0005 * sprite.d;
      
      sprite.angle += 0.01;
      sprite.tiltAngle += tiltAngle;
      sprite.tiltAngle += sprite.tiltAngleIncremental;
      sprite.tilt = (Math.sin(sprite.tiltAngle - (sprite.r / 2))) * sprite.r * 2;
      sprite.y += Math.sin(sprite.angle + sprite.r / 2) * 2;
      sprite.x += Math.cos(sprite.angle) / 2;
    });
    this.forceUpdate();
  }

  render() {
    return this.CONFETTI_SPRITES_IDS.map((id) => {
      const sprite = this.CONFETTI_SPRITES[id];
      return(
        <ConfettiParticle key={id} sprite={sprite} />
      );
    });
  }
}

export default Confetti;
