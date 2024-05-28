# Brain Bites

### Link to site

[Brain Bites](https://brain-bites.netlify.app/)

## Overview

Brain Bites is a full-stack flashcard study application designed to assist users in learning and retaining information. The application allows users to create custom decks of flashcards and add new cards to existing decks. With a user-friendly interface and intuitive features, Brain Bites streamlines the study process, making it convenient and effective.

## Languages Used:

### React, Python, TypeScript, Flask, SQLAlchemy, PostgreSQL, and Tailwind.

- Frontend: React and TypeScript for building the user interface, connecting to the backend and PostgreSQL database, and using Tailwind for styling and creating a responsive experience.

- Backend: Python, Flask, and SQLAlchemy for developing backend models, controllers, and serializers. PostgreSQL for the database.

## Project Progression:

### Planning and Design:

- Created a wireframe, pseudocode, and planned models and relationships for the needed components.

- Developed a dynamic and reusable model template for decks and cards.

### Model Complexity and Relationships:

- Designed complex models with relationships to handle deck and card integration, ensuring relevant cards are displayed with their associated decks.

- Implemented user permissions to distinguish between regular users and visitors.

### Creating the Study Feature:

- Developed a study component to review flashcards from a particular deck.

- Incorporated logic to display cards in random order and track user progress within a study session.

### Developing the Deck Libraries:

- Designed a deck library to manage all user-created decks, with options to create new decks or update existing ones.

- Added a feature to view deck details, including all cards within the deck, and to study the entire deck.

## Key learnings:

- Learned how to create simple and complex models that used different relationships between them.

- Learned how to incorporate APIs that require a key to implement them into the components without having to display a personal key.

- Learned about the various features that already come with React that can be used to perform certain functions or actions.

## Challenges:

- Creating model relationships between decks and cards to link them correctly for studying or viewing specific decks.

- Configuring backend controllers for the main components.

## Future improvements:

- Incorporate an SM-2 model for spaced-repetition study with flashcards.

- Add animations for a more unique experience when flipping through cards.

- Create an admin dashboard and user management system for profile customization.

- Add more unit testing for new features.

- Develop a dashboard to track and display progress of studied decks and cards marked as difficult.

## Bugs:

- Switching between pages sometimes doesn't load the component correctly due to URL redirection issues.
