import React, { useEffect, useRef } from 'react'
import './Sidebar.scss'

const Sidebar = ({isOpen, setIsOpen}: {isOpen: boolean; setIsOpen: any}) => {
	const outside = useRef<any>();

	useEffect(() => {
		document.addEventListener('mousedown', handlerOutside);
		return () => {
			document.removeEventListener('mousedown', handlerOutside);
		};
	});

	const handlerOutside = (e: any) => {
		if (!outside.current.contains(e.target)) {
			toggleSide();
		}
	};

	const toggleSide = () => {
		setIsOpen(false);
	}

	return (
		<div id='sidebar' ref={outside} className={isOpen ? 'openSidebar' : 'closeSidebar'}>
			<div className='closeButtonWrapper'>
				<div onClick={toggleSide} onKeyDown={toggleSide} className='closeButton'>X</div>
			</div>
			<ul className='ul'>
				<li>메뉴1</li>
			</ul>
		</div>
	)
}

export default Sidebar