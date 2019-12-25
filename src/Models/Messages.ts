export function kingMessage() {
    const messages = [
        "Kinged!",
        "Massive King",
        "Huge King",
        "Kingo",
        "Kinged!!",
        "Good one",
        "Tom's the king",
        "Massive kingo",
        "kingo",
        "huge massive king",
        "massive huge king",
        "kingo...."
    ]
    const random = Math.floor(Math.random() * messages.length);

    return messages[random];
}