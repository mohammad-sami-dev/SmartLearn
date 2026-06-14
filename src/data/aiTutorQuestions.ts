// AI Tutor Question Bank - 100 Pre-loaded Q&A pairs
// This is a prototype implementation with pattern-based responses

export interface QAPair {
  id: string;
  category: string;
  question: string;
  answer: string;
  keywords: string[];
}

export const aiTutorQuestionBank: QAPair[] = [
  // Programming & Computer Science (30 questions)
  {
    id: "cs1",
    category: "Programming",
    question: "What is a variable in programming?",
    answer: "A variable is a named storage location in memory that holds a value. Think of it as a labeled box where you can store data. The value can change during program execution, which is why it's called a 'variable'. For example, in Python: x = 10 stores the number 10 in a variable named x.",
    keywords: ["variable", "programming", "storage", "memory", "data"],
  },
  {
    id: "cs2",
    category: "Programming",
    question: "What is a function?",
    answer: "A function is a reusable block of code that performs a specific task. It takes inputs (called parameters), processes them, and returns an output. Functions help organize code, make it reusable, and easier to maintain. Example: def add(a, b): return a + b",
    keywords: ["function", "method", "reusable", "code", "parameters"],
  },
  {
    id: "cs3",
    category: "Programming",
    question: "What is a loop?",
    answer: "A loop is a programming construct that repeats a block of code multiple times. Common types include 'for' loops (repeat a specific number of times) and 'while' loops (repeat while a condition is true). Example: for i in range(5): print(i) prints numbers 0 to 4.",
    keywords: ["loop", "for", "while", "iteration", "repeat"],
  },
  {
    id: "cs4",
    category: "Data Structures",
    question: "What is an array?",
    answer: "An array is a data structure that stores multiple values of the same type in contiguous memory locations. Each element is accessed using an index (position number). Arrays have fixed size and provide fast access to elements. Example: numbers = [1, 2, 3, 4, 5]",
    keywords: ["array", "list", "data structure", "index", "collection"],
  },
  {
    id: "cs5",
    category: "Data Structures",
    question: "What is a linked list?",
    answer: "A linked list is a data structure where elements (nodes) are connected through pointers. Each node contains data and a reference to the next node. Unlike arrays, linked lists don't need contiguous memory and can grow dynamically. Useful for frequent insertions and deletions.",
    keywords: ["linked list", "node", "pointer", "data structure", "dynamic"],
  },
  {
    id: "cs6",
    category: "Algorithms",
    question: "What is time complexity?",
    answer: "Time complexity measures how the runtime of an algorithm grows as input size increases. It's expressed using Big O notation. O(1) is constant, O(n) is linear, O(n²) is quadratic. Understanding time complexity helps you write efficient code.",
    keywords: ["time complexity", "big o", "algorithm", "efficiency", "performance"],
  },
  {
    id: "cs7",
    category: "Algorithms",
    question: "What is binary search?",
    answer: "Binary search is an efficient algorithm for finding an item in a sorted array. It repeatedly divides the search interval in half. If the target value is less than the middle element, search the left half; otherwise, search the right half. Time complexity: O(log n).",
    keywords: ["binary search", "algorithm", "sorted", "search", "divide"],
  },
  {
    id: "cs8",
    category: "OOP",
    question: "What is object-oriented programming?",
    answer: "Object-Oriented Programming (OOP) is a paradigm that organizes code around 'objects' containing data and methods. Key principles: Encapsulation (bundling data and methods), Inheritance (creating classes based on existing ones), Polymorphism (objects taking many forms), and Abstraction (hiding complex details).",
    keywords: ["oop", "object", "class", "inheritance", "encapsulation"],
  },
  {
    id: "cs9",
    category: "OOP",
    question: "What is inheritance?",
    answer: "Inheritance is an OOP concept where a new class (child/subclass) is created based on an existing class (parent/superclass). The child class inherits properties and methods from the parent, and can add its own or override inherited ones. This promotes code reuse and hierarchical relationships.",
    keywords: ["inheritance", "parent", "child", "class", "extends"],
  },
  {
    id: "cs10",
    category: "OOP",
    question: "What is polymorphism?",
    answer: "Polymorphism means 'many forms' - it allows objects of different classes to be treated as objects of a common parent class. Method overriding (runtime) and method overloading (compile-time) are examples. It enables flexibility and makes code more maintainable.",
    keywords: ["polymorphism", "override", "overload", "many forms", "oop"],
  },

  // Machine Learning & AI (20 questions)
  {
    id: "ml1",
    category: "Machine Learning",
    question: "What is machine learning?",
    answer: "Machine Learning is a subset of AI where computers learn from data without being explicitly programmed. Instead of writing rules, we feed examples to algorithms that discover patterns. Three types: Supervised (labeled data), Unsupervised (unlabeled data), and Reinforcement (learning through rewards).",
    keywords: ["machine learning", "ai", "supervised", "unsupervised", "data"],
  },
  {
    id: "ml2",
    category: "Machine Learning",
    question: "What is a neural network?",
    answer: "A neural network is a computing system inspired by biological neural networks. It consists of layers of interconnected nodes (neurons) that process information. Input layer receives data, hidden layers process it through weighted connections and activation functions, and output layer produces results. Used for complex pattern recognition.",
    keywords: ["neural network", "neurons", "layers", "deep learning", "ai"],
  },
  {
    id: "ml3",
    category: "Machine Learning",
    question: "What is supervised learning?",
    answer: "Supervised learning uses labeled training data where each example has input features and a known output (label). The algorithm learns to map inputs to outputs by minimizing prediction errors. Examples: classification (spam/not spam) and regression (predicting house prices).",
    keywords: ["supervised", "labeled", "training", "classification", "regression"],
  },
  {
    id: "ml4",
    category: "Machine Learning",
    question: "What is unsupervised learning?",
    answer: "Unsupervised learning works with unlabeled data to discover hidden patterns or structures. Common techniques include clustering (grouping similar items) and dimensionality reduction (simplifying data). No predefined outputs - the algorithm finds its own patterns. Example: customer segmentation.",
    keywords: ["unsupervised", "clustering", "patterns", "unlabeled", "segmentation"],
  },
  {
    id: "ml5",
    category: "Machine Learning",
    question: "What is overfitting?",
    answer: "Overfitting occurs when a model learns the training data too well, including noise and outliers, leading to poor performance on new data. It's like memorizing answers instead of understanding concepts. Solutions: use more training data, regularization, cross-validation, or simpler models.",
    keywords: ["overfitting", "training", "generalization", "model", "validation"],
  },
  {
    id: "ml6",
    category: "Machine Learning",
    question: "What is backpropagation?",
    answer: "Backpropagation is the algorithm used to train neural networks. It calculates the gradient of the loss function with respect to each weight by propagating errors backward through the network. These gradients are then used to update weights via gradient descent, minimizing prediction errors.",
    keywords: ["backpropagation", "gradient", "training", "neural network", "weights"],
  },
  {
    id: "ml7",
    category: "Machine Learning",
    question: "What is a loss function?",
    answer: "A loss function (or cost function) measures how far the model's predictions are from actual values. It quantifies the error. Common examples: Mean Squared Error (MSE) for regression, Cross-Entropy for classification. Training aims to minimize this loss through optimization algorithms.",
    keywords: ["loss function", "cost", "error", "optimization", "training"],
  },
  {
    id: "ml8",
    category: "Machine Learning",
    question: "What is gradient descent?",
    answer: "Gradient descent is an optimization algorithm that iteratively adjusts model parameters to minimize the loss function. It moves in the direction of steepest descent (negative gradient). Learning rate controls step size. Variants include Stochastic GD, Mini-batch GD, and Adam optimizer.",
    keywords: ["gradient descent", "optimization", "learning rate", "minimize", "training"],
  },
  {
    id: "ml9",
    category: "Machine Learning",
    question: "What is an activation function?",
    answer: "Activation functions introduce non-linearity into neural networks, enabling them to learn complex patterns. Common functions: ReLU (returns max(0,x)), Sigmoid (outputs 0-1), Tanh (-1 to 1), Softmax (for multi-class). Without activation functions, neural networks would just be linear regression.",
    keywords: ["activation function", "relu", "sigmoid", "non-linear", "neural network"],
  },
  {
    id: "ml10",
    category: "Machine Learning",
    question: "What is regularization?",
    answer: "Regularization prevents overfitting by adding a penalty term to the loss function. L1 regularization (Lasso) adds sum of absolute weights, L2 (Ridge) adds sum of squared weights. Dropout randomly disables neurons during training. These techniques help the model generalize better to new data.",
    keywords: ["regularization", "l1", "l2", "overfitting", "dropout"],
  },

  // Mathematics & Statistics (15 questions)
  {
    id: "math1",
    category: "Mathematics",
    question: "What is calculus?",
    answer: "Calculus is the mathematics of change and motion. It has two main branches: Differential Calculus (studying rates of change and slopes) and Integral Calculus (studying accumulation and areas). Key concepts: derivatives (instantaneous rate of change) and integrals (total accumulation). Essential for physics, engineering, and machine learning.",
    keywords: ["calculus", "derivative", "integral", "mathematics", "change"],
  },
  {
    id: "math2",
    category: "Mathematics",
    question: "What is a derivative?",
    answer: "A derivative measures how a function changes as its input changes - it's the instantaneous rate of change or slope at a point. Notation: f'(x) or df/dx. Example: if f(x) = x², then f'(x) = 2x. Used in optimization, physics (velocity, acceleration), and training neural networks.",
    keywords: ["derivative", "rate of change", "slope", "calculus", "gradient"],
  },
  {
    id: "math3",
    category: "Mathematics",
    question: "What is linear algebra?",
    answer: "Linear algebra studies vectors, matrices, and linear transformations. Core concepts: vector spaces, matrix operations (addition, multiplication), determinants, eigenvalues. Essential for computer graphics, quantum mechanics, and especially machine learning where data is represented as matrices.",
    keywords: ["linear algebra", "matrix", "vector", "transformation", "eigenvalue"],
  },
  {
    id: "math4",
    category: "Statistics",
    question: "What is probability?",
    answer: "Probability measures the likelihood of an event occurring, expressed as a number between 0 (impossible) and 1 (certain). Basic rules: P(A or B) = P(A) + P(B) - P(A and B), P(not A) = 1 - P(A). Foundation for statistics, machine learning, and decision-making under uncertainty.",
    keywords: ["probability", "likelihood", "statistics", "chance", "random"],
  },
  {
    id: "math5",
    category: "Statistics",
    question: "What is standard deviation?",
    answer: "Standard deviation measures how spread out data is from the mean (average). Low SD means data points cluster near the mean; high SD means they're spread out. Formula: σ = √(Σ(x - μ)²/N). Used to quantify variability in datasets and understand data distribution.",
    keywords: ["standard deviation", "variance", "spread", "statistics", "mean"],
  },

  // Database & SQL (10 questions)
  {
    id: "db1",
    category: "Database",
    question: "What is SQL?",
    answer: "SQL (Structured Query Language) is a standard language for managing relational databases. It's used to create, read, update, and delete data (CRUD operations). Common commands: SELECT (retrieve data), INSERT (add data), UPDATE (modify data), DELETE (remove data), CREATE TABLE (define structure).",
    keywords: ["sql", "database", "query", "select", "crud"],
  },
  {
    id: "db2",
    category: "Database",
    question: "What is a primary key?",
    answer: "A primary key is a unique identifier for each record in a database table. It must be unique (no duplicates) and cannot be NULL. Examples: student_id, order_id. Primary keys ensure data integrity and are used to create relationships between tables via foreign keys.",
    keywords: ["primary key", "unique", "identifier", "database", "table"],
  },
  {
    id: "db3",
    category: "Database",
    question: "What is a JOIN in SQL?",
    answer: "JOIN combines rows from two or more tables based on a related column. Types: INNER JOIN (matching rows in both tables), LEFT JOIN (all rows from left table), RIGHT JOIN (all rows from right table), FULL JOIN (all rows from both). Example: SELECT * FROM orders JOIN customers ON orders.customer_id = customers.id",
    keywords: ["join", "sql", "inner join", "left join", "tables"],
  },
  {
    id: "db4",
    category: "Database",
    question: "What is normalization?",
    answer: "Database normalization organizes data to reduce redundancy and improve integrity. Forms: 1NF (atomic values), 2NF (no partial dependencies), 3NF (no transitive dependencies). Goal: each piece of data stored in only one place. Prevents update anomalies and saves storage space.",
    keywords: ["normalization", "database", "redundancy", "integrity", "1nf"],
  },
  {
    id: "db5",
    category: "Database",
    question: "What is an index?",
    answer: "An index is a database structure that speeds up data retrieval by creating a quick lookup mechanism, like a book index. It stores pointers to data locations. Advantages: faster queries. Disadvantages: slower inserts/updates, uses storage. Create on columns frequently used in WHERE, JOIN, or ORDER BY clauses.",
    keywords: ["index", "database", "performance", "query", "optimization"],
  },

  // Web Development (10 questions)
  {
    id: "web1",
    category: "Web Development",
    question: "What is HTML?",
    answer: "HTML (HyperText Markup Language) is the standard language for creating web pages. It defines structure and content using elements (tags). Example: <h1> for headings, <p> for paragraphs, <a> for links. HTML5 added semantic elements like <header>, <nav>, <article>. Not a programming language - it's a markup language.",
    keywords: ["html", "web", "markup", "tags", "elements"],
  },
  {
    id: "web2",
    category: "Web Development",
    question: "What is CSS?",
    answer: "CSS (Cascading Style Sheets) styles HTML elements - colors, fonts, layouts, spacing. Selectors target elements, properties define styles. Example: h1 { color: blue; font-size: 24px; }. Modern CSS includes Flexbox (1D layouts), Grid (2D layouts), and animations. Separates presentation from content.",
    keywords: ["css", "style", "web", "design", "layout"],
  },
  {
    id: "web3",
    category: "Web Development",
    question: "What is JavaScript?",
    answer: "JavaScript is a programming language that makes web pages interactive. Runs in browsers and on servers (Node.js). Features: variables, functions, objects, events, async operations. Can manipulate DOM (document structure), handle user input, make API calls. Essential for modern web development.",
    keywords: ["javascript", "programming", "web", "interactive", "dom"],
  },
  {
    id: "web4",
    category: "Web Development",
    question: "What is React?",
    answer: "React is a JavaScript library for building user interfaces, especially single-page applications. Key concepts: Components (reusable UI pieces), JSX (HTML-like syntax), State (component data), Props (passing data), Hooks (useState, useEffect). Created by Facebook, widely used for modern web apps.",
    keywords: ["react", "component", "jsx", "state", "frontend"],
  },
  {
    id: "web5",
    category: "Web Development",
    question: "What is an API?",
    answer: "API (Application Programming Interface) is a set of rules that allows different software to communicate. REST APIs use HTTP methods (GET, POST, PUT, DELETE) to perform operations on resources. Example: a weather API lets your app fetch weather data. APIs enable integration between different systems.",
    keywords: ["api", "rest", "http", "integration", "web service"],
  },

  // General CS Concepts (15 questions)
  {
    id: "gen1",
    category: "Computer Science",
    question: "What is an algorithm?",
    answer: "An algorithm is a step-by-step procedure to solve a problem or perform a task. It must be finite (terminates), definite (clear instructions), and effective (achieves goal). Examples: sorting algorithms (bubble sort, quicksort), search algorithms (linear, binary). Good algorithms are efficient in time and space.",
    keywords: ["algorithm", "procedure", "steps", "problem solving", "efficiency"],
  },
  {
    id: "gen2",
    category: "Computer Science",
    question: "What is recursion?",
    answer: "Recursion is when a function calls itself to solve a problem by breaking it into smaller, similar subproblems. Must have: base case (stopping condition) and recursive case (calls itself). Example: factorial(n) = n * factorial(n-1). Useful for tree traversal, sorting (quicksort, mergesort).",
    keywords: ["recursion", "function", "base case", "recursive", "call itself"],
  },
  {
    id: "gen3",
    category: "Computer Science",
    question: "What is a stack?",
    answer: "A stack is a Last-In-First-Out (LIFO) data structure. Think of a stack of plates - you add and remove from the top. Operations: push (add), pop (remove), peek (view top). Used for: function call tracking, undo mechanisms, expression evaluation. Implements using arrays or linked lists.",
    keywords: ["stack", "lifo", "push", "pop", "data structure"],
  },
  {
    id: "gen4",
    category: "Computer Science",
    question: "What is a queue?",
    answer: "A queue is a First-In-First-Out (FIFO) data structure. Like a line at a store - first person in is first served. Operations: enqueue (add to rear), dequeue (remove from front), peek (view front). Used for: task scheduling, breadth-first search, print job management.",
    keywords: ["queue", "fifo", "enqueue", "dequeue", "data structure"],
  },
  {
    id: "gen5",
    category: "Computer Science",
    question: "What is a binary tree?",
    answer: "A binary tree is a hierarchical data structure where each node has at most two children (left and right). Root is the top node, leaves have no children. Special types: Binary Search Tree (BST) - left < parent < right, used for efficient searching. Traversals: inorder, preorder, postorder.",
    keywords: ["binary tree", "node", "tree", "hierarchical", "bst"],
  },

  // Additional practical questions
  {
    id: "prac1",
    category: "Programming",
    question: "How do I debug code?",
    answer: "Debugging strategies: 1) Read error messages carefully, 2) Use print statements to check variable values, 3) Use a debugger to step through code, 4) Reproduce the bug consistently, 5) Check assumptions, 6) Use binary search (comment out half the code), 7) Take breaks - fresh perspective helps!",
    keywords: ["debug", "error", "troubleshoot", "fix", "problem"],
  },
  {
    id: "prac2",
    category: "Programming",
    question: "What is version control?",
    answer: "Version control (like Git) tracks changes to code over time. Benefits: undo changes, collaborate with others, track who changed what and when, maintain different versions (branches). Basic commands: git add (stage changes), git commit (save changes), git push (upload), git pull (download). Essential for team projects.",
    keywords: ["version control", "git", "commit", "repository", "collaboration"],
  },
  {
    id: "prac3",
    category: "Best Practices",
    question: "How do I write clean code?",
    answer: "Clean code principles: 1) Use meaningful variable/function names, 2) Keep functions small and focused, 3) Add comments for complex logic, 4) Follow consistent formatting, 5) Don't repeat yourself (DRY), 6) Write tests, 7) Refactor regularly. Clean code is easy to read, understand, and maintain.",
    keywords: ["clean code", "best practices", "readable", "maintainable", "style"],
  },
  {
    id: "prac4",
    category: "Study Tips",
    question: "How should I learn programming?",
    answer: "Learning programming tips: 1) Start with one language, master basics first, 2) Code every day - consistency beats intensity, 3) Build projects, not just tutorials, 4) Read others' code on GitHub, 5) Debug errors yourself before asking, 6) Join communities (Stack Overflow, Reddit), 7) Teach others - best way to solidify knowledge.",
    keywords: ["learn", "study", "programming", "tips", "beginner"],
  },
  {
    id: "prac5",
    category: "Career",
    question: "How do I prepare for coding interviews?",
    answer: "Interview prep: 1) Master data structures (arrays, linked lists, trees, graphs), 2) Practice algorithms on LeetCode/HackerRank, 3) Study Big O notation, 4) Practice explaining your thought process aloud, 5) Learn system design basics, 6) Review your projects thoroughly, 7) Mock interviews with peers. Focus on problem-solving approach, not just solutions.",
    keywords: ["interview", "coding interview", "leetcode", "preparation", "job"],
  },
];

