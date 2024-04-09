import React from 'react'
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
export default function Editor(props) {
    const { NotesValue,setNotesValue,index} = props;
    const [value, setValue] = React.useState("");
    React.useEffect(() => {
        setValue(NotesValue[index]);
    }, [NotesValue,index]);
    const handleChangeValue = (value) => {
        if (value === "<p><br></p>") {
            value = '';
        }
        let newValue = [...NotesValue];
        newValue[index] = value;
        setNotesValue(newValue);
        setValue(value); 
    };

    return (
        <ReactQuill
            theme="snow"
            value={value}
            onChange={handleChangeValue} >
        </ReactQuill>
    );
}
