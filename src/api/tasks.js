import {useEffect, useState} from 'react';
import {queryCache, useMutation, useQuery} from 'react-query';
import ajax from '../helper/ajax';

export function useTasks(title = null) {
	const [where, setWhere] = useState('');

	useEffect(() => {
		if (!title) {
			setWhere('');
			return;
		}

		if (title) {
			setWhere(`
      ( where : {
        title : {
          _like : "%${title}%"
        }  
      })
      `);
			return;
		}
	}, [title]);

	return useQuery('tasks', async () => {
		const {data} = await ajax.post('', {
			query: `
      query {
        tasks ${where} {
           end_time
            id
            start_time
            title
             tags {
              id
              name
            }
        }
      }
      
      
      `,
		});
		return data;
	});
}

export function useCreateTask() {
	return useMutation(
		({title, tags = []}) => {
			return ajax
				.post('', {
					query: `mutation($title: String) { insert_tasks_one (object : {
    title: $title
    } ){
    id
  }
}
   `,
					variables: {
						title: title,
					},
				})
				.then(({data}) => {
					if (!tags) {
						return data;
					}
					const id = data.data.insert_tasks_one.id;
					const maps = tags.map((x) => {
						return {
							tag_id: x,
							task_id: id,
						};
					});
					return ajax.post('', {
						query: `
      mutation ($maps: [task_tag_insert_input!]!) {
        insert_task_tag (objects : $maps) {
       affected_rows
       }
       }
      `,
						variables: {
							maps: maps,
						},
					});
				});
		},
		{
			onSuccess: function ({data}) {
				if (!data || data.errors) {
					return;
				}
				if (data.data.insert_task_tag.affected_rows) {
					queryCache.invalidateQueries('tasks');
				}
			},
		}
	);
}

export function useDeleteTask() {
	return useMutation(
		(id) => {
			return ajax.post('', {
				query: `
          mutation{
              delete_tasks(where: {id:{
                _eq: ${id}
              }}){
                affected_rows
              }
            }
            
              `,
			});
		},
		{
			onSuccess: function ({data}) {
				if (!data || data.errors) {
					return;
				}
				if (data.data.delete_tasks.affected_rows) {
					queryCache.invalidateQueries('tasks');
				}
			},
		}
	);
}
