(function() {
  if (window.statusInterval) clearInterval(window.statusInterval)

  function formatTime(seconds) {
    const days = Math.floor(seconds / 86400)
    const hrs = Math.floor((seconds % 86400) / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = Math.floor(seconds % 60)

    const parts = []
    if (days > 0) parts.push(days + 'd')
    if (hrs > 0 || days > 0) parts.push(hrs + 'h')
    parts.push(mins + 'm')
    parts.push(secs + 's')

    return parts.join(' ')
  }

  async function update() {
    const indicator = document.getElementById('status-indicator')
    if (!indicator) {
      clearInterval(window.statusInterval)
      return
    }

    try {
      const res = await fetch('/api/puter')
      const data = await res.json()

      const statusText = document.getElementById('status-text')
      const cpuBar = document.getElementById('cpu-bar')
      const cpuValue = document.getElementById('cpu-value')
      const ramBar = document.getElementById('ram-bar')
      const ramValue = document.getElementById('ram-value')
      const uptimeValue = document.getElementById('uptime-value')
      const totalUptimeValue = document.getElementById('total-uptime-value')

      if (data.online) {
        indicator.className = 'status-indicator online'
        statusText.textContent = 'ONLINE'
        statusText.className = 'status-text online'
      } else {
        indicator.className = 'status-indicator offline'
        statusText.textContent = 'OFFLINE'
        statusText.className = 'status-text offline'
      }

      const latest = data.graph[data.graph.length - 1] || { cpu: 0, ram: 0 }
      cpuBar.style.width = Math.min(100, latest.cpu) + '%'
      cpuValue.textContent = latest.cpu + '%'
      ramBar.style.width = Math.min(100, latest.ram) + '%'
      ramValue.textContent = latest.ram + '%'

      if (data.online && data.uptimeStart > 0) {
        const sessionTime = Math.floor(Date.now() / 1000) - data.uptimeStart
        uptimeValue.textContent = formatTime(sessionTime)
        totalUptimeValue.textContent = formatTime(data.totals.uptime + sessionTime)
      } else {
        uptimeValue.textContent = 'offline'
        totalUptimeValue.textContent = formatTime(data.totals.uptime)
      }
    } catch (e) {
      console.error('Failed to fetch status:', e)
    }
  }

  update()
  window.statusInterval = setInterval(update, 1000)
})()
