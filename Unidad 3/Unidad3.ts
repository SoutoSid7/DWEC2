function doblar2(a: number): number {
    return a * 2
}

const sumar2 = (a: number, b: number): number => a+b
const factorial2 = (a: number): number => {
    if(a <= 1){
        return 1
    }
    return a * factorial2(a -1)
}