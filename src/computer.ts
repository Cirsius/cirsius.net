import { existsSync, readFileSync, writeFileSync } from "fs"

const file = "./data/stats.json"

function load() {
    try {
        if (existsSync(file)) {
            return JSON.parse(readFileSync(file, "utf-8"))
        }
    } catch { }
    return { totalUptime: 0 }
}

function save(data: { totalUptime: number }) {
    try {
        const fs = require("fs")
        fs.mkdirSync("./data", { recursive: true })
        writeFileSync(file, JSON.stringify(data, null, 2))
    } catch { }
}

type Point = {
    timestamp: Date
    cpu: number
    ram: number
}

type State = {
    online: boolean
    uptimeStart: number
    totals: { uptime: number }
    graph: Point[]
}

function initGraph(): Point[] {
    const now = new Date()
    now.setSeconds(0, 0)

    return Array.from({ length: 60 }, (_, i) => ({
        timestamp: new Date(now.getTime() - (60 - i) * 60000),
        cpu: 0,
        ram: 0,
    }))
}

const saved = load()

export const state: State = {
    online: false,
    uptimeStart: -1,
    totals: { uptime: saved.totalUptime },
    graph: initGraph(),
}

let lastSeen = 0
let timer: Timer | null = null

export function handleConnect() {
    state.online = true

    if (timer) {
        clearTimeout(timer)
        timer = null
    }

    const now = Date.now()
    const gap = now - lastSeen

    if (gap > 45000 || state.uptimeStart === -1) {
        state.uptimeStart = Math.floor(now / 1000)
    }
}

export function handleDisconnect() {
    state.online = false
    lastSeen = Date.now()

    if (state.uptimeStart > 0) {
        const duration = Math.floor(Date.now() / 1000) - state.uptimeStart
        state.totals.uptime += duration
        save({ totalUptime: state.totals.uptime })
        state.uptimeStart = -1
    }

    if (timer) clearTimeout(timer)
    timer = setTimeout(() => { timer = null }, 45000)
}

export function addPoint(cpu: number, ram: number) {
    const now = new Date()
    now.setSeconds(0, 0)

    state.graph.push({ timestamp: now, cpu, ram })
    if (state.graph.length > 60) state.graph.shift()
}

let worker: Timer | null = null

export function startWorker() {
    worker = setInterval(() => {
        if (!state.online) addPoint(0, 0)
    }, 60000)
}

export function getData() {
    return {
        online: state.online,
        uptimeStart: state.uptimeStart,
        totals: state.totals,
        graph: state.graph,
    }
}