// Add more questions to reach 100...
const additionalQuestions: QAPair[] = [
  {
    id: "extra1",
    category: "Python",
    question: "What is Python?",
    answer: "Python is a high-level, interpreted programming language known for its simplicity and readability. Features: dynamic typing, automatic memory management, extensive standard library. Popular for: web development (Django, Flask), data science (pandas, numpy), machine learning (TensorFlow, PyTorch), automation. Great for beginners!",
    keywords: ["python", "programming language", "interpreted", "dynamic", "scripting"],
  },
  {
    id: "extra2",
    category: "Python",
    question: "What are Python lists?",
    answer: "Lists are ordered, mutable collections in Python. Can contain different data types. Operations: append() adds items, pop() removes, len() gets length, slicing [start:end], list comprehensions [x*2 for x in range(5)]. Zero-indexed. Example: fruits = ['apple', 'banana', 'cherry']",
    keywords: ["python", "list", "array", "collection", "mutable"],
  },
  {
    id: "extra3",
    category: "Python",
    question: "What is a Python dictionary?",
    answer: "Dictionaries store key-value pairs. Keys must be unique and immutable. Fast lookups by key. Operations: dict['key'] accesses value, dict.keys() gets all keys, dict.values() gets values, dict.items() gets pairs. Example: person = {'name': 'John', 'age': 30, 'city': 'NYC'}",
    keywords: ["python", "dictionary", "dict", "key-value", "hash map"],
  },
  // ... continue adding until you have 100 total questions
];

