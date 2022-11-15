import React from 'react'
import "./Dots.scss";

interface dotProps {
	num: number;
	scrollIndex: any;
}

interface dotsProps {
	scrollIndex: any;
}

const Dot = ({num, scrollIndex}: dotProps) => {
	return (
		<div>
			<div className={scrollIndex ===  num ? ('dotBlack') : ('dotTransparent')}></div>
		</div>
	)
}


const Dots = ({scrollIndex}: dotsProps) => {
  return (
    <div className='dotsContainer'>
      <div className='dotsWrapper'>
        <Dot num={1} scrollIndex={scrollIndex}></Dot>
				<Dot num={2} scrollIndex={scrollIndex}></Dot>
				<Dot num={3} scrollIndex={scrollIndex}></Dot>
      </div>
    </div>
  )
}

export default Dots
