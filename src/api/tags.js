import {queryCache, useMutation, useQuery} from 'react-query';
import ajax from '../helper/ajax';

export function useTags() {
	return useQuery('tags', async () => {
		const {data} = await ajax.post('', {
			query: `
                query{
                    tags{
                    id
                    name
                    }
                }
                `,
		});
		return data;
	});
}

export function useCreateTag() {
  return useMutation(({name}) => {
		return ajax.post('', {
			query: `
            mutation($name: String){
              insert_tags_one(object: {
                  name : $name
                }){
                  id
                }
              }
                `,
       variables: {
         name
       }         
		});
	}, {onSuccess: function(data) {
        if(!data || data.errors) {
            return;
        }
        if(data.data.insert_tags_one) {
            queryCache.invalidateQueries("tags");
        }
    }});
}


export function useDeleteTags() {
    return useMutation((id) => {
		return ajax.post('', {
			query: `
            mutation{
                delete_tags(where: {id:{
                  _eq: ${id}
                }}){
                  affected_rows
                }
              }
                `,
		});
	}, {onSuccess: function({data}) {
        if(!data || data.errors) {
            return;
        }
        if(data.data.delete_tags.affected_rows) {
            queryCache.invalidateQueries("tags");
        }
    }});
}



