import React, {useCallback} from 'react';
import {v4 as uuid} from 'uuid';
import Error from '../Error';
import ListItem from '../ListItem';
import Loading from '../Loading';

export default function List({tasks, isLoading, isError, deleteItem}) {
	const getTasks = useCallback(() => {
		return tasks.map((x) => {
			return <ListItem item={x} deleteItem={deleteItem} key={uuid()} />;
		});
    }, [deleteItem, tasks]);
    

	if(isLoading || !tasks) return <Loading />;
	
	if(isError) return <Error />

	return <div>{getTasks()}</div>;
}
