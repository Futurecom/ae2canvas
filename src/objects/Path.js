import Bezier from '../utils/Bezier'

class Path {

    constructor(data) {
        this.closed = data.closed
        this.frames = data.frames
        this.verticesCount = this.frames[0].v.length
    }

    draw(ctx, time, trim) {
        const frame = this.getValue(time)
        const vertices = frame.v
        let nextVertex
        let lastVertex

        if (trim) {
            if ((trim.start === 0 && trim.end === 0) ||
                (trim.start === 1 && trim.end === 1)) {
                return
            } else {
                trim = this.getTrimValues(trim, frame)
            }
        }

        for (let j = 1; j < vertices.length; j++) {
            nextVertex = vertices[j]
            lastVertex = vertices[j - 1]

            if (trim) {
                let tv

                if (j === 1 && trim.startIndex !== 0) {
                    ctx.moveTo(lastVertex[4], lastVertex[5])
                }
                else if (j === trim.startIndex + 1 && j === trim.endIndex + 1) {
                    tv = this.trim(lastVertex, nextVertex, trim.start, trim.end, frame.len[j - 1])
                    ctx.moveTo(tv.start[4], tv.start[5])
                    ctx.bezierCurveTo(tv.start[0], tv.start[1], tv.end[2], tv.end[3], tv.end[4], tv.end[5])
                } else if (j === trim.startIndex + 1) {
                    tv = this.trim(lastVertex, nextVertex, trim.start, 1, frame.len[j - 1])
                    ctx.moveTo(tv.start[4], tv.start[5])
                    ctx.bezierCurveTo(tv.start[0], tv.start[1], tv.end[2], tv.end[3], tv.end[4], tv.end[5])
                } else if (j === trim.endIndex + 1) {
                    tv = this.trim(lastVertex, nextVertex, 0, trim.end, frame.len[j - 1])
                    ctx.bezierCurveTo(tv.start[0], tv.start[1], tv.end[2], tv.end[3], tv.end[4], tv.end[5])
                } else if (j > trim.startIndex + 1 && j < trim.endIndex + 1) {
                    ctx.bezierCurveTo(lastVertex[0], lastVertex[1], nextVertex[2], nextVertex[3], nextVertex[4], nextVertex[5])
                }
            } else {
                if (j === 1) {
                    ctx.moveTo(lastVertex[4], lastVertex[5])
                }
                ctx.bezierCurveTo(lastVertex[0], lastVertex[1], nextVertex[2], nextVertex[3], nextVertex[4], nextVertex[5])
            }
        }

        if (!trim && this.closed) {
            if (!nextVertex) debugger
            ctx.bezierCurveTo(nextVertex[0], nextVertex[1], vertices[0][2], vertices[0][3], vertices[0][4], vertices[0][5])
        }
    }

    getValue() {
        return this.frames[0]
    }

    getTrimValues(trim, frame) {
        let i

        const actualTrim = {
            startIndex: 0,
            endIndex: 0,
            start: 0,
            end: 0
        }

        // TODO clean up
        if (trim.start === 0) {
            if (trim.end === 0) {
                return actualTrim
            } else if (trim.end === 1) {
                actualTrim.endIndex = frame.len.length
                actualTrim.end = 1
                return actualTrim
            }
        }

        const totalLen = this.sumArray(frame.len)
        let trimAtLen

        trimAtLen = totalLen * trim.start

        for (i = 0; i < frame.len.length; i++) {
            if (trimAtLen > 0 && trimAtLen < frame.len[i]) {
                actualTrim.startIndex = i
                actualTrim.start = trimAtLen / frame.len[i]
            }
            trimAtLen -= frame.len[i]
        }

        if (trim.end === 1) {
            actualTrim.endIndex = frame.len.length
            actualTrim.end = 1
            return actualTrim
        } else {
            trimAtLen = totalLen * trim.end

            for (i = 0; i < frame.len.length; i++) {
                if (trimAtLen > 0 && trimAtLen < frame.len[i]) {
                    actualTrim.endIndex = i
                    actualTrim.end = trimAtLen / frame.len[i]
                }
                trimAtLen -= frame.len[i]
            }
        }

        return actualTrim
    }