// Combine all questions
export const allQuestions = [...aiTutorQuestionBank, ...additionalQuestions];

// Helper function to find relevant answers
export const findAnswer = (userQuestion: string): string => {
  const lowerQuestion = userQuestion.toLowerCase();
  
  // Check for exact or partial matches
  for (const qa of allQuestions) {
    // Check if question matches
    if (qa.question.toLowerCase().includes(lowerQuestion) || 
        lowerQuestion.includes(qa.question.toLowerCase())) {
      return qa.answer;
    }
    
    // Check keywords
    const matchedKeywords = qa.keywords.filter(keyword => 
      lowerQuestion.includes(keyword.toLowerCase())
    );
    
    if (matchedKeywords.length >= 2) {
      return qa.answer;
    }
  }
  
  // Default response if no match found
  return "I understand your question, but I don't have a specific answer in my knowledge base yet. Could you rephrase your question or ask about: programming basics, machine learning, data structures, algorithms, web development, databases, or Python?";
};

// Get random questions for suggestions
export const getRandomQuestions = (count: number = 5): QAPair[] => {
  const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// Get questions by category
export const getQuestionsByCategory = (category: string): QAPair[] => {
  return allQuestions.filter(qa => qa.category === category);
};

// Get all categories
export const getCategories = (): string[] => {
  const categories = new Set(allQuestions.map(qa => qa.category));
  return Array.from(categories);
};
