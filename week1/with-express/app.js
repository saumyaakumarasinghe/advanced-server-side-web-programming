const express = require('express');
const app = express();
const port = 3000;

const courseworkData = [
    { coursework1: 70, coursework2: 80 },
    { coursework1: 85, coursework2: 90 },
    { coursework1: 65, coursework2: 75 },
    { coursework1: 50, coursework2: 60 },
    { coursework1: 25, coursework2: 20 },
    { coursework1: 29, coursework2: 28 },
];

app.get('/calculate', (req, res) => {
    let results = [];
    let marksBelow30 = [];
    let totalMarksBelow30 = 0;
    let countBelow30 = 0;

    courseworkData.forEach((data, index) => {
        const coursework1 = data.coursework1;
        const coursework2 = data.coursework2;

        // calculate the average
        const average = (coursework1 * 0.4) + (coursework2 * 0.6);

        results.push({
            index: index + 1,
            coursework1,
            coursework2,
            average: average.toFixed(2)
        });

        // collect marks less than 30
        if (coursework1 < 30) {
            marksBelow30.push(coursework1);
            totalMarksBelow30 += coursework1;
            countBelow30++;
        }
        if (coursework2 < 30) {
            marksBelow30.push(coursework2);
            totalMarksBelow30 += coursework2;
            countBelow30++;
        }
    });

    let htmlResponse = `
        <html>
            <head>
                <title>Module Mark Calculator</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    .result { margin-bottom: 20px; padding: 10px; border: 1px solid #ccc; }
                    .below30 { color: red; }
                </style>
            </head>
            <body>
                <h1>Module Mark Calculator Results</h1>
                <div class="result">
                    <h2>Overall Marks:</h2>
                    <ul>`;

    // loop through each result and display it
    results.forEach(result => {
        htmlResponse += `
            <li>
                <strong>Student ${result.index}:</strong> 
                Coursework 1: ${result.coursework1} 
                | Coursework 2: ${result.coursework2} 
                | <span class="${result.coursework1 < 30 || result.coursework2 < 30 ? 'below30' : ''}">
                    Overall Mark: ${result.average}
                </span>
            </li>`;
    });

    res.send(htmlResponse);
});

app.listen(port, () => {
    console.log(`Server is running on PORT:${port}`);
});
