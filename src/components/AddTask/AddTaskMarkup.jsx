/* eslint-disable eqeqeq */
import React from 'react';
import {v4 as uuid} from 'uuid';

import Chip from '../Chip';
import Modal from '../Modal';

export default function AddTaskMarkup({tags, toggleTaskPopup, setTask, selectedTags, visible, task, onClick}) {
	return (
		<>
			<button
                data-type="open"
				onClick={toggleTaskPopup}
				className="mt-2 float-right	mr-2 p-2 border-2 rounded text-teal-400 border-teal-400 hover:text-white hover:bg-teal-400"
			>
				Add Task
			</button>
			<Modal visible={visible} onClose={toggleTaskPopup} title="Add Task">
				<input
					className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
                    placeholder="Task Name"
                    onChange={e => {
                        setTask(e.target.value);
                    }}
                    value={task}
				/>
				<div className="flex flex-wrap">
					{tags.map((x) => {
						return <Chip id={x.id} label={x.name} key={uuid()} showDeleteIcon={selectedTags.indexOf(x.id) > -1} onClick={onClick} />;
					})}
				</div>
			</Modal>
		</>
	);
}
