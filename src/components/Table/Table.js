import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { PiDotsNineBold, PiNotePencilLight } from "react-icons/pi";
import { FaRegTrashAlt } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";
import { FaArrowLeft } from "react-icons/fa";
import { HiPlusSmall } from "react-icons/hi2";
import './Table.css';

const initialStates = [
    { id: 'state-1', name: 'State 1', variants: [{ name: 'Primary Variant', images: [] }] },
    { id: 'state-2', name: 'State 2', variants: [{ name: 'Variant 1', images: [] }] },
];

const Table = () => {
    const [states, setStates] = useState(initialStates);
    const [variantCount, setVariantCount] = useState(1);

    const handleAddState = () => {
        const newState = {
            id: `state-${states.length + 1}`,
            name: `State ${states.length + 1}`,
            variants: Array(variantCount).fill({ name: 'New Variant', images: [] }),
        };
        setStates([...states, newState]);
    };

    const handleRemoveState = (id) => {
        setStates(states.filter(state => state.id !== id));
    };

    const handleAddVariant = () => {
        setVariantCount(variantCount + 1);
        setStates(states.map(state => ({
            ...state,
            variants: [...state.variants, { name: 'New Variant', images: [] }]
        })));
    };

    const handleRemoveVariant = () => {
        if (variantCount > 1) {
            setVariantCount(variantCount - 1);
            setStates(states.map(state => ({
                ...state,
                variants: state.variants.slice(0, -1)
            })));
        }
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;
        const reorderedStates = Array.from(states);
        const [removed] = reorderedStates.splice(result.source.index, 1);
        reorderedStates.splice(result.destination.index, 0, removed);
        setStates(reorderedStates);
    };

    const handleImageUpload = (event, stateId, variantIndex) => {
        const files = Array.from(event.target.files);
        if (files.length === 0) return;

        const newImages = files.map(file => URL.createObjectURL(file));

        // Update the state with the new images
        setStates(states.map(state => {
            if (state.id === stateId) {
                const variants = [...state.variants];
                const updatedVariant = { ...variants[variantIndex], images: [...variants[variantIndex].images, ...newImages] };
                variants[variantIndex] = updatedVariant;
                return { ...state, variants };
            }
            return state;
        }));
    };

    const getTotalImagesCount = (variants) => {
        return variants.reduce((count, variant) => count + variant.images.length, 0);
    };

    return (
        <div className='container'>
            <div className='top-bar'>
                <h2 className='custom-underline'>
                    <button className='back'><FaArrowLeft size={ '30px' } className='icon' /></button>
                    Rules Creation
                </h2>
                <button className='top-btn'>Publish feed</button>
            </div>
            <div className="table-container">
                <DragDropContext onDragEnd={ onDragEnd }>
                    <Droppable droppableId="droppable-rows" type="ROW">
                        { (provided) => (
                            <table>
                                <thead>
                                    <tr>
                                        <th className='zero sticky-col left-col'></th>
                                        <th className='first sticky-col'>Product Filter</th>
                                        { Array.from({ length: variantCount }, (_, index) => (
                                            <th key={ index } className='second scrollable-col'>Variant { index + 1 }</th>
                                        )) }
                                        <th className='third scrollable-col'></th>
                                    </tr>
                                </thead>
                                <tbody ref={ provided.innerRef } { ...provided.droppableProps } >
                                    { states.map((state, index) => (
                                        <Draggable draggableId={ state.id } index={ index } key={ state.id }>
                                            { (provided) => (
                                                <tr
                                                    className='row'
                                                    ref={ provided.innerRef }
                                                    { ...provided.draggableProps }
                                                    { ...provided.dragHandleProps }
                                                >
                                                    <td className='sticky-col left-col zero'>
                                                        <div className='top0'>
                                                            <button onClick={ () => handleRemoveState(state.id) } className='top1 icon'><FaRegTrashAlt size={ '30px' } color='red' /></button>
                                                            <div className='firstcolumn'>
                                                                <div className='firstcol'>{ index + 1 }</div>
                                                                <div><PiDotsNineBold /></div></div></div>
                                                    </td>
                                                    <td className='productfil sticky-col first'>
                                                        <div className='product'>
                                                            {/* { state.name } */ }
                                                            <div className='image-count'>
                                                                Image list Product Image { getTotalImagesCount(state.variants) }<br />
                                                                AND discount Percentage
                                                            </div>
                                                        </div>
                                                    </td>
                                                    { state.variants.map((variant, i) => (
                                                        <td key={ i } className='scrollable-col imgc'>
                                                            <div className='imga'>
                                                                <input
                                                                    type="file"
                                                                    multiple
                                                                    onChange={ (e) => handleImageUpload(e, state.id, i) }
                                                                    style={ { display: 'none' } }
                                                                    id={ `file-upload-${state.id}-${i}` }
                                                                />
                                                                { variant.images.length === 0 ? (
                                                                    <button
                                                                        onClick={ () => document.getElementById(`file-upload-${state.id}-${i}`).click() }
                                                                        className=' no-images '>
                                                                        <HiPlusSmall size={ '20px' } />Add Images
                                                                    </button>
                                                                ) : (
                                                                    <button
                                                                        onClick={ () => document.getElementById(`file-upload-${state.id}-${i}`).click() }
                                                                        className='imgadd icon'>
                                                                        <PiNotePencilLight size={ '30px' } />
                                                                    </button>) }
                                                                { variant.images.map((imageUrl, index) => (
                                                                    <img key={ index } src={ imageUrl } alt="Variant" width="100" className='imgvar' />
                                                                )) }
                                                            </div>
                                                        </td>
                                                    )) }
                                                    { variantCount > state.variants.length &&
                                                        Array.from({ length: variantCount - state.variants.length }, (_, i) => (
                                                            <td key={ `empty-${i}` } className='scrollable-col'></td>
                                                        )) }
                                                    <td className='scrollable-col addvari'>
                                                        <div className='addvar'>
                                                            <button onClick={ handleAddVariant } className='btn-add'><CiSquarePlus size={ '50px' } /></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ) }
                                        </Draggable>
                                    )) }
                                    { provided.placeholder }
                                </tbody>
                            </table>
                        ) }
                    </Droppable>
                </DragDropContext>
                <button onClick={ handleAddState } className='sticky-col left-col top2'><CiSquarePlus size={ '40px' } /></button>
            </div>
        </div >
    );
};

export default Table;
