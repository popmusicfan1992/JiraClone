import React, { useState } from 'react';
import _ from 'lodash';
import { DragDropContext, Droppable, provided, Draggable } from 'react-beautiful-dnd';

export default function LibDragDrop(props) {

    const [ state, setState ] = useState({
        ToDo: {
            id: 'ToDo',
            items: [
                { id: '1', taskName: 'Task 1' },
                { id: '2', taskName: 'Task 2' },
                { id: '3', taskName: 'Task 3' },
            ]
        },
        inProgress: {
            id: 'inProgress',
            items: [
                { id: '4', taskName: 'Task 4' },
                { id: '5', taskName: 'Task 5' },
                { id: '6', taskName: 'Task 6' },
            ]
        },
        done: {
            id: 'done',
            items: [
                { id: '7', taskName: 'Task 7' },
                { id: '8', taskName: 'Task 8' },
                { id: '9', taskName: 'Task 9' },
            ]
        }

    });
    const handleDragEnd = (result) => {
        let { destination, source } = result;

        // copy drag đang kéo
        let itemSourceCopy = { ...state[ source.droppableId ]?.items[ source.index ] };
        console.log('itemcoppy', itemSourceCopy);
        //Dropable bắt đầu kéo vào
        let index = state[ source.droppableId ].items.findIndex(item => item.id === itemSourceCopy.id);

        state[ source.droppableId ].items.splice(index, 1);

        //dropable đc kéo vào
        let dropDestination = state[ destination.droppableId ].items;
        dropDestination.splice(destination.index, 0, itemSourceCopy);
        setState(state);
    };

    return (
        <div className='container'>
            <DragDropContext onDragEnd={handleDragEnd}>
                <h3 className='text-center display-4'>Demo DraggAndDropp DND</h3>
                <div className='row'>
                    {_.map(state, (statusTask, index) => {
                        return <Droppable droppableId={statusTask.id} key={index}>
                            {(provided) => {
                                return <div className='col-4'>
                                    <h3 className='text-dark text-center'>{statusTask.id}</h3>
                                    <div className='bg-dark p-5' key={index} ref={provided.innerRef}{...provided.droppableProps}>
                                        {statusTask.items.map((item, index) => {
                                            return <Draggable key={item.id} index={index} draggableId={item.id}>
                                                {(provided) => {
                                                    return <div className='mt-2 p-3 bg-white text-center' ref={provided.innerRef}{...provided.draggableProps}{...provided.dragHandleProps}>
                                                        {item.taskName}
                                                    </div>;
                                                }}
                                            </Draggable>;
                                        })}
                                        {provided.placeholder}
                                    </div>;
                                </div>;
                            }}
                        </Droppable>;
                    })}
                </div>
            </DragDropContext>
        </div>
    );
}
