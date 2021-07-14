export default ([query, titles, descriptions, links]) => (
    `
        <h2>Searching for "${query}"</h2>
        <ul class="list-group">
            ${titles.map(
                (title, index)=>(
                    `
                    <li class="list-group-item">
                        <a href=${links[index]} target='_blank>${title}</a>
                        <p>${descriptions[index]}</p>
                    </li>
                    `
                )).join('')
            }
        </ul>
    `
)