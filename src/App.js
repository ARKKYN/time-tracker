import React, {useEffect, useState} from 'react';
import {v4 as uuid} from 'uuid';

import {useDeleteTags, useTags} from './api/tags';
import {useTasks, useDeleteTask} from './api/tasks';
import AddTask from './components/AddTask';
import AddTag from './components/AddTag';
import Chip from './components/Chip';
import List from './components/List/List';
import SearchBox from './components/SearchBox';
import Error from './components/Error';

function App() {
	const [search, setSearch] = useState('');
	const {
		data: tasksData,
		isFetching: isTasksLoading,
		isError: isTaskError,
		refetch: refetchTask,
	} = useTasks(search);
	const {data: tagsData, isError: isTagsError} = useTags();

	useEffect(() => {
		refetchTask();
	}, [refetchTask, search]);

	const [mutate] = useDeleteTask();
	const [deleteTagItem = mutate] = useDeleteTags();
	const deleteTask = (id) => async () => {
		// eslint-disable-next-line no-restricted-globals
		const doIt = confirm('Are You Sure want to delete ?');
		if (!doIt) return;

		try {
			await mutate(id);
		} catch (e) {}
	};

	const deleteTag = (id) => async () => {
		// eslint-disable-next-line no-restricted-globals
		const doIt = confirm('Are You Sure want to delete the Tag ?');
		if (!doIt) return;

		try {
			await deleteTagItem(id);
		} catch (e) {}
	};



	const tasks = tasksData ? (tasksData.data ? tasksData.data.tasks : []) : [];
	const taskHasErrors = (tasksData && tasksData.errors) || isTaskError;
	const tags = tagsData ? (tagsData.data ? tagsData.data.tags : []) : [];
	const tagsHasErrors = (tagsData && tagsData.errors) || isTagsError;

	if(tagsHasErrors){
		return <Error />;
	}

	return (
		<>
			<div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
				<div className="bg-white rounded shadow p-6 m-4  w-2/4 ">
					<div className="mb-4 overflow-hidden">
						<h1 className="text-4xl inline">Task Manager</h1>
						<AddTag />
						<AddTask tags={tags} />
						<SearchBox value={search} onSearch={setSearch} />
					</div>
					<h1 className="text-2xl">Tags</h1>
					<div className="flex mb-5 items-center border-2  border-black p-3">
					
						<div className="flex flex-wrap">
							{tags.map((x) => {
								return (
									<Chip
										id={x.id}
										label={x.name}
										key={uuid()}
										showDeleteIcon
										onClick={deleteTag(x.id)}
									/>
								);
							})}
						</div>
					</div>

					<h1 className="text-2xl">Tasks</h1>
					<List
						tasks={tasks}
						isLoading={isTasksLoading}
						isError={taskHasErrors}
						deleteItem={deleteTask}
					/>
				</div>
			</div>
		
		</>
	);
}

export default App;
