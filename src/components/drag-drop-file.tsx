// drag drop file component
import React, {useRef, useState} from "react";
import {Form} from "react-router-dom";
import {Box, Button, Flex, FormControl, Text, Input, Spacer} from "@chakra-ui/react";

export const DragDropFile = ({ onFileUploaded } : { onFileUploaded : (data: string) => void }) => {
    const [dragActive, setDragActive] = useState(false);
    const [invalidFile, setInvalidFile] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    // handle drag events
    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            try {
                onFileUploaded(await e.dataTransfer.files[0].text())
            } catch (err) {
                console.log(err);
                setInvalidFile(true);
            }
        }
    };

    // triggers when file is selected with click
    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            try {
                onFileUploaded(await e.target.files[0].text());
            } catch (err) {
                console.log(err);
                setInvalidFile(true);
            }
        }
    };

    const onButtonClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    return <FormControl border={invalidFile ? '1px solid red' : ''}   bg={dragActive ? 'fileupload.background.active' : 'fileupload.background.inactive' } height='30vh' borderRadius={15} onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
        <Input ref={inputRef} type='file' onChange={handleChange} hidden />
        <Box height='100%' onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop} >
            <Flex height='100%' direction='column'>
                <Spacer />
                <Text textAlign='center' fontSize='4vh'>Drag and drop your file here</Text>
                <Button onClick={onButtonClick} variant='link'>Choose file</Button>
                <Spacer />
            </Flex>
        </Box>
    </FormControl>

    // return (
    //     <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
    //         <input ref={inputRef} type="file" id="input-file-upload" multiple={true} onChange={handleChange} />
    //         <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : "" }>
    //             <div>
    //                 <p>Drag and drop your file here or</p>
    //                 <button className="upload-button" onClick={onButtonClick}>Upload a file</button>
    //             </div>
    //         </label>
    //         { dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
    //     </form>
    // );
};