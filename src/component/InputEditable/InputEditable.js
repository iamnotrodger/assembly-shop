import React, { useEffect, useRef, useState } from 'react';
import useDetectOutsideClick from '../../hook/useDetectOutsideClick';

import './InputEditable.scss';

const InputEditable = ({
    text,
    onSave,
    className,
    editable,
    hasButton,
    dynamic,
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

    const handleSaveChanges = async (event) => {
        if (event) event.preventDefault();
        if (text !== newText) {
            await onSave(newText);
        }
        setSaved(true);
        setIsEditing(false);
    };

    const handleCancel = (event) => {
        if (event) event.preventDefault();
        setNewText(text);
        setIsEditing(false);
    };

    return (
        <div
            ref={inputRef}
            className={`input-editable ${
                isEditing ? 'input-editable--is-editing' : ''
            }`}>
            <label
                className={`input-editable__label ${
                    editable ? 'input-editable--editable' : ''
                }
                `}
                onClick={() => setIsEditing(editable)}>
                <div className='input-editable__child'>{children}</div>
                <input
                    type='text'
                    size={dynamic ? newText.length || 0 : null}
                    className={`input-editable__input ${className || ''}`}
                    value={newText}
                    onKeyDown={handleKeyDown}
                    onChange={handleTextChange}
                />
            </label>

            {hasButton ? (
                <div className='input-editable__buttons'>
                    <i
                        className='material-icons input-editable__icon input-editable__icon--save'
                        onClick={handleSaveChanges}>
                        save
                    </i>
                    <i
                        className='material-icons input-editable__icon input-editable__icon--cancel'
                        onClick={handleCancel}>
                        clear
                    </i>
                </div>
            ) : null}
        </div>
    );
};

InputEditable.defaultProps = {
    editable: true,
};

export default InputEditable;
