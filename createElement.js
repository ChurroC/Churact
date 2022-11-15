export function createElement(type, props, ...children) {
    return {
        type,
        props: {
            ...props,
            //Through React doesn’t wrap primitive values or create empty arrays when there aren’t children, we do it because it will simplify our code, and for our library we prefer simple code than performant code.
            children: children.map(child => {
                if (typeof child === 'object') {
                    return child
                } else {
                    return createTextElement(child)
                }
            }),
        },
    }
}

function createTextElement(text) {
    return {
        type: 'TEXT_ELEMENT',
        props: {
            nodeValue: text,
            children: [],
        },
    }
}

console.log(
    JSON.stringify(createElement('div', { id: 'foo' }, createElement('a', null, 'bar'), createElement('b')), null, 4)
)

console.dir(createElement('div', { id: 'foo' }, createElement('a', null, 'bar'), createElement('b')), { depth: null })
