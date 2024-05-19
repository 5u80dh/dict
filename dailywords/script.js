document.addEventListener('DOMContentLoaded', function() {
    const randomWords = ["serendipity", "quixotic", "ephemeral", "luminous", "melancholy"];
    fetchRandomWordsDefinitions(randomWords);
});

async function fetchRandomWordsDefinitions(words) {
    const container = document.getElementById('words-container');
    container.innerHTML = '';

    for (let word of words) {
        const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Word not found');
            }
            const data = await response.json();
            displayDefinition(data[0], container);
        } catch (error) {
            const errorElement = document.createElement('div');
            errorElement.className = 'word';
            errorElement.innerHTML = `<h2>${word}</h2><p>Definition not found.</p>`;
            container.appendChild(errorElement);
        }
    }
}

function displayDefinition(data, container) {
    const wordElement = document.createElement('div');
    wordElement.className = 'word';

    const wordTitle = document.createElement('h2');
    wordTitle.innerText = data.word;
    wordElement.appendChild(wordTitle);

    let definitionCount = 0;
    
    data.meanings.forEach(meaning => {
        meaning.definitions.forEach((definitionObj, index) => {
            if (definitionCount < 5) {
                const definition = document.createElement('div');
                definition.className = 'definition';
                definition.innerText = `${definitionCount + 1}. ${definitionObj.definition}`;
                
                const synonymsAntonyms = document.createElement('div');
                synonymsAntonyms.className = 'synonyms-antonyms';
                
                if (definitionObj.synonyms.length > 0) {
                    const synonyms = document.createElement('p');
                    synonyms.innerHTML = `<span>Synonyms:</span> ${definitionObj.synonyms.join(', ')}`;
                    synonymsAntonyms.appendChild(synonyms);
                }
                
                if (definitionObj.antonyms.length > 0) {
                    const antonyms = document.createElement('p');
                    antonyms.innerHTML = `<span>Antonyms:</span> ${definitionObj.antonyms.join(', ')}`;
                    synonymsAntonyms.appendChild(antonyms);
                }
                
                definition.appendChild(synonymsAntonyms);
                definition.addEventListener('click', () => {
                    synonymsAntonyms.style.display = synonymsAntonyms.style.display === 'block' ? 'none' : 'block';
                });
                
                wordElement.appendChild(definition);
                definitionCount++;
            }
        });
    });

    container.appendChild(wordElement);

    
}

//

const boxes = document.querySelectorAll('.box')

window.addEventListener('scroll', checkBoxes)

checkBoxes()

function checkBoxes() {
    const triggerBottom = window.innerHeight / 5 * 4

    boxes.forEach(box => {
        const boxTop = box.getBoundingClientRect().top

        if(boxTop < triggerBottom) {
            container.classList.add('show')
        } else {
            container.classList.remove('show')
        }
    })
}