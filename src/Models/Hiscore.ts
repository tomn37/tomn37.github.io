export function setHiscore(score: number) {
    const currentScore = getHiscore();
    if (score > currentScore) {
        localStorage.setItem("hiscore", score.toString());
    }

    return getHiscore();
}

export function getHiscore() {
    return Number.parseInt(localStorage.getItem("hiscore") || "0");
}