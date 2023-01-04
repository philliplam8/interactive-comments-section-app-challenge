# Frontend Mentor - Interactive comments section solution

This is a solution to the [Interactive comments section challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

- 👉 Live Site: [DEMO](https://interactive-comments-section-app-challenge.vercel.app//)
- [GitHub Repository](https://github.com/philliplam8/interactive-comments-section-app-challenge)

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, Read, Update, and Delete comments and replies
- Upvote and downvote comments
- **Bonus**: If you're building a purely front-end project, use `localStorage` to save the current state in the browser that persists when the browser is refreshed.
- **Bonus**: Instead of using the `createdAt` strings from the `data.json` file, try using timestamps and dynamically track the time since the comment or reply was posted.

### Screenshot

#### Desktop

#### Mobile

![](./screenshot.jpg)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Next.js](https://nextjs.org/) - React framework
- [TailwindCSS](https://tailwindcss.com/) - For styles
- [ReactIcons](https://react-icons.github.io/react-icons) - For Icons

### What I learned

This was a fun but tough challenge, especially when trying to create reusable components for the comments with their nested replies.

**Problem**

Something I've been struggling to fix is a NextJS + localStorage related issue. I wanted to store the user preferences for Dark/Light mode in localStorage, however since NextJS does server side rendering, it will not see the user's preferences initially before the page renders, and will use the default theme value.

**Example Test Case**

- User chooses Dark Mode -> refreshes page
- NextJS will take the default theme state (Light Mode) and show light mode briefly
- After client side loads, app will check local storage (client side storage), and change to Dark Mode
- This causes a brief "flickering" effect :(

**Extra fun stuff**

I reused the nav component design from the e-Commerce Product Page Frontend Mentor challenge to add some more features:

- Ability to swap demo users from the design mockup
- Ability to sign in with a live user using Firebase Auth (with providers for Google, Twitter, Github)
- Dark/Light Mode
- Skeleton Loading

### Continued development

I was originally thinking of using the Firebase Realtime database and even flattened the JSON file provided to prepare for this, but for the sake of a demo site that publicly available, I chose to store all comments on localStorage for now so that nothing sensitive can be submitted. As a next step, connecting to a live database instead of using `localStorage` would be an interesting challenge.

## Author

- Frontend Mentor - [@philliplam8](https://www.frontendmentor.io/profile/philliplam8)
