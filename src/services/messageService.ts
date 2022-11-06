const messages: {
    id: number,
    text: string
}[] = []

export const getMessages = (): {
    id: number,
    text: string
}[] => {
    return messages
}

export const fetchMessages = () => {
    if(messages.length === 0) {
        for (let i = 0; i < 3; i++) {
            messages.push(createRandomMessage())
        }
    }else {
        messages.push(createRandomMessage())
    }
    setTimeout(() => {
        console.log("fetching messages" , messages.length)
        fetchMessages()
    }, 4000)
}


const createRandomMessage = () => {
    const message = {
        id: Math.floor(Math.random() * 10) + 1,
        text: makeRandomText(Math.floor(Math.random() * 20) + 1),
    }
    return message
}


const makeRandomText = (length: number) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}