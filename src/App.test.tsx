import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

const renderApp = (route = '/') =>
  render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>
  );

test('renders the homepage without crashing', () => {
  renderApp('/');
  const container = document.querySelector('.netflix-container');
  expect(container).toBeInTheDocument();
});

test('renders the browse page without crashing', () => {
  renderApp('/browse');
  // browse page mounts without throwing
  expect(document.body).toBeInTheDocument();
});

test('renders the skills page without crashing', () => {
  renderApp('/skills');
  expect(document.body).toBeInTheDocument();
});

test('renders the projects page without crashing', () => {
  renderApp('/projects');
  expect(document.body).toBeInTheDocument();
});

test('renders the contact page without crashing', () => {
  renderApp('/contact-me');
  expect(document.body).toBeInTheDocument();
});
