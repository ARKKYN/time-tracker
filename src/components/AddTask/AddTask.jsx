/* eslint-disable eqeqeq */
import React, {useState} from 'react';
import { useCreateTask } from '../../api/tasks';

import AddTaskMarkup from './AddTaskMarkup';

export default function AddTask({tags}) {
	const [visible, setVisible] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);
    const [task, setTask] = useState("");
    const [mutate] = useCreateTask();

	const toggleTaskPopup = async (e) => {
        const buttonType = e.currentTarget.dataset["type"];
        
        if(buttonType) {
            setVisible((x) => !x);
            return;
        }
        

        if(!task) {
            alert("Please add a name");
            return;
        }
        try {
			await mutate({title: task, tags : selectedTags});
		} catch (e) {}
		setVisible((x) => !x);
    };

    const onClick = (e) => {     
        const id = e.currentTarget.dataset["id"];
        if(selectedTags.indexOf(Number(id)) > -1) {
            const temp = selectedTags.filter(x => x != id);

           setSelectedTags(temp);
           return;
        }

        setSelectedTags(x => [...x, Number(id)]);
    }


	return (<AddTaskMarkup  { ...({ tags, toggleTaskPopup, setTask, selectedTags, visible, task, onClick})}    />
    );
}