    trim(lastVertex, nextVertex, from, to, len) {

        if (from === 0 && to === 1) {
            return {
                start: lastVertex,
                end: nextVertex
            }
        }

        if (this.isStraight(lastVertex[4], lastVertex[5], lastVertex[0], lastVertex[1], nextVertex[2], nextVertex[3], nextVertex[4], nextVertex[5])) {
            startVertex = [
                this.lerp(lastVertex[0], nextVertex[0], from),
                this.lerp(lastVertex[1], nextVertex[1], from),
                this.lerp(lastVertex[2], nextVertex[2], from),
                this.lerp(lastVertex[3], nextVertex[3], from),
                this.lerp(lastVertex[4], nextVertex[4], from),
                this.lerp(lastVertex[5], nextVertex[5], from)
            ]

            endVertex = [
                this.lerp(lastVertex[0], nextVertex[0], to),
                this.lerp(lastVertex[1], nextVertex[1], to),
                this.lerp(lastVertex[2], nextVertex[2], to),
                this.lerp(lastVertex[3], nextVertex[3], to),
                this.lerp(lastVertex[4], nextVertex[4], to),
                this.lerp(lastVertex[5], nextVertex[5], to)
            ]

        } else {
            this.bezier = new Bezier([lastVertex[4], lastVertex[5], lastVertex[0], lastVertex[1], nextVertex[2], nextVertex[3], nextVertex[4], nextVertex[5]])
            this.bezier.getLength(len)
            from = this.bezier.map(from)
            to = this.bezier.map(to)
            to = (to - from) / (1 - from)

            let e1
            let f1
            let g1
            let h1
            let j1
            let k1
            let e2
            let f2
            let g2
            let h2
            let j2
            let k2
            var startVertex
            var endVertex

            e1 = [this.lerp(lastVertex[4], lastVertex[0], from), this.lerp(lastVertex[5], lastVertex[1], from)]
            f1 = [this.lerp(lastVertex[0], nextVertex[2], from), this.lerp(lastVertex[1], nextVertex[3], from)]
            g1 = [this.lerp(nextVertex[2], nextVertex[4], from), this.lerp(nextVertex[3], nextVertex[5], from)]
            h1 = [this.lerp(e1[0], f1[0], from), this.lerp(e1[1], f1[1], from)]
            j1 = [this.lerp(f1[0], g1[0], from), this.lerp(f1[1], g1[1], from)]
            k1 = [this.lerp(h1[0], j1[0], from), this.lerp(h1[1], j1[1], from)]

            startVertex = [j1[0], j1[1], h1[0], h1[1], k1[0], k1[1]]
            endVertex = [nextVertex[0], nextVertex[1], g1[0], g1[1], nextVertex[4], nextVertex[5]]

            e2 = [this.lerp(startVertex[4], startVertex[0], to), this.lerp(startVertex[5], startVertex[1], to)]
            f2 = [this.lerp(startVertex[0], endVertex[2], to), this.lerp(startVertex[1], endVertex[3], to)]
            g2 = [this.lerp(endVertex[2], endVertex[4], to), this.lerp(endVertex[3], endVertex[5], to)]

            h2 = [this.lerp(e2[0], f2[0], to), this.lerp(e2[1], f2[1], to)]
            j2 = [this.lerp(f2[0], g2[0], to), this.lerp(f2[1], g2[1], to)]
            k2 = [this.lerp(h2[0], j2[0], to), this.lerp(h2[1], j2[1], to)]

            startVertex = [e2[0], e2[1], startVertex[2], startVertex[3], startVertex[4], startVertex[5]]
            endVertex = [j2[0], j2[1], h2[0], h2[1], k2[0], k2[1]]
        }

        return {
            start: startVertex,
            end: endVertex
        }
    }

    lerp(a, b, t) {
        const s = 1 - t
        return a * s + b * t
    }

    sumArray(arr) {
        function add(a, b) {
            return a + b
        }

        return arr.reduce(add)
    }

    isStraight(startX, startY, ctrl1X, ctrl1Y, ctrl2X, ctrl2Y, endX, endY) {
        return startX === ctrl1X && startY === ctrl1Y && endX === ctrl2X && endY === ctrl2Y
    }

    setKeyframes(time) {
    }

    reset(reversed) {
    }
}

export default Path


























