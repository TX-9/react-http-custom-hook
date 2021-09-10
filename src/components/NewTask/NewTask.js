import { useState } from 'react';
import useHttp from '../../hooks/use-http';

import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = (props) => {
  const { isLoading, error, sendRequest: sendTaskRequest } = useHttp();
  
  const createTask = (taskText, taskData) => {
      const generatedId = taskData.name; // firebase-specific => "name" contains generated id
      const createdTask = { id: generatedId, text: taskText };
      props.onAddTask(createdTask);
  }
  const enterTaskHandler = async (taskText) => {
    sendTaskRequest({
      url: 'https://react-custom-hook-a1387-default-rtdb.firebaseio.com/tasks.json',
      method: 'POST',    
      headers: {
        'Content-Type': 'application/json',
      },
      body: { text: taskText }
    }, createTask.bind(null, taskText)); // pre-configure 1st parameter. 2nd parameter will be passed by custom hook
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
