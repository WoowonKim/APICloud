import React from 'react'
import { ApiDocsDummy1, ApiDocsDummy2 } from '../../pages/ApiDocs';
import './ApiDocTable.scss';


interface Props {
  ApiDocsDummy1: ApiDocsDummy1[];
	ApiDocsDummy2: ApiDocsDummy2[];
}

const ApiDocsTable = ({ApiDocsDummy1, ApiDocsDummy2}: Props) => {    
  return (
	<div className='apiDocTableWrapper'>
		<h1 className='title'>Eco2 API DOC</h1>
		{ApiDocsDummy1.map((column) => (
			<div className='innerWrapper1'>
				<div key={column.id} className='tableColumn1'>
					<div className='tableRow1'>
						{column.category}
					</div>
				</div>
				<div key={column.id} className='tableColumn1'>
					<div className='tableRowContent1'>
						{column.content}
					</div>
				</div>
			</div>
		))}
		{ApiDocsDummy2.map((column) => (
			<div className='innerWrapper2'>
				<div key={column.id} className='tableColumn2'>
					<div className='tableRow2'>
						{column.category}
					</div>
				</div>
				<div key={column.id} className='tableColumn2'>
					<div className='tableRowContent2'>
						{column.content}
					</div>
				</div>
			</div>
		))}
	</div>
  )
}

export default ApiDocsTable