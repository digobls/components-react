import React, {useEffect, useState} from 'react';
import {RiCloseLine} from '@remixicon/react';
import DefaultLabel from './DefaultLabel';
import InputError from "./InputError";

const InputTag = ({
                      id = '',
                      label = '',
                      isRequired = false,
                      disable = false,
                      placeholder = '',
                      showRemoveTag = true,
                      register,
                      errors,
                      invalidMsg = 'Campo obrigatório!',
                      setValue,
                      watch
                  }) => {
    const [tag, setTag] = useState('');
    const [listTags, setListTags] = useState([]);

    useEffect(() => {
        const dataValue = watch(id) || [];
        setListTags(dataValue);
    }, [watch, id, watch(id)]);

    // On key down
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.key === 'Tab' || event?.code === 'Space') {
            handleAddTag(event);
        }
    };

    // Add value from input tag
    const handleAddTag = (event) => {
        const inputValue = tag.trim();
        if (inputValue) {
            if (listTags.includes(inputValue)) {
                setTag('');
            } else {
                setListTags([...listTags, inputValue]);
                setValue(id, [...listTags, inputValue], {
                    shouldValidate: true
                });
                setTag('');
            }
        }

        event.target.value = '';
    };

    // Remove value from input tag
    const handleRemoveTag = (index) => {
        const updatedList = listTags.filter((data, i) => i !== index);
        setListTags(updatedList);
        setValue(id, updatedList);
    };

    return (
        <div className="default-input-type">
            <DefaultLabel id={id} label={label} isRequired={isRequired}/>

            <div className={`custom-input-tag ${disable ? 'disable-input-tag' : ''}`}>
                {listTags.map((tag, index) => (
                    <p key={index} className="tag-item">
                        <span>{tag}</span>
                        {showRemoveTag && !disable && (
                            <span className="remove-tag" onClick={() => handleRemoveTag(index)}><RiCloseLine size="13"/></span>
                        )}
                    </p>
                ))}
                <input
                    id={id}
                    name={id}
                    type="text"
                    disabled={disable}
                    {...register(id, {
                        required: isRequired ? invalidMsg : false,
                    })}
                    className="input-hidden"/>

                {!disable &&
                    <input
                        id="defaultTag"
                        name="defaultTag"
                        type="text"
                        className="input-tag"
                        value={tag}
                        placeholder={placeholder}
                        onKeyDown={handleKeyDown}
                        onBlur={handleAddTag}
                        onChange={(e) => setTag(e.target.value)}
                        disabled={disable}/>
                }
                {disable && !listTags.length && (<span className="placeholder">{placeholder}</span>)}
            </div>

            <InputError id={id} errors={errors}/>
        </div>
    );
};

export default InputTag;