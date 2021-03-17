import React, { useEffect, useRef, useState } from 'react';
import useDetectOutsideClick from '../../hook/useDetectOutsideClick';

const InputEditable = ({
    text,
    onSave,
    inputClass,
    editable,
    hasButton,
    children,
}) => {
    const [newText, setNewText] = useState(text);
    const [saved, setSaved] = useState(false);

    const inputRef = useRef(null);
    const [isEditing, setIsEditing] = useDetectOutsideClick(inputRef, false);

    useEffect(() => {
        if (!isEditing && !saved) {
            if (text !== newText) {
                (async () => {
                    await onSave(newText);
                    setSaved(true);
                })();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEditing, saved]);

    useEffect(() => {
        setNewText(text);
    }, [text]);

    const handleTextChange = (event) => {
        setSaved(false);
        setNewText(event.target.value);
    };

    const handleKeyDown = (event) => {
        const { keyCode } = event;

        if (keyCode === 13 || keyCode === 9) handleSaveChanges();
        else if (keyCode === 27) handleCancel();
    };

    const handleSaveChanges = async () => {
        if (text !== newText) {
            await onSave(newText);
        }
        setSaved(true);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setNewText(text);
        setIsEditing(false);
    };

    if (!isEditing) {
        return <div onClick={() => setIsEditing(editable)}>{children}</div>;
    }

    return (
        <div ref={inputRef}>
            <input
                value={newText}
                onKeyDown={handleKeyDown}
                onChange={handleTextChange}
                className={inputClass}
            />

            {hasButton ? (
                <div>
                    <button onClick={handleSaveChanges}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            ) : null}
        </div>
    );
};

InputEditable.defaultProps = {
    editable: true,
};

export default InputEditable;
