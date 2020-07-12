/* eslint-disable eqeqeq */
import React from 'react';
import Modal from '../Modal';

export default function AddTagsMarkup({visible, tag, setTag, toggleTagPopup}) {

	return (
		<>
			<button
                data-type="open"
				onClick={toggleTagPopup}
				className="mt-2 float-right	mr-2 p-2 border-2 rounded text-teal-400 border-teal-400 hover:text-white hover:bg-teal-400"
			>
				Add Tag
			</button>
			<Modal visible={visible} onClose={toggleTagPopup} title="Add Tag">
				<input
					className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
                    placeholder="Tag Name"
                    onChange={e => {
                        setTag(e.target.value);
                    }}
                    value={tag}
				/>
	
			</Modal>
		</>
	);
}
