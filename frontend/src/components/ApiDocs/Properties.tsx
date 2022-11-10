import React from 'react'

interface Props {
  item: any;
}

const Properties = ({item}: Props) => {
  return (
    <div>
			<div className="titleContentWrapper2">
          <div>&nbsp;&nbsp;&nbsp;properties:</div>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {item.map((item: any, idx: any) => (
            <div key={idx}>
							<div>{"{"}</div>
							<div className="titleContentWrapper2">
								<div>&nbsp;&nbsp;&nbsp;dtoName:</div>
								<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'{item.dtoName}'</div>
							</div>
							<div className="titleContentWrapper2">
								<div>&nbsp;&nbsp;&nbsp;name:</div>
								<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'{item.name}'</div>
							</div>
							<div className="titleContentWrapper2">
								<div>&nbsp;&nbsp;&nbsp;type:</div>
								<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'{item.type}'</div>
							</div>
							<div className="titleContentWrapper2">
								<div>&nbsp;&nbsp;&nbsp;collectionType:</div>
								<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'{item.collectionType}'</div>
							</div>
							<div className="titleContentWrapper2">
								<div>&nbsp;&nbsp;&nbsp;required:</div>
								<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'{item.required}'</div>
							</div>
							<div className="titleContentWrapper2">
								{item.collectionType?.length && item.collectionType === 'List' && <Properties item={item.properties}/>}
								{item.collectionType !== 'List' && <div>&nbsp;properties</div>}
							</div>
							<div>{"}"}</div>
            </div>
          ))}
        </div>
		</div>
  )
}

export default Properties