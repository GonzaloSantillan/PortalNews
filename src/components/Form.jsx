import  {FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import useNews from '../hooks/useNews';

const CATEGORIAS = [
    { value: 'general', label: 'General'},
    { value: 'business', label: 'Business'},
    { value: 'entertainment', label: 'Entertainment'},
    { value: 'health', label: 'Health'},
    { value: 'science', label: 'Science'},
    { value: 'sports', label: 'Sports'},
    { value: 'technology', label: 'Technology'},
]

const Form = () => {
    const { category, changeCategoryHandler } = useNews();

    return ( <form>
        <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select label="Category" onChange={changeCategoryHandler} value={category}>
                {CATEGORIAS.map(cat=>(
                    <MenuItem key={cat.value} value={cat.value}>
                        {cat.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    </form> );
}
 
export default Form;