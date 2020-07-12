/* eslint-disable eqeqeq */
import React, {useState} from 'react';
import { useCreateTag } from '../../api/tags';
import AddTagsMarkup from './AddTagsMarkup';

export default function AddTask() {
	const [visible, setVisible] = useState(false);
    const [tag, setTag] = useState("");
    const [mutate] = useCreateTag();

	const toggleTagPopup = async (e) => {
        const buttonType = e.currentTarget.dataset["type"];
        
        if(buttonType) {
            setVisible((x) => !x);
            return;
        }
        

        if(!tag) {
            alert("Please add a name");
            return;
        }
        try {
			await mutate({name: tag});
		} catch (e) {}
		setVisible((x) => !x);
    };



	return (
		<AddTagsMarkup {...({ visible, tag, setTag, toggleTagPopup })} />
	);
}
