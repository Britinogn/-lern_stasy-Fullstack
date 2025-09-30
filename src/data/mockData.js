export const courses = [
  {
    id: 1,
    title: "Introduction to Web Development",
    description: "Learn the fundamentals of HTML, CSS, and JavaScript to build modern websites.",
    category: "Web Development",
    price: 49.99,
    image: "/assets/images/web-dev-course.jpg",
    lessons: [
      {
        id: 1,
        title: "HTML Basics",
        content: "Introduction to HTML5, tags, and semantic structure.",
        videoLink: "https://example.com/videos/html-basics.mp4",
        duration: "15:30",
      },
      {
        id: 2,
        title: "CSS Styling",
        content: "Styling web pages with CSS, including Flexbox and Grid.",
        videoLink: "https://example.com/videos/css-styling.mp4",
        duration: "20:45",
      },
      {
        id: 3,
        title: "JavaScript Fundamentals",
        content: "Core JavaScript concepts: variables, functions, and events.",
        videoLink: "https://example.com/files/js-fundamentals.pdf",
        duration: "18:20",
      },
    ],
    students: [
      { id: 1, name: "Alice Johnson", email: "alice.johnson@example.com" },
      { id: 2, name: "Bob Smith", email: "bob.smith@example.com" },
    ],
  },
  {
    id: 2,
    title: "Data Science with Python",
    description: "Master data analysis, visualization, and machine learning using Python.",
    category: "Data Science",
    price: 79.99,
    image: "/assets/images/data-science-course.jpg",
    lessons: [
      {
        id: 1,
        title: "Python for Data Analysis",
        content: "Using Pandas and NumPy for data manipulation.",
        videoLink: "https://example.com/videos/python-data-analysis.mp4",
        duration: "25:00",
      },
      {
        id: 2,
        title: "Data Visualization",
        content: "Creating charts with Matplotlib and Seaborn.",
        videoLink: "https://example.com/files/data-viz.pdf",
        duration: "12:15",
      },
    ],
    students: [
      { id: 3, name: "Clara Davis", email: "clara.davis@example.com" },
      { id: 4, name: "David Lee", email: "david.lee@example.com" },
      { id: 5, name: "Emma Brown", email: "emma.brown@example.com" },
    ],
  },
  {
    id: 3,
    title: "Digital Photography",
    description: "Learn techniques for capturing stunning photos with any camera.",
    category: "Photography",
    price: 29.99,
    image: "/assets/images/photography-course.jpg",
    lessons: [
      {
        id: 1,
        title: "Camera Basics",
        content: "Understanding aperture, shutter speed, and ISO.",
        videoLink: "https://example.com/videos/camera-basics.mp4",
        duration: "10:00",
      },
    ],
    students: [],
  },
];