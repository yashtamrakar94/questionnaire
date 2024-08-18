import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import App from '../App';

test('completes a full run and displays the correct score', async () => {
  render(<App />);

  for (let i = 0; i < 5; i++) {
    const yesButton = await screen.findByRole('button', { name: /yes/i });
    fireEvent.click(yesButton);
  }

  const score = await screen.findByText(/your score for this run: 100%/i);
  expect(score).toBeInTheDocument();

  const averageScore = await screen.findByText(/average score for all runs: 100%/i);
  expect(averageScore).toBeInTheDocument();
});

test('starts a new run after completion', async () => {
  render(<App />);

  for (let i = 0; i < 5; i++) {
    const yesButton = await screen.findByRole('button', { name: /yes/i });
    fireEvent.click(yesButton);
  }

  const startNewRunButton = await screen.findByRole('button', { name: /start new run/i });
  fireEvent.click(startNewRunButton);

  const question = await screen.findByText(/can you code in ruby\?/i);
  expect(question).toBeInTheDocument();
});

test('calculates score correctly with mixed answers', async () => {
    render(<App />);
  
    for (let i = 0; i < 2; i++) {
      const yesButton = await screen.findByRole('button', { name: /yes/i });
      fireEvent.click(yesButton);
    }
  
    for (let i = 0; i < 3; i++) {
      const noButton = await screen.findByRole('button', { name: /no/i });
      fireEvent.click(noButton);
    }
  
    const score = await screen.findByText(/your score for this run: 40%/i);
    expect(score).toBeInTheDocument();
  
    const averageScore = await screen.findByText(/Average score for all runs/i);
    expect(averageScore).toBeInTheDocument();
  });

  test('displays correct average score after multiple runs', async () => {
    render(<App />);
  
    for (let i = 0; i < 5; i++) {
      const yesButton = await screen.findByRole('button', { name: /yes/i });
      fireEvent.click(yesButton);
    }
  
    let startNewRunButton = await screen.findByRole('button', { name: /start new run/i });
    fireEvent.click(startNewRunButton);
  
    for (let i = 0; i < 3; i++) {
      const yesButton = await screen.findByRole('button', { name: /yes/i });
      fireEvent.click(yesButton);
    }
  
    for (let i = 0; i < 2; i++) {
      const noButton = await screen.findByRole('button', { name: /no/i });
      fireEvent.click(noButton);
    }
  
    const averageScore = await screen.findByText(/average score for all runs: 80%/i);
    expect(averageScore).toBeInTheDocument();
  });

  test('displays the correct question at each step', async () => {
    render(<App />);
  
    const firstQuestion = await screen.findByText(/can you code in ruby\?/i);
    expect(firstQuestion).toBeInTheDocument();
  
    const yesButton = await screen.findByRole('button', { name: /yes/i });
    fireEvent.click(yesButton);
  
    const secondQuestion = await screen.findByText(/can you code in javascript\?/i);
    expect(secondQuestion).toBeInTheDocument();
  
    fireEvent.click(yesButton);
  
    const thirdQuestion = await screen.findByText(/can you code in swift\?/i);
    expect(thirdQuestion).toBeInTheDocument();
  });

  test('resets state correctly on starting a new run', async () => {
    render(<App />);
  
    // Complete the first run
    for (let i = 0; i < 5; i++) {
      const yesButton = await screen.findByRole('button', { name: /yes/i });
      fireEvent.click(yesButton);
    }
  
    const startNewRunButton = await screen.findByRole('button', { name: /start new run/i });
    fireEvent.click(startNewRunButton);
  
    // Ensure state is reset
    const firstQuestion = await screen.findByText(/can you code in ruby\?/i);
    expect(firstQuestion).toBeInTheDocument();
  
    const previousScore = screen.queryByText(/your score for this run:/i);
    expect(previousScore).not.toBeInTheDocument();
  });