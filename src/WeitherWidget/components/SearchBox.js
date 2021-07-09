import React from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
import SearchIcon from '@material-ui/icons/Search';
const SearchBox = (props) => {
    return (
        <InputGroup className="mb-4">
            <FormControl
                placeholder="Search for places..."
                aria-label="Search"
                aria-describedby="basic-addon1"
                name="search"
                className="search-input-box"
                aria-required="true"
                onChange={(e) => {
                    props.search(e.target.value)
                }}
            />
            <InputGroup.Prepend >
                <InputGroup.Text id="basic-addon1"><SearchIcon /></InputGroup.Text>
            </InputGroup.Prepend>
        </InputGroup>
    )
}
export default React.memo(SearchBox);