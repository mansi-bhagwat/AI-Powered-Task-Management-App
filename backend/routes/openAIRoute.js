import express from 'express';
import { Task } from '../models/taskModel.js';
import OpenAI from 'openai';

const router = express.Router();
const openai = new OpenAI({
  apiKey: API_KEY,
});

const isValidJson = (str) => {
  try {
    const parsed = JSON.parse(str);
    return parsed && typeof parsed === 'object';
  } catch (e) {
    return false;
  }
};

const createTaskFromDict = async (taskDict) => {
  const { task, description = '', priority, deadline } = taskDict;
  return await Task.create({
    task,
    description,
    priority,
    deadline: new Date(deadline)
  });
};

router.post('/chat', async (request, response) => {
  const { message } = request.body;

  try {

    const tasks = await Task.find({});
    const formattedTasks = tasks.map(task => `Task: ${task.task}, Priority: ${task.priority}, Deadline: ${task.deadline.toDateString()}`).join('\n');

    const systemMessage = "You are a task management assistant. If you are asked to list tasks, then list the tasks. If the user asks to add a new task, collect the required details for task name, description, priority and deadline and using these, return a JSON object with this structure: {\"task\": \"<Task Name>\", \"description\": \"<Task Description>\", \"priority\": <1-10>, \"deadline\": \"mm-dd-yyyy\"}. If the response is a dictionary following this structure, proceed directly with task creation. Otherwise, assist with general conversation.";
    
    const fullMessage = `${message}\n\nHere are my current list of tasks:\n${formattedTasks}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: fullMessage }
      ]
    });

    if (completion.choices && completion.choices.length > 0) {
      const chatbotResponse = completion.choices[0].message.content;

      if (isValidJson(chatbotResponse)) {
        const taskDict = JSON.parse(chatbotResponse);

        if (taskDict.task && taskDict.priority && taskDict.deadline) {
          await createTaskFromDict(taskDict);
          return response.status(200).json({ response: 'Task successfully added!' });
        }
      }

      response.status(200).json({ response: chatbotResponse });
    } else {
      throw new Error('Incomplete or missing data in OpenAI API response');
    }
  } catch (error) {
    console.error('Error when calling OpenAI:', error);
    response.status(500).json({ message: 'Failed to process chat with OpenAI' });
  }
});

export default router;
