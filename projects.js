/*
  EDIT YOUR PROJECTS HERE.

  Each project shows as a card. Clicking it opens a viewer with the screens
  (pages) of your system or app. There are no links to the live project.

  For each project:
    1. Make a folder: assets/project-1, assets/project-2, assets/project-3
    2. Put a cover image and your screenshots inside it
    3. Match the file names below (or change the names here)

  Add or remove screens by adding or removing lines in "screens".
  Until your images exist, the page shows dashed placeholders.
*/
window.PROJECTS = [
  {
    title: 'Manson Trading E-comerce Website',
    type: '[Web system / Website / Capstone project]',
    role: 'Full stack developer',
    tools: ['Figma', 'HTML', 'CSS', 'JavaScript'],
    summary: 'Manson trading is an e-commerce website that has an AI chatbot that allows users to browse and purchase products online and ask for anything that they need. I designed the user interface and implemented the front-end functionality and backend for the payment, ensuring a seamless shopping experience for customers.',
    cover: 'assets/project-1/manson-cover.jpg',
    screens: [
      { src: 'assets/project-1/Mansonlogin.png', caption: 'Login page' },
      { src: 'assets/project-1/Mansondashboard.png', caption: 'Dashboard' },
      { src: 'assets/project-1/Mansondetails.png', caption: 'Product Detail Page' },
      { src: 'assets/project-1/Mansoncart.png', caption: 'Cart Page' },
      { src: 'assets/project-1/Mansoncheckout.png', caption: 'Checkout Page' }
    ]
  },
  {
    title: 'TransitPH',
    type: '[Capstone system / Mobile app]',
    role: 'Front-end developer, Project manager',
    tools: ['TypeScript', 'HTML', 'CSS', 'JavaScript', 'Java'],
    summary: 'TransitPH is a mobile application that provides real-time public transportation information to commuters in the Philippines. I was responsible for developing the front-end interface, ensuring a user-friendly experience, and managing the project timeline and team coordination.',
    cover: 'assets/project-2/transitph-icon.png',
    screens: [
      { src: 'assets/project-2/TransitPH-login.jpg', caption: 'Login page' },
      { src: 'assets/project-2/TransitPH-home.jpg', caption: 'Home page' },
      { src: 'assets/project-2/TransitPH-Route.jpg', caption: 'Route' },
      { src: 'assets/project-2/TransitPH-Details.jpg', caption: 'Route Details' }
    ]
  },
  {
    title: 'Cinemabuddy',
    type: '[School project / Website]',
    role: 'UI/UX Designer',
    tools: ['Figma'],
    summary: 'Cinemabuddy is my 1st year project Mobile application UI/UX design using figma, that focuses the interface being a user friendly with bending a design that is appealing to the eye of the users.',
    cover: 'assets/project-3/cinemabuddy-cover.jpg',
    screens: [
      { src: 'assets/project-3/cinemabuddy-login.png', caption: 'login page' },
      { src: 'assets/project-3/cinemabuddy-dashboard.png', caption: 'dashboard page' },
      { src: 'assets/project-3/cinemabuddy-profile.png', caption: 'Profile page' },
      { src: 'assets/project-3/cinemabuddy-categories.png', caption: 'Categories page' },
      { src: 'assets/project-3/cinemabuddy-favorites.png', caption: 'Favorites page' }
    ]
  }
];
