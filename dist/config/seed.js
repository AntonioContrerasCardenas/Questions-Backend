"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Category_1 = require("../models/Category");
const Question_1 = require("../models/Question");
async function seedDatabase() {
    const categories = [
        'science',
        'sports',
        'history',
        'geography',
        'movies',
        'music',
        'books',
        'games',
        'politics',
        'technology',
    ];
    await Category_1.Category.deleteMany({}); // Elimina todas las categorías existentes
    const categoryDocs = await Promise.all(categories.map(async (name) => {
        return Category_1.Category.findOneAndUpdate({ name }, // Busca por nombre
        { name }, // Si no existe, inserta con el nombre
        { upsert: true, new: true } // `upsert` asegura que si no existe, se cree
        );
    }));
    const questions = [
        {
            question: 'What is the chemical symbol for water?',
            answer: 'H2O',
            options: ['H2O', 'O2', 'CO2', 'NaCl'],
            category: 'science',
        },
        {
            question: 'Which country has won the most FIFA World Cups?',
            answer: 'Brazil',
            options: ['Germany', 'Italy', 'Brazil', 'Argentina'],
            category: 'sports',
        },
        {
            question: 'Who was the first President of the United States?',
            answer: 'George Washington',
            options: [
                'George Washington',
                'Abraham Lincoln',
                'John Adams',
                'Thomas Jefferson',
            ],
            category: 'history',
        },
        {
            question: 'Which is the largest desert in the world?',
            answer: 'Sahara Desert',
            options: [
                'Gobi Desert',
                'Sahara Desert',
                'Kalahari Desert',
                'Antarctica',
            ],
            category: 'geography',
        },
        {
            question: 'Who is known as the father of computers?',
            answer: 'Charles Babbage',
            options: [
                'Alan Turing',
                'Charles Babbage',
                'Ada Lovelace',
                'John von Neumann',
            ],
            category: 'technology',
        },
        {
            question: 'Which movie won the Oscar for Best Picture in 1994?',
            answer: 'Forrest Gump',
            options: [
                'The Shawshank Redemption',
                'Pulp Fiction',
                'Forrest Gump',
                'Four Weddings and a Funeral',
            ],
            category: 'movies',
        },
        {
            question: 'Who is known as the King of Pop?',
            answer: 'Michael Jackson',
            options: [
                'Elvis Presley',
                'Prince',
                'Michael Jackson',
                'Freddie Mercury',
            ],
            category: 'music',
        },
        {
            question: "Who wrote 'Pride and Prejudice'?",
            answer: 'Jane Austen',
            options: [
                'Emily Brontë',
                'Charles Dickens',
                'Jane Austen',
                'Virginia Woolf',
            ],
            category: 'books',
        },
        {
            question: 'What is the best-selling video game of all time?',
            answer: 'Minecraft',
            options: ['Tetris', 'Minecraft', 'GTA V', 'Call of Duty'],
            category: 'games',
        },
        {
            question: 'Who is the current Secretary-General of the United Nations (as of 2025)?',
            answer: 'António Guterres',
            options: [
                'Ban Ki-moon',
                'António Guterres',
                'Kofi Annan',
                'Boutros Boutros-Ghali',
            ],
            category: 'politics',
        },
        {
            question: 'What planet is known as the Red Planet?',
            answer: 'Mars',
            options: ['Mars', 'Venus', 'Jupiter', 'Saturn'],
            category: 'science',
        },
        {
            question: 'What is the powerhouse of the cell?',
            answer: 'Mitochondria',
            options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Chloroplast'],
            category: 'science',
        },
        {
            question: "What is the most abundant gas in Earth's atmosphere?",
            answer: 'Nitrogen',
            options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Argon'],
            category: 'science',
        },
        {
            question: 'What is the chemical symbol for gold?',
            answer: 'Au',
            options: ['Au', 'Ag', 'Pb', 'Fe'],
            category: 'science',
        },
        {
            question: 'What is the speed of light in vacuum?',
            answer: '299,792 km/s',
            options: ['300,000 km/s', '299,792 km/s', '280,000 km/s', '310,000 km/s'],
            category: 'science',
        },
        {
            question: 'What is the heaviest naturally occurring element on Earth?',
            answer: 'Uranium',
            options: ['Gold', 'Lead', 'Uranium', 'Platinum'],
            category: 'science',
        },
        {
            question: 'Which sport is known as "the beautiful game"?',
            answer: 'Soccer',
            options: ['Basketball', 'Soccer', 'Tennis', 'Baseball'],
            category: 'sports',
        },
        {
            question: 'What year did World War II end?',
            answer: '1945',
            options: ['1945', '1941', '1939', '1948'],
            category: 'history',
        },
        {
            question: 'What is the capital city of Australia?',
            answer: 'Canberra',
            options: ['Sydney', 'Melbourne', 'Canberra', 'Perth'],
            category: 'geography',
        },
        {
            question: 'What was the first programmable computer called?',
            answer: 'Zuse Z3',
            options: ['ENIAC', 'Zuse Z3', 'UNIVAC', 'Colossus'],
            category: 'technology',
        },
        {
            question: 'Which director is famous for the movie "Inception"?',
            answer: 'Christopher Nolan',
            options: [
                'Steven Spielberg',
                'James Cameron',
                'Christopher Nolan',
                'Quentin Tarantino',
            ],
            category: 'movies',
        },
        {
            question: 'Which band released the album "Abbey Road"?',
            answer: 'The Beatles',
            options: ['The Rolling Stones', 'The Beatles', 'Pink Floyd', 'The Who'],
            category: 'music',
        },
        {
            question: "Who wrote 'The Catcher in the Rye'?",
            answer: 'J.D. Salinger',
            options: [
                'Ernest Hemingway',
                'J.D. Salinger',
                'F. Scott Fitzgerald',
                'Mark Twain',
            ],
            category: 'books',
        },
        {
            question: 'What is the name of the protagonist in "The Legend of Zelda"?',
            answer: 'Link',
            options: ['Zelda', 'Link', 'Ganon', 'Epona'],
            category: 'games',
        },
        {
            question: 'Which U.S. president signed the Emancipation Proclamation?',
            answer: 'Abraham Lincoln',
            options: [
                'George Washington',
                'Thomas Jefferson',
                'Abraham Lincoln',
                'Theodore Roosevelt',
            ],
            category: 'politics',
        },
        {
            question: 'What is the boiling point of water at sea level?',
            answer: '100°C',
            options: ['90°C', '100°C', '110°C', '120°C'],
            category: 'science',
        },
        {
            question: 'Who holds the record for the most Olympic gold medals?',
            answer: 'Michael Phelps',
            options: ['Usain Bolt', 'Michael Phelps', 'Carl Lewis', 'Mark Spitz'],
            category: 'sports',
        },
        {
            question: 'Which ancient civilization built the pyramids?',
            answer: 'Egyptians',
            options: ['Greeks', 'Romans', 'Egyptians', 'Mayans'],
            category: 'history',
        },
        {
            question: 'Which country has the most islands?',
            answer: 'Sweden',
            options: ['Indonesia', 'Philippines', 'Sweden', 'Japan'],
            category: 'geography',
        },
        {
            question: 'What does HTTP stand for?',
            answer: 'HyperText Transfer Protocol',
            options: [
                'HyperText Transfer Protocol',
                'High Transfer Technology Protocol',
                'Hyperlink Texting Protocol',
                'High Tech Transfer Protocol',
            ],
            category: 'technology',
        },
        {
            question: 'What movie features the quote, "I’ll be back"?',
            answer: 'The Terminator',
            options: ['Die Hard', 'The Terminator', 'Predator', 'RoboCop'],
            category: 'movies',
        },
        {
            question: 'What is the best-selling music album of all time?',
            answer: 'Thriller',
            options: [
                'Back in Black',
                'Thriller',
                'The Dark Side of the Moon',
                'Rumours',
            ],
            category: 'music',
        },
        {
            question: 'Which author wrote "1984"?',
            answer: 'George Orwell',
            options: [
                'George Orwell',
                'Aldous Huxley',
                'Ray Bradbury',
                'Kurt Vonnegut',
            ],
            category: 'books',
        },
        {
            question: 'What is the name of the main character in "Final Fantasy VII"?',
            answer: 'Cloud Strife',
            options: ['Cloud Strife', 'Sephiroth', 'Tidus', 'Barret Wallace'],
            category: 'games',
        },
        {
            question: 'Who is the longest-serving British Prime Minister?',
            answer: 'Sir Robert Walpole',
            options: [
                'Winston Churchill',
                'Margaret Thatcher',
                'Sir Robert Walpole',
                'Tony Blair',
            ],
            category: 'politics',
        },
    ];
    await Question_1.Question.deleteMany({});
    await Question_1.Question.insertMany(
    // questions.map((q) => ({
    //   question: q.question,
    //   answer: q.answer,
    //   options: q.options,
    //   categoryId: categoryDocs.find((c) => c.name === q.category)!._id,
    // }))
    questions
        .map((q) => {
        const category = categoryDocs.find((c) => c.name === q.category);
        if (!category) {
            console.error(`Categoría no encontrada para la pregunta: ${q.question}`);
            // Puedes manejar el error aquí, o retornar null para ignorar la inserción de esta pregunta
            return null;
        }
        return {
            question: q.question,
            answer: q.answer,
            options: q.options,
            categoryId: category._id, // Ahora ya puedes acceder a _id de manera segura
        };
    })
        .filter((q) => q !== null) // Filtrar los valores null (preguntas sin categoría válida)
    );
}
exports.default = seedDatabase;
