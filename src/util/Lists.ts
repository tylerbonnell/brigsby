// Utility functions for iterable

export const Lists = {
    minBy<T>(list: T[], fn: (element: T) => number): T {
        if (list.length == 0) {
            return null
        }

        let smallestAmount = Number.MAX_SAFE_INTEGER
        let smallest: T
        for (const i of list) {
            const amount = fn(i)
            if (amount < smallestAmount) {
                smallestAmount = amount
                smallest = i
            }
        }

        return smallest
    },

    maxBy<T>(list: T[], fn: (element: T) => number): T {
        if (list.length == 0) {
            return null
        }

        let biggestAmount = Number.MIN_SAFE_INTEGER
        let biggest: T
        for (const i of list) {
            const amount = fn(i)
            if (amount > biggestAmount) {
                biggestAmount = amount
                biggest = i
            }
        }

        return biggest
    },

    oneOf<T>(list: T[]): T {
        return list[Math.floor(Math.random() * list.length)]
    },

    shuffled<T>(list: T[]): T[] {
        const copy = [...list]
        Lists.shuffle(copy)
        return copy
    },

    shuffle<T>(list: T[]) {
        var currentIndex = list.length,
            temporaryValue,
            randomIndex

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex -= 1

            // And swap it with the current element.
            temporaryValue = list[currentIndex]
            list[currentIndex] = list[randomIndex]
            list[randomIndex] = temporaryValue
        }
    },

    /**
     * @param start inclusive
     * @param end exclusive
     */
    range(start: number, end: number): number[] {
        return Array.from({ length: end - start }, (v, k) => k + start)
    },

    repeat<T>(times: number, list: T[]): T[] {
        const result = []
        Lists.range(0, Math.floor(times)).forEach(() => result.push(...list))
        return result
    },

    last<T>(list: T[]): T {
        return list?.length > 0 ? list[list.length - 1] : undefined
    },

    mode<T>(list: T[]): T {
        if (!list?.length) {
            return undefined
        }

        const freq = new Map<T, number>()
        for (const item of list) {
            freq.set(item, 1 + (freq.get(item) || 0))
        }

        return Lists.maxBy(Array.from(freq.entries()), (kv) => kv[1])[0]
    },

    /**
     * Equivalent to Array.prototype.find() except that it starts searching at a random index
     */
    findRandom<T>(list: T[], callbackFn: (val: T, index?: number, array?: T[]) => boolean): T {
        if (!list?.length) {
            return undefined
        }
        let startIndex = Math.floor(Math.random() * list.length)
        for (let i = startIndex; i < list.length; i++) {
            if (callbackFn(list[i], i, list)) {
                return list[i]
            }
        }
        for (let i = 0; i < startIndex; i++) {
            if (callbackFn(list[i], i, list)) {
                return list[i]
            }
        }
    },
}
