import React from 'react';
import Chip from '../Chip';
import {v4 as uuid} from 'uuid';


export default function ListItem({item, deleteItem }) {
	return (
		<div className="flex mb-4 items-center border-1 shadow p-3">
		
			<div className="flex flex-wrap w-full">	
			<p className="w-full capitalize">
                {item.title}
			</p>

				{
					item.tags.map(x => {
						return <Chip id={x.id} label={x.name} key={uuid()}/>
					})
				}
				</div>
		
			<button className="flex-no-shrink p-1 ml-2 border-2 rounded text-red-600 border-red-600 hover:text-white hover:bg-red-600" onClick={deleteItem(item.id)}>
				Remove
			</button>
		</div>
	);
}

